import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow access to your photos to select a profile image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Success', 'Profile updated successfully!');
    }, 1500);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-5">
        <Text className="text-2xl font-bold text-green-700 mb-2">Edit Profile</Text>
        <Text className="text-gray-600 mb-6">Update your personal information</Text>

        {/* Profile Image */}
        <View className="items-center mb-6">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center border-2 border-green-200">
              {profileImage ? (
                <Image 
                  source={{ uri: profileImage }} 
                  className="w-full h-full rounded-full"
                />
              ) : (
                <Ionicons name="person" size={40} color="#10b981" />
              )}
            </View>
            <TouchableOpacity 
              onPress={pickImage}
              className="absolute bottom-0 right-0 bg-green-600 rounded-full p-2"
            >
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={pickImage} className="mt-2">
            <Text className="text-green-600 text-sm">Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Name Field */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Full Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              className="bg-white border border-gray-300 p-4 rounded-lg text-base"
              autoCapitalize="words"
            />
          </View>

          {/* Email Field */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Email Address <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-white border border-gray-300 p-4 rounded-lg text-base"
            />
          </View>

          {/* Phone Field */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Phone Number</Text>
            <TextInput
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              className="bg-white border border-gray-300 p-4 rounded-lg text-base"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            onPress={handleSave}
            disabled={isSaving}
            className={`bg-green-600 p-4 rounded-lg mt-2 ${isSaving ? 'opacity-70' : ''}`}
          >
            <Text className="text-white text-center font-semibold text-base">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity className="bg-gray-100 p-4 rounded-lg">
            <Text className="text-gray-600 text-center font-medium text-base">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Text */}
        <View className="mt-6 p-4 bg-blue-50 rounded-lg">
          <Text className="text-blue-800 text-sm">
            💡 Your profile information helps us personalize your plant care experience.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;