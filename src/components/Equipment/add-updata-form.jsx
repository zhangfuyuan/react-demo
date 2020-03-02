import React, { Component } from 'react';
import { Input, Icon, Form } from 'antd';
import PropTypes from 'prop-types'
import './index.less'

const Item = Form.Item

export class AddUpdataForm extends Component {

    static propTypes = {
        setForm: PropTypes.func,
        equipmentItem: PropTypes.object
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    handleCancel = () => { this.setState({ showModal: false }) }

    handleOk = () => { this.setState({ showModal: false }) }

    handleChange = e => { console.log(e) }

    render() {
        const { getFieldDecorator } = this.props.form
        const { name, id, outIp, inIp, port, config, org, person } = this.props.equipmentItem
        const { configOne, configTwo, configThree } = config || {}

        return (
            <Form>
                <Item>
                    {getFieldDecorator('name', {
                        initialValue: name || '',
                        rules: [{ required: true, message: '请输入设备名' }]
                    })(
                        <Input
                            placeholder="输入设备名"
                            prefix={<Icon type="tool" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('id', {
                        initialValue: id || '',
                        rules: [{ required: true, message: '请输入设备ID' }]
                    })(
                        <Input
                            placeholder="请输入设备ID"
                            prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('outIp', {
                        initialValue: outIp || '',
                        rules: [{ required: true, message: '请输入外网IP' }]
                    })(
                        <Input
                            placeholder="请输入外网IP"
                            prefix={<Icon type="fire" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('inIp', {
                        initialValue: inIp || '',
                        rules: [{ required: true, message: '请输入内网IP' }]
                    })(
                        <Input
                            placeholder="请输入内网IP"
                            prefix={<Icon type="fire" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('port', {
                        initialValue: port || '',
                        rules: [{ required: true, message: '请输入端口号' }]
                    })(
                        <Input
                            placeholder="输入端口号"
                            prefix={<Icon type="api" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('org', {
                        initialValue: org || '',
                        rules: [{ required: true, message: '请输入域名' }]
                    })(
                        <Input
                            placeholder="输入域名"
                            prefix={<Icon type="share-alt" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('person', {
                        initialValue: person || '',
                        rules: [{ required: true, message: '请输入负责人姓名' }]
                    })(
                        <Input
                            placeholder="输入负责人姓名"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </Item>
                <label style={{ display: 'block', fontWeight: 'blod', paddingBottom: '10px' }}>配置信息</label>
                <Item label="配置一：" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                    {getFieldDecorator('configOne', {
                        initialValue: configOne || '默认配置一',
                        rules: []
                    })(
                        <Input
                            placeholder="请输入配置信息"
                        />
                    )}
                </Item>
                <Item label="配置二：" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                    {getFieldDecorator('configTwo', {
                        initialValue: configTwo || '默认配置二',
                        rules: []
                    })(
                        <Input
                            placeholder="请输入配置信息"
                        />
                    )}
                </Item>
                <Item label="配置三：" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                    {getFieldDecorator('configThree', {
                        initialValue: configThree || '默认配置三',
                        rules: []
                    })(
                        <Input
                            placeholder="请输入配置信息"
                        />
                    )}
                </Item>
            </Form>
        )
    }
}

export default Form.create({})(AddUpdataForm);
