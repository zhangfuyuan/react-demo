import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Message } from 'antd';
import './index.less'
import logo from '../../assets/images/logo.png'
import { reqLogin,reqInfoFormApi } from '../../api/index'
import storageUtils from '../../utils/storageUtils'



class Login extends Component {

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields(async (err, { username, password }) => {
            if (!err) {
                const result = await reqLogin(username, password)
                console.log(result)
                if (result[0]) {
                    storageUtils.saveUser(result[0])
                    Message.info(`欢迎你 ${username}`)
                    this.props.history.replace('/')
                } else {
                    Message.warning(`用户名或密码输入错误`)
                }
            }
        })
    }
    handleGetInfoFormApi= async()=>{
           const result =await reqInfoFormApi()
           console.log(result)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const user_info = storageUtils.getUser()
        if (user_info.id) {
            return <Redirect to="/" />
        }

        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>设备服务自动管理系统</h1>
                </div>
                <div className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, whitespace: true, message: 'Please input your username!' },
                                    { min: 4, message: '用戶名長度必須大於等於四位！' },
                                    { max: 12, message: '用戶名長度必須小於等於十二位！' },
                                    { pattern: /^[0-9a-zA-Z_]*$/, message: '用戶名衹能由數字字母和_組成！' }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, whitespace: true, message: 'please input your password!' }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )}

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Button type="primary" onClick={this.handleGetInfoFormApi}>点我点我</Button>
            </div>
        )
    }
}
const WrapperForm = Form.create({ name: 'normal_login' })(Login)
export default WrapperForm

