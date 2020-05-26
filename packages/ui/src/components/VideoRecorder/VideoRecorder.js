import React, { useEffect } from 'react'
import Recorder from 'react-video-recorder'
import styles from './VideoRecorder.module.scss'

const VideoRecorder = ({ setVideo }) => {
    return (
        <div className={styles.recorderWrap}>
            <Recorder
                onRecordingComplete={(videoBlob) => {
                    setVideo(videoBlob)
                }}
                renderActions={({
                    isRecording,
                    isReplayingVideo,
                    onTurnOnCamera,
                    onStartRecording,
                    onStopRecording,
                    onStopReplaying,
                }) => (
                    <>
                        <MyRecorder
                            prop={{
                                isRecording,
                                isReplayingVideo,
                                onTurnOnCamera,
                                onStartRecording,
                                onStopRecording,
                                onStopReplaying,
                            }}
                        />
                    </>
                )}
                renderDisconnectedView={() => null}
            />
        </div>
    )
}

const MyRecorder = ({
    prop: {
        isRecording,
        isReplayingVideo,
        onTurnOnCamera,
        onStartRecording,
        onStopRecording,
        onStopReplaying,
    },
    prop,
}) => {
    useEffect(() => {
        onTurnOnCamera()
    }, [])

    const onSave = () => {
        onStopReplaying()
        onTurnOnCamera()
    }

    return (
        <div className={styles.recorder}>
            {isReplayingVideo ? (
                <div className={styles.absoluteLabel}>
                    <div onClick={onSave}>Save</div>
                    <div onClick={onStartRecording}>Record again</div>
                </div>
            ) : (
                <>
                    {isRecording ? (
                        <div
                            onClick={onStopRecording}
                            className={styles.stop}
                        ></div>
                    ) : (
                        <div
                            onClick={onStartRecording}
                            className={styles.start}
                        ></div>
                    )}
                </>
            )}
        </div>
    )
}

export default VideoRecorder
