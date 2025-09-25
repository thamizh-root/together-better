import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SignIn() {
  return (
     <SafeAreaView>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>SignIn component here.</Text>
    </View>
    </SafeAreaView>
  );
}