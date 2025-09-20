import { useRouter } from "expo-router"
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

const SettingsScreen = () => {
  const router = useRouter()

  // ⚡ TS-safe routes (only /settings/... routes)
  const settingsOptions = [
    { label: "Profile", icon: "person" as const, route: "/settings/profile" as const },
    { label: "Notifications", icon: "notifications" as const, route: "/settings/notification" as const },
    { label: "Theme", icon: "palette" as const, route: "/settings/theme" as const },
    { label: "About", icon: "info" as const, route: "/settings/about" as const },
  ] as const

  // Logout button handler
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // ⚡ Replace with your auth logout logic
          router.push("/(dashboard)/settings/logout") // Must exist as a route in app/logout.tsx
        },
      },
    ])
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <Text className="text-3xl font-bold text-green-700 px-4 pt-6">Settings</Text>

      {/* Settings options */}
      {settingsOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center px-4 py-4 border-b border-gray-200"
          onPress={() => router.push(option.route)}
        >
          <MaterialIcons name={option.icon} size={24} color="#4CAF50" />
          <Text className="ml-4 text-lg text-gray-800">{option.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Logout button */}
      <TouchableOpacity
        className="flex-row items-center px-4 py-4 border-b border-gray-200"
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={24} color="#4CAF50" />
        <Text className="ml-4 text-lg text-gray-800">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default SettingsScreen
