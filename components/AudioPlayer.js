import { useState, useEffect, useRef, useCallback } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { storage } from '../firebase';
import AudioControls from './AudioControls';
function AudioPlayer({ artist, artwork, title, src, trackNum }) {


    //   .then(function () {
    //     storage.refFromURL(track.artwork).getDownloadURL().then(function (artwork) {
    //       track.artwork = audioArtwork
    //     })
    //   })

    const [isPlaying, setIsPlaying] = useState(false);
    const [source, setSource] = useState()
    const [image, setImage] = useState()
    const [audio, setAudio] = useState(null);
    const [trackIndex, setTrackIndex] = useState();
    const [trackProgress, setTrackProgress] = useState(0);
    const intervalRef = useRef();
    const isReady = useRef(false);

    const audioRef = useRef(audio)

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }

    useEffect(() => {
        storage.refFromURL(src).getDownloadURL().then(function (url) {
            setSource(url)
        })
        storage.refFromURL(artwork).getDownloadURL().then(function (artwork) {
            setImage(artwork)
        })
        setAudio(new Audio(source));
        // Pause and clean up on unmount
        return () => {
            audioRef.current?.pause();
            clearInterval(intervalRef.current);
        }
    }, [, source]);

    useEffect(() => {
        isPlaying && audioRef.current?.pause();

        audioRef.current = new Audio(source);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
        console.log(trackNum)
    }, [trackNum]);

    useEffect(() => {
        audioRef.current = audio;
    }, [audio])

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
            startTimer();
            // audio.play()
        } else {
            audioRef.current?.pause();
            //            audio.pause()
        }
    }, [isPlaying]);

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                audioRef.current.pause();
                setIsPlaying(false)
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    }

    return (
        <div className={`max-w-xs rounded-2xl p-6 shadow-xl md:mt-52 m-auto text-white ${isPlaying && 'bg-background_mood-medium'}`}>
            <div className="text-center relative">
                <img
                    className="rounded-full block m-auto h-48 w-48"
                    src={image}
                    alt={`track artwork for ${title} by ${artist}`}
                />
                <h2 className="font-bold mb-1">{title}</h2>
                <h3 className="font-light mt-0">{artist}</h3>
                <AudioControls
                    isPlaying={isPlaying}
                    onPlayPauseClick={setIsPlaying}
                />
                <input
                    className="h-1 appearance-none w-full mb-2 rounded-lg bg-white cursor-pointer transition-colors"
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={audioRef.current?.duration ? audioRef.current?.duration : `${audioRef.current?.duration}`}
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                />
                <ReactAudioPlayer src={source} controls />
            </div>
        </div>
    )
}

export default AudioPlayer
