import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './Main.module.scss'
import VideoList from '../VideoList'
import VideoPreview from '../VideoPreview'
import StreamPreview from '../StreamPreview'

const Main = ({ loadVideos, videoList, loadStreams, streamsList }) => {
    useEffect(() => {
        loadVideos()
        loadStreams()
    }, [])

    return (
        <>
            <div className={styles.list}>
                <VideoList
                    list={streamsList}
                    previewComponent={StreamPreview}
                />
            </div>
            <div className={styles.list}>
                <VideoList list={videoList} previewComponent={VideoPreview} />
            </div>
        </>
    )
}

const mapState = (state) => ({
    videoList: state.video.list,
    streamsList: state.streams.list,
})

const mapDispatch = ({ video: { loadVideos }, streams: { loadStreams } }) => ({
    loadVideos,
    loadStreams,
})

export default connect(mapState, mapDispatch)(Main)
