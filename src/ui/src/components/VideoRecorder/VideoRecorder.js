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
    prop,
}) => {
    // const [timer, setTimer] = useState(0.0)

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

                    {/* {isRecording && (
                        <div className={styles.timeCount}>{countdownTime}</div>
                    )} */}
                </>
            )}
        </div>
    )
}

export default VideoRecorder
