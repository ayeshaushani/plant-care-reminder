import { View, Text, Switch, StyleSheet, ScrollView, Alert } from "react-native"
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from '@expo/vector-icons'

const ThemeScreen = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [systemTheme, setSystemTheme] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load saved theme settings
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        const [darkModeSetting, systemThemeSetting] = await Promise.all([
          AsyncStorage.getItem("dark_mode"),
          AsyncStorage.getItem("system_theme")
        ])
        
        if (darkModeSetting !== null) setDarkMode(JSON.parse(darkModeSetting))
        if (systemThemeSetting !== null) setSystemTheme(JSON.parse(systemThemeSetting))
      } catch (e) {
        console.log("Error loading theme settings", e)
        Alert.alert("Error", "Could not load theme settings")
      } finally {
        setLoading(false)
      }
    }
    loadThemeSettings()
  }, [])

  // Save theme settings
  const saveThemeSetting = async (key: string, value: boolean) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.log("Error saving theme setting", e)
      Alert.alert("Error", "Could not save theme setting")
    }
  }

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value)
    if (systemTheme) {
      setSystemTheme(false)
      saveThemeSetting("system_theme", false)
    }
    saveThemeSetting("dark_mode", value)
  }

  const handleSystemThemeToggle = (value: boolean) => {
    setSystemTheme(value)
    if (value) {
      setDarkMode(false)
      saveThemeSetting("dark_mode", false)
    }
    saveThemeSetting("system_theme", value)
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.title}>Loading theme settings...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Ionicons name="color-palette" size={28} color={darkMode ? "#10b981" : "#15803d"} />
        <Text style={[styles.title, darkMode && styles.darkText]}>Theme Settings</Text>
      </View>

      <Text style={[styles.subtitle, darkMode && styles.darkText]}>
        Customize your app's appearance
      </Text>

      {/* Dark Mode Option */}
      <View style={[styles.card, darkMode && styles.darkCard]}>
        <View style={styles.optionRow}>
          <View style={styles.optionInfo}>
            <Ionicons 
              name={darkMode ? "moon" : "moon-outline"} 
              size={24} 
              color={darkMode ? "#10b981" : "#666"} 
            />
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionTitle, darkMode && styles.darkText]}>Dark Mode</Text>
              <Text style={[styles.optionDescription, darkMode && styles.darkSubtext]}>
                Enable dark theme for better nighttime viewing
              </Text>
            </View>
          </View>
          <Switch 
            value={darkMode} 
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: "#f0f0f0", true: "#a7f3d0" }}
            thumbColor={darkMode ? "#10b981" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* System Theme Option */}
      <View style={[styles.card, darkMode && styles.darkCard]}>
        <View style={styles.optionRow}>
          <View style={styles.optionInfo}>
            <Ionicons 
              name="phone-portrait" 
              size={24} 
              color={darkMode ? "#10b981" : "#666"} 
            />
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionTitle, darkMode && styles.darkText]}>Use System Theme</Text>
              <Text style={[styles.optionDescription, darkMode && styles.darkSubtext]}>
                Follow your device's light/dark mode settings
              </Text>
            </View>
          </View>
          <Switch 
            value={systemTheme} 
            onValueChange={handleSystemThemeToggle}
            trackColor={{ false: "#f0f0f0", true: "#a7f3d0" }}
            thumbColor={systemTheme ? "#10b981" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Theme Preview */}
      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={[styles.optionTitle, darkMode && styles.darkText]}>Preview</Text>
        <View style={[styles.previewContainer, darkMode && styles.darkPreviewContainer]}>
          <View style={[styles.previewCard, darkMode && styles.darkPreviewCard]}>
            <Ionicons 
              name="leaf" 
              size={20} 
              color={darkMode ? "#10b981" : "#15803d"} 
            />
            <Text style={[styles.previewText, darkMode && styles.darkText]}>
              Plant Care App
            </Text>
          </View>
          <Text style={[styles.previewDescription, darkMode && styles.darkSubtext]}>
            Current theme: {darkMode ? "Dark" : systemTheme ? "System" : "Light"}
          </Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={[styles.infoCard, darkMode && styles.darkInfoCard]}>
        <Ionicons name="information-circle" size={20} color={darkMode ? "#93c5fd" : "#3b82f6"} />
        <Text style={[styles.infoText, darkMode && styles.darkSubtext]}>
          Theme changes will apply immediately across the app
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#15803d",
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  darkCard: {
    backgroundColor: "#2d2d2d",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
  },
  darkText: {
    color: "#fff",
  },
  darkSubtext: {
    color: "#ccc",
  },
  previewContainer: {
    marginTop: 12,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  darkPreviewContainer: {
    backgroundColor: "#333",
    borderColor: "#444",
  },
  previewCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f0fdf4",
    borderRadius: 8,
    marginBottom: 8,
  },
  darkPreviewCard: {
    backgroundColor: "#374151",
  },
  previewText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#15803d",
    marginLeft: 8,
  },
  previewDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  darkInfoCard: {
    backgroundColor: "#1e3a8a",
  },
  infoText: {
    fontSize: 14,
    color: "#3b82f6",
    marginLeft: 8,
    flex: 1,
  },
})

export default ThemeScreen