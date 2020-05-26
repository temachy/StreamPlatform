import React, { useState } from 'react'
import {
    Upload,
    message,
    Button,
    Row,
    Col,
    Divider,
    Typography,
    Input,
    Form,
} from 'antd'
import { uploadVideo } from '../../api/video'
import VideoRecorder from '../VideoRecorder'
import styles from './UploadVideo.module.scss'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const useSingleUpload = () => {
    const [file, setFile] = useState(null)
    const beforeUpload = (file) => {
        setFile(file)
        return false
    }
    const clear = () => {
        setFile(null)
    }
    return [file, beforeUpload, clear]
}

const UploadForm = ({ handleSubmit }) => {
    const [form] = Form.useForm()
    const [videoFile, beforeUploadVideo, clearVideo] = useSingleUpload()
    const [posterFile, beforeUploadPoster, clearPoster] = useSingleUpload()

    const clearData = () => {
        clearVideo()
        clearPoster()
        form.resetFields()
    }

    const onSubmit = ({ name }) => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('video', videoFile)
        formData.append('poster', posterFile)
        handleSubmit(formData)
        clearData()
    }

    return (
        <Form form={form} name="uploadVideo" onFinish={onSubmit}>
            <Typography.Title level={4}>Upload video</Typography.Title>
            <Divider />
            <Typography.Paragraph>Video name</Typography.Paragraph>

            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input name!' }]}
            >
                <Input style={{ width: 300 }} placeholder="Type video name" />
            </Form.Item>

            <Typography.Paragraph>Video file</Typography.Paragraph>

            <Dragger
                fileList={videoFile ? [videoFile] : []}
                onRemove={clearVideo}
                name="video"
                beforeUpload={beforeUploadVideo}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag video file to upload
                </p>
            </Dragger>
            <br />

            <Typography.Paragraph>Poster image</Typography.Paragraph>

            <Dragger
                fileList={posterFile ? [posterFile] : []}
                onRemove={clearPoster}
                name="poster"
                beforeUpload={beforeUploadPoster}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag image file to upload
                </p>
            </Dragger>
            <br />
            <Button htmlType="submit">Upload</Button>
        </Form>
    )
}

const RecordForm = ({ handleSubmit }) => {
    const [form] = Form.useForm()
    const [posterFile, beforeUploadPoster, clearPoster] = useSingleUpload()
    const [recordedVideo, setRecordedVideo] = useState(null)

    const clearData = () => {
        clearPoster()
        form.resetFields()
        setRecordedVideo(null)
    }

    const onSubmit = ({ name }) => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('poster', posterFile)
        formData.append('video', recordedVideo)
        handleSubmit(formData)
        clearData()
    }

    return (
        <Form name="recordForm" form={form} onFinish={onSubmit}>
            <Typography.Title level={4}>Record video</Typography.Title>
            <Divider />
            <Typography.Paragraph>Video name</Typography.Paragraph>

            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input name!' }]}
            >
                <Input style={{ width: 300 }} placeholder="Type video name" />
            </Form.Item>

            <VideoRecorder setVideo={setRecordedVideo} />
            <br />

            <Typography.Paragraph>Poster image</Typography.Paragraph>

            <Dragger
                fileList={posterFile ? [posterFile] : []}
                onRemove={clearPoster}
                name="poster"
                beforeUpload={beforeUploadPoster}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag image file to upload
                </p>
            </Dragger>
            <br />
            <Button htmlType="submit">Upload</Button>
        </Form>
    )
}

const UploadVideo = () => {
    const handleSubmit = async (data) => {
        try {
            await uploadVideo(data)
            message.success('Video was successfully uploaded')
        } catch (error) {
            message.error(error.toString())
        }
    }

    return (
        <Row className={styles.container}>
            <Col span="12">
                <RecordForm handleSubmit={handleSubmit} />
            </Col>
            <Col offset="1" span="1">
                <div className={styles.divider}></div>
            </Col>
            <Col span="10">
                <UploadForm handleSubmit={handleSubmit} />
            </Col>
        </Row>
    )
}

export default UploadVideo
