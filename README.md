## Plant Care Reminder App

This project is a mobile application developed using React Native with Expo and Firebase. 
It allows users to register, log in, add plants, and set reminders for plant care. 
User data and plant details are stored in Firebase Firestore and authentication is handled with Firebase Authentication.

![1](https://github.com/user-attachments/assets/7dcd9d8a-c22b-47a9-95d7-0128c730fbeb)

![2](https://github.com/user-attachments/assets/85128b40-22e9-4d83-915e-194c7aa80af1)

![3](https://github.com/user-attachments/assets/4306d256-10df-4ae3-955f-09cf034a2b47)

![4](https://github.com/user-attachments/assets/4e0d078f-341c-4eb9-90d9-ef889d2d27e3)

![5](https://github.com/user-attachments/assets/3883f157-fd36-4818-9e03-327f9871054d)

![6](https://github.com/user-attachments/assets/f8dd319c-833b-4b46-8041-5ab59b790914)

![7](https://github.com/user-attachments/assets/0a2d52b1-b300-431c-a6b6-c328adf435f1)

![8](https://github.com/user-attachments/assets/5a34dc68-ea5b-4f75-9dcb-e1a0a9b5a156)

![9](https://github.com/user-attachments/assets/46d30a52-723e-408b-a5f8-44de3cd29484)

![10](https://github.com/user-attachments/assets/1a0a957b-5e95-4649-ac50-86426ad3ea0b)

![11](https://github.com/user-attachments/assets/20139e4a-6068-4202-920f-ca74044a1dfc)


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
