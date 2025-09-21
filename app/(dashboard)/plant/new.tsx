import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform
} from "react-native"
import { useRouter } from "expo-router"
import { createPlant } from "@/services/plantService"
import { useLoader } from "@/context/LoaderContext"
import { useAuth } from "@/context/AuthContext"
import { Plant } from "@/types/plant"
import DateTimePicker from "@react-native-community/datetimepicker"

const NewPlantScreen = () => {
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()
  const { user } = useAuth()

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [wateringFrequency, setWateringFrequency] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [lastWatered, setLastWatered] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Plant name is required")
      return
    }

    const frequency = parseInt(wateringFrequency)
    if (isNaN(frequency) || frequency <= 0) {
      Alert.alert("Validation", "Watering frequency must be a positive number")
      return
    }

    try {
      showLoader()

      const newPlant: Plant = {
        name,
        type,
        wateringFrequency: frequency,
        photoUrl: photoUrl.trim() || undefined,
        lastWatered: lastWatered.toISOString(),
        userId: user?.uid
      }

      await createPlant(newPlant)
      router.replace("/plant")
    } catch (err) {
      console.error("Error adding plant:", err)
      Alert.alert("Error", "Failed to add plant")
    } finally {
      hideLoader()
    }
  }

  return (
    <ScrollView className="flex-1 p-5 bg-green-50">
      <Text className="text-2xl font-bold text-green-700 mb-4">
        Add New Plant
      </Text>

      <TextInput
        placeholder="Plant Name"
        className="border border-green-300 p-3 my-2 rounded-md text-green-900"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Plant Type (e.g. Indoor, Succulent)"
        className="border border-green-300 p-3 my-2 rounded-md text-green-900"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        placeholder="Watering Frequency (in days)"
        className="border border-green-300 p-3 my-2 rounded-md text-green-900"
        keyboardType="numeric"
        value={wateringFrequency}
        onChangeText={setWateringFrequency}
      />
      <TextInput
        placeholder="Photo URL (optional)"
        className="border border-green-300 p-3 my-2 rounded-md text-green-900"
        value={photoUrl}
        onChangeText={setPhotoUrl}
      />

      {/* Last Watered Picker */}
      <View className="my-3">
        <Text className="text-gray-700 mb-1">Last Watered:</Text>
        <TouchableOpacity
          className="border border-green-300 p-3 rounded-md bg-white"
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{lastWatered.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={lastWatered}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, selectedDate) => {
              setShowDatePicker(Platform.OS === "ios") // keep open for iOS
              if (selectedDate) setLastWatered(selectedDate)
            }}
          />
        )}
      </View>

      <TouchableOpacity
        className="bg-green-600 rounded-md px-6 py-3 my-4"
        onPress={handleSubmit}
      >
        <Text className="text-xl text-white text-center">Save Plant</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default NewPlantScreen


// import React, { useState } from "react"
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ScrollView
// } from "react-native"
// import { useRouter } from "expo-router"
// import { createPlant } from "@/services/plantService"
// import { useLoader } from "@/context/LoaderContext"
// import { useAuth } from "@/context/AuthContext"

// const NewPlantScreen = () => {
//   const router = useRouter()
//   const { showLoader, hideLoader } = useLoader()
//   const { user } = useAuth()

//   const [name, setName] = useState("")
//   const [type, setType] = useState("")
//   const [wateringFrequency, setWateringFrequency] = useState("")
//   const [photoUrl, setPhotoUrl] = useState("")

//   const handleSubmit = async () => {
//     if (!name.trim()) {
//       Alert.alert("Validation", "Plant name is required")
//       return
//     }

//     const frequency = parseInt(wateringFrequency)
//     if (isNaN(frequency) || frequency <= 0) {
//       Alert.alert("Validation", "Watering frequency must be a positive number")
//       return
//     }

//     try {
//       showLoader()
//       await createPlant({
//         name,
//         type,
//         wateringFrequency: frequency,
//         photoUrl: photoUrl.trim() || undefined,
//         userId: user?.uid
//       })
//       router.replace("/plant")
//     } catch (err) {
//       console.error("Error adding plant:", err)
//       Alert.alert("Error", "Failed to add plant")
//     } finally {
//       hideLoader()
//     }
//   }

//   return (
//     <ScrollView className="flex-1 p-5 bg-green-50">
//       <Text className="text-2xl font-bold text-green-700 mb-4">Add New Plant</Text>

//       <TextInput
//         placeholder="Plant Name"
//         className="border border-green-300 p-3 my-2 rounded-md text-green-900"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         placeholder="Plant Type (e.g. Indoor, Succulent)"
//         className="border border-green-300 p-3 my-2 rounded-md text-green-900"
//         value={type}
//         onChangeText={setType}
//       />
//       <TextInput
//         placeholder="Watering Frequency (in days)"
//         className="border border-green-300 p-3 my-2 rounded-md text-green-900"
//         keyboardType="numeric"
//         value={wateringFrequency}
//         onChangeText={setWateringFrequency}
//       />
//       <TextInput
//         placeholder="Photo URL (optional)"
//         className="border border-green-300 p-3 my-2 rounded-md text-green-900"
//         value={photoUrl}
//         onChangeText={setPhotoUrl}
//       />

//       <TouchableOpacity
//         className="bg-green-600 rounded-md px-6 py-3 my-4"
//         onPress={handleSubmit}
//       >
//         <Text className="text-xl text-white text-center">Save Plant</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   )
// }

// export default NewPlantScreen
