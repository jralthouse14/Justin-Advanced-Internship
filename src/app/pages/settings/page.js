"use client";

import styles from "./page.module.css"
import Sidebar from "../../components/sidebar/page"
import SearchBar from "../../components/search/page"
import { useState, useEffect } from 'react';
import LoginModal from '../../components/login/page';
import Image from 'next/image';
import { useAuth } from '../../AuthContext';
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, limit, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Settings() {
    const [modalOpen, setModalOpen] = useState(false);
    const {currentUser} = useAuth();
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState("Basic");

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
            setUserRole("Please log in to view subscription status");
            setLoading(false);
            return;
        }

        try {
            const subsRef = collection(db, "customers", user.uid, "checkout_sessions");

            const q = query(
                subsRef,
                where("status", "==", "complete"),
                limit(1)
            );

            const subSnapshot = await getDocs(q);

            if (subSnapshot.empty) {
                setUserRole("Basic");
                setLoading(false);
                return;
            }

            const sortedDocs = subSnapshot.docs.sort((a, b) => {
                const aTime = a.data().created?.toMillis?.() || a.data().created || 0;
                const bTime = b.data().created?.toMillis?.() || b.data().created || 0;
                return bTime - aTime;
            });

            const latestSub = sortedDocs[0].data();
            
            const productId = latestSub.metadata?.productId || 
                              latestSub.productId || 
                              latestSub.line_items?.[0]?.price?.product ||
                              latestSub.price?.product;

            if (!productId) {
                console.warn("Product ID field missing in database document structure:", latestSub);
                setUserRole("Basic");
                return;
            }

            const productRef = doc(db, "products", productId);
            const productSnap = await getDoc(productRef);

            if (productSnap.exists()) {
                setUserRole(productSnap.data().role || "Basic");
            } else {
                setUserRole("Basic");
            }

        } catch (error) {
            console.error("Error reading subscription:", error);
            setUserRole("Error reading subscription");
        } finally {
            setLoading(false);
        }
    });

    return () => unsubscribe();
}, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000)
        return () => clearTimeout(timer);
    })
    
    return (
        <>
        <Sidebar />
        <SearchBar />
    {currentUser ? (
        <div className={styles.container}>
            <div className={styles.settings__container}>
            {loading ? (
                <div className={styles.settings__row}>
                    <div className={styles.settings__title}>Settings</div>
                    <div className={styles.settings__content}>
                        <div className={styles["settings__subtitle--skeleton-plan"]}></div>
                        <div className={styles["settings__text--skeleton-plan"]}></div>
                    </div>
                    <div className={styles.settings__content}>
                        <div className={styles["settings__subtitle--skeleton-email"]}></div>
                        <div className={styles["settings__text--skeleton-email"]}></div>
                    </div>
                </div>
            ) : (
                <div className={styles.settings__row}>
                    <div className={styles.settings__title}>Settings</div>
                    <div className={styles.settings__content}>
                        <div className={styles.settings__subtitle}>Your Subscription plan</div>
                        <div className={styles.settings__text}>{userRole}</div>
                            <button className={`${styles.button} ${styles.submitButton} ${styles.upgradeButton}`} onClick={() => window.location.href = "/pages/sales"}>Upgrade to Premium</button>
                            <div></div>
                    </div>
                    <div className={styles.settings__content}>
                        <div className={styles.settings__subtitle}>Email</div>
                        <div className={styles.settings__text}>{currentUser.email}</div>
                    </div>
                </div>
            )}
            </div>
        </div>
    ) : (
        <div className={styles.container}>
            <div className={styles.login__container}>
                <div className={styles.login__row}>
                    <div className={styles["login__reminder--wrapper"]}>
                        <Image className={styles["login__reminder--image"]} src="/login.png" alt="login image" width={1033} height={712} />
                    </div>
                    <div className={styles["login__reminder--text"]}>Log in to your account to see your details.</div>
                    <button className={`${styles.button} ${styles.submitButton}`} onClick={() => setModalOpen(true)}>Login</button>
                    <LoginModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                </div>
            </div>
        </div>
    )}
        </>
    )
}