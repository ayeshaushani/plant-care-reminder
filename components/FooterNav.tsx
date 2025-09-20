import { View, Text, Pressable } from "react-native"
import React from "react"
import { useRouter, useSegments } from "expo-router"

const tabs = [
  { label: "Home", path: "/home" },
  { label: "Plant", path: "/plant" },
  { label: "Settings", path: "/settings" }
] as const

const FooterNav = () => {
  const router = useRouter()
  const segments = useSegments()

  // Only match top-level segment (not subroutes like settings/profile)
  const activeRoute = "/" + (segments.length > 0 ? segments[0] : "")

  return (
    <View className="flex-row justify-around border-gray-300 py-2 bg-white">
      {tabs.map((tab) => (
        <Pressable
          key={tab.path}
          className={`py-1 px-4 rounded-lg ${
            tab.path === activeRoute ? "bg-blue-600" : ""
          }`}
          onPress={() => router.push({ pathname: tab.path })}
        >
          <Text className="text-2xl text-gray-800">{tab.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export default FooterNav
