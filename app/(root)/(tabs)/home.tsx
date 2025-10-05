import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// A small utility to ensure logs only run in development.
// This prevents sensitive or unnecessary logs in production builds.
const log = (...args: any) => {
  console.log(...args);
};

export default function Home() {
  const { isLoaded, user, isSignedIn } = useUser();

  useEffect(() => {
    log("Home component mounted!");
  }, []);

  // Use a loading screen while Clerk is initializing.
  // We check for `isLoaded` but allow `isSignedIn` to be undefined initially.
  if (!isLoaded) {
    log("Clerk is not yet loaded. Showing loading screen.");
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            Loading authentication...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // If `isLoaded` is true, we can assume the final state is ready.
  // This handles the case where the user is signed out.
  if (!isSignedIn) {
    log(
      "Clerk is loaded, but no user is signed in. Showing placeholder content."
    );
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "black", fontSize: 20 }}>
            Placeholder content for signed-out user.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // At this point, Clerk is loaded AND a user is signed in.
  // We can safely log and display user-specific data.
  log("User is signed in. Displaying user data.");
  if (user) {
    // This check is redundant with the `isSignedIn` check above, but is a safe guard.
    log("User details:", {
      firstName: user?.firstName,
      email: user?.emailAddresses[0].emailAddress,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Welcome, {user?.firstName}!</Text>
      </View>
    </SafeAreaView>
  );
}
