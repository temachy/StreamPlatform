import React, { useEffect } from 'react'
import Routes from '../Routes'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
const App = (props) => {
    useEffect(() => {
        props.checkAuth()
    }, [])

    if (props.auth === undefined) return <Spin />
    return (
        <Routes />
        // <Switch>
        //     <Route exact path={'/'} component={Routes} />
        //     {/* <Route exact path={'/dashboard/*'} component={Dashboard} /> */}
        // </Switch>
    )
}

const mapDispatch = ({ auth: { checkAuth } }) => ({
    checkAuth,
})

const mapState = (state) => ({
    auth: state.auth.user,
})

export default connect(mapState, mapDispatch)(App)
