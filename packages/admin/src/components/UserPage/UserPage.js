import React, { useState, useEffect } from 'react'
import { message, Form, Input, Checkbox, Button, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getUser, updateUser } from '../../api/user'

const UserPage = () => {
    const [user, setUser] = useState()
    const [form] = Form.useForm()

    const { id } = useParams()
    const getUsersList = async () => {
        try {
            const users = await getUser(id)
            form.setFieldsValue(users.data[0])
            setUser(users.data)
        } catch (error) {
            message.error(error.toString())
        }
    }

    useEffect(() => {
        getUsersList()
    }, [])

    const handleSubmit = async (formData) => {
        console.log('formData', formData)
        try {
            await updateUser(id, formData)
            message.success('User was updated!')
        } catch (error) {
            message.error(error.toString())
        }
    }

    return (
        <Form form={form} name="UserSetting" onFinish={handleSubmit}>
            <Typography.Title level={4}>Edit user</Typography.Title>
            <Form.Item
                label="Login"
                name="login"
                rules={[
                    { required: true, message: 'Please input user login!' },
                ]}
            >
                <Input style={{ width: 300 }} placeholder="Login" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input user email!' },
                ]}
            >
                <Input style={{ width: 300 }} placeholder="Email" />
            </Form.Item>
            <Form.Item
                label="First name"
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: 'Please input user First name!',
                    },
                ]}
            >
                <Input style={{ width: 300 }} placeholder="First name" />
            </Form.Item>
            <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                    { required: true, message: 'Please input user Last name!' },
                ]}
            >
                <Input style={{ width: 300 }} placeholder="Last name" />
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
                    Update user
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UserPage
