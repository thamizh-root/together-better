import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../global.css";

export default function Index() {
  console.log("loading index.tsx...");
  const { isSignedIn, isLoaded } = useAuth(); // Destructure isLoaded
  console.log("isSignedIn: ", isSignedIn);
  console.log("isLoaded: ", isLoaded);

  // Show a loading indicator while Clerk is still checking the auth status
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  console.log("application has been loaded!");

  // Once Clerk has loaded, redirect based on the isSignedIn status
  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
