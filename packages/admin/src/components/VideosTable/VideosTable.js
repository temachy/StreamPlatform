import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { getList } from '../../api/video'
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Poster',
        dataIndex: 'posterPath',
        key: 'posterPath',
    },
    {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'isDisabled',
        dataIndex: 'isDisabled',
        key: 'isDisabled',
    },
]

const VideosTable = () => {
    const [videos, setVideos] = useState()
    const history = useHistory()

    const redirect = (path) => () => {
        history.push(`/videos/${path}`)
    }

    const fetchVideos = async () => {
        try {
            const response = await getList()
            setVideos(
                response.data.map((video) => ({
                    ...video,
                    author: video.user.login,
                }))
            )
        } catch (error) {
            message.error(error.toString())
        }
    }
    useEffect(() => {
        fetchVideos()
    }, [])

    return (
        <Table
            dataSource={videos}
            columns={columns}
            onRow={(record) => {
                return {
                    onClick: redirect(record._id),
                }
            }}
        />
    )
}

export default VideosTable
