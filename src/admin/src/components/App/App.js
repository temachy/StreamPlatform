import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { Route } from 'react-router-dom'
import PrivateRoute from '../AuthHOC'
import Login from '../Login'
const App = (props) => {
    useEffect(() => {
        props.checkAuth()
    }, [])

    if (props.auth === undefined) return <Spin />
    return (
        <>
            <PrivateRoute path={'/'} component={Dashboard} />
            <Route exact path={'/login'} component={Login} />
        </>
    )
}

const mapDispatch = ({ auth: { checkAuth } }) => ({
    checkAuth,
})

const mapState = (state) => ({
    auth: state.auth.user,
})

export default connect(mapState, mapDispatch)(App)
