"use client";

import styles from "./page.module.css";
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from 'react';
import { LuClock3 } from "react-icons/lu";
import axios from 'axios';
import { HiMiniXMark } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSidebar } from '../../SidebarContext';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] = useState([]);
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [durations, setDurations] = useState({});
    const timeoutRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const { toggleSidebar } = useSidebar();

     const handleMetadata = (id, e) => {
        const durationInSeconds = e.currentTarget.duration;
        setDurations((prev) => ({...prev, [id]: durationInSeconds }));
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
            setDebouncedTerm(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm) {
            console.log('Api call made for:', debouncedTerm);
            axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${debouncedTerm}`)
            .then((response) => {
                setSearch(response.data)
                setLoading(false);
            });
        }
    }, [debouncedTerm])

    useEffect(() => {
        if(timeoutRef.current) {
            setLoading(true);
            clearTimeout(timeoutRef.current);
        }
    })


    return (
        <div className={styles.search__background}>
            <div className={styles.search__row}>
                <div className={styles.search__spacing}></div>
                <div className={styles.search__content}>
                    <div className={styles.search}>
                        <div className={styles.search__inputWrapper}>
                            <input
                            className={styles.search__input}
                            placeholder="Search for books"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            >
                            </input>
                            <div className={styles.search__icon}>
                                {debouncedTerm ? (
                                <HiMiniXMark className={`${styles.search__symbol} ${styles.clear__symbol}`} onClick={() => { {setDebouncedTerm('')} {setSearchTerm('')} }} />
                                ) : (
                                <IoSearchSharp className={styles.search__symbol} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.sidebar__toggle}>
                        <RxHamburgerMenu className={styles["sidebar__toggle--btn"]} onClick={toggleSidebar} />
                    </div>
                </div>
            {debouncedTerm ? (
                search.length === 0 ? (
                    <div className={styles["search__books--wrapper"]}>No book found</div>
                ) : (
                <div className={styles["search__books--wrapper"]}>
              {loading ? (
                <>
                <div className={styles['search__books--link-skeleton']}></div>
                <div className={styles['search__books--link-skeleton']}></div>
                <div className={styles['search__books--link-skeleton']}></div>
                <div className={styles['search__books--link-skeleton']}></div>
                <div className={styles['search__books--link-skeleton']}></div>
                </>
              ) : (
                search.map((search, index) => (
                    <a className={styles["search__books--link"]} key={index} href={`/pages/book/${search.id}`}>
                        <audio src={search.audioLink} preload="metadata" onLoadedMetadata={(e) => handleMetadata(search.id, e)} />
                        <figure className={styles["book__image--wrapper"]}>
                            <img className={styles["book__image"]} src={search.imageLink}></img>
                        </figure>
                        <div className={styles.search__book}>
                            <div className={styles["search__book--title"]}>{search.title}</div>
                            <div className={styles["search__book--author"]}>{search.author}</div>
                            <div className={styles["search__book--duration"]}>
                                <div className={styles["search__book--details"]}>
                                    <div className={styles["search__book--details-icon"]}>
                                        <LuClock3 className={styles["search__book--details-icon-img"]} />
                                    </div>
                                    <div className={styles["search__book--details-text"]}>{formatTime(durations[search.id])}</div>
                                </div>
                            </div>
                        </div>
                    </a>
                )
                ))}
                </div>
                )
            ) : (
                <></>
            )}
            </div>
        </div>
)
}