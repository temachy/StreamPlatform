import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './Routes.module.scss'

import PrivateRoute from '../AuthHOC'
import Login from '../Login/Login'
import Header from '../Header'
import UploadVideo from '../UploadVideo'
import Main from '../Main'
import UserPage from '../UserPage'
import VideoPage from '../VideoPage'
import SignUp from '../SignUp'
import Dashboard from '../Dashboard'

const { Content } = Layout

const NotFound = () => <div>404</div>
const Routes = () => {
    return (
        <Layout className={styles.layout}>
            <PrivateRoute path={'/'} component={Header} />

            <Switch>
                <Content className={styles.content}>
                    <PrivateRoute exact path={'/'} component={Main} />
                    <PrivateRoute
                        exact
                        path={'/upload'}
                        component={UploadVideo}
                    />
                    <PrivateRoute
                        exact
                        path={'/users/:id'}
                        component={UserPage}
                    />
                    <PrivateRoute
                        exact
                        path={'/video/:id'}
                        component={VideoPage}
                    />

                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                </Content>
                <Route component={NotFound} />
            </Switch>
        </Layout>
    )
}

export default Routes
