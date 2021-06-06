import { useState, useEffect, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { storage } from '../firebase';
import AudioControls from './AudioControls';
function AudioPlayer({ artist, artwork, title, src, setCurrentSource }) {

    const [source, setSource] = useState()
    const [image, setImage] = useState()
    const [duration, setDuration] = useState()
    const [isPlaying, setIsPlaying] = useState()
    const [trackProgress, setTrackProgress] = useState(0);

    useEffect(() => {
        storage.refFromURL(src).getDownloadURL().then(function (url) {
            setSource(url)
        })
        storage.refFromURL(artwork).getDownloadURL().then(function (artwork) {
            setImage(artwork)
        })
    }, []);

    const handleEnded = () => {
        setIsPlaying(false)
    }

    const handleProgress = (state) => {
        setTrackProgress(state.playedSeconds)
    }

    const handleDuration = (state) => {
        setDuration(state)
    }

    const onPlayPauseClick = (shouldPlay) => {
        setIsPlaying(shouldPlay)
    }

    // const onScrub = (e) => {do
    //     setTrackProgress(e.target.value);
    //     console.log(trackProgress)
    // }
    // const onScrubEnd = () => {
    //     // If not already playing, start
    //     if (!isPlaying) {
    //         setIsPlaying(true);
    //     }
    //     console.log(playerRef.getDuration())
    // }

    return (
        <div className={`max-w-xs rounded-2xl p-6 shadow-xl text-white ${isPlaying && 'bg-background_mood-medium'}`}>
            <div className="text-center relative">
                <img
                    className="rounded-full block m-auto h-48 w-48 object-contain"
                    src={image}
                    alt={`track artwork for ${title} by ${artist}`}
                />
                <h2 className="font-bold mb-1">{title}</h2>
                <h3 className="font-light mt-0">{artist}</h3>
                <AudioControls
                    isPlaying={isPlaying}
                    onPlayPauseClick={onPlayPauseClick}
                />
                <input
                    className="h-1 appearance-none w-full mb-2 rounded-lg bg-white cursor-pointer transition-colors"
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration}
                    onChange={(e) => e.preventDefault()}
                // onChange={(e) => onScrub(e)}
                // onMouseUp={onScrubEnd}
                // onKeyUp={onScrubEnd}
                />
                <ReactPlayer className="hidden" url={source} controls={false} playing={isPlaying}
                    onEnded={handleEnded}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                />
            </div>
        </div>
    )
}

export default AudioPlayer
