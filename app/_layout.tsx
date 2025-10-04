import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {

    const [loaded] = useFonts({
      "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
      "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
      "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
      "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
      "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
      Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
      "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    });

    useEffect(() => {
      if (loaded) {
        loadApp();
      }
    }, [loaded]);

    if (!loaded) {
      return null;
    }

    const loadApp = async () => {
      await new Promise((res) => setTimeout(res, 1000));
      SplashScreen.hide();
    };
    


  return (
    <ClerkProvider tokenCache={tokenCache}>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
    </ClerkProvider>
  );
}
