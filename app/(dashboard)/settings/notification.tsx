import { View, Text, Switch, Alert } from "react-native"
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const NotificationsScreen = () => {
  const [wateringEnabled, setWateringEnabled] = useState(false)
  const [fertilizerEnabled, setFertilizerEnabled] = useState(false)

  // Load saved settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const watering = await AsyncStorage.getItem("watering_reminder")
        const fertilizer = await AsyncStorage.getItem("fertilizer_reminder")
        if (watering !== null) setWateringEnabled(JSON.parse(watering))
        if (fertilizer !== null) setFertilizerEnabled(JSON.parse(fertilizer))
      } catch (e) {
        console.log("Error loading notification settings", e)
      }
    }
    loadSettings()
  }, [])

  // Save settings
  const toggleSetting = async (key: string, value: boolean) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      Alert.alert("Saved!", `${key.replace("_", " ")} updated.`)
    } catch (e) {
      console.log("Error saving setting", e)
    }
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-green-700 mb-6">
        Notifications
      </Text>

      {/* Watering Reminder */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg">Watering Reminders</Text>
        <Switch
          value={wateringEnabled}
          onValueChange={(val) => {
            setWateringEnabled(val)
            toggleSetting("watering_reminder", val)
          }}
        />
      </View>

      {/* Fertilizer Reminder */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg">Fertilizer Reminders</Text>
        <Switch
          value={fertilizerEnabled}
          onValueChange={(val) => {
            setFertilizerEnabled(val)
            toggleSetting("fertilizer_reminder", val)
          }}
        />
      </View>
    </View>
  )
}

export default NotificationsScreen

