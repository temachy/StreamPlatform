import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import PreviewPlayer from './PreviewPlayer'
import useVideoLink from '../../hooks/useVideoLink'

const VideoPreview = ({ video }) => {
    const [file] = useVideoLink(video._id)

    return (
        <Card
            style={{ width: 300, background: '#3a3d46', border: 'none' }}
            cover={
                <Link to={`/video/${video._id}`}>
                    <PreviewPlayer poster={video.posterPath} file={file} />
                </Link>
            }
            loading={!file}
        >
            <Link to={`/video/${video._id}`}>
                <Card.Meta
                    title={<span style={{ color: 'white' }}>{video.name}</span>}
                    description={
                        video.user && (
                            <Link
                                style={{
                                    color: '#c3c3c3',
                                    textDecoration: 'underline',
                                }}
                                to={`/users/${video.user._id}`}
                            >
                                {video.user.login}
                            </Link>
                        )
                    }
                />
            </Link>
        </Card>
    )
}

export default VideoPreview
