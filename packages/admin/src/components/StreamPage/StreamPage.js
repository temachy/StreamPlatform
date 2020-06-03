import React, { useState, useEffect } from 'react'
import { message, Form, Input, Checkbox, Button, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getStream, updateStream } from '../../api/stream'

const StreamPage = () => {
    const [stream, setStream] = useState()
    const [form] = Form.useForm()

    const { id } = useParams()
    const getStreamsList = async () => {
        try {
            const streams = await getStream(id)
            form.setFieldsValue(streams.data)
            setStream(streams.data)
        } catch (error) {
            message.error(error.toString())
        }
    }

    useEffect(() => {
        getStreamsList()
    }, [])

    const handleSubmit = async (formData) => {
        const myForm = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            myForm.set(key, value)
        })
        try {
            await updateStream(id, myForm)
            message.success('Stream was updated!')
        } catch (error) {
            message.error(error.toString())
        }
    }

    return (
        <Form form={form} name="StreamSetting" onFinish={handleSubmit}>
            <Typography.Title level={4}>Edit stream</Typography.Title>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Please input stream name!' },
                ]}
            >
                <Input style={{ width: 300 }} placeholder="Name" />
            </Form.Item>

            <Form.Item
                label="Key"
                name="streamKey"
                rules={[
                    { required: true, message: 'Please input stream key!' },
                ]}
            >
                <Input style={{ width: 300 }} placeholder="Key" />
            </Form.Item>

            <Form.Item name="isDisabled" valuePropName="checked" noStyle>
                <Checkbox>Is disabled?</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button
                    style={{ background: '#1eafb5', width: 150, marginTop: 20 }}
                    type="primary"
                    htmlType="submit"
                >
                    Update stream
                </Button>
            </Form.Item>
        </Form>
    )
}

export default StreamPage
