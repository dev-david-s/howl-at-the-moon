import { useState, useEffect, useRef, useCallback } from 'react';
import AudioControls from './AudioControls';

function AudioPlayer({ artist, artwork, title, src }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null)

    const audioRef = useRef(new Audio(src));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;

    useEffect(() => {
        console.log(audioRef)
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    return (
        <div className="max-w-xs rounded-2xl p-6 shadow-xl m-auto text-white">
            <div className="text-center relative">
                <img
                    className="rounded-3xl block m-auto h-48 w-48"
                    src={artwork}
                    alt={`track artwork for ${title} by ${artist}`}
                />
                <h2 className="font-bold mb-1">{title}</h2>
                <h3 className="font-light mt-0">{artist}</h3>
                <AudioControls
                    isPlaying={isPlaying}
                    onPlayPauseClick={setIsPlaying}
                />
            </div>
        </div>
    )
}

export default AudioPlayer
