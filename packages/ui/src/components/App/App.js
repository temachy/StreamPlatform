import React, { useEffect } from 'react'
import Routes from '../Routes'
import { connect } from 'react-redux'
import { Spin } from 'antd'

const App = (props) => {
    useEffect(() => {
        props.checkAuth()
    }, [])

    if (props.auth === undefined) return <Spin />
    return <Routes />
}

const mapDispatch = ({ auth: { checkAuth } }) => ({
    checkAuth,
})

const mapState = (state) => ({
    auth: state.auth.user,
})

export default connect(mapState, mapDispatch)(App)
