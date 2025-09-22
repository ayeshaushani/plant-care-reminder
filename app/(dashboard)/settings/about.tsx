import { View, Text, ScrollView } from "react-native";
import React from "react";

const AboutScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold text-green-700 mb-6">About</Text>
        
        <View className="bg-green-50 p-5 rounded-lg mb-6">
          <Text className="text-lg font-semibold text-green-800 mb-2">
            🌱 Plant Care Reminder App
          </Text>
          <Text className="text-gray-600">Version 1.0.0</Text>
        </View>
        
        <View className="mb-6">
          <Text className="text-base text-gray-800 leading-6 mb-4">
            Keep your plants thriving with timely reminders for watering, fertilizing, 
            and other care activities. Never forget your plant's needs again!
          </Text>
          
          <Text className="text-base text-gray-800 leading-6">
            Developed with ❤️ by <Text className="font-semibold text-green-700">Ayesha Ushani</Text>
          </Text>
        </View>
        
        <View className="border-t border-gray-200 pt-4">
          <Text className="text-sm text-gray-500">
            © 2025 Plant Care App. All rights reserved.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;