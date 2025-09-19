import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { createPlant, getPlantById, updatePlant } from "@/services/plantService"
import { useLoader } from "@/context/LoaderContext"
import { useAuth } from "@/context/AuthContext"

const PlantFormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const isNew = !id || id === "new"   

  const [name, setName] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [wateringFrequency, setWateringFrequency] = useState<string>("")

  const router = useRouter()  
  const { hideLoader, showLoader } = useLoader()
  const { user } = useAuth()
  

  useEffect(() => {
    const load = async () => {     
      if (!isNew && id) {
        try {
          showLoader()
          const plant = await getPlantById(id)
          if (plant) {
            setName(plant.name)
            setType(plant.type)
            setWateringFrequency(String(plant.wateringFrequency))
          }
        } finally {
          hideLoader()
        }
      }
    }
    load()
  }, [id])     //OWW

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
      const plantData = {
        name,
        type,
        wateringFrequency: frequency,
        userId: user?.uid
      }

      if (isNew) {
        await createPlant(plantData)
      } else {
        await updatePlant(id!, plantData)
      }

      router.back()
    } catch (err) {
      console.error(`Error ${isNew ? "saving" : "updating"} plant`, err)
      Alert.alert("Error", `Failed to ${isNew ? "save" : "update"} plant`)
    } finally {
      hideLoader()
    }
  }

  return (
    <View className="flex-1 w-full p-5">
      <Text className="text-2xl font-bold text-green-700 mb-4">
        {isNew ? "Add Plant" : "Edit Plant"}
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

      <TouchableOpacity
        className="bg-green-600 rounded-md px-6 py-3 my-4"
        onPress={handleSubmit}
      >
        <Text className="text-xl text-white text-center">
          {isNew ? "Add Plant" : "Update Plant"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PlantFormScreen
