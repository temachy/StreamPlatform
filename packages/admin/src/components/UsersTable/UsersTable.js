import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { getUsersList } from '../../api/user'
import { useHistory } from 'react-router-dom'

const columns = [
    {
        title: 'Login',
        dataIndex: 'login',
        key: 'Login',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'Email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'Role',
    },

    {
        title: 'First name',
        dataIndex: 'firstName',
        key: 'FirstName',
    },
    {
        title: 'Last name',
        dataIndex: 'lastName',
        key: 'LastName',
    },
    {
        title: 'Is disabled',
        dataIndex: 'isDisabled',
        key: 'isDisabled',
    },
]
const UsersTable = () => {
    const [users, setUsers] = useState()
    const history = useHistory()

    const redirect = (path) => () => {
        history.push(`/users/${path}`)
    }

    const fetchUsers = async () => {
        const usersResponse = await getUsersList()
        setUsers(usersResponse.data)
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <Table
            dataSource={users}
            columns={columns}
            onRow={(record, rowIndex) => {
                return {
                    onClick: redirect(record._id), // click row
                }
            }}
        />
    )
}

export default UsersTable
