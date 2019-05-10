import React, { Component } from 'react'
import Header from './common/header'
import { HashRouter as Router, Route } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style.js'
import { GlobalIconStyle } from './statics/iconfont/iconfont'
import Home from './pages/home'
import Login from './pages/login'
import Detail from './pages/detail/loadable'
import Write from './pages/write'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <GlobalIconStyle />
        <Provider store={store}>
          <Router>
            {/* <Header /> */}
            <Route path='/' exact component={ Home }></Route>
            <Route path='/login' exact component={ Login }></Route>
            <Route path='/detail/:id' exact component={ Detail }></Route>
            <Route path='/write' exact component={ Write }></Route>
          </Router>
        </Provider>
      </React.Fragment>
    )
  }
}

export default App
