import { useRouter } from "expo-router"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

const SettingsScreen = () => {
  const router = useRouter()

 const settingsOptions = [
  { label: "Profile", icon: "person" as const, route: "/settings/profile" },
  { label: "Notifications", icon: "notifications" as const, route: "/settings/notifications" },
  { label: "Theme", icon: "palette" as const, route: "/settings/theme" },
  { label: "About", icon: "info" as const, route: "/settings/about" },
  { label: "Logout", icon: "logout" as const, route: "/logout" }
]


  return (
    <ScrollView className="flex-1 bg-white">
      <Text className="text-3xl font-bold text-green-700 px-4 pt-6">Settings</Text>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center px-4 py-4 border-b border-gray-200"
          onPress={() => router.push({ pathname: "/settings/profile" })
}
        >
          <MaterialIcons name={option.icon} size={24} color="#4CAF50" />
          <Text className="ml-4 text-lg text-gray-800">{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default SettingsScreen
