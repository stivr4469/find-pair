import { useState, useEffect, useCallback } from 'react';

let currentUtterance = null;

const useSpeechSynthesis = () => {
    const [playbackState, setPlaybackState] = useState('idle'); // 'idle', 'playing', 'paused'

    const stopPlayback = useCallback(() => {
        if (speechSynthesis) {
            speechSynthesis.cancel();
        }
        if (currentUtterance) {
            currentUtterance.onstart = null;
            currentUtterance.onpause = null;
            currentUtterance.onresume = null;
            currentUtterance.onend = null;
            currentUtterance.onerror = null;
            currentUtterance = null;
        }
        setPlaybackState('idle');
    }, []);

    useEffect(() => {
        return () => {
            stopPlayback();
        };
    }, [stopPlayback]);

    const speak = useCallback((textToSpeak) => {
        if (!('speechSynthesis' in window)) {
            alert("Извините, ваш браузер не поддерживает синтез речи.");
            return;
        }

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }

        let cleanText = (textToSpeak || '')
            .replace(/<[^>]*>?/gm, '')
            .replace(/^\d+\.\s*/, '')
            .replace(/__+/g, ' ')
            .replace(/[→←↓↑]/g, '')
            .replace(/[^\w\s.,!?¿¡áéíóúñÁÉÍÓÚÑ-]/g, '')
            .trim();

        if (!cleanText) return;

        const newUtterance = new SpeechSynthesisUtterance(cleanText);
        const voices = window.speechSynthesis.getVoices();
        const spanishVoice = voices.find(v => v.lang === 'es-ES') || voices.find(v => v.lang.startsWith('es-'));

        newUtterance.voice = spanishVoice;
        newUtterance.lang = 'es-ES';
        newUtterance.rate = 0.9;

        newUtterance.onstart = () => {
            setPlaybackState('playing');
        };
        newUtterance.onpause = () => setPlaybackState('paused');
        newUtterance.onresume = () => setPlaybackState('playing');
        newUtterance.onend = () => {
            setPlaybackState('idle');
        };
        newUtterance.onerror = (e) => {
            console.error("Ошибка синтеза речи:", e.error);
            setPlaybackState('idle');
        };

        currentUtterance = newUtterance;
        speechSynthesis.speak(newUtterance);
    }, []);

    return { speak, playbackState, stopPlayback };
};

export default useSpeechSynthesis;
