import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  ImageBackground
} from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { register } from "@/services/authService"

const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPasword] = useState<string>("")
  const [isLodingReg, setIsLoadingReg] = useState<boolean>(false)

  const handleRegister = async () => {
    if (isLodingReg) return
    setIsLoadingReg(true)
    await register(email, password)
      .then((res) => {
        console.log(res)
        router.replace("/login") // ✅ Safe fallback instead of router.back()
      })
      .catch((err) => {
        console.error(err)
        Alert.alert("Registration Failed", "Something went wrong. Please try again.")
      })
      .finally(() => {
        setIsLoadingReg(false)
      })
  }

  return (
    <ImageBackground
      source={require("../../assets/images/plant-bg.jpg")} // ✅ Ensure this image exists
      resizeMode="cover"
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      <View className="flex-1 justify-center px-6">
        <View className="bg-white/90 rounded-3xl shadow-xl p-6 border border-green-200">
          <Text className="text-4xl font-bold text-green-700 mb-4 text-center tracking-wide">
            🌱 Join PlantCare
          </Text>
          <Text className="text-center text-gray-600 mb-6">
            Create your account and never forget to water your plants again.
          </Text>

          <TextInput
            placeholder="Email address"
            className="bg-green-50 border border-green-300 rounded-full px-5 py-4 mb-4 text-green-900 text-base"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            className="bg-green-50 border border-green-300 rounded-full px-5 py-4 mb-4 text-green-900 text-base"
            placeholderTextColor="#6B7280"
            secureTextEntry
            value={password}
            onChangeText={setPasword}
          />

          <TouchableOpacity
            className="bg-green-600 rounded-full py-4 mt-2 shadow-md"
            onPress={handleRegister}
          >
            {isLodingReg ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          <Pressable onPress={() => router.replace("/login")} className="mt-6">
            <Text className="text-center text-green-700 text-base">
              Already have an account?{" "}
              <Text className="underline font-medium">Login</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Register
