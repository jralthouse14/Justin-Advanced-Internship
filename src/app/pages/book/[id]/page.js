"use client";

import styles from "./page.module.css";
import SearchBar from "../../../components/search/page";
import Sidebar from "../../../components/sidebar/page";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TbMicrophone } from "react-icons/tb";
import { TbBulb } from "react-icons/tb";
import { AiOutlineRead } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function Book() {
    const [book, setBook] = useState([]);
    const [tags, setTags] = useState([]);
    const {id} = useParams();
    const [durations, setDurations] = useState({});
    const [loading, setLoading] = useState(true);

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
        axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
        .then((response) => {
            setTimeout(() => {
            setBook([response.data])
            setTags([response.data.tags])
            setLoading(false);
            }, 1000)
        })
        .catch((error) => {
            console.error("No data found:", error);
        })
    }, [book, tags])

    return (
    <>
    <Sidebar />
    <SearchBar />
    <div className={styles.container__book}>
        <div className={styles.row__book}>
        {loading ? (
            <div className={styles["book__wrapper--loading"]}>     
                <div className={styles["book__wrapper--text"]}>
                    <div className={styles["book__title--skeleton"]}></div>
                    <div className={styles["book__author--skeleton"]}></div>
                    <div className={styles["book__subtitle--skeleton"]}></div>
                    <div className={styles.description}>
                        <div className={styles.description__wrapper}>
                            <div className={styles["description__info--skeleton"]}>
                                <div className={styles.description__icon}>
                                    <div className={styles["description__icon--img-skeleton"]}></div>
                                </div>
                                <div className={styles["description__rating--overall-skeleton"]}></div>
                                <div className={styles["description__rating--total-skeleton"]}></div>
                            </div>
                            <div className={styles["description__info--skeleton"]}>
                                <div className={styles.description__icon}>
                                    <div className={styles["description__icon--img-skeleton"]}></div>
                                </div>
                                <div className={styles["description__book--duration-skeleton"]}></div>
                            </div>
                            <div className={styles["description__info--skeleton"]}>
                                <div className={styles.description__icon}>
                                    <div className={styles["description__icon--img-skeleton"]}></div>
                                </div>
                                <div className={styles["description__book--type-skeleton"]}></div>
                            </div>
                            <div className={styles["description__info--skeleton"]}>
                                <div className={styles.description__icon}>
                                    <div className={styles["description__icon--img-skeleton"]}></div>
                                </div>
                                <div className={styles["description__book--key-ideas-skeleton"]}></div>
                            </div>
                        </div> 
                    </div>
                    <div className={styles["book__read--btn-wrapper"]}>
                        <button className={styles["book__read--btn-skeleton"]}></button>
                        <button className={styles["book__read--btn-skeleton"]}></button>
                    </div>
                    <h2 className={styles["book__description--header-skeleton"]}></h2>
                    <div className={styles["book__tag--wrapper"]}>
                        <div className={styles["book__tag--skeleton"]}></div>
                        <div className={styles["book__tag--skeleton"]}></div>
                        <div className={styles["book__tag--skeleton"]}></div>
                        <div className={styles["book__tag--skeleton"]}></div>
                        <div className={styles["book__tag--skeleton"]}></div>
                    </div>
                    <h2 className={styles["book__description--header-skeleton"]}></h2>
                    <div className={styles["book__description--detailed-skeleton"]}></div>
                    <div className={styles["book__description--detailed-skeleton"]}></div>
                    <div className={styles["book__description--detailed-skeleton"]}></div>
                    <div className={styles["book__description--detailed-skeleton"]}></div>
                    <div className={styles["book__description--detailed-skeleton"]}></div>
                </div>
                <div className={styles["book__image--wrapper"]}>
                    <figure className={styles["book__image--wrap"]}>
                        <div className={styles["book__image-skeleton"]}></div>
                    </figure>
                </div>
            </div>
        ) : (
        book.map((book, index) => (
            <div className={styles.book__wrapper} key={index}>
                <div className={styles["book__image--wrapper"]}>
                    <figure className={styles["book__image--wrap"]}>
                        <img className={styles.book__image} src={book.imageLink} alt="book image"></img>
                    </figure>
                </div>     
                <div className={styles["book__wrapper--text"]}>
                    <div className={styles.book__title}>{book.title} {book.subscriptionRequired ? "(Premium)" : <div></div>}</div>
                    <div className={styles.book__author}>{book.author}</div>
                    <div className={styles.book__subtitle}>{book.subTitle}</div>
                    <div className={styles.description}>
                        <div className={styles.description__wrapper}>
                            <div className={styles.description__info}>
                                <div className={styles.description__icon}>
                                    <FaRegStar className={styles["description__icon--img"]} />
                                </div>
                                <div className={styles["description__rating--overall"]}>{book.averageRating}</div>
                                <div className={styles["description__rating--total"]}>({book.totalRating})</div>
                            </div>
                            <div className={styles.description__info}>
                                <div className={styles.description__icon}>
                                    <AiOutlineClockCircle className={styles["description__icon--img"]} />
                                </div>
                                <audio src={book.audioLink} preload="metadata" onLoadedMetadata={(e) => handleMetadata(book.id, e)} />
                                <div className={styles["description__book--duration"]}>{formatTime(durations[book.id])}</div>
                            </div>
                            <div className={styles.description__info}>
                                <div className={styles.description__icon}>
                                    <TbMicrophone className={styles["description__icon--img"]} />
                                </div>
                                <div className={styles["description__book--type"]}>{book.type}</div>
                            </div>
                            <div className={styles.description__info}>
                                <div className={styles.description__icon}>
                                    <TbBulb className={styles["description__icon--img"]} />
                                </div>
                                <div className={styles["description__book--key-ideas"]}>{book.keyIdeas} Key ideas</div>
                            </div>
                        </div> 
                    </div>
                    <div className={styles["book__read--btn-wrapper"]}>
                        <button className={styles["book__read--btn"]} onClick={() => window.location.href = `/pages/player/${book.id}`}>
                            <div className={styles["book__read--icon"]}>
                                <AiOutlineRead className={styles["book__read--icon-img"]} />
                            </div>
                            <div className={styles["book__read--text"]}>Read</div>
                        </button>
                        <button className={styles["book__read--btn"]} onClick={() => window.location.href = `/pages/player/${book.id}`}>
                            <div className={styles["book__read--icon"]}>
                                <TbMicrophone className={styles["book__read--icon-img"]} />
                            </div>
                            <div className={styles["book__read--text"]}>Listen</div>
                        </button>
                    </div>
                    <h2 className={styles["book__description--header"]}>What's it about?</h2>
                    <div className={styles["book__tag--wrapper"]}>
                    {book.tags?.map((tag, index) => (
                        <div className={styles["book__tag"]} key={index}>{tag}</div>
                    ))}
                    </div>
                    <div className={styles["book__description--detailed"]}>
                        {book.bookDescription}
                    </div>
                    <h2 className={styles["book__description--header"]}>About the author</h2>
                    <div className={styles["book__description--detailed"]}>
                        {book.authorDescription}
                    </div>
                </div>
            </div>
        ))
    )}
        </div>
    </div>
    </>
    )
}