import React, { useState, useEffect } from 'react'
import {
    Upload,
    Button,
    Divider,
    Typography,
    Input,
    Form,
    Checkbox,
} from 'antd'
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

const UploadForm = ({ data, handleSubmit }) => {
    const [form] = Form.useForm()
    const [videoFile, beforeUploadVideo, clearVideo] = useSingleUpload()
    const [posterFile, beforeUploadPoster, clearPoster] = useSingleUpload()
    useEffect(() => {
        form.setFieldsValue(data)
    }, [])

    const onSubmit = ({ name, isDisabled }) => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('isDisabled', isDisabled)
        formData.append('video', videoFile)
        formData.append('poster', posterFile)
        handleSubmit(formData)
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
            <Form.Item name="isDisabled" valuePropName="checked" noStyle>
                <Checkbox>Is disabled?</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button
                    style={{ background: '#1eafb5', width: 150, marginTop: 20 }}
                    type="primary"
                    htmlType="submit"
                >
                    Update
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UploadForm
