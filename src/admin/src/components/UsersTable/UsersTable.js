import React from 'react'
import { Table } from 'antd'
const dataSource = [
    {
        key: '1',
        Login: 'temuchin26',
        Email: 'temuchin26@gmail.com',
        Role: 'admin',
        FirstName: 'Temuchin',
        LastName: 'Torcheniuk',
        isActive: 'true',
    },
    {
        key: '2',
        Login: 'testProfile',
        Email: 'test224124@urk.net',
        Role: 'user',
        FirstName: 'Test',
        LastName: 'Test',
        isActive: 'true',
    },
    {
        key: '3',
        Login: 'moderator',
        Email: 'moderator2234@ukr.net',
        Role: 'moderator',
        FirstName: 'moderator',
        LastName: 'moderator',
        isActive: 'true',
    },
]

const columns = [
    {
        title: 'Login',
        dataIndex: 'Login',
        key: 'Login',
    },
    {
        title: 'Email',
        dataIndex: 'Email',
        key: 'Email',
    },
    {
        title: 'Role',
        dataIndex: 'Role',
        key: 'Role',
    },

    {
        title: 'First name',
        dataIndex: 'FirstName',
        key: 'FirstName',
    },
    {
        title: 'Last name',
        dataIndex: 'LastName',
        key: 'LastName',
    },
    {
        title: 'Is active',
        dataIndex: 'isActive',
        key: 'isActive',
    },
]
const UsersTable = () => {
    return <Table dataSource={dataSource} columns={columns} />
}

export default UsersTable
