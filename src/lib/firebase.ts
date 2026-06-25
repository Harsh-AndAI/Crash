import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "crashcover1121",
  appId: "1:506777283274:web:ba8888b4e0a56db1342233",
  apiKey: "AIzaSyBcJKhH4VXjAx_Crktz8EIndQPSxsbdUZI",
  authDomain: "crashcover1121.firebaseapp.com",
  storageBucket: "crashcover1121.firebasestorage.app",
  messagingSenderId: "506777283274",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
