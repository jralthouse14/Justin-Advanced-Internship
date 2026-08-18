"use client";

import styles from "./page.module.css";
import { RiReplay10Fill } from "react-icons/ri";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { RiForward10Fill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function AudioPlayer() {
    const [player, setPlayer] = useState([]);
    const {id} = useParams();

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(true);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    }

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)
    }

    const rewind10 = () => {
        audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }

     const forward10 = () => {
        audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }

    const handleSeek = (e) => {
        const time = Number(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
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
            setPlayer([response.data])
            setLoading(false);
            }, 300)
        })
        .catch((error) => {
            console.error("No data found:", error);
        })
    }, [])

    return (
        <>
        {player.map((player, index) => (
        <div className={styles.audio__wrapper} key={index}>
            <audio
            ref={audioRef}
            src={player.audioLink}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            />  
        {loading ? (
            <div className={styles["audio__track--wrapper"]}>
                <figure className={styles["audio__track--image-mask"]}>
                    <figure className={styles["book__image--wrapper-skeleton"]}>
                        <img className={styles.book__image}></img>
                    </figure>
                </figure>
                <div className={styles["audio__track--details-wrapper"]}>
                    <div className={styles["audio__track--title"]}></div>
                    <div className={styles["audio__track--author"]}></div>
                </div>
            </div>
        ) : (
            <div className={styles["audio__track--wrapper"]}>
                <figure className={styles["audio__track--image-mask"]}>
                    <figure className={styles["book__image--wrapper"]}>
                        <img className={styles.book__image} src={player.imageLink} alt="book image"></img>
                    </figure>
                </figure>
                <div className={styles["audio__track--details-wrapper"]}>
                    <div className={styles["audio__track--title"]}>{player.title}</div>
                    <div className={styles["audio__track--author"]}>{player.author}</div>
                </div>
            </div>
        )}
            <div className={styles["audio__controls--wrapper"]}>
                <div className={styles.audio__controls}>
                    <button className={styles["audio__controls--btn"]} onClick={rewind10}>
                        <RiReplay10Fill className={styles["audio__controls--btn-img"]} />
                    </button>
                    <button className={styles["audio__controls--btn audio__controls--btn-play"]} onClick={togglePlay}>
                        {isPlaying ?
                        <FaPauseCircle className={`${styles["audio__controls--btn-img"]} ${styles["audio__controls--btn-play"]}`} />
                        :
                        <FaPlayCircle className={`${styles["audio__controls--btn-img"]} ${styles["audio__controls--btn-play"]}`} />
                        }
                    </button>
                    <button className={styles["audio__controls--btn"]} onClick={forward10}>
                        <RiForward10Fill className={styles["audio__controls--btn-img"]} />
                    </button>
                </div>
            </div>
            <div className={styles["audio__progress--wrapper"]}>
                <div className={styles.audio__time}>{formatTime(currentTime)}</div>
                <input
                type="range"
                className="audio__progress--bar"
                value={currentTime}
                onChange={handleSeek}
                min={0}
                max={duration || 0}
                />
                <div className={styles.audio__time}>{formatTime(duration)}</div>
            </div>
        </div>
        ))}
        </>
    )
}