import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import FastClick from 'fastclick'
import {RouteAPP} from './router.jsx'
import store from './store'

import './style/base.scss'

FastClick.attach(document.body)

ReactDOM.render(
    <Provider store={store}>
        <RouteAPP/>
    </Provider>,
    document.getElementById('root')
)


