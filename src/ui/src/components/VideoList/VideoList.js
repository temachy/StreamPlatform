import React from 'react'
import { List } from 'antd'
import VideoPreview from '../VideoPreview'

const VideoList = ({ list }) => (
    <List
        grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
        }}
        loading={!list}
        dataSource={list}
        renderItem={(video) => (
            <List.Item>
                <VideoPreview video={video} />
            </List.Item>
        )}
    />
)

export default VideoList
