import { View, Text } from "react-native"

const AboutScreen = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-green-700 mb-4">About</Text>
      <Text className="text-base text-gray-700">
        Plant Care Reminder App v1.0.0{"\n"}
        Developed by You 🌿{"\n"}
        © 2025 All rights reserved.
      </Text>
    </View>
  )
}

export default AboutScreen
