import React, { Component } from 'react'
// import { Button } from 'antd'
import {  HashRouter, Switch, Route } from 'react-router-dom'
import './api'
import './App.css'

import Login from './pages/Login'
import Admin from './pages/Admin'

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path="/" component={Admin} />
                </Switch>
            </HashRouter>
        )
    }
}

