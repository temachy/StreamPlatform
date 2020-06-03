import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { getList } from '../../api/stream'
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },

    {
        title: 'Key',
        dataIndex: 'streamKey',
        key: 'streamKey',
    },
    {
        title: 'isLive',
        dataIndex: 'isLive',
        key: 'isLive',
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

const StreamsTable = () => {
    const [streams, setStreams] = useState()
    const history = useHistory()

    const redirect = (path) => () => {
        history.push(`/streams/${path}`)
    }

    const fetchStreams = async () => {
        try {
            const response = await getList()
            setStreams(response.data)
        } catch (error) {
            message.error(error.toString())
        }
    }
    useEffect(() => {
        fetchStreams()
    }, [])

    return (
        <Table
            dataSource={streams}
            columns={columns}
            scroll={{ x: 1000 }}
            onRow={(record) => {
                return {
                    onClick: redirect(record._id),
                }
            }}
        />
    )
}

export default StreamsTable
