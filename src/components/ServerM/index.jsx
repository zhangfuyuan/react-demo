import React, { Component, Fragment } from 'react'
import {
    Button,
    Card,
    Table,
    Divider,
    Popconfirm,
    Popover,
    Modal,
    message
} from 'antd'
import { reqSeverMessages, reqAddServerM, reqUpdataServerM, reqDeleteServerM } from '../../api/index'
import LinkButton from "../../components/LinkButton";
import AddUpdataForm from './add-updata-form';

export default class ServerM extends Component {

    state = {
        serverMessageList: [],
        showModal: 0
    }

    componentDidMount() {
        this.getServerMInfo()
    }

    componentWillMount() {
        this.serverMsInit()
    }

    getServerMInfo = async () => {
        const result = await reqSeverMessages()
        const serverMessageList = result
        this.setState({
            serverMessageList
        })
    }

    serverMsInit = () => {
        this.columns = [
            {
                title: '服务名',
                dataIndex: 'name'
            },
            {
                title: '服务类型',
                dataIndex: 'type'
            },
            {
                title: '负责人',
                dataIndex: 'person'
            },
            {
                title: '是否自动报警',
                dataIndex: 'autoCall'
            },
            {
                title: '是否自动修复',
                dataIndex: 'autoRepair'
            },
            {
                title: '自动检测方法',
                dataIndex: 'detectionMethods',
                render: (text, record) => {
                    return (
                        <Fragment>
                            查看详情
                            <Divider type='vertical' />
                            <Popover content={record.detectionMethods} title="检测方法">
                                <Button type="link">Detail</Button>
                            </Popover>
                        </Fragment>
                    )
                }
            },
            {
                title: '自动修复方法',
                dataIndex: 'repairMethods',
                render: (text, record) => {
                    return (
                        <Fragment>
                            查看详情
                            <Divider type='vertical' />
                            <Popover content={record.repairMethods} title="修复方法">
                                <Button type="link">Detail</Button>
                            </Popover>
                        </Fragment>
                    )
                }
            },
            {
                title: '配置信息',
                dataIndex: 'config',
                render: (text, record) => {
                    return (
                        <Fragment>
                            查看详情
                            <Divider type='vertical' />
                            <Popover content={record.config} title="配置信息">
                                <Button type="link">Detail</Button>
                            </Popover>
                        </Fragment>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                width: 150,
                render: (text, record) => {
                    return (
                        <span>
                            <LinkButton
                                onClick={() => {
                                    this.record = record
                                    this.setState({ showModal: 2 })
                                }}
                            >Edit</LinkButton>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="Are you sure delete this task?"
                                onConfirm={this.confirm.bind(this, record.id)}
                                onCancel={this.cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="#">Delete</a>
                            </Popconfirm >
                        </span>
                    )
                }
            }
        ]
    }
    confirm = async deleteId => {
        await reqDeleteServerM(deleteId)
        message.success('成功删除服务~')
        this.getServerMInfo()
    }
    cancel = () => {
        message.error('您取消了删除服务~')
    }
    handleOk = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.form.resetFields()
                let newItem = values
                const { autoCall, autoRepair } = values
                newItem.autoCall = autoCall === 'autoCall' ? '是' : '否'
                newItem.autoRepair = autoRepair === 'autoRepair' ? '是' : '否'
                if (this.state.showModal === 1) {
                    await reqAddServerM(newItem)
                    message.success('成功添加服务信息~')
                }
                if (this.state.showModal === 2) {
                    newItem.id = this.record.id
                    await reqUpdataServerM(newItem)
                    message.success('成功修改服务信息')
                }
                this.getServerMInfo()
            }

        })
        this.setState({ showModal: 0 })
    }
    handleCancel = () => {
        this.form.resetFields()
        this.setState({ showModal: 0 })
    }
    render() {
        const { showModal } = this.state
        const serverItem = this.record || {}
        const extra = (
            <Button
                type="primary"
                icon="plus"
                onClick={() => { this.setState({ showModal: 1 }) }}
            >
                Add
            </Button>
        )

        return (
            <Card extra={extra} style={{ width: '100%', height: '100%' }}>
                <Table
                    dataSource={this.state.serverMessageList}
                    columns={this.columns}
                    bordered={true}
                    rowKey='id'
                    pagination={{ defaultPageSize: 8, showQuickJumper: true }}
                />
                <Modal
                    title={showModal === 1 ? '添加服务' : '修改服务'}
                    visible={showModal !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddUpdataForm setForm={form => this.form = form} serverItem={serverItem} />
                </Modal>
            </Card>
        )
    }
}
