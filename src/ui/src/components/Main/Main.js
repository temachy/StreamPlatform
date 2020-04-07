import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import styles from './Main.module.scss'
const Main = ({ loadVideos, videoList }) => {
    useEffect(() => {
        loadVideos()
    }, [])

    return (
        <div className={styles.list}>
            {videoList && videoList.length ? (
                videoList.map(video => <div>{video.name}</div>)
            ) : (
                <Spin />
            )}
        </div>
    )
}

const mapState = state => ({
    videoList: state.video.list,
})

const mapDispatch = ({ video: { loadVideos } }) => ({
    loadVideos,
})

export default connect(mapState, mapDispatch)(Main)
