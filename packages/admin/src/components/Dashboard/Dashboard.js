import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import styles from './Dashboard.module.scss'

import {
    UserOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons'
import { Route, NavLink, Switch } from 'react-router-dom'
import UsersTable from '../UsersTable'
import VideosTable from '../VideosTable'
import Header from '../Header'
import StreamsTable from '../StreamsTable'
import UserPage from '../UserPage'
import VideoPage from '../VideoPage/VideoPage'
import StreamPage from '../StreamPage'
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
                >
                    <Menu.Item style={{ overflow: 'visible' }} key="1">
                        <NavLink
                            activeClassName={styles.activeLink}
                            to="/users"
                        >
                            <UserOutlined />
                            <span>Users</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item style={{ overflow: 'visible' }} key="2">
                        <NavLink
                            activeClassName={styles.activeLink}
                            to="/videos"
                        >
                            <VideoCameraOutlined />

                            <span>Videos</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item style={{ overflow: 'visible' }} key="3">
                        <NavLink
                            activeClassName={styles.activeLink}
                            to="/streams"
                        >
                            <VideoCameraAddOutlined />

                            <span>Streams</span>
                        </NavLink>
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
                    <Switch>
                        <Route path="/users/:id" component={UserPage} />
                        <Route path="/users" component={UsersTable} />

                        <Route path="/videos/:id" component={VideoPage} />
                        <Route path="/videos" component={VideosTable} />

                        <Route path="/streams/:id" component={StreamPage} />
                        <Route path="/streams" component={StreamsTable} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard
