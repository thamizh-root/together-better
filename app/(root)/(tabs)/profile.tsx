import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Profile() {
  return (
     <SafeAreaView>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile component here.</Text>
    </View>
    </SafeAreaView>
  );
}