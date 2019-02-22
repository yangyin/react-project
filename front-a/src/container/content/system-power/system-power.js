import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, DatePicker, Button, Table, Popconfirm } from 'antd';

import Panel from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';
import Utils from '@/utils/utils';
import PowerDrawer from './views/power-drawer';

import {
    getSysPowerSearchUserAction,
    sysPowerClearUser,
    sysPowerAddAuth,
    sysPowerAddAuthSuc,
    sysPowerSelectAuthList,
    sysPowerUpdateAuthStateAction
} from './store/action';

import './system-power.less';

const panelData = { title: '系统权限' };
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(
    state => ({
        systemPower: state.get('systemPower')
    }),
    { getSysPowerSearchUserAction, sysPowerClearUser, sysPowerAddAuth, sysPowerAddAuthSuc, sysPowerSelectAuthList, sysPowerUpdateAuthStateAction }
)
@Form.create()
class SystemPower extends PureComponent {
    state = {
        visible: false
    }
    params = {
        pageSize: 10,
        pageNum: 1,
        userName: '',//用户名
        userPhone: '',//电话
        startTime: '',//开始时间
        endTime: ''//结束时间
    }
    columns = [
        { title: '账号', dataIndex: 'userCode' },
        { title: '手机号', dataIndex: 'userPhone' },
        { title: '姓名', dataIndex: 'userName' },
        { title: '企业名称', dataIndex: 'companyName' },
        { title: '添加时间', dataIndex: 'create_time' },
        { title: '状态', dataIndex: 'state', render: (text) => { return parseInt(text) === 0 ? '停用' : '启用'; } },
        {
            title: '操作', render: (rext, record) => {
                return parseInt(record.state) === 0
                    ? <Popconfirm title="确定要启用?" onConfirm={() => this.handleAction(record)} okText="确定" cancelText="取消">
                        <a style={{ color: '#1890ff' }} href="#">启用</a>
                    </Popconfirm>
                    : <Popconfirm title="确定要停用?" onConfirm={() => this.handleAction(record)} okText="确定" cancelText="取消">
                        <a style={{ color: 'red' }} href="#">停用</a>
                    </Popconfirm>
            }
        },
    ]
    componentDidMount() {
        this.props.sysPowerSelectAuthList(this.params);
    }
    componentWillReceiveProps(nextProps) {
        const isUpdate = nextProps.systemPower.get('isUpdate');

        if (isUpdate) {
            this.props.sysPowerAddAuthSuc({ status: false });
            if (this.state.visible) {
                this.setState({
                    visible: false
                })

            }
            this.props.sysPowerSelectAuthList(this.params);
        }
    }
    //停用 / 启用
    handleAction = ({ id, state }) => {
        this.props.sysPowerUpdateAuthStateAction({ id, state: parseInt(state) === 0 ? 1 : 0 });
    }
    //新增账号按钮事件
    handleAddBtn = () => {
        this.setState({
            visible: true
        })
    }
    //关闭弹窗
    onClose = () => {
        this.setState({
            visible: false
        })
        this.props.sysPowerClearUser();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const user = this.props.systemPower.get('user');
        const isJur = this.props.systemPower.get('isJur');
        const auth = this.props.systemPower.get('auth').toJS();
        return (
            <React.Fragment>
                {!isJur ? <div>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24 }}>
                        <Form layout="inline" onSubmit={this.handleSubmit} style={{ height: 70 }}>
                            <FormItem
                                label="手机号码"
                            >
                                {getFieldDecorator('userPhone', {
                                    rules: [
                                        { validator: Utils.validFhone }
                                    ]
                                })(
                                    <Input autoComplete="off" />
                                )}
                            </FormItem>
                            <FormItem
                                label="姓名"
                            >
                                {getFieldDecorator('userName')(
                                    <Input autoComplete="off" />
                                )}
                            </FormItem>
                            <FormItem
                                label="添加时间"
                            >
                                {getFieldDecorator('time')(
                                    <RangePicker onChange={this.handleRangPickerChange} />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button htmlType="submit">查 询</Button>
                                <Button style={{ marginLeft: 20 }} type="primary" onClick={this.handleAddBtn}>新增账号</Button>
                            </FormItem>
                        </Form>
                        <Table
                            rowKey="id"
                            columns={this.columns}
                            dataSource={auth.rows}
                            pagination={
                                Utils.pagination({ total: auth.totals, pageNum: this.params.pageNum }, (current) => {
                                    this.params.pageNum = current;
                                    this.props.sysPowerSelectAuthList(this.params);
                                })
                            }
                        />
                    </Card>
                    <PowerDrawer
                        user={user}
                        visible={this.state.visible}
                        onSearch={this.onSearch}
                        close={this.onClose}
                        addAuth={this.addAuth}
                    />
                </div> : <Unauthorized />}
            </React.Fragment>
        );
    }

    //日期变化回调
    handleRangPickerChange = (data, dateStrings) => {
        this.params.startTime = dateStrings[0];
        this.params.endTime = dateStrings[1];
    }
    //查询
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.params.pageNum = 1;
                this.params.userPhone = values.userPhone;
                this.params.userName = values.userName;
                this.props.sysPowerSelectAuthList({ ...this.params, userPhone: values.userPhone, userName: values.userName });
            }
        });
    }
    //弹窗查询
    onSearch = (data) => {
        this.props.getSysPowerSearchUserAction(data);
    }
    //添加数据
    addAuth = (data) => {
        this.props.sysPowerAddAuth(data);
    }
}

export default SystemPower;