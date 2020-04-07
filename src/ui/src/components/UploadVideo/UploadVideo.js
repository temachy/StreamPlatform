import React from 'react'
import { Upload, message, Button, Input } from 'antd'
import { uploadVideo } from '../../api/video'
// import { UploadOutlined } from '@ant-design/icons';
const UploadVideo = () => {
    const handleSubmit = async e => {
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Upload video</label>
            <input name="video" required type="file" />
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </form>
    )
}

export default UploadVideo
