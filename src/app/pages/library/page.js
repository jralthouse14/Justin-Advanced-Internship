"use client";

import styles from "./page.module.css";
import Sidebar from "../../components/sidebar/page";
import SearchBar from "../../components/search/page";
import { useState } from 'react';
import LoginModal from '../../components/login/page';
import Image from 'next/image';
import { useAuth } from '../../AuthContext';

export default function Library() {
    const [modalOpen, setModalOpen] = useState(false);
    const {currentUser} = useAuth();

    return (
        <>
        <Sidebar />
        <SearchBar />
    {currentUser ? (
        <div className={styles.container}>
        <div className={styles.library__container}>
            <div className={styles.library__row}>
                <div className={styles["for-you__title"]}>Saved Books</div>
                <div className={styles["for-you__subtitle"]}>0 items</div>
                <div className={styles["favorite__books--wrapper"]}>
                    <div className={styles["favorite__books--title"]}>Save your favorite books!</div>
                    <div className={styles["favorite__books--subtitle"]}>When you save a book, it will appear here.</div>
                </div>
                <div className={styles["for-you__title"]}>Finished</div>
                <div className={styles["for-you__subtitle"]}>0 items</div>
                <div className={styles["favorite__books--wrapper"]}>
                    <div className={styles["favorite__books--title"]}>Done and dusted!</div>
                    <div className={styles["favorite__books--subtitle"]}>When you finish a book, you can find it here later.</div>
                </div>   
                </div>
            </div>
        </div>
    ) : (
        <div className={styles.container}>
            <div className={styles.login__container}>
                <div className={styles.login__row}>
                    <div className={styles["login__reminder--wrapper"]}>
                        <Image className={styles["login__reminder--image"]} src="/login.png" alt="login image" width={1033} height={712} />
                    </div>
                    <div className={styles["login__reminder--text"]}>Log in to your account to see your library.</div>
                    <button className={`${styles.button} ${styles.submitButton}`} onClick={() => setModalOpen(true)}>Login</button>
                    <LoginModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                </div>
            </div>
        </div>
    )}
        </>
    )
}