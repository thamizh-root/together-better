import { Stack } from "expo-router";

export default function TabLayout() {

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
