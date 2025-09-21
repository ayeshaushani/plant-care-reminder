import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

// Define TypeScript interfaces
interface Plant {
  id: string;
  name: string;
  type: string;
  photoUrl: string;
  nextWatering: string;
  health: PlantHealthStatus;
}

type PlantHealthStatus = "Excellent" | "Good" | "Needs Attention";

const mockPlants: Plant[] = [
  {
    id: "1",
    name: "Peace Lily",
    type: "Indoor",
    photoUrl: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=500",
    nextWatering: "Tomorrow",
    health: "Good"
  },
  {
    id: "2",
    name: "Aloe Vera",
    type: "Medicinal",
    photoUrl: "https://images.unsplash.com/photo-1525498128493-380d1990a112?w=500",
    nextWatering: "In 2 days",
    health: "Excellent"
  },
  {
    id: "3",
    name: "Snake Plant",
    type: "Indoor",
    photoUrl: "https://images.unsplash.com/photo-1585123388860-e287249b686c?w=500",
    nextWatering: "In 4 days",
    health: "Needs Attention"
  },
  {
    id: "4",
    name: "Fiddle Leaf Fig",
    type: "Indoor",
    photoUrl: "https://images.unsplash.com/photo-1593483316242-27b5c5d47c5b?w=500",
    nextWatering: "In 3 days",
    health: "Good"
  },
  {
    id: "5",
    name: "Monstera",
    type: "Indoor",
    photoUrl: "https://images.unsplash.com/photo-1525947088131-b701cd0f6dc3?w=500",
    nextWatering: "Today",
    health: "Excellent"
  }
];

const Home = () => {
  const router = useRouter();

  const getHealthColor = (health: PlantHealthStatus): string => {
    switch(health) {
      case "Excellent": return "#10B981";
      case "Good": return "#F59E0B";
      case "Needs Attention": return "#EF4444";
      default: return "#6B7280";
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000" }}
        resizeMode="cover"
        className="w-full h-72 overflow-hidden"
      >
        <View className="absolute inset-0 bg-black/20" />
        <View className="px-6 pt-16">
          <Text className="text-3xl font-bold text-white mb-2">
            Welcome Back! 🌿
          </Text>
          <Text className="text-lg text-white mb-6">
            Your plants are thriving today
          </Text>
        </View>
      </ImageBackground>

      <ScrollView 
        className="flex-1 px-6 -mt-10"
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">
              Upcoming Care
            </Text>
            <TouchableOpacity>
              <Text className="text-green-600">View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-4">
            {mockPlants.map((plant) => (
              <View
                key={plant.id}
                className="bg-white rounded-xl shadow-sm p-4 mr-4 w-64 border-l-4 border-green-500"
              >
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: plant.photoUrl }}
                    className="w-16 h-16 rounded-xl mr-4"
                  />
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800">
                      {plant.name}
                    </Text>
                    <Text className="text-sm text-gray-500 mb-1">
                      {plant.type}
                    </Text>
                    <View className="flex-row items-center">
                      <MaterialIcons name="opacity" size={16} color="#3B82F6" />
                      <Text className="text-sm text-blue-500 ml-1">
                        Water {plant.nextWatering}
                      </Text>
                    </View>
                    <View className="flex-row items-center mt-1">
                      <View 
                        className="w-2 h-2 rounded-full mr-1" 
                        style={{ backgroundColor: getHealthColor(plant.health) }}
                      />
                      <Text 
                        className="text-xs"
                        style={{ color: getHealthColor(plant.health) }}
                      >
                        {plant.health}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Quick Stats
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <View className="bg-green-100 p-3 rounded-full mb-2">
                <MaterialIcons name="opacity" size={24} color="#10B981" />
              </View>
              <Text className="text-gray-800 font-medium">5 Plants</Text>
              <Text className="text-gray-500 text-xs">To water soon</Text>
            </View>
            <View className="items-center">
              <View className="bg-amber-100 p-3 rounded-full mb-2">
                <MaterialIcons name="warning" size={24} color="#F59E0B" />
              </View>
              <Text className="text-gray-800 font-medium">1 Plant</Text>
              <Text className="text-gray-500 text-xs">Needs care</Text>
            </View>
            <View className="items-center">
              <View className="bg-blue-100 p-3 rounded-full mb-2">
                <MaterialIcons name="calendar-today" size={24} color="#3B82F6" />
              </View>
              <Text className="text-gray-800 font-medium">3 Tasks</Text>
              <Text className="text-gray-500 text-xs">This week</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Plant Care Tips
          </Text>
          <View className="space-y-3">
            <View className="flex-row items-start">
              <View className="bg-green-100 p-2 rounded-full mr-3">
                <MaterialIcons name="lightbulb" size={16} color="#10B981" />
              </View>
              <Text className="flex-1 text-gray-600">
                Most houseplants prefer indirect sunlight rather than direct sun.
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="bg-green-100 p-2 rounded-full mr-3">
                <MaterialIcons name="opacity" size={16} color="#3B82F6" />
              </View>
              <Text className="flex-1 text-gray-600">
                Check soil moisture before watering. Overwatering is a common mistake.
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="bg-green-100 p-2 rounded-full mr-3">
                <MaterialIcons name="air" size={16} color="#6B7280" />
              </View>
              <Text className="flex-1 text-gray-600">
                Plants benefit from good air circulation. Avoid placing them in closed spaces.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="bg-green-600 rounded-2xl py-5 flex-row items-center justify-center shadow-md mb-8"
          onPress={() => router.push("/plant")}
        >
          <MaterialIcons name="add-circle" size={24} color="#fff" />
          <Text className="text-white text-lg font-semibold ml-2">
            Add New Plant
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Home;


// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ImageBackground,
//   Image,
//   ScrollView
// } from "react-native"
// import React from "react"
// import { useRouter } from "expo-router"
// import { MaterialIcons } from "@expo/vector-icons"

// const mockPlants = [
//   {
//     id: "1",
//     name: "Peace Lily",
//     type: "Indoor",
//     photoUrl: "https://example.com/peace-lily.jpg",
//     nextWatering: "Tomorrow"
//   },
//   {
//     id: "2",
//     name: "Aloe Vera",
//     type: "Medicinal",
//     photoUrl: "https://example.com/aloe-vera.jpg",
//     nextWatering: "In 2 days"
//   }
// ]

// const Home = () => {
//   const router = useRouter()

//   return (
//   <ImageBackground
//     source={require("../../assets/images/plant-bg.jpg")}
//     resizeMode="cover"
//     style={{ flex: 2, width: "100%", height: "100%" }}
//   >
//     <ScrollView className="flex-1 px-6 pt-16 justify-cennter bg-white/40">
//       <Text className="text-3xl  font-bold text-green-700 mb-2">
//         🌱 Welcome Back!
//       </Text>
//       <Text className="text-lg text-gray-600 mb-6">
//         Here's how your plants are doing today fine.
//       </Text>

//       <View className="mb-6">
//         <Text className="text-xl font-semibold text-green-800 mb-2">
//           🔔 Upcoming Watering
//         </Text>
//         {mockPlants.map((plant) => (
//           <View
//             key={plant.id}
//             className="bg-white rounded-xl shadow-sm p-4 mb-3 border border-green-200"
//           >
//             <View className="flex-row items-center">
//               <Image
//                 source={{ uri: plant.photoUrl }}
//                 className="w-16 h-16 rounded-lg mr-4"
//               />
//               <View>
//                 <Text className="text-lg font-bold text-green-700">
//                   {plant.name}
//                 </Text>
//                 <Text className="text-sm text-gray-500">
//                   Water {plant.nextWatering}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         ))}
//       </View>

//       <TouchableOpacity
//         className="bg-green-600 rounded-full py-4 flex-row items-center justify-center shadow-md"
//         onPress={() => router.push("/plant")}
//       >
//         <MaterialIcons name="add-circle-outline" size={24} color="#fff" />
//         <Text className="text-white text-lg font-semibold ml-2">
//           Add New Plant
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   </ImageBackground>
// )

// }

// export default Home
