// services/waterReminderService.ts
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { Plant } from "@/types/plant";
import { updatePlant } from "@/services/plantService";

/** 1️⃣ Setup notification channel & permissions */
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for notifications!");
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

/** 2️⃣ Helper: calculate next watering date */
export function getNextWateringDate(plant: Plant): Date | null {
  if (!plant.lastWatered) return null;
  const lastWatered = new Date(plant.lastWatered);
  const nextDate = new Date(lastWatered);
  nextDate.setDate(nextDate.getDate() + plant.wateringFrequency);
  return nextDate;
}

/** 3️⃣ Schedule a single watering reminder */
export async function scheduleWateringReminder(plant: Plant) {
  const nextDate = getNextWateringDate(plant);
  if (!nextDate || nextDate <= new Date()) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🌱 Water Reminder",
      body: `Time to water ${plant.name}!`,
      sound: true,
    },
    trigger: { date: nextDate }, // ✅ Correct for Expo
  });
}

/** 4️⃣ Mark plant as watered and schedule next reminder */
export async function markPlantWatered(plant: Plant) {
  const now = new Date();
  const updatedPlant: Plant = { ...plant, lastWatered: now.toISOString() };

  // Update Firestore
  await updatePlant(plant.id!, updatedPlant);

  // Schedule next reminder
  await scheduleWateringReminder(updatedPlant);

  // Optional: immediate alert to user
  const nextDate = getNextWateringDate(updatedPlant);
  if (nextDate) {
    alert(`Next watering for ${plant.name} is on ${nextDate.toLocaleDateString()}`);
  }
}



// // services/waterReminderService.ts
// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";
// import { Plant } from "@/types/plant";
// import { updatePlant } from "@/services/plantService";

// /** 1️⃣ Setup notification channel & permissions */
// export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//     });
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;
//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== "granted") {
//     alert("Failed to get push token for notifications!");
//     return;
//   }

//   const token = (await Notifications.getExpoPushTokenAsync()).data;
//   return token;
// }

// /** Helper: calculate next watering date */
// export function getNextWateringDate(plant: Plant): Date | null {
//   if (!plant.lastWatered) return null;
//   const lastWatered = new Date(plant.lastWatered);
//   const nextDate = new Date(lastWatered);
//   nextDate.setDate(nextDate.getDate() + plant.wateringFrequency);
//   return nextDate;
// }

// /** 2️⃣ Schedule a single watering reminder */
// export async function scheduleWateringReminder(plant: Plant) {
//   const nextDate = getNextWateringDate(plant);
//   if (!nextDate || nextDate <= new Date()) return;

//   // Use trigger object with `date` property
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "🌱 Water Reminder",
//       body: `Time to water ${plant.name}!`,
//       sound: true,
//     },
//     trigger: { date: nextDate }, // ✅ Correct for Expo
//   });
// }

// /** 3️⃣ Schedule reminders for all plants */
// export async function scheduleAllReminders(plants: Plant[]) {
//   for (const plant of plants) {
//     await scheduleWateringReminder(plant);
//   }
// }

// /** 4️⃣ Mark a plant as watered (update DB + schedule next reminder) */
// export async function markPlantWatered(plant: Plant) {
//   const now = new Date();
//   const updatedPlant = { ...plant, lastWatered: now.toISOString() };
//   await updatePlant(plant.id!, updatedPlant);

//   // Schedule next reminder
//   await scheduleWateringReminder(updatedPlant);
// }
