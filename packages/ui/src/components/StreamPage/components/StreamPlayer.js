import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import styles from '../../PlayerPage/VideoPage.module.scss'

const StreamPlayer = ({ fileStream, meta }) => {
    const playerRef = useRef()

    const handleGoEnd = () => {
        const totalAmount = playerRef.current.getDuration()
        playerRef.current.seekTo(totalAmount - 4, 'seconds')
    }
    if (!fileStream) return null

    return (
        <div className={styles.player}>
            {meta.isLive ? (
                <ReactPlayer
                    ref={playerRef}
                    controls
                    playing
                    muted
                    width="100%"
                    height="100%"
                    url={fileStream}
                    onStart={handleGoEnd}
                    config={{
                        file: {
                            forceHLS: true,
                        },
                    }}
                />
            ) : (
                <div className={styles.notLive}>
                    <img
                        src={'/' + meta.posterPath}
                        className={styles.posterImg}
                    />
                    <h4 className={styles.notLiveTitle}>
                        Stream wasn't started yet
                    </h4>
                </div>
            )}
        </div>
    )
}

export default StreamPlayer
