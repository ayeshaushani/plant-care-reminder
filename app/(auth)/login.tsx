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
import { login } from "@/services/authService"

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPasword] = useState<string>("")
  const [isLodingReg, setIsLoadingReg] = useState<boolean>(false)

  const handleLogin = async () => {
    if (isLodingReg) return
    setIsLoadingReg(true)
    await login(email, password)
      .then((res) => {
        console.log(res)
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        Alert.alert("Login failed", "Something went wrong")
      })
      .finally(() => {
        setIsLoadingReg(false)
      })
  }

  return (
    <ImageBackground
      source={require("../../assets/images/log.jpg")} // ✅ Ensure this image exists
      resizeMode="cover"
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      <View className="flex-1 justify-center px-6">
        <View className="bg-white/50 rounded-3xl shadow-xl p-6 border border-green-200">
          <Text className="text-4xl font-bold text-green-700 mb-4 text-center tracking-wide">
            🌿 Welcome Back
          </Text>
          <Text className="text-center text-gray-600 mb-6">
            Log in to care for your plants and stay on schedule.
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
            onPress={handleLogin}
          >
            {isLodingReg ? (
              <ActivityIndicator color="#ffffffff" size="large" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">
                Login
              </Text>
            )}
          </TouchableOpacity>

          <Pressable onPress={() => router.push("/register")} className="mt-6">
            <Text className="text-center text-green-700 text-base">
              Don't have an account?{" "}
              <Text className="underline font-medium">Register</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Login
