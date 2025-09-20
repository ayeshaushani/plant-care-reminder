import { View, Text, Switch, StyleSheet } from "react-native"
import { useState } from "react"

const ThemeScreen = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>Theme</Text>

      <View style={styles.row}>
        <Text style={[styles.text, darkMode && styles.darkText]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  darkContainer: {
    backgroundColor: "#222",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#15803d", // green-700
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
})

export default ThemeScreen
