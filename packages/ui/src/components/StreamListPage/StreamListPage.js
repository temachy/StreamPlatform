import React, { useEffect, useState } from 'react'

import {
    Button,
    List,
    Modal,
    Form,
    message,
    Avatar,
    Typography,
    Input,
    Upload,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import { Link, useHistory } from 'react-router-dom'
import { createStream, getStreamsList } from '../../api/stream'
import styles from './StreamListPage.module.scss'
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

const StreamListPage = () => {
    const [userStreamList, setUserStreamList] = useState()
    const [isVisible, setVisible] = useState(false)
    const [posterFile, beforeUploadPoster, clearPoster] = useSingleUpload()
    const history = useHistory()
    const [form] = Form.useForm()

    const getStreamList = async () => {
        const response = await getStreamsList()
        setUserStreamList(response.data)
    }

    const toggleModal = () => {
        setVisible((prev) => !prev)
    }

    const handleSubmit = async (formData) => {
        try {
            const { _id } = (await createStream(formData)).data
            history.push(`/streams/${_id}`)
        } catch (error) {
            message.error(error.toString())
        }
    }

    const onSubmit = ({ name } = {}) => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('poster', posterFile)
        handleSubmit(formData)
        setVisible(false)
        clearData()
    }

    const clearData = () => {
        clearPoster()
        form.resetFields()
    }

    useEffect(() => {
        getStreamList()
    }, [])
    if (!userStreamList) return false
    return (
        <div className={styles.container}>
            <Button onClick={toggleModal}>Create stream</Button>

            <List
                itemLayout="vertical"
                dataSource={userStreamList}
                renderItem={(item) => (
                    <List.Item>
                        <Link to={`/streams/${item._id}/settings`}>
                            <div className={styles.avatarWrap}>
                                <Avatar src={item.posterPath} />
                                <p className={styles.title}>{item.name}</p>
                            </div>
                        </Link>
                    </List.Item>
                )}
            />

            <Modal
                title="Create stream"
                visible={isVisible}
                onOk={() => {}}
                onCancel={toggleModal}
                footer={null}
            >
                <Form form={form} name="CreateStream" onFinish={onSubmit}>
                    <Typography.Paragraph>Stream name</Typography.Paragraph>

                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name!',
                            },
                        ]}
                    >
                        <Input
                            style={{ width: 300 }}
                            placeholder="Type stream name"
                        />
                    </Form.Item>

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
            </Modal>
        </div>
    )
}

export default StreamListPage
