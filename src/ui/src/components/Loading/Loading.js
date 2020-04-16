import React from 'react'
import { Spin } from 'antd'

const Loading = ({ isLoaded, children }) => {
    console.log('isLoaded', isLoaded)
    if (isLoaded) return children
    return <Spin />
}

export default Loading
