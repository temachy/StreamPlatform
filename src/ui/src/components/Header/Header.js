import React, { useState } from 'react'
import { Layout, AutoComplete, Drawer, Button } from 'antd'
import styles from './Header.module.scss'
import MenuOutlined from '@ant-design/icons/MenuOutlined'
import { Link } from 'react-router-dom'
import VideoImage from '../../assets/cinema.svg'
import { connect } from 'react-redux'
const Header = ({ logout }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <Layout.Header className={styles.header}>
            <div className={styles.container}>
                <Link to={'/'}>
                    <img className={styles.logo} src={VideoImage} alt="" />
                </Link>

                <AutoComplete style={{ width: 500 }} />

                <MenuOutlined
                    onClick={handleOpen}
                    style={{ color: 'white', fontSize: 26, cursor: 'pointer' }}
                />

                <Drawer onClose={handleClose} visible={isOpen}>
                    <Button type="link" onClick={handleLogout}>
                        Logout
                    </Button>
                </Drawer>
            </div>
        </Layout.Header>
    )
}

const mapDispatch = ({ auth: { logout } }) => ({
    logout,
})

export default connect(null, mapDispatch)(Header)
