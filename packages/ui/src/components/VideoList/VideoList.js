import React from 'react'
import { List } from 'antd'

const VideoList = ({ list, previewComponent }) => {
    const Preview = previewComponent
    return (
        <List
            grid={{
                gutter: 16,
                // xs: 1,
                // sm: 2,
                // md: 4,
                // lg: 4,
            }}
            loading={!list}
            dataSource={
                list ? list.filter((item) => !item.isDisabled) : undefined
            }
            renderItem={(item) => {
                return (
                    <List.Item>
                        <Preview data={item} />
                    </List.Item>
                )
            }}
        />
    )
}

export default VideoList
