import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import styles from '../../PlayerPage/VideoPage.module.scss'
import axios from 'axios'
import { Slider } from 'antd'
import { SoundFilled, SoundOutlined } from '@ant-design/icons'

const StreamPlayer = ({ fileStream, meta }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const [isMuted, setIsMuted] = useState(true)
    const [volume, setVolume] = useState(0.5)

    const playerRef = useRef()

    const repeatIfFails = () => {
        let counter = 20
        return axios
            .get(fileStream)
            .then((response) => {
                if (response.data.indexOf('#EXT-X-TARGETDURATION:0') !== -1) {
                    throw new Error()
                }
                setIsLoaded(true)
            })
            .catch((err) => {
                setTimeout(() => {
                    if (counter) {
                        repeatIfFails()
                        counter -= 1
                    }
                }, 1000)
            })
    }

    const handleVolume = (value) => {
        setVolume(parseFloat(value))
        setIsMuted(false)
    }

    useEffect(() => {
        if (meta.isLive) {
            repeatIfFails()
        }
    }, [])

    if (!fileStream) return null
    if (!isLoaded && meta.isLive) {
        return (
            <div className={styles.player}>
                <div className={styles.notLive}>
                    <img
                        src={'/' + meta.posterPath}
                        className={styles.posterImg}
                    />
                    <h4 className={styles.notLiveTitle}>Loading...</h4>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.player}>
            {meta.isLive ? (
                <>
                    <ReactPlayer
                        ref={playerRef}
                        volume={volume}
                        playing
                        muted={isMuted}
                        width="100%"
                        height="100%"
                        url={fileStream}
                        config={{
                            file: {
                                forceHLS: true,
                            },
                        }}
                    />
                    <div className={styles.controls}>
                        <div className={styles.isLive}>Live</div>
                        <div className={styles.volumeWrap}>
                            {isMuted ? (
                                <SoundOutlined
                                    style={{ color: 'white', fontSize: 18 }}
                                    onClick={() =>
                                        setIsMuted((prevState) => !prevState)
                                    }
                                />
                            ) : (
                                <SoundFilled
                                    style={{ color: 'white', fontSize: 18 }}
                                    onClick={() =>
                                        setIsMuted((prevState) => !prevState)
                                    }
                                />
                            )}

                            <Slider
                                className={styles.slider}
                                min={0}
                                max={1}
                                step={0.01}
                                tooltipVisible={false}
                                onChange={handleVolume}
                                defaultValue={0.5}
                            />
                        </div>
                    </div>
                </>
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
