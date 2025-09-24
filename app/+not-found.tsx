import { Text, View } from "react-native";
import "../global.css";

export default function NotFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>404: No page found.</Text>
    </View>
  );
}
