import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../components/LeftNav'
import Header from '../../components/Header'
import Home from '../../components/Home'
import Equipment from '../../components/Equipment'
import ServerM from '../../components/ServerM'
import storageUtils from '../../utils/storageUtils'
import  CalenderPage  from "../../components/CalenderPage";
import './index.less'

const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
    render() {

        const user_info = storageUtils.getUser()

        if(!user_info.id){
            return <Redirect to="/login" />
        }

        return (
            <Layout style={{ height: '100%', backgroundColor: 'rgba(244,244,244,.5)' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content>
                        <div className="content">
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/equipment' component={Equipment} />
                                <Route path='/serverm' component={ServerM} />
                                <Route path='/calender' component={CalenderPage} />
                                <Redirect to='/home' />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>Copyright ©lango-tech.com. All Rights Reserved. 粤ICP备14024048号 | 朗国电子科技有限公司</Footer>
                </Layout>
            </Layout >
        )
    }
}
