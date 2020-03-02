import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Icon
} from 'antd'

const Item = Form.Item



export class AddUpdataForm extends Component {

    static propTypes = {
        // 声明接收了一个函数叫setForm
        setForm: PropTypes.func,
        userItem: PropTypes.object
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { name, eMail, phone, username, password } = this.props.userItem
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('name', {
                            initialValue: name || '',
                            rules: [
                                { required: true, whitespace: true, message: '姓名不能为空' }
                            ]
                        })(
                            <Input
                                placeholder="请输入您的姓名"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('eMail', {
                            initialValue: eMail || '',
                            rules: [
                                { required: true, whitespace: true, message: '邮箱不能为空' },
                                { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱输入格式不正确' }
                            ]
                        })(
                            <Input
                                placeholder="请输入您的E-mail"
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('phone', {
                            initialValue: phone || '',
                            rules: [
                                { required: true, whitespace: true, message: '移动电话不能为空' },
                                { pattern: /^[0-9]{4}-[0-9]{8}$/, message: '电话格式应为****-********' }
                            ]
                        })(
                            <Input
                                placeholder="请输入您的联系方式"
                                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('username', {
                            initialValue: username || '',
                            rules: [
                                { required: true, whitespace: true, message: '账号不能为空' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '账号只能包含字母、数字和_' },
                                { min: 4, max: 12, message: '账号长度应在4-12位之间' }
                            ]
                        })(
                            <Input
                                placeholder="请输入您的登录账号"
                                prefix={<Icon type="login" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('password', {
                            initialValue: password || '',
                            rules: [
                                { required: true, whitespace: true, message: '密码不能为空' },
                                { min: 4, max: 12, message: '密码长度应在4-12位之间' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '密码只能包含字母、数字和_' }
                            ]
                        })(
                            <Input
                                placeholder="请输入您的密码"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        )
                    }
                </Item>
            </Form>
        );
    }
}

export default Form.create({ name: 'register' })(AddUpdataForm);
