import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView
} from "react-native"
import React from "react"
import { useRouter } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"

const mockPlants = [
  {
    id: "1",
    name: "Peace Lily",
    type: "Indoor",
    photoUrl: "https://example.com/peace-lily.jpg",
    nextWatering: "Tomorrow"
  },
  {
    id: "2",
    name: "Aloe Vera",
    type: "Medicinal",
    photoUrl: "https://example.com/aloe-vera.jpg",
    nextWatering: "In 2 days"
  }
]

const Home = () => {
  const router = useRouter()

  return (
  <ImageBackground
    source={require("../../assets/images/plant-bg.jpg")}
    resizeMode="cover"
    style={{ flex: 2, width: "100%", height: "100%" }}
  >
    <ScrollView className="flex-1 px-6 pt-16 justify-cennter bg-white/40">
      <Text className="text-3xl  font-bold text-green-700 mb-2">
        🌱 Welcome Back!
      </Text>
      <Text className="text-lg text-gray-600 mb-6">
        Here's how your plants are doing today fine.
      </Text>

      <View className="mb-6">
        <Text className="text-xl font-semibold text-green-800 mb-2">
          🔔 Upcoming Watering
        </Text>
        {mockPlants.map((plant) => (
          <View
            key={plant.id}
            className="bg-white rounded-xl shadow-sm p-4 mb-3 border border-green-200"
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: plant.photoUrl }}
                className="w-16 h-16 rounded-lg mr-4"
              />
              <View>
                <Text className="text-lg font-bold text-green-700">
                  {plant.name}
                </Text>
                <Text className="text-sm text-gray-500">
                  Water {plant.nextWatering}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        className="bg-green-600 rounded-full py-4 flex-row items-center justify-center shadow-md"
        onPress={() => router.push("/plant")}
      >
        <MaterialIcons name="add-circle-outline" size={24} color="#fff" />
        <Text className="text-white text-lg font-semibold ml-2">
          Add New Plant
        </Text>
      </TouchableOpacity>
    </ScrollView>
  </ImageBackground>
)

}

export default Home
