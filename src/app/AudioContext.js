"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [duration, setDuration] = useState(0);
    const [currentSrc, setCurrentSrc] = useState(null);

    const loadAudioDuration = (src) => {
        if (!src) return;
        setCurrentSrc(src);
    }

    const audioObj = new Audio(src);
    audioObj.addEventListener('loadedmetadata', () => {
        setDuration(audioObj.duration);
    });

    return (
        <AudioContext.Provider value={{ duration, currentSrc, loadAudioDuration }}>
            {children}
        </AudioContext.Provider>
    )
};

export const useAudio = () => useContext(AudioContext);
