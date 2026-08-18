import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfQ5WJzy5HEg_yF7wQoFiviu6k2yVDv9U",
  authDomain: "justin-advanced-internsh-c6989.firebaseapp.com",
  projectId: "justin-advanced-internsh-c6989",
  storageBucket: "justin-advanced-internsh-c6989.firebasestorage.app",
  messagingSenderId: "1008941026877",
  appId: "1:1008941026877:web:609775f25e16cfed876454"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);