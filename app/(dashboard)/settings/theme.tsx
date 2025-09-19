import { View, Text, Switch } from "react-native"
import { useState } from "react"

const ThemeScreen = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-green-700 mb-4">Theme</Text>

      <View className="flex-row justify-between items-center">
        <Text className="text-lg">Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  )
}

export default ThemeScreen
