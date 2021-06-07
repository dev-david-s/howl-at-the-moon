import { useState, useEffect, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { storage, db } from '../firebase';
import Image from 'next/image';
import AudioControls from './AudioControls';
import firebase from "firebase"


import { useSession } from "next-auth/client";


import { StarIcon as StarOutline } from "@heroicons/react/outline"
import { StarIcon as StarSolid } from "@heroicons/react/solid"

function AudioPlayer({ artist, artwork, title, src, trackId, favoriteList, hideFavorites, nowPlaying, setNowPlaying }) {
    const [session] = useSession();

    const [source, setSource] = useState()
    const [image, setImage] = useState()
    const [duration, setDuration] = useState()
    const [isPlaying, setIsPlaying] = useState()
    const [trackProgress, setTrackProgress] = useState(0);

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        storage.refFromURL(src).getDownloadURL().then(function (url) {
            setSource(url)
        })
        storage.refFromURL(artwork).getDownloadURL().then(function (artwork) {
            setImage(artwork)
        })

        favoriteList?.forEach(function (favorite) {
            if (favorite.src == src) {
                setIsFavorite(true)
            }
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

    useEffect(() => {
        if (nowPlaying != src) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }, [nowPlaying])

    const onPlayPauseClick = (shouldPlay) => {
        setIsPlaying(shouldPlay)
        setNowPlaying(src)
    }

    const handleAddToFavorites = () => {
        db.collection('users').doc(session.user.email).collection('favorites').add({
            favoriteId: trackId,
            artist: artist,
            artwork: artwork,
            title: title,
            src: src,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setIsFavorite(true);
    }

    const handleRemoveFromFavorites = () => {
        db.collection('users').doc(session.user.email).collection('favorites').where('favoriteId', '==', trackId).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                })
            })
        setIsFavorite(false);
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
                {!hideFavorites && <div>
                    {!isFavorite ? (
                        <button
                            type="button" onClick={() => handleAddToFavorites()} className="absolute right-0 cursor-pointer z-50 focus:outline-none"
                            aria-label="Remove from Favorites">
                            <StarOutline className="w-6 h-6 " />
                        </button>) : (
                        <button
                            type="button" onClick={() => handleRemoveFromFavorites()} className="absolute right-0 cursor-pointer z-50 focus:outline-none"
                            aria-label="Remove from Favorites">
                            <StarSolid className="w-6 h-6 " />
                        </button>
                    )
                    }
                </div>}
                {
                    image && <Image
                        className="rounded-full block m-auto"
                        width={180}
                        height={180}
                        objectFit="cover"
                        src={image}
                        alt={`track artwork for ${title} by ${artist}`}
                    />
                }
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
