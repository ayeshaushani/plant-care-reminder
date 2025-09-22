## Plant Care Reminder App

This project is a mobile application developed using React Native with Expo and Firebase. 
It allows users to register, log in, add plants, and set reminders for plant care. 
User data and plant details are stored in Firebase Firestore and authentication is handled with Firebase Authentication.

## you tube link

https://youtu.be/tE2Tz8vfjYA?feature=shared


## Setup Instructions

# 1. Clone the repository
   git clone https://github.com/ayeshaushani/plant-care-reminder.git
   cd plant-care-reminder

# 2. Install dependencies
   npm install

# 3. Firebase setup
   - Go to Firebase Console and create a new project
   - Enable Authentication with Email/Password
   - Enable Firestore Database
   - Create a Firebase Web App and copy the Firebase configuration
   - Add this configuration into a file named firebaseConfig.js

   Example:

   import { initializeApp } from "firebase/app";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   export const app = initializeApp(firebaseConfig);

# 4. Make sure Expo CLI is installed
   npm install -g expo-cli

## Run Instructions

1. Start the Expo development server
   npx expo start

2. Open the Expo Go app on your mobile device and scan the QR code

3. The app will open and connect with Firebase
