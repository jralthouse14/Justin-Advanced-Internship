"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdTokenResult(true);
                setCurrentUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    role: token.claims.firebaseRole || 'basic'
                });
            } else {
                setCurrentUser(null);
            }
        });
        return () => unsubscribe();
    }, [])
    
    
        const handleLogout = async () => {
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Logout Error:", error);
            }
        };


        return (
            <AuthContext.Provider value={{ currentUser, signOut, handleLogout }}>
                {children}
            </AuthContext.Provider>
        );
}

export function useAuth() {
    return useContext(AuthContext);
}