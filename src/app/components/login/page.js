"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import Image from 'next/image';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";


export default function LoginModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState('login');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/pages/for-you");
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/pages/for-you");
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    function showAlert() {
        alert("This feature is not enabled. Please sign in using a different method.")
    }

    return (
        <>
        <div className={styles.overlay} onClick={onClose}>
            {currentView === 'login' && (
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {error && <p className={styles.error__text}>{error}</p>}
                <h3 className={styles.loginTitle}>Log in to Summarist</h3>               
                <button className={`${styles.guestButton} ${styles.button}`}>
                    <div className={styles.guest}>
                        <div className={styles.guestImg}>
                            <figure>
                                <IoPersonCircleSharp className={styles.guestIcon} />
                            </figure>
                        </div>
                    <div className={styles.guestLogin} onClick={() => router.push("/pages/for-you")}>Login as a Guest</div>
                    </div>
                </button>
                <div className={styles.auth__separator}>
                    <span className={styles.auth__separatorText}>or</span>
                </div>
                <button className={`${styles.googleButton} ${styles.button}`} onClick={() => showAlert()}>
                    <div className={styles.guest}>
                        <div className={styles.guestImg}>
                            <figure>
                                <Image className={styles.googleIcon} src="/google.png" alt="google" width={36} height={36} />
                            </figure>
                        </div>
                    <div className={styles.guestLogin}>Login with Google</div>
                    </div>
                </button>
                <div className={styles.auth__separator}>
                    <span className={styles.auth__separatorText}>or</span>
                </div>
                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        {loading ? (
                            <figure className={styles["loading__login--wrapper"]}>
                                <LuLoaderCircle className={styles.loading__login} />
                            </figure>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <button className={styles.auth__newAccount} onClick={() => setCurrentView('signup')}>Don't have an account?</button>
            </div>
            )}
            {currentView === 'signup' && (
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {error && <p className={styles.error__text}>{error}</p>}
                <h3 className={styles.loginTitle}>Sign up to Summarist</h3>
                <button className={`${styles.googleButton} ${styles.button}`} onClick={() => showAlert()}>
                    <div className={styles.guest}>
                        <div className={styles.guestImg}>
                            <figure>
                                <Image className={styles.googleIcon} src="/google.png" alt="google" width={36} height={36} />
                            </figure>
                        </div>
                    <div className={styles.guestLogin}>Sign up with Google</div>
                    </div>
                </button>
                <div className={styles.auth__separator}>
                    <span className={styles.auth__separatorText}>or</span>
                </div>
                <form className={styles.form} onSubmit={handleSignUp}>
                    <div className={styles.inputGroup}>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            placeholder="Email Address"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        {loading ? (
                            <figure className={styles["loading__login--wrapper"]}>
                                <LuLoaderCircle className={styles.loading__login} />
                            </figure>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
                <button className={styles.auth__newAccount} onClick={()=> setCurrentView('login')}>Already have an account?</button>
            </div>
            )}
        </div>          
        </>
    )};