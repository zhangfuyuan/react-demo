import React, { Component } from 'react'
import { Modal } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import storageUtils from "../../utils/storageUtils"

class Header extends Component {

    state = {
        currentTime: ''
    }

    loginOut = () => {
        Modal.confirm({
            title: '确定退出么？',
            onOk: () => {
                this.props.history.replace('/login')
                storageUtils.removeUser()
            },
            onCancel: () => {
                console.log('cancel')
            }
        })
    }

    componentDidMount = () => {
        //启动循环定时器
        this.intervalId = setInterval(() => {
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000)
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalId)
    }

    getTitle = (menuList) => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                [item.children].forEach(childItem => {
                    if (childItem.title === path) title = childItem.title
                })
            }
        })
        return title
    }

    render() {
        const title = this.getTitle(menuList)
        const user_info = storageUtils.getUser()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎 {user_info.username}，</span>
                    <Link to="#" onClick={this.loginOut}>退出</Link>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <h2>{title}</h2>
                    </div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="多云" />
                        <span>多云</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Header)