import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import PreviewPlayer from './PreviewPlayer'
import useVideoLink from '../../hooks/useVideoLink'

const VideoPreview = ({ data }) => {
    const [file] = useVideoLink(data._id)

    return (
        <Card
            style={{ width: 300, background: '#3a3d46', border: 'none' }}
            cover={
                <Link to={`/video/${data._id}`}>
                    <PreviewPlayer poster={data.posterPath} file={file} />
                </Link>
            }
            loading={!file}
        >
            <Link to={`/video/${data._id}`}>
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

export default VideoPreview
