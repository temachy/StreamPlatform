import React from 'react'
import { Table } from 'antd'

const dataSource = [
    {
        key: '1',
        name: 'Fun video about cats',
        Author: 'Temuchin',
        Duration: '2:09',
        State: 'active',
    },
    {
        key: '2',
        name: 'Fun video about dogs',
        Author: 'Temuchin',
        Duration: '5:54',
        State: 'active',
    },
    {
        key: '5',
        name: 'How to cook pizza',
        Author: 'Test',
        Duration: '22:08',
        State: 'active',
    },
    {
        key: '6',
        name: 'Why we eat sugar?',
        Author: 'Test',
        Duration: '9:33',
        State: 'inactive',
    },
]

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Author',
        dataIndex: 'Author',
        key: 'Author',
    },
    {
        title: 'Duration',
        dataIndex: 'Duration',
        key: 'Duration',
    },

    {
        title: 'State',
        dataIndex: 'State',
        key: 'State',
    },
]

const VideosTable = () => {
    return <Table dataSource={dataSource} columns={columns} />
}

export default VideosTable
