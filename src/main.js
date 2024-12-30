import React, { useState, useEffect, useRef } from "react";
import {
  BackHandler,
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";

const WebviewScreen = () => {
  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      const backHandlerListener = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPressed
      );

      // Cleanup listener when component unmounts
      return () => {
        backHandlerListener.remove();
      };
    }
  }, []); // Run only once when component is mounted

  const handleBackPressed = () => {
    if (canGoBack) {
      webView.current.goBack(); // Go back in the webview if possible
      return true; // Prevent default back behavior (i.e., exiting the app)
    }
    return false; // Allow default back behavior if there's no history to go back to
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#263238" />

      <WebView
        ref={webView}
        source={{
          uri: "https://culturebuilding.habot.io/", // Replace with your URL
        }}
        style={{ marginTop: 0 }}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack); // Update state for the back navigation
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebviewScreen;
