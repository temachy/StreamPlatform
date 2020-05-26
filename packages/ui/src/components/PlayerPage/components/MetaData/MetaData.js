import React from 'react'
import { Divider, Avatar, Row, Statistic } from 'antd'
import styles from './MetaData.module.scss'
import { LikeFilled, DislikeFilled } from '@ant-design/icons'

const MetaData = ({ video }) => {
    if (!video) return null

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{video.name}</h2>
            <Row align="middle" justify="space-between">
                <Row align="middle">
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                            verticalAlign: 'middle',
                        }}
                        size="large"
                    >
                        T
                    </Avatar>
                    <p className={styles.author}>{video.user.login}</p>
                </Row>
                <Row align="middle">
                    <Statistic style={{marginRight: 10}} valueStyle={{color: 'white', marginRight: 10}} value={9} prefix={<LikeFilled style={{color: 'white', marginRight: 10}} />} />
                    <Statistic valueStyle={{color: 'white', marginRight: 10}} value={1} prefix={<DislikeFilled style={{color: 'white', marginRight: 10}} />} />
                </Row>
            </Row>

            <Divider />
            <pre className={styles.description}>{video.description}</pre>
        </div>
    )
}

export default MetaData
