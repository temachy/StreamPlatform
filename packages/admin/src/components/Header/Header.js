import React from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import { Layout, Row } from 'antd'

import styles from './Header.module.scss'

import { connect } from 'react-redux'
const Header = ({ logout, collapsed, toggle }) => {
    return (
        <Layout.Header
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
                <div onClick={logout}>
                    <LogoutOutlined className={styles.logout} />
                </div>
            </Row>
        </Layout.Header>
    )
}

const mapDispatch = ({ auth: { logout } }) => ({
    logout,
})

export default connect(null, mapDispatch)(Header)
