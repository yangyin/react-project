import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Input, Button, Table, Popconfirm } from 'antd';


import './../../setting.less';

import {
    getSettingAdPosListAction,
    settingAction,
    settingAdPosUpdate,
    settingAdPosUpdateState,
    settingAdClear,
    jurisdictionStatus
} from './../../store/actions';

import Panel from '@/components/panel/panel';
import PosDrawer from './pos-drawer';
import Utils from '@/utils/utils';
import { Unauthorized } from '@/container/error-page/not-found-page';
import { utils } from 'redux-saga';

const FormItem = Form.Item;
const panelData = { title: '广告位' };

@connect(
    state => ({
        setting: state.get('setting')
    }),
    { getSettingAdPosListAction, settingAction, settingAdPosUpdate, settingAdPosUpdateState ,settingAdClear, jurisdictionStatus}
)
@Form.create()
class AdPos extends PureComponent {
    state = {
        visible: false,
        type: 1,//1:新增，2：编辑 3:查看
    }
    params = {
        pageSize: 10,
        pageNum: 1,
        positionName: '',
        positionNo: ''
    }
    drawerData = {};
    columns = [
        { title: '位置编号', dataIndex: 'positionNo' },
        { title: '位置名称', dataIndex: 'positionName' },
        { title: '所属平台', dataIndex: 'platformName' },
        { title: '创建时间', dataIndex: 'createTime' },
        { title: '状态', dataIndex: 'positionState', render(text) { return parseInt(text) === 0 ? '停用' : '启用'; } },
        {
            title: '操作', render: (text, record) => {
                return (
                    <React.Fragment>
                        {
                            parseInt(record.positionState) === 0
                                ? <Popconfirm title="确定启用吗？" onConfirm={() => this.handleAction(record)}  okText="确定" cancelText="取消">
                                        <a>启用 </a>
                                    </Popconfirm>
                                : <Popconfirm title="确定停用吗？" onConfirm={() => this.handleAction(record)}  okText="确定" cancelText="取消">
                                        <a style={{ color: 'red' }}>停用 </a>
                                    </Popconfirm>
                        }
                        |<a onClick={() => this.handleEdit(record)}> 编辑 </a>
                        |<a onClick={() => this.handleDetails(record)}> 查看</a>
                    </React.Fragment>
                )
            }
        },
    ];
    handleAction = ({positionNo,positionState}) => {
        this.props.settingAdPosUpdate({positionNo,positionState:positionState === 0 ? 1:0});
    }
    componentDidMount() {
        this.props.getSettingAdPosListAction(this.params);
    }
    componentWillReceiveProps(nextProps) {
        const nextUpdate = nextProps.setting.get('isUpdate');
        if (nextUpdate) {
            this.props.settingAdPosUpdateState({ status: false });
            this.params.pageNum = 1;
            this.props.getSettingAdPosListAction(this.params);
            this.state.visible && this.setState({
                visible: false
            })
        }
    }
    componentWillUnmount() {
        this.props.settingAdClear();
        this.props.jurisdictionStatus(false);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { positionNo, positionName } = values;
                this.params.positionName =Utils.replaceSpace(positionName);
                this.params.positionNo = positionNo;
                this.params.pageNum = 1;
                this.props.getSettingAdPosListAction(this.params);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, type } = this.state;
        const { drawerData } = this;
        const isJurisdiction = this.props.setting.get('isJurisdiction');
        const adPosList = this.props.setting.get('adPosList').toJS();
        const settingList = this.props.setting.get('settingList').toJS();
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24 }}>
                        <Form layout="inline" onSubmit={this.handleSubmit} style={{ height: 70 }}>
                            <FormItem
                                label="位置编号"
                            >
                                {getFieldDecorator('positionNo', {
                                    rules: [
                                        { pattern: /^[1][0-9]{3}$/, message: '仅支持以1开头的4位数字查询' }
                                    ]
                                })(
                                    <Input autoComplete="off" placeholder="请输入位置编号" />
                                )}
                            </FormItem>
                            <FormItem
                                label="位置名称"
                            >
                                {getFieldDecorator('positionName', {
                                    rules: [
                                        { max: 20, message: '最多输入20个字' },
                                        {validator:Utils.validSpace}
                                    ]
                                })(
                                    <Input autoComplete="off" placeholder="请输入位置名称" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button htmlType="submit">查询</Button>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" onClick={this.showAddDrawer}>添加广告位</Button>
                            </FormItem>
                        </Form>
                        <Table
                            columns={this.columns}
                            dataSource={adPosList.rows}
                            rowKey="positionNo"
                            pagination={
                                Utils.pagination({ total: adPosList.total, pageNum: this.params.pageNum }, (current) => {
                                    this.params.pageNum = current;
                                    this.props.getSettingAdPosListAction(this.params);
                                })
                            }
                        />
                    </Card>
                    <PosDrawer
                        visible={visible}
                        close={this.onClose}
                        submit={this.handleDrawerSubmit}
                        type={type}
                        settingList={settingList.rows}
                        drawerData={drawerData}
                    />
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    showAddDrawer = () => {
        this.props.settingAction({ pageSize: 100, pageNum: 1, platformState: 1 });
        this.drawerData = {};
        this.setState({
            visible: true,
            type: 1
        });
    }
    //新增 / 编辑
    handleDrawerSubmit = (data) => {
        let params = this.state.type === 1 ? data : { ...data, positionNo: this.drawerData.positionNo };
        this.props.settingAdPosUpdate(params);
    }
    //编辑
    handleEdit = (data) => {
        this.props.settingAction({ pageSize: 10, pageNum: 1, platformState: 1 });
        this.drawerData = data;
        this.setState({
            visible: true,
            type: 2
        });
    }
    //查看
    handleDetails = (data) => {
        this.drawerData = data;
        this.setState({
            visible: true,
            type: 3
        });
    }
    //关闭弹窗
    onClose = () => {
        this.setState({
            visible: false,
        });
    }

}

export default AdPos;