"use client";

import styles from "./page.module.css";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { PiHighlighterBold } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { useState } from 'react';
import LoginModal from "../../components/login/page";
import { useAuth } from '../../AuthContext';
import { useSidebar } from '../../SidebarContext';

export default function Sidebar() {
    const [modalOpen, setModalOpen] = useState(false);
    const {currentUser, handleLogout} = useAuth();
    const pathname = usePathname();
    const { isOpen, closeSidebar } = useSidebar();
    const sidebarClass = `${styles.sidebar} ${isOpen ? styles.open : ''}`;

    return (
        <div className={isOpen ? styles["overlay__sidebar"] : ""} onClick={closeSidebar}>
        <div className={sidebarClass}>
            <div className={styles.sidebarLogo}>
                <Image src="/logo.png" alt="logo" width={160} height={40} />
            </div>

            <div className={styles.sidebar__wrapper}>
                <div className={styles.sidebar__top}>

                    <a className={styles.sidebar__link} href="/pages/for-you">
                        <div className={pathname === '/pages/for-you' ? styles.sidebar__activeLink : ''}></div>
                        <div className={styles.sidebar__activeSpace}></div>
                        <div className={styles.sidebar__icon}>
                            <AiOutlineHome className={styles.sidebar__iconImg} />
                        </div>
                        <div className={styles.sidebar__linkText}>For you</div>
                    </a>

                    <a className={`${styles.sidebar__link} ${styles.sidebar__disabled}`}>
                        <div className={pathname === '' ? styles.sidebar__activeLink : ''}></div>
                        <div className={styles.sidebar__activeSpace}></div>
                        <div className={styles.sidebar__icon}>
                            <MdOutlineLocalLibrary className={styles.sidebar__iconImg} />
                        </div>
                        <div className={styles.sidebar__linkText}>My Library</div>
                    </a>

                    <a className={`${styles.sidebar__link} ${styles.sidebar__disabled}`} href="">
                        <div className={pathname === '' ? styles.sidebar__activeLink : ''}></div>
                        <div className={styles.sidebar__activeSpace}></div>
                        <div className={styles.sidebar__icon}>
                            <PiHighlighterBold className={styles.sidebar__iconImg} />
                        </div>
                        <div className={styles.sidebar__linkText}>Highlights</div>
                    </a>

                    <a className={`${styles.sidebar__link} ${styles.sidebar__disabled}`} href="">
                        <div className={pathname === '' ? styles.sidebar__activeLink : ''}></div>
                        <div className={styles.sidebar__activeSpace}></div>
                        <div className={styles.sidebar__icon}>
                            <IoSearchSharp className={styles.sidebar__iconImg} />
                        </div>
                        <div className={styles.sidebar__linkText}>Search</div>
                    </a>
                </div>
                <div className={styles.sidebar__bottom}>

                    <a className={styles.sidebar__link} href="/pages/settings">
                        <div className={pathname === '/pages/settings' ? styles.sidebar__activeLink : ''}></div>
                        <div className={styles.sidebar__activeSpace}></div>
                        <div className={styles.sidebar__icon}>
                            <IoSettingsOutline className={styles.sidebar__iconImg} />
                        </div>
                        <div className={styles.sidebar__linkText}>Settings</div>
                    </a>

                    <a className={`${styles.sidebar__link} ${styles.sidebar__disabled}`} href="">
                        <div className={pathname === '' ? styles.sidebar__activeLink : ''}></div>
                        <div className={styles.sidebar__activeSpace}></div>
                        <div className={styles.sidebar__icon}>
                            <FiHelpCircle className={styles.sidebar__iconImg} />
                        </div>
                        <div className={styles.sidebar__linkText}>Help & Support</div>
                    </a>
                {currentUser ? (
                    <a className={styles.sidebar__link} href="">
                        <div className={pathname === '' ? styles.sidebar__activeLink : ''}></div>
                        <div className={styles.sidebar__activeSpace}></div>
                        <div className={styles.sidebar__icon}>
                            <FiLogOut className={styles.sidebar__iconImg} />
                        </div>
                        <div className={styles.sidebar__linkText} onClick={handleLogout}>Logout</div>
                    </a>
                ) : (
                <>
                    <a className={styles.sidebar__link}
                    href=""
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setModalOpen(true);
                    }}
                    >
                        <div className={pathname === '' ? styles.sidebar__activeLink : ''}></div>
                        <div className={styles.sidebar__activeSpace}></div>
                        <div className={styles.sidebar__icon}>
                            <FiLogOut className={styles.sidebar__iconImg} />
                        </div>
                        <div className={styles.sidebar__linkText}>Login</div>
                    </a>
                <LoginModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                </>
                )}
                </div>
            </div>      
        </div>
        </div>
    )
}