import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import styles from './SignUp.module.scss'
import { Link } from 'react-router-dom'

const SignUp = (props) => {
    const handleSubmit = (values) => {
        props.signUp(values)
    }

    return (
        <div className={styles.container}>
            <Form
                className={styles.form}
                name="signUpForm"
                onFinish={handleSubmit}
            >
                <h3 className={styles.title}>Sign up</h3>

                <Form.Item
                    name="login"
                    rules={[
                        { required: true, message: 'Please input your login!' },
                    ]}
                >
                    <Input style={{ width: 300 }} placeholder="Login" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        style={{ width: 300 }}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="passwordRepeat"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        style={{ width: 300 }}
                        placeholder="Repeat password"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                    ]}
                >
                    <Input style={{ width: 300 }} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="firstName"
                    rules={[
                        { required: true, message: 'Please input First name!' },
                    ]}
                >
                    <Input style={{ width: 300 }} placeholder="First name" />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    rules={[
                        { required: true, message: 'Please input Last name!' },
                    ]}
                >
                    <Input style={{ width: 300 }} placeholder="Last name" />
                </Form.Item>
                <Form.Item>
                    <Button
                        style={{ background: '#1eafb5', width: 150 }}
                        type="primary"
                        htmlType="submit"
                    >
                        Create account
                    </Button>
                </Form.Item>
                <Button type="link" htmlType="button">
                    <Link to="/login">Cancel</Link>
                </Button>
            </Form>
        </div>
    )
}

const mapDispatch = ({ auth: { signUp } }) => ({
    signUp,
})

export default connect(null, mapDispatch)(SignUp)
