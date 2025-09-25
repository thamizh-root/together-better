import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SignUp() {
  return (
     <SafeAreaView>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>SignUp component here.</Text>
    </View>
    </SafeAreaView>
  );
}