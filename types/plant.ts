export interface Plant {
  id?: string; // Optional: Firestore document ID
  name: string; // Plant name
  type: string; // Plant type (e.g., Indoor, Outdoor)
  photoUrl?: string; // Optional: Firebase Storage image URL
  wateringFrequency: number; // In days
  lastWatered?: string; // Optional: ISO date string
  userId?: string; // Optional: Firebase Auth user ID
}
