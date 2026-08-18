"use client";

import styles from "./page.module.css";
import Sidebar from "../../components/sidebar/page";
import SearchBar from "../../components/search/page";
import { FaCirclePlay } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ForYou() {
    const [selected, setSelected] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [suggested, setSuggested] = useState([]);
    const [durations, setDurations] = useState({});
    const [loading, setLoading] = useState(true);

    const handleMetadata = (id, e) => {
        const durationInSeconds = e.currentTarget.duration;
        setDurations((prev) => ({...prev, [id]: durationInSeconds }));
    };

    const formatSelected = (selectedDuration) => {
        const minutes = Math.floor(selectedDuration / 60);
        const seconds = Math.floor(selectedDuration % 60);
        return `${minutes < 10 ? '0' : ''}${minutes} min ${seconds < 10 ? '0' : ''}${seconds} sec`;
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    useEffect(() => {
        axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected")
        .then((response) => {
            setTimeout(() => {
            setSelected(response.data);
            setLoading(false);
            }, 1000)
        })
        .catch((error) => {
            console.error("No data found:", error)
        })
    }, []);

    useEffect(() => {
        axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended")
        .then((response) => {
            setTimeout(() => {
            setRecommended(response.data);
            setLoading(false);
            }, 1000)
        })
        .catch((error) => {
            console.error("No data found:", error)
        })
    }, []);

     useEffect(() => {
        axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested")
        .then((response) => {
            setTimeout(() => {
            setSuggested(response.data);
            setLoading(false);
            }, 1000)
        })
        .catch((error) => {
            console.error("No data found:", error)
        })
    }, []);


    return (
        <>
        <Sidebar />
        <SearchBar />
        <div className={styles.container}>
            <div className={styles.main__container}>
                <div className={styles.main__row}>
                    <div className={styles["for-you__wrapper"]}>
                        <div className={styles["for-you__title"]}>Selected just for you</div>
                        {loading ? (
                        <div className={styles["book__selected--skeleton"]}></div>
                        ) : (
                        selected.map((selected) => (    
                        <a className={styles.book__selected} key={selected} href={`/pages/book/${selected.id}`}>
                            <div className={styles.book__selectedSubtitle}>{selected.subTitle}</div>
                            <div className={styles.book__selectedLine}></div>   
                            <div className={styles.book__selectedContent}>
                                <figure className={styles.book__imageWrapper} height={140} width={140} min-width={140}>
                                    <img className={styles.book__image} src={selected.imageLink} alt="Book Image"></img>
                                </figure>
                                <div className={styles.book__selectedText}>
                                    <div className={styles.book__selectedTitle}>{selected.title}</div>
                                    <div className={styles.book__selectedAuthor}>{selected.author}</div>
                                    <div className={styles.book__selectedDurationWrapper}>
                                        <div className={styles.book__icon}>
                                            <FaCirclePlay className={styles.book__iconPlay} />
                                            <audio src={selected.audioLink} preload="metadata" onLoadedMetadata={(e) => handleMetadata(selected.id, e)} />
                                            <div className={styles.book__selectedDuration}>{formatSelected(durations[selected.id])}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        )
                    ))}
                        <div className={styles["for-you__title"]}>Recommended For You</div>
                        <div className={styles["for-you__subtitle"]}>We think you'll like these</div>
                        <div className={styles["for-you__recommended--books"]}>

                        {loading ? (
                        <>
                        <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                         <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                         <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                         <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                         <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                        </>
                        ) : (
                        recommended.map((recommended, index) => (
                        <a className={styles["for-you__recommended--books-link"]} key={index} href={`/pages/book/${recommended.id}`}>
                            <div className={styles["book__pill--wrapper"]}>
                                {recommended.subscriptionRequired ? <div className={styles.book__pill}>Premium</div> : <div className={styles.white__space}></div>}
                            </div>
                                <figure className={styles["book__image--wrapper"]}>
                                    <img className={styles["book__image"]} src={recommended.imageLink} alt="book"></img>
                                </figure>
                                <div className={styles["recommended__book--title"]}>{recommended.title}</div>
                                <div className={styles["recommended__book--author"]}>{recommended.author}</div>
                                <div className={styles["recommended__book--subtitle"]}>{recommended.subTitle}</div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}>
                                            <LuClock3 />
                                        </div>
                                        <audio src={recommended.audioLink} preload="metadata" onLoadedMetadata={(e) => handleMetadata(recommended.id, e)} />
                                        <div className={styles["recommended__book--details-text"]}>{formatTime(durations[recommended.id])}</div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}>
                                            <FaRegStar />
                                        </div>
                                        <div className={styles["recommended__book--details-text"]}>{recommended.averageRating}</div>
                                    </div>
                                </div>
                            </a>
                        )
                        ))}
                        </div>
                        <div className={styles["for-you__title"]}>Suggested Books</div>
                        <div className={styles["for-you__subtitle"]}>Browse those books</div>
                        <div className={styles["for-you__recommended--books"]}>

                    {loading ? (
                        <>
                        <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                         <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                         <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                         <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                         <a className={styles["for-you__recommended--books-link"]}>
                                <figure className={styles["book__image--wrapper-skeleton"]}>
                                </figure>
                                <div className={styles["recommended__book--title-skeleton"]}></div>
                                <div className={styles["recommended__book--author-skeleton"]}></div>
                                <div className={styles["recommended__book--subtitle-skeleton"]}></div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details-skeleton"]}>
                                        <div className={styles["recommended__book--details-icon-skeleton"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}></div>
                                        <div className={styles["recommended__book--details-text"]}></div>
                                    </div>
                                </div>
                        </a>
                        </>
                        ) : (
                        suggested.map((suggested, index) => (
                            <a className={styles["for-you__recommended--books-link"]} key={index} href={`/pages/book/${suggested.id}`}>
                            <div className={styles["book__pill--wrapper"]}>
                                {suggested.subscriptionRequired ? <div className={styles.book__pill}>Premium</div> : <div className={styles.white__space}></div>}
                            </div>
                                <figure className={styles["book__image--wrapper"]}>
                                    <img className={styles["book__image"]} src={suggested.imageLink} alt="book"></img>
                                </figure>
                                <div className={styles["recommended__book--title"]}>{suggested.title}</div>
                                <div className={styles["recommended__book--author"]}>{suggested.author}</div>
                                <div className={styles["recommended__book--subtitle"]}>{suggested.subTitle}</div>
                                <div className={styles["recommended__book--details-wrapper"]}>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}>
                                            <LuClock3 />
                                        </div>
                                        <audio src={suggested.audioLink} preload="metadata" onLoadedMetadata={(e) => handleMetadata(suggested.id, e)} />
                                        <div className={styles["recommended__book--details-text"]}>{formatTime(durations[suggested.id])}</div>
                                    </div>
                                    <div className={styles["recommended__book--details"]}>
                                        <div className={styles["recommended__book--details-icon"]}>
                                            <FaRegStar />
                                        </div>
                                        <div className={styles["recommended__book--details-text"]}>{suggested.averageRating}</div>
                                    </div>
                                </div>
                            </a>
                        )
                        ))}
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};