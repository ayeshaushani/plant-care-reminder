import { View, Text } from "react-native";
import React from "react";

const AboutScreen = () => {
  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold text-green-700 mb-6">About</Text>
      <Text className="text-base text-gray-800 leading-6">
        🌱 <Text className="font-semibold">Plant Care Reminder App</Text> v1.0.0{"\n\n"}
        Developed by <Text className="font-semibold">Ayesha Ushani</Text>{"\n\n"}
        © 2025 All rights reserved.
      </Text>
    </View>
  );
};

export default AboutScreen;
