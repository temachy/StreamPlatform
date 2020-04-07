import React from 'react'
import { Layout, Input, AutoComplete, Button, Drawer } from 'antd'
import styles from './Header.module.scss'
import MenuOutlined from '@ant-design/icons/MenuOutlined'
const Header = () => {
    return (
        <Layout.Header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Main</h1>
                <AutoComplete />

                <Button>
                    <MenuOutlined />
                </Button>
                <Drawer />
            </div>
        </Layout.Header>
    )
}

export default Header
