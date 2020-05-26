import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import styles from './Dashboard.module.scss'

import {
    UserOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons'
import { Route, Link } from 'react-router-dom'
import UsersTable from '../UsersTable'
import VideosTable from '../VideosTable'
import Header from '../Header'
import StreamsTable from '../StreamsTable'
const { Sider, Content } = Layout

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
                        <Link to="/users">
                            <UserOutlined />
                            <span>Users</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/videos">
                            <VideoCameraOutlined />

                            <span>Videos</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/streams">
                            <VideoCameraAddOutlined />

                            <span>Streams</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className={styles.siteLayout}>
                <Header toggle={toggle} collapsed={collapsed} />
                <Content
                    className={styles.siteLayoutBackground}
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Route path="/users" component={UsersTable} />
                    <Route path="/videos" component={VideosTable} />
                    <Route path="/streams" component={StreamsTable} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard
