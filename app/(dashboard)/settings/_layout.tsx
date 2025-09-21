import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      {/* Only main settings screen (index.tsx) */}
      <Stack.Screen name="index" options={{ title: "Settings" }} />

      {/* Sub screens - not shown in main navigation */}
      <Stack.Screen name="about" options={{ title: "About" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="notification" options={{ title: "Notifications" }} />
      <Stack.Screen name="theme" options={{ title: "Theme" }} />
      <Stack.Screen name="logout" options={{ title: "Logout" }} />
    </Stack>
  );
}
