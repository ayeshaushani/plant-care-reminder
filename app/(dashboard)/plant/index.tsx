import { useLoader } from "@/context/LoaderContext"
import { deletePlant, getAllPlants, plantsRef } from "@/services/plantService"
import { Plant } from "@/types/plant"
import { MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { getNextWateringDate } from "../../../services/waterReminderService" // 🔑 use helper

const PlantScreen = () => {
  const [plants, setPlants] = useState<Plant[]>([])
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()

  useEffect(() => {
    showLoader()
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
        hideLoader()
      }
    )

    return () => unsubscribe()
  }, [])

  const handleDelete = (id: string) => {
    Alert.alert("Delete", "Are you sure you want to delete this plant?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            showLoader()
            console.log("Deleting from Firestore:", id)
            await deletePlant(id)
            console.log("Deleted successfully:", id)
          } catch (err) {
            console.error("Error deleting plant:", err)
            Alert.alert("Error", "Failed to delete plant")
          } finally {
            hideLoader()
          }
        },
      },
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

        <ScrollView className="mt-4 mb-20">
          {plants.map((plant) => {
            const lastWatered = plant.lastWatered
              ? new Date(plant.lastWatered).toLocaleDateString()
              : "Not watered yet"

            const nextWatering = getNextWateringDate(plant)
              ? getNextWateringDate(plant)!.toLocaleDateString()
              : "N/A"

            return (
              <View
                key={plant.id}
                className="bg-green-100 p-4 mb-3 rounded-lg mx-4 border border-green-300"
              >
                <View className="flex-row items-center mb-2">
                  <Image
                    source={{
                      uri:
                        plant.photoUrl?.trim() ||
                        "https://via.placeholder.com/64x64.png?text=Plant",
                    }}
                    className="w-16 h-16 rounded-lg mr-4"
                    resizeMode="cover"
                    onError={() =>
                      console.log(`Image failed to load for ${plant.name}`)
                    }
                  />
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
                    <Text className="text-sm text-blue-700">
                      Last watered: {lastWatered}
                    </Text>
                    <Text className="text-sm text-red-700">
                      Next watering: {nextWatering}
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
            )
          })}
        </ScrollView>

        {/* Floating Add Button */}
        <View className="absolute bottom-6 right-6 z-50">
          <TouchableOpacity
            className="bg-green-600 rounded-full p-4 shadow-lg elevation-8"
            onPress={() => router.push("/plant/new")}
            activeOpacity={0.7}
          >
            <MaterialIcons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default PlantScreen





// import { useLoader } from "@/context/LoaderContext"
// import { deletePlant, getAllPlants, plantsRef } from "@/services/plantService"
// import { Plant } from "@/types/plant"
// import { MaterialIcons } from "@expo/vector-icons"
// import { useRouter } from "expo-router"
// import { onSnapshot } from "firebase/firestore"
// import { useEffect, useState } from "react"
// import {
//   Alert,
//   Image,
//   ImageBackground,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native"

// const PlantScreen = () => {
//   const [plants, setPlants] = useState<Plant[]>([])
//   const router = useRouter()
//   const { showLoader, hideLoader } = useLoader()

//   useEffect(() => {
//     showLoader()
//     const unsubscribe = onSnapshot(
//       plantsRef,
//       (snapshot) => {
//         const allPlants = snapshot.docs.map(
//           (d) => ({ id: d.id, ...d.data() }) as Plant
//         )
//         setPlants(allPlants)
//         hideLoader()
//       },
//       (err) => {
//         console.log("Error listening to plants:", err)
//         hideLoader()
//       }
//     )

//     return () => unsubscribe()
//   }, [])

//   const handleDelete = (id: string) => {
//   Alert.alert("Delete", "Are you sure you want to delete this plant?", [
//     { text: "Cancel", style: "cancel" },
//     {
//       text: "Delete",
//       style: "destructive",
//       onPress: async () => {
//         try {
//           showLoader();
//           console.log("Deleting from Firestore:", id);
//           await deletePlant(id);
//           console.log("Deleted successfully:", id);
//         } catch (err) {
//           console.error("Error deleting plant:", err);
//           Alert.alert("Error", "Failed to delete plant");
//         } finally {
//           hideLoader();
//         }
//       }
//     }
//   ]);
// };


//   return (
//     <ImageBackground
//       source={require("../../../assets/images/plant-home.jpg")}
//       resizeMode="cover"
//       style={{ flex: 1, width: "100%", height: "100%" }}
//     >
//       <View className="flex-1 w-full bg-white/50">
//         <Text className="text-4xl text-green-700 font-bold px-4 pt-4">
//           My Plants
//         </Text>

//         <ScrollView className="mt-4 mb-20">
//           {plants.map((plant) => (
//             <View
//               key={plant.id}
//               className="bg-green-100 p-4 mb-3 rounded-lg mx-4 border border-green-300"
//             >
//               <View className="flex-row items-center mb-2">
//                 <Image
//                   source={{
//                     uri:
//                       plant.photoUrl?.trim() ||
//                       "https://via.placeholder.com/64x64.png?text=Plant"
//                   }}
//                   className="w-16 h-16 rounded-lg mr-4"
//                   resizeMode="cover"
//                   onError={() =>
//                     console.log(`Image failed to load for ${plant.name}`)
//                   }
//                 />
//                 <View>
//                   <Text className="text-lg font-semibold text-green-800">
//                     {plant.name}
//                   </Text>
//                   <Text className="text-sm text-gray-700">
//                     Type: {plant.type}
//                   </Text>
//                   <Text className="text-sm text-gray-700">
//                     Water every {plant.wateringFrequency} days
//                   </Text>
//                 </View>
//               </View>

//               <View className="flex-row mt-2">
//                 <TouchableOpacity
//                   className="bg-yellow-300 px-3 py-1 rounded"
//                   onPress={() => router.push(`/plant/${plant.id}`)}
//                 >
//                   <Text>Edit</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   className="bg-red-500 px-3 py-1 rounded ml-3"
//                   onPress={() => {
//                     if (plant.id) handleDelete(plant.id)
//                   }}
//                 >
//                   <Text>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </ScrollView>

//         {/* Floating Add Button */}
//         <View className="absolute bottom-6 right-6 z-50">
//           <TouchableOpacity
//             className="bg-green-600 rounded-full p-4 shadow-lg elevation-8"
//             onPress={() => router.push("/plant/new")}
//             activeOpacity={0.7}
//           >
//             <MaterialIcons name="add" size={28} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   )
// }

// export default PlantScreen

