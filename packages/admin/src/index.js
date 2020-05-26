import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import { Router } from 'react-router-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import * as models from './models'
import history from './utils/history'
const store = init({
    models,
})

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
