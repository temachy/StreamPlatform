import React, { useState, useEffect } from 'react'
import { Layout, Drawer } from 'antd'
import styles from './Header.module.scss'
import MenuOutlined from '@ant-design/icons/MenuOutlined'
import { Link, useLocation } from 'react-router-dom'
import VideoImage from '../../assets/cinema.svg'
import { roles } from '../../utils/constants'
import { connect } from 'react-redux'

const links = [
    {
        to: '/upload',
        title: 'Video',
        permissions: [roles.TEACHER, roles.ADMIN],
    },
    {
        to: '/streaming',
        title: 'Streams',
        permissions: [roles.TEACHER, roles.ADMIN],
    },
    {
        to: '/profile',
        title: 'Profile',
        permissions: [roles.USER, roles.TEACHER, roles.ADMIN],
    },
]

const Header = ({ logout, user }) => {
    const location = useLocation()

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

    useEffect(() => {
        handleClose()
    }, [location.pathname])

    return (
        <Layout.Header className={styles.header}>
            <div className={styles.container}>
                <Link to={'/'}>
                    <img className={styles.logo} src={VideoImage} alt="" />
                </Link>

                <MenuOutlined
                    onClick={handleOpen}
                    style={{ color: 'white', fontSize: 26, cursor: 'pointer' }}
                />

                <Drawer
                    title={user.firstName}
                    onClose={handleClose}
                    visible={isOpen}
                >
                    <div className={styles.linkList}>
                        {links.map((link) => {
                            if (link.permissions.includes(user.role)) {
                                return <Link to={link.to}>{link.title}</Link>
                            }
                        })}
                        <p onClick={handleLogout}>Logout</p>
                    </div>
                </Drawer>
            </div>
        </Layout.Header>
    )
}

const mapState = (state) => ({
    user: state.auth.user,
})

const mapDispatch = ({ auth: { logout } }) => ({
    logout,
})

export default connect(mapState, mapDispatch)(Header)
