import { GoogleInputProps } from "@/types/type";
import { Text, View } from "react-native";

const GoogleTextInput = ({
    icon,
    containerStyle,
    initialLocation,
    textInputBackgroundColor,
    handlePress
}: GoogleInputProps) => (
    <View className={`flex flex-row items-center justify-center relative rounded-xl ${containerStyle} mb-5`}>
        <Text>Search</Text>
    </View>
);

export default GoogleTextInput;
