import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from './utils/asyncComponent'

const profile = asyncComponent(() => import("./pages/profile/profile.jsx"))
const login = asyncComponent(() => import("./pages/login/login"))
const msite = asyncComponent(() => import("./pages/msite/msite"))
const shop = asyncComponent(() => import("./pages/shop/shop"))
const aboutMe = asyncComponent(() => import("./pages/aboutMe/aboutMe"))

export class RouteAPP extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/profile" component={profile}/>
                    <Route path="/login" component={login}/>
                    <Route path="/msite" component= {msite}/>
                    <Route path="/shop/:id"  component= {shop}/>
                    <Route path="/about"  component= {aboutMe}/>
                    <Redirect exact from='/' to='/profile'/>
                    <Route component={profile}/>
                </Switch>
            </HashRouter>
        )
    }
}
