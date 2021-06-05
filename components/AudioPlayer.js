import { useState, useEffect, useRef, useCallback } from 'react';
import AudioControls from './AudioControls';
function AudioPlayer({ artist, artwork, title, src }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null)

    const intervalRef = useRef();
    const isReady = useRef(false);

    const audioRef = useRef(audio)

    useEffect(() => {
        setAudio(new Audio(src));
        // Pause and clean up on unmount
        return () => {
            audioRef.current?.pause();
            clearInterval(intervalRef.current);
            console.log(audio)
        }
    }, [, src]);

    useEffect(() => {
        audioRef.current = audio;
    }, [audio])

    useEffect(() => {
        console.log(audioRef)
        if (isPlaying) {
            audioRef.current?.play();
            // audio.play()
        } else {
            audioRef.current?.pause();
            //            audio.pause()
        }
    }, [isPlaying]);


    // const { duration } = audioRef.current;
    return (
        <div className="max-w-xs rounded-2xl p-6 shadow-xl m-auto text-white">
            <div className="text-center relative">
                <img
                    className="rounded-full block m-auto h-48 w-48"
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
