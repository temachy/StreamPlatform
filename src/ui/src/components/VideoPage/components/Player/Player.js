import React from 'react'
import ReactPlayer from 'react-player'
import styles from '../../VideoPage.module.scss'

const Player = ({ fileStream }) => {
    if (!fileStream) return null
    return (
        <div className={styles.player}>
            <ReactPlayer controls width="100%" height="100%" url={fileStream} />
        </div>
    )
}

export default Player
