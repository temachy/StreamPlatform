import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import styles from './StreamPreview.module.scss'

const StreamPreview = ({ data }) => {
    return (
        <Card
            style={{ width: 300, background: '#3a3d46', border: 'none' }}
            cover={
                <Link to={`/streams/${data._id}`}>
                    <div className={styles.previewWrap}>
                        {data.isLive && <p className={styles.isLive}>Live</p>}
                        <img src={data.posterPath} alt="" />
                    </div>
                </Link>
            }
        >
            <Link to={`/streams/${data._id}`}>
                <Card.Meta
                    title={<span style={{ color: 'white' }}>{data.name}</span>}
                    description={
                        data.user && (
                            <Link
                                style={{
                                    color: '#c3c3c3',
                                    textDecoration: 'underline',
                                }}
                                to={`/users/${data.user._id}`}
                            >
                                {data.user.login}
                            </Link>
                        )
                    }
                />
            </Link>
        </Card>
    )
}

export default StreamPreview
