import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ImageBackground ,
  Alert,
  Image
} from "react-native"
import { useEffect, useState } from "react"
import { useRouter, useSegments } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { useLoader } from "@/context/LoaderContext"
import { deletePlant, getAllPlants, plantsRef } from "@/services/plantService"
import { Plant } from "@/types/plant"
import { onSnapshot } from "firebase/firestore"


const PlantScreen = () => {
  const [plants, setPlants] = useState<Plant[]>([])
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()

  const handleFetchData = async () => {
    try {
      showLoader()
      const data = await getAllPlants()
      console.log(data)
      setPlants(data)
    } catch (error) {
      console.log("Error fetching plants:", error)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      plantsRef,
      (snapshot) => {
        const allPlants = snapshot.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as Plant
        )
        setPlants(allPlants)
        hideLoader()
      },
      (err) => {
        console.log("Error listening to plants:", err)
      }
    )

    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    Alert.alert("Delete", "Are you sure you want to delete this plant?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            showLoader()
            await deletePlant(id)
            handleFetchData()
          } catch (err) {
            console.log("Error deleting plant", err)
          } finally {
            hideLoader()
          }
        }
      }
    ])
  }

 return (
  <ImageBackground
    source={require("../../../assets/images/plant-home.jpg")}
    resizeMode="cover"
    style={{ flex: 1, width: "100%", height: "100%" }}
  >
    <View className="flex-1 w-full bg-white/50">
      <Text className="text-4xl text-green-700 font-bold px-4 pt-4">
        My Plants
      </Text>

     <View className="absolute bottom-5 right-5">
  <Pressable
    className="bg-green-600 rounded-full p-5 shadow-lg"
    onPress={() => router.push('/plant/new')}  // ✅ correct path
  >
    <MaterialIcons name="add" size={28} color="#fff" />
  </Pressable>
</View>

      <ScrollView className="mt-4">       
        {plants.map((plant) => (
          <View
            key={plant.id}
            className="bg-green-100 p-4 mb-3 rounded-lg mx-4 border border-green-300"
          >
            <View className="flex-row items-center mb-2">
              {plant.photoUrl && (
                <Image
                  source={{ uri: plant.photoUrl }}
                  className="w-16 h-16 rounded-lg mr-4"
                />
              )}
              <View>
                <Text className="text-lg font-semibold text-green-800">
                  {plant.name}
                </Text>
                <Text className="text-sm text-gray-700">
                  Type: {plant.type}
                </Text>
                <Text className="text-sm text-gray-700">
                  Water every {plant.wateringFrequency} days
                </Text>
              </View>
            </View>

            <View className="flex-row mt-2">
              <TouchableOpacity
                className="bg-yellow-300 px-3 py-1 rounded"
                onPress={() => router.push(`/plant/${plant.id}`)}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-3 py-1 rounded ml-3"
                onPress={() => {
                  if (plant.id) handleDelete(plant.id)
                }}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  </ImageBackground>
)

}

export default PlantScreen
