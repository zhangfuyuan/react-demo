import React, { Component } from 'react'
import { Card, Table, Button, Popconfirm, Modal, message, Divider, Popover } from 'antd'
import { reqAddEquipment, reqDeleteEquipment, reqEquipmentData, reqUpdataEquipment } from '../../api/index'
import LinkButton from '../LinkButton'
import AddUpdataForm from './add-updata-form'

export default class Equipment extends Component {

    state = {
        EquipmentList: [],
        showModal: 0
    }

    componentWillMount() {
        this.columnsInit()
    }
    componentDidMount() {
        this.getEquipmentInfo()
    }
    getEquipmentInfo = async () => {
        let result = await reqEquipmentData()
        let EquipmentList = result
        EquipmentList.map((item, index) => {
            return item.config = JSON.parse(result[index].config)
        });
        this.setState({
            EquipmentList
        })
    }

    columnsInit = () => {
        this.columns = [
            {
                title: '设备名',
                dataIndex: 'name'

            },
            {
                title: '设备ID',
                dataIndex: 'id'
            },
            {
                title: '外网IP',
                dataIndex: 'outIp'
            },
            {
                title: '内网IP',
                dataIndex: 'inIp'
            },
            {
                title: '开放端口',
                dataIndex: 'port'
            },
            {
                title: '域名',
                dataIndex: 'org'
            },
            {
                title: '负责人',
                dataIndex: 'person'
            },
            {
                title: '配置信息',
                dataIndex: 'config',
                render: (text, record, index) => {
                    const config = record.config || {}
                    let content = ''
                    for (let values in config) {
                        content += `${values}:${config[values]}\n`
                    }
                    return (
                        <span>
                            点击查看详细配置
                            <Divider type="vertical" />
                            <Popover content={content} title="Title">
                                <Button type="link">Detail</Button>
                            </Popover>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 200,
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
                                <a href={"#"}>Delete</a>
                            </Popconfirm >
                        </span>
                    )
                }
            }
        ]
    }
    confirm = async (deleteId) => {
        await reqDeleteEquipment(deleteId)
        message.success('设备删除成功')
        this.getEquipmentInfo()
    }
    cancel = () => {
        message.error('您选择了取消！')
    }

    onOk = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.form.resetFields()
                const { configOne, configTwo, configThree, name, port, outIp, inIp, person, id, org } = values
                const config = JSON.stringify({ configOne, configTwo, configThree })
                const equipmentItem = { name, id, inIp, outIp, port, person, org }
                equipmentItem.config = config
                if(this.state.showModal===1){
                    await reqAddEquipment(equipmentItem)
                    message.success('恭喜你，成功添加设备~')
                }
                if(this.state.showModal===2){
                    await reqUpdataEquipment(equipmentItem)
                    message.success('恭喜你，成功修改设备信息')
                }
                this.getEquipmentInfo()
            }
        })
        this.setState({
            showModal: 0
        })
    }
    onCancel = () => {
        this.form.resetFields()
        this.setState({
            showModal: 0
        })
    }

    render() {

        const { showModal } = this.state
        const equipmentItem = this.record || {}

        const extra = (
            <Button
                type="primary"
                icon="plus"
                onClick={() => {
                    this.setState({
                        showModal: 1
                    })
                }}
            >
                Add
            </Button>
        )

        return (
            <Card extra={extra} style={{ width: '100%', height: '100%' }}>
                <Table
                    dataSource={this.state.EquipmentList}
                    columns={this.columns}
                    rowKey='id'
                    bordered={true}
                    pagination={{ defaultPageSize: 8, showQuickJumper: true }}
                />

                <Modal
                    title={showModal === 1 ? "添加设备信息" : "修改设备信息"}
                    visible={showModal !== 0}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                >
                    <AddUpdataForm setForm={form => this.form = form} equipmentItem={equipmentItem} />
                </Modal>
            </Card>
        )
    }
}
