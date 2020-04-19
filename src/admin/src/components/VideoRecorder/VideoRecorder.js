import React, { useEffect } from 'react'
import Recorder from 'react-video-recorder'
import styles from './VideoRecorder.module.scss'
const VideoRecorder = () => {
    return (
        <div className={styles.recorderWrap}>
            <Recorder
                onRecordingComplete={(videoBlob) => {
                    // Do something with the video...
                    console.log('videoBlob', videoBlob)
                }}
                renderActions={({
                    isVideoInputSupported,
                    isInlineRecordingSupported,
                    thereWasAnError,
                    isRecording,
                    isCameraOn,
                    streamIsReady,
                    isConnecting,
                    isRunningCountdown,
                    isReplayingVideo,
                    isReplayVideoMuted,
                    countdownTime,
                    timeLimit,
                    showReplayControls,
                    replayVideoAutoplayAndLoopOff,
                    useVideoInput,

                    onTurnOnCamera,
                    onTurnOffCamera,
                    onOpenVideoInput,
                    onStartRecording,
                    onStopRecording,
                    onPauseRecording,
                    onResumeRecording,
                    onStopReplaying,
                }) => (
                    <>
                        {console.log('onTurnOnCamera', onTurnOnCamera)}
                        <MyRecorder
                            prop={{
                                isVideoInputSupported,
                                isInlineRecordingSupported,
                                thereWasAnError,
                                isRecording,
                                isCameraOn,
                                streamIsReady,
                                isConnecting,
                                isRunningCountdown,
                                isReplayingVideo,
                                isReplayVideoMuted,
                                countdownTime,
                                timeLimit,
                                showReplayControls,
                                replayVideoAutoplayAndLoopOff,
                                useVideoInput,
                                onTurnOnCamera,
                                onTurnOffCamera,
                                onOpenVideoInput,
                                onStartRecording,
                                onStopRecording,
                                onPauseRecording,
                                onResumeRecording,
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
        isVideoInputSupported,
        isInlineRecordingSupported,
        thereWasAnError,
        isRecording,
        isCameraOn,
        streamIsReady,
        isConnecting,
        isRunningCountdown,
        isReplayingVideo,
        isReplayVideoMuted,
        countdownTime,
        timeLimit,
        showReplayControls,
        replayVideoAutoplayAndLoopOff,
        useVideoInput,

        onTurnOnCamera,
        onTurnOffCamera,
        onOpenVideoInput,
        onStartRecording,
        onStopRecording,
        onPauseRecording,
        onResumeRecording,
        onStopReplaying,
    },
}) => {
    useEffect(() => {
        onTurnOnCamera()
    }, [])

    return (
        <div className={styles.recorder}>
            {isReplayingVideo ? (
                <div onClick={onStopReplaying} className={styles.cameraOn}>
                    Record again
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

                    {isRecording && (
                        <div className={styles.timeCount}>{countdownTime}</div>
                    )}
                </>
            )}
        </div>
    )
}

export default VideoRecorder
