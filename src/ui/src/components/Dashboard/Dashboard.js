import React, { useState } from 'react'
import { Layout, Menu, Row } from 'antd'
import styles from './Dashboard.module.scss'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import { Route, Switch, Link } from 'react-router-dom'
import UsersTable from '../UsersTable'
import VideosTable from '../VideosTable'

const { Header, Sider, Content } = Layout

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout className={styles.layout}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    style={{ padding: '60px 0px' }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key="1">
                        <Link to="/dashboard/users">
                            <UserOutlined />
                            <span>Users</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/dashboard/videos">
                            <VideoCameraOutlined />

                            <span>Videos</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className={styles.siteLayout}>
                <Header
                    className={styles.siteLayoutBackground}
                    style={{ padding: 0 }}
                >
                    <Row justify="space-between" align="middle">
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: styles.trigger,
                                onClick: toggle,
                            }
                        )}
                        <LogoutOutlined className={styles.logout} />
                    </Row>
                </Header>
                <Content
                    className={styles.siteLayoutBackground}
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Route path="/dashboard/users" component={UsersTable} />
                    <Route path="/dashboard/videos" component={VideosTable} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard
