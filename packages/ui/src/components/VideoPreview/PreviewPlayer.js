import React, { useState, useRef } from 'react'
import style from './VideoPreview.module.scss'
import Player from 'react-player'

const PreviewPlayer = ({ file, poster }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const player = useRef(null)
    const handlePlay = () => {
        setIsPlaying(true)
    }
    const handleStop = () => {
        player.current.seekTo(0, 'seconds')
        setIsPlaying(false)
    }
    if (!file) return null
    return (
        <div
            onMouseLeave={handleStop}
            onMouseEnter={handlePlay}
            className={style.previewWrap}
        >
            <Player
                ref={player}
                muted
                loop
                playing={isPlaying}
                width="100%"
                height="100%"
                url={file}
            />
            {!isPlaying && poster && (
                <img className={style.poster} src={poster} alt="" />
            )}
        </div>
    )
}

export default PreviewPlayer
