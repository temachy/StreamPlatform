import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
const AuthHOC = props => {
    const isLogged = props.isLogged

    if (isLogged) {
        return <Route {...props} />
    }

    return <Redirect to={'/login'} />
}

const mapStateToProps = state => ({
    isLogged: state.auth.isLogged,
})

export default connect(mapStateToProps)(AuthHOC)
