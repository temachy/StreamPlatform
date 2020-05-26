import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
const AuthHOC = ({ isLogged, roles, user, ...restProps }) => {
    if (isLogged) {
        if (roles && roles.includes(user.role)) {
            return <Route {...restProps} />
        } else if (roles) {
            return <Redirect to={'/'} />
        }

        return <Route {...restProps} />
    }

    return <Redirect to={'/login'} />
}

const mapStateToProps = (state) => ({
    isLogged: state.auth.isLogged,
    user: state.auth.user,
})

export default connect(mapStateToProps)(AuthHOC)
