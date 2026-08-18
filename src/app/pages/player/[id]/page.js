"use client";

import styles from "./page.module.css";
import SideBar from "../../../components/sidebar/page";
import SearchBar from "../../../components/search/page";
import AudioPlayer from "../../../components/audio/page";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { LuLoaderCircle } from "react-icons/lu";

export default function Player() {
    const [player, setPlayer] = useState([]);
    const {id} = useParams();
    const [loading, setLoading] = useState(true);


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
        <SideBar />
        <SearchBar />
        {loading ? (
            <div className={styles["player__loading--wrapper"]}>
            <LuLoaderCircle className={styles.player__loading} />
            </div>
        ) : (
        player.map((player, index) => (
        <div className={styles.book__summary} key={index}>
            <div className={styles["book__summary--title"]}>
                {player.title}
            </div>
            <div className={styles["book__summary--text"]}>
                {player.summary}
            </div>
        </div>
        ))
    )}
        <AudioPlayer />
        </>
    )
}