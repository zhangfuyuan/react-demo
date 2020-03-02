import React, { Component } from 'react'
import './index.less'
import { Link, withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
import { reqInfoFormApi } from '../../api/index'

const { SubMenu } = Menu

class LeftNav extends Component {

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }

            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {this.getMenuNodes(item.children)}
                </SubMenu>
            )
        })
    }

    getInfoFromApi = async () => {
        const result = await reqInfoFormApi()
        console.log(result)
    }

    render() {
        const key = this.props.location.pathname === '/' ? '/home' : this.props.location.pathname
        return (
            <div className='left-nav'>
                <Link className='left-nav-header' to={key} onClick={this.getInfoFromApi}>
                    <img src={logo} alt="logo" />
                </Link>
                <Menu
                    defaultSelectedKeys={key || '/home'}
                    mode="inline"
                    theme="dark"
                >
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)