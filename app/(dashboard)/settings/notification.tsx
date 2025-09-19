import { View, Text, Switch } from "react-native"
import { useState } from "react"

const NotificationsScreen = () => {
  const [enabled, setEnabled] = useState(true)

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-green-700 mb-4">Notifications</Text>

      <View className="flex-row justify-between items-center">
        <Text className="text-lg">Watering Reminders</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
    </View>
  )
}

export default NotificationsScreen
