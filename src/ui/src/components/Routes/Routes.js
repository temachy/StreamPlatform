import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import PrivateRoute from '../AuthHOC'
import Login from '../Login/Login'
import Header from '../Header'
import UploadVideo from '../UploadVideo'
import Main from '../Main'
import styles from './Routes.module.scss'

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
                        path={'/upload-video'}
                        component={UploadVideo}
                    />
                    <Route exact path="/login" component={Login} />
                </Content>
                <Route component={NotFound} />
            </Switch>
        </Layout>
    )
}

export default Routes
