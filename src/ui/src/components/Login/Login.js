import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Login.module.scss'
const Login = (props) => {
    const handleSubmit = (values) => {
        props.login(values)
    }
    return (
        <div className={styles.container}>
            <Form
                className={styles.form}
                name="loginForm"
                onFinish={handleSubmit}
            >
                <h3 className={styles.title}>Login</h3>

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
                <Form.Item>
                    <Button
                        style={{ background: '#1eafb5', width: 150 }}
                        type="primary"
                        htmlType="submit"
                    >
                        Sign in
                    </Button>
                </Form.Item>
                <Button type="dashed" htmlType="button">
                    <Link to="/signup">Sign up</Link>
                </Button>
            </Form>
        </div>
    )
}

const mapDispatch = ({ auth: { login } }) => ({
    login,
})

const mapState = (state) => ({
    auth: state.auth.user,
})

export default connect(null, mapDispatch)(Login)
