import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Chat() {
  return (
     <SafeAreaView>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Chat component here.</Text>
    </View>
    </SafeAreaView>
  );
}