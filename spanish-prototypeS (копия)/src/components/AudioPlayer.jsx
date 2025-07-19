import React, { useState, useEffect, useCallback } from 'react';

// Глобальная переменная для хранения текущего объекта озвучивания.
let currentUtterance = null;

const AudioPlayer = ({ textToSpeak }) => {
    const [playbackState, setPlaybackState] = useState('idle'); // 'idle', 'playing', 'paused'

    // Функция для полной остановки и сброса состояния
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

    // При смене текста или размонтировании компонента останавливаем озвучку
    useEffect(() => {
        return () => {
            if (window.currentAudioPlayerId === textToSpeak) {
                speechSynthesis.cancel();
            }
        };
    }, [textToSpeak]);

    const handlePlayback = () => {
        if (!('speechSynthesis' in window)) {
            alert("Извините, ваш браузер не поддерживает синтез речи.");
            return;
        }

        // Останавливаем текущую озвучку, если она не относится к текущему тексту
        if (speechSynthesis.speaking && window.currentAudioPlayerId !== textToSpeak) {
            speechSynthesis.cancel();
        }

        if (playbackState === 'playing') {
            speechSynthesis.pause();
            setPlaybackState('paused');
            return;
        }

        if (playbackState === 'paused') {
            speechSynthesis.resume();
            setPlaybackState('playing');
            return;
        }

        // Очищаем текст от HTML-тегов, номеров упражнений, подчеркиваний и специальных символов
        let cleanText = (textToSpeak || '')
            .replace(/<[^>]*>?/gm, '') // Удаляем HTML-теги
            .replace(/^\d+\.\s*/, '') // Удаляем номера упражнений
            .replace(/__+/g, ' ') // Заменяем подчеркивания пробелами
            .replace(/[→←↓↑]/g, '') // Удаляем стрелки
            .replace(/[^\w\s.,!?¿¡áéíóúñÁÉÍÓÚÑ-]/g, '') // Удаляем прочие специальные символы
            .trim();

        if (!cleanText) return;

        const newUtterance = new SpeechSynthesisUtterance(cleanText);
        const voices = window.speechSynthesis.getVoices();
        const spanishVoice = voices.find(v => v.lang === 'es-ES') || voices.find(v => v.lang.startsWith('es-'));

        newUtterance.voice = spanishVoice;
        newUtterance.lang = 'es-ES';
        newUtterance.rate = 0.9;

        // Обработчики событий для синхронизации состояния
        newUtterance.onstart = () => {
            window.currentAudioPlayerId = textToSpeak;
            setPlaybackState('playing');
        };
        newUtterance.onpause = () => setPlaybackState('paused');
        newUtterance.onresume = () => setPlaybackState('playing');
        newUtterance.onend = () => {
            setPlaybackState('idle');
            window.currentAudioPlayerId = null;
        };
        newUtterance.onerror = (e) => {
            console.error("Ошибка синтеза речи:", e.error);
            setPlaybackState('idle');
            window.currentAudioPlayerId = null;
        };

        currentUtterance = newUtterance;
        speechSynthesis.speak(newUtterance);
    };

    const getIcon = () => {
        if (playbackState === 'playing') return '⏸️';
        if (playbackState === 'paused') return '▶️';
        return '🔊';
    };

    // Удаляем из текста всё, кроме испанского контента
    const spanishContent = (textToSpeak || '')
        .replace(/<[^>]*>?/gm, '')
        .replace(/[а-яА-ЯёЁ]/g, '')
        .replace(/[→←↓↑]/g, '') // Удаляем стрелки
        .replace(/[^\w\s.,!?¿¡áéíóúñÁÉÍÓÚÑ-]/g, '') // Удаляем прочие специальные символы
        .trim();

    if (!spanishContent) {
        return null;
    }

    return (
        <button onClick={handlePlayback} className="audio-button">
            {getIcon()}
        </button>
    );
};

export default AudioPlayer;
