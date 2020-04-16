import React from 'react'
import { Divider } from 'antd'
import styles from './MetaData.module.scss'

const MetaData = ({ video }) => {
    if (!video) return null

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{video.name}</h2>
            <p className={styles.author}>{video.user.login}</p>
            <Divider />
            <pre className={styles.description}>{video.description}</pre>
        </div>
    )
}

export default MetaData
