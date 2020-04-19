import React from 'react'
import {
    Upload,
    message,
    Button,
    Row,
    Col,
    Divider,
    Typography,
    Input,
} from 'antd'
import { uploadVideo } from '../../api/video'
import VideoRecorder from '../VideoRecorder'
import styles from './UploadVideo.module.scss'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file
        if (status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    },
}
const UploadVideo = () => {
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.target)
            await uploadVideo(formData)
            message.success('Video was successfully uploaded')
        } catch (error) {
            message.error(error.toString())
        }
    }

    return (
        <Row className={styles.container}>
            <Col span="12">
                <div>
                    <Typography.Title level={4}>Record video</Typography.Title>
                    <Divider />
                    <Typography.Paragraph>Video name</Typography.Paragraph>

                    <Input type="text" placeholder="Type video name" />
                    <br />
                    <br />

                    <VideoRecorder />
                    <br />

                    <Typography.Paragraph>Poster image</Typography.Paragraph>

                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag image file to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                        </p>
                    </Dragger>
                    <br />
                    <Button>Upload</Button>
                </div>
            </Col>
            <Col offset="1" span="1">
                <div className={styles.divider}></div>
            </Col>
            <Col span="10">
                <div>
                    <Typography.Title level={4}>Upload video</Typography.Title>
                    <Divider />
                    <Typography.Paragraph>Video name</Typography.Paragraph>

                    <Input type="text" placeholder="Type video name" />
                    <br />
                    <br />

                    <Typography.Paragraph>Video file</Typography.Paragraph>

                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag video file to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                        </p>
                    </Dragger>
                    <br />

                    <Typography.Paragraph>Poster image</Typography.Paragraph>

                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag image file to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                        </p>
                    </Dragger>
                    <br />
                    <Button>Upload</Button>
                </div>
            </Col>
        </Row>
    )
}

export default UploadVideo
