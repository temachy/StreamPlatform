import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './Main.module.scss'
import VideoList from '../VideoList'

const Main = ({ loadVideos, videoList }) => {
    useEffect(() => {
        loadVideos()
    }, [])

    return (
        <div className={styles.list}>
            <VideoList list={videoList} />
        </div>
    )
}

const mapState = (state) => ({
    videoList: state.video.list,
})

const mapDispatch = ({ video: { loadVideos } }) => ({
    loadVideos,
})

export default connect(mapState, mapDispatch)(Main)
