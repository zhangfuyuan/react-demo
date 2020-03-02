import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option
const isAutoCall = ['autoCall', 'notAutoCall']
const autoMethods = {
    autoCall: ['检测方法一', '检测方法二', '检测方法三'],
    notAutoCall: ['无']
}

const isAutoRepair = ['autoRepair', 'notAutoRepair']
const RepairMethods = {
    autoRepair: ['修复方法一', '修复方法二', '修复方法三'],
    notAutoRepair: ['无']
}

class AddUpdataForm extends Component {

    static propTypes = {
        setForm: PropTypes.func,
        serverItem: PropTypes.object
    }

    state = {
        fristSelect: autoMethods[isAutoCall[0]],
        secondSelect: autoMethods[isAutoCall[0]][0],
        selectIsAutoRepair: RepairMethods[isAutoRepair[0]],
        selectRepairMethod: RepairMethods[isAutoRepair[0]][0]
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    handleAutoCallChange = value => {
        this.setState({
            fristSelect: autoMethods[value],
            secondSelect: autoMethods[value][0],
        });
    };

    handleAutoMethodChange = value => {
        this.setState({
            secondSelect: value,
        });
    };

    handleAutoRepairChange = value => {
        this.setState({
            selectIsAutoRepair: RepairMethods[value],
            selectRepairMethod: RepairMethods[value][0],
        });
    };

    handleRepairMethodChange = value => {
        this.setState({
            selectRepairMethod: value,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form
        const { fristSelect, selectIsAutoRepair } = this.state
        console.log(this.props.serverItem)
        const { name, type, person, autoCall, detectionMethods, autoRepair, repairMethods, config } = this.props.serverItem
        const formItemLayout = {
            labelCol: {
                xs: { span: 14 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 14 },
                sm: { span: 16 }
            }
        }
        return (
            <Form {...formItemLayout}>
                <Item label="服务名称">
                    {getFieldDecorator('name', {
                        initialValue: name || '',
                        rules: [{ required: true, message: '服务名称不能为空' }]
                    })(
                        <Input
                            placeholder="请输入服务名称"
                        />
                    )}
                </Item>
                <Item label="服务类型">
                    {getFieldDecorator('type', {
                        initialValue: type || '',
                        rules: [{ required: true, message: '服务类型不能为空' }]
                    })(
                        <Input
                            placeholder="请输入服务类型"
                        />
                    )}
                </Item>
                <Item label="负责人">
                    {getFieldDecorator('person', {
                        initialValue: person || '',
                        rules: [{ required: true, message: '负责人不能为空' }]
                    })(
                        <Input
                            placeholder="请输入负责人姓名"
                        />
                    )}
                </Item>
                <Item label="自动报警">
                    {getFieldDecorator('autoCall', {
                        initialValue: autoCall || '',
                        rules: []
                    })(
                        <Select
                            placeholder="请选择是否开启自动报警"
                            style={{ width: 200 }}
                            onChange={this.handleAutoCallChange}
                        >
                            {isAutoCall.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    )}
                </Item>
                <Item label="检测方式">
                    {getFieldDecorator('detectionMethods', {
                        initialValue: detectionMethods || '',
                        rules: []
                    })(
                        <Select
                            placeholder="请选择自动检测的方式"
                            style={{ width: 200 }}
                            onChange={this.handleAutoMethodChange}
                        >
                            {fristSelect.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    )}
                </Item>
                <Item label="自动修复">
                    {getFieldDecorator('autoRepair', {
                        initialValue: autoRepair || '',
                        rules: []
                    })(
                        <Select
                            placeholder="请选择是否开启自动修复"
                            style={{ width: 200 }}
                            onChange={this.handleAutoRepairChange}
                        >
                            {isAutoRepair.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    )}
                </Item>
                <Item label="修复方法">
                    {getFieldDecorator('repairMethods', {
                        initialValue: repairMethods || '',
                        rules: []
                    })(
                        <Select
                            // value={this.state.selectRepairMethod}
                            placeholder="请选择自动修复的方式"
                            style={{ width: 200 }}
                            onChange={this.handleRepairMethodChange}
                        >
                            {selectIsAutoRepair.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    )}
                </Item>
                <Item label="配置信息">
                    {getFieldDecorator('config', {
                        initialValue: config || '默认配置',
                        rules: []
                    })(
                        <Input
                            placeholder="请输入配置信息"
                        />
                    )}
                </Item>
            </Form>
        );
    }
}

export default Form.create({})(AddUpdataForm);
