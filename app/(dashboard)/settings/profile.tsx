import { View, Text, TextInput, TouchableOpacity } from "react-native"

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-green-700 mb-4">Edit Profile</Text>

      <TextInput placeholder="Name" className="border p-2 mb-4 rounded" />
      <TextInput placeholder="Email" className="border p-2 mb-4 rounded" />

      <TouchableOpacity className="bg-green-600 p-3 rounded">
        <Text className="text-white text-center">Save Changes</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen
