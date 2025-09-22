import { View, Text, Switch, Alert, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';

const NotificationsScreen = () => {
  const [wateringEnabled, setWateringEnabled] = useState(false);
  const [fertilizerEnabled, setFertilizerEnabled] = useState(false);
  const [diseaseAlerts, setDiseaseAlerts] = useState(false);
  const [loading, setLoading] = useState(true);

  // Configure notification handler with proper typing
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }, []);

  // Load saved settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [watering, fertilizer, disease] = await Promise.all([
          AsyncStorage.getItem("watering_reminder"),
          AsyncStorage.getItem("fertilizer_reminder"),
          AsyncStorage.getItem("disease_alerts"),
        ]);
        
        if (watering !== null) setWateringEnabled(JSON.parse(watering));
        if (fertilizer !== null) setFertilizerEnabled(JSON.parse(fertilizer));
        if (disease !== null) setDiseaseAlerts(JSON.parse(disease));
      } catch (e) {
        console.log("Error loading notification settings", e);
        Alert.alert("Error", "Could not load notification settings");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Request notification permissions
  const requestPermissions = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permission Required", 
          "Please enable notifications in your device settings to receive reminders."
        );
        return false;
      }
      return true;
    } catch (error) {
      console.log("Error requesting notification permissions", error);
      Alert.alert("Error", "Failed to request notification permissions");
      return false;
    }
  };

  // Save settings
  const toggleSetting = async (key: string, value: boolean, type: string) => {
    try {
      // Request permissions if enabling notifications
      if (value) {
        const granted = await requestPermissions();
        if (!granted) {
          // Revert the UI switch if permission was denied
          if (key === "watering_reminder") setWateringEnabled(false);
          if (key === "fertilizer_reminder") setFertilizerEnabled(false);
          if (key === "disease_alerts") setDiseaseAlerts(false);
          return false;
        }
      }
      
      await AsyncStorage.setItem(key, JSON.stringify(value));
      
      Alert.alert("Settings Saved", `${type} reminders ${value ? 'enabled' : 'disabled'}`);
      return true;
    } catch (e) {
      console.log("Error saving setting", e);
      Alert.alert("Error", "Could not save notification settings");
      
      // Revert the UI switch on error
      if (key === "watering_reminder") setWateringEnabled(!value);
      if (key === "fertilizer_reminder") setFertilizerEnabled(!value);
      if (key === "disease_alerts") setDiseaseAlerts(!value);
      
      return false;
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-green-700">Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="p-5">
        <Text className="text-2xl font-bold text-green-700 mb-2">
          Notification Settings
        </Text>
        <Text className="text-gray-600 mb-6">
          Customize which reminders you'd like to receive
        </Text>

        {/* Watering Reminder */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 mr-4">
              <Text className="text-lg font-semibold mb-1">Watering Reminders</Text>
              <Text className="text-gray-600 text-sm">
                Get notified when your plants need watering
              </Text>
            </View>
            <Switch
              value={wateringEnabled}
              onValueChange={async (val) => {
                setWateringEnabled(val);
                await toggleSetting("watering_reminder", val, "Watering");
              }}
              trackColor={{ false: "#f0f0f0", true: "#a7f3d0" }}
              thumbColor={wateringEnabled ? "#10b981" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Fertilizer Reminder */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 mr-4">
              <Text className="text-lg font-semibold mb-1">Fertilizer Reminders</Text>
              <Text className="text-gray-600 text-sm">
                Receive alerts for plant fertilization schedules
              </Text>
            </View>
            <Switch
              value={fertilizerEnabled}
              onValueChange={async (val) => {
                setFertilizerEnabled(val);
                await toggleSetting("fertilizer_reminder", val, "Fertilizer");
              }}
              trackColor={{ false: "#f0f0f0", true: "#a7f3d0" }}
              thumbColor={fertilizerEnabled ? "#10b981" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Disease Alerts */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 mr-4">
              <Text className="text-lg font-semibold mb-1">Disease Alerts</Text>
              <Text className="text-gray-600 text-sm">
                Get warnings about common plant diseases in your area
              </Text>
            </View>
            <Switch
              value={diseaseAlerts}
              onValueChange={async (val) => {
                setDiseaseAlerts(val);
                await toggleSetting("disease_alerts", val, "Disease alert");
              }}
              trackColor={{ false: "#f0f0f0", true: "#a7f3d0" }}
              thumbColor={diseaseAlerts ? "#10b981" : "#f4f3f4"}
            />
          </View>
        </View>

        <View className="mt-6 p-4 bg-green-50 rounded-lg">
          <Text className="text-green-800 text-sm">
            💡 Notifications are scheduled based on your plants' specific needs and local weather conditions.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen;