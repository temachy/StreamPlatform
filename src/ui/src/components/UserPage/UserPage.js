import React from 'react'
import useUserData from '../../hooks/useUserData'
import { useParams } from 'react-router-dom'
import { Typography, Divider } from 'antd'
import VideoList from '../VideoList'
import style from './UserPage.module.scss'

const UserPage = () => {
    const params = useParams()
    const [user] = useUserData(params.id)

    if (!user) return null
    return (
        <div className={style.container}>
            <div className={'flex'}>
                <img className={style.avatar} src={user.avatar} alt="" />
                <Typography.Text>{user.login}</Typography.Text>
            </div>

            <Divider />
            <Typography.Title style={{ color: 'white' }} level={4}>
                Відео користувача
            </Typography.Title>
            <br />

            <VideoList list={user.videos} />
        </div>
    )
}

export default UserPage
