import React, { Component } from 'react'
import { Card, Table, Button, Modal, message, Popconfirm } from 'antd'
import LinkButton from '../../components/LinkButton'
import { reqUserInfo, reqAddUser, reqUpdataUser, reqDeleteUser } from '../../api/index'
import AddUpdataForm from './add-updata-form'

export default class Home extends Component {

    state = {
        userList: [],
        showStatus: 0,//标识编辑对话框的状态和用途0:修改1:添加2:编辑
    }

    componentWillMount() {
        this.initColumns()
    }

    confirm = async (deleteId) => {
        await reqDeleteUser(deleteId)
        this.getUserList()
        message.success('Delete success !');
    }

    cancel = () => {
        message.error(' Cancel delete !');
    }

    initColumns = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name'
            },
            {
                title: '邮箱地址',
                dataIndex: 'eMail',
            },
            {
                title: '移动电话',
                dataIndex: 'phone',
            },
            {
                title: '账号',
                dataIndex: 'username',
            },
            {
                title: '密码',
                dataIndex: 'password',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record, index) => (
                    <span>
                        <LinkButton onClick={() => {
                            this.updataId = record.id
                            this.record = record
                            this.setState({
                                showStatus: 2
                            })
                        }}>edit</LinkButton>
                        <Popconfirm
                            title="Are you sure delete this task?"
                            onConfirm={this.confirm.bind(this, record.id)}
                            onCancel={this.cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="#">Delete</a>
                        </Popconfirm>
                    </span>
                ),
                width: '150px'
            }
        ]
    }

    componentDidMount() {
        this.getUserList()
    }

    getUserList = async () => {
        const userInfo = await reqUserInfo()
        this.setState({
            userList: userInfo
        })
    }

    handleOk = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.form.resetFields()
                const userItem = values
                console.log(userItem)
                if (this.state.showStatus === 1) {
                    await reqAddUser(userItem)
                    message.success('添加用户记录成功~')
                }
                if (this.state.showStatus === 2) {
                    userItem.id = this.updataId
                    await reqUpdataUser(userItem)
                    message.success('修改用户记录成功~')
                }
                this.setState({
                    showStatus: 0
                })
                this.getUserList()
            }
        })
    }

    handleCancel = () => {
        this.form.resetFields()
        this.setState({
            showStatus: 0
        })
    }

    render() {

        const userItem = this.record || {}
        const extra = (
            <Button
                type="primary"
                icon="plus"
                onClick={() => { this.setState({ showStatus: 1 }) }}
            >
                Add
            </Button>
        )

        return (
            <Card extra={extra} style={{ width: '100%', height: '100%' }}>
                <Table
                    dataSource={this.state.userList}
                    columns={this.columns}
                    bordered={true}
                    rowKey="id"
                    pagination={{ defaultPageSize: 8, showQuickJumper: true }}
                />
                <Modal
                    title={this.state.showStatus === 1 ? "添加用户" : "修改用户信息"}
                    visible={this.state.showStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddUpdataForm setForm={form => this.form = form} userItem={userItem} />
                </Modal>
            </Card>
        )
    }
}
