import { PlayIcon, PauseIcon } from '@heroicons/react/solid'

function AudioControls({
    isPlaying,
    onPlayPauseClick,
}) {
    return (
        <div>
            {isPlaying ? (
                <button
                    type="button"
                    onClick={() => onPlayPauseClick(false)}
                    aria-label="Pause"
                >
                    <PauseIcon className="w-10 h-10 text-white" />
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => onPlayPauseClick(true)}
                    aria-label="Play"
                >
                    <PlayIcon className="w-10 h-10 text-white" />
                </button>
            )}
        </div>
    )
}

export default AudioControls
