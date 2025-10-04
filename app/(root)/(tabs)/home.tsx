import { useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { isLoaded, user, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    // You could render a loading or placeholder view here
    return null;
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Home component here.</Text>
        <Text>Welcome, {user.firstName}!</Text>
      </View>
    </SafeAreaView>
  );
}
