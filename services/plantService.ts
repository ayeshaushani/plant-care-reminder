import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore"
import { db } from "@/firebase"
import { Plant } from "@/types/plant"

// Firestore collection reference
export const plantsRef = collection(db, "plants")

// Get all plants for a specific user
export const getAllPlantsByUserId = async (userId: string) => {
  const q = query(plantsRef, where("userId", "==", userId))
  const querySnapshot = await getDocs(q)
  const plantList = querySnapshot.docs.map((plantRef) => ({
    id: plantRef.id,
    ...plantRef.data()
  })) as Plant[]
  return plantList
}

// Create a new plant
export const createPlant = async (plant: Plant) => {
  const docRef = await addDoc(plantsRef, plant)
  return docRef.id
}

// Get all plants (admin or global use)
export const getAllPlants = async () => {
  const snapshot = await getDocs(plantsRef)
  return snapshot.docs.map((plant) => ({
    id: plant.id,
    ...plant.data()
  })) as Plant[]
}

// Get a plant by ID
export const getPlantById = async (id: string) => {
  const plantDocRef = doc(db, "plants", id)
  const snapshot = await getDoc(plantDocRef)
  return snapshot.exists()
    ? ({
        id: snapshot.id,
        ...snapshot.data()
      } as Plant)
    : null
}

// Delete a plant
export const deletePlant = async (id: string) => {
  const plantDocRef = doc(db, "plants", id)
  return deleteDoc(plantDocRef)
}

// Update a plant
export const updatePlant = async (id: string, plant: Plant) => {
  const plantDocRef = doc(db, "plants", id)
  const { id: _id, ...plantData } = plant // remove id before update
  return updateDoc(plantDocRef, plantData)
}
