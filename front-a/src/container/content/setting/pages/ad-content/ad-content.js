import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Input, Button, Table, Popconfirm, Select, DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './../../setting.less';

import {
    getSettingAdContentListAction,
    settingAction,
    getSettingAdPosListAction,
    getSettingAdPosListSuc,
    settingPosAndPlatformClear,
    getSettingAdContentStateAction,
    getSettingAdContentStateSuc,
    getSettingAdContentAddAction,
    jurisdictionStatus,
    getSettingAdContentAddSuc
} from './../../store/actions';

import Panel from '@/components/panel/panel';
import ContentDrawer from './content-drawer';
import { Unauthorized } from '@/container/error-page/not-found-page';
import Utils from '@/utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;
const panelData = { title: '广告内容' };
const { RangePicker } = DatePicker;
moment.locale('zh-cn');  //设置日期中文格式

@connect(
    state => ({
        setting: state.get('setting')
    }),
    {
        getSettingAdContentListAction, settingAction,
        getSettingAdPosListAction, getSettingAdPosListSuc, settingPosAndPlatformClear, 
        getSettingAdContentStateAction, getSettingAdContentStateSuc, 
        getSettingAdContentAddAction, jurisdictionStatus, getSettingAdContentAddSuc
    }
)
@Form.create()
class AdContent extends PureComponent {
    state = {
        visible: false,
        type: 1,//1:新增，2：编辑 3:查看
    }
    params = {
        pageSize: 10,
        pageNum: 1,
        platformNo: '',//平台编号
        contentNo: '',//广告编号
        positionNo: '',//位置编号
        bannerName: '',//广告名称
        beginTime: '',//开始时间
        endTime: '',//结束时间
        bannerState: null,//广告状态（0：停用，1：启用）
    }
    drawerData = {};
    columns = [
        { title: '广告编号', dataIndex: 'contentNo'},
        { title: '广告名称', dataIndex: 'bannerName' },
        { title: '位置名称', dataIndex: 'positionName' },
        { title: '所属平台', dataIndex: 'platformName' },
        { title: '有效期', dataIndex: 'beginTime',render(text,record) {
            return `${text ? text : '-'} ~ ${record.endTime ? record.endTime : '-'}`
        } },
        { title: '创建时间', dataIndex: 'createTime' },
        { title: '状态', dataIndex: 'bannerState', render(text) { return parseInt(text) === 0 ? '停用' : '启用'; } },
        {
            title: '操作', render: (text, record) => {
                return (
                    <React.Fragment>
                        {
                            parseInt(record.bannerState) === 0
                                ? <Popconfirm title="确定启用吗？" onConfirm={() => this.handleAction(record)}  okText="确定" cancelText="取消">
                                        <a>启用 </a>
                                    </Popconfirm>
                                : <Popconfirm title="确定停用吗？" onConfirm={() => this.handleAction(record)}  okText="确定" cancelText="取消">
                                        <a style={{ color: 'red' }}>停用 </a>
                                    </Popconfirm>
                        }
                        |<a onClick={() => this.handleDetails(record)}> 查看</a>
                    </React.Fragment>
                )
            }
        },
    ];
    // 启用、停用
    handleAction = ({positionNo, pictureNumber,contentNo,bannerState, beginTime, endTime}) => {
        this.props.getSettingAdContentStateAction({
            positionNo, 
            pictureNumber, 
            contentNo,
            bannerState:bannerState === 0 ? 1:0,
            beginTime,
            endTime
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, type } = this.state;
        const { drawerData } = this;
        const isJurisdiction = this.props.setting.get('isJurisdiction');
        const adContentList = this.props.setting.get('adContentList').toJS();
        const settingList = this.props.setting.get('settingList').toJS();
        const adPosList = this.props.setting.get('adPosList').toJS();
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24 }}>
                        <Form layout="inline" onSubmit={this.handleSubmit} style={{ marginBottom:20}}>
                            <FormItem
                                label="所属平台"
                            >
                                {getFieldDecorator('platformNo', {
                                    initialValue: ''
                                })(
                                    <Select style={{ width: '174px' }} onChange={this.handlePlatformChange}>
                                        <Option key='' value=''>全部</Option>
                                        {
                                            settingList.rows && Array.isArray(settingList.rows)
                                            ? settingList.rows.map(item => (
                                                    <Option key={item.platformNo} value={item.platformNo}>{item.platformName}</Option>
                                                ))
                                            : null
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="位置名称"
                            >
                                {getFieldDecorator('positionNo', {
                                    initialValue: ''
                                })(
                                    <Select placeholder="请选择位置名称" style={{ width: '174px' }} onChange={this.handlePosChange}>
                                        <Option key='' value=''>全部</Option>
                                        {
                                            adPosList.rows && Array.isArray(adPosList.rows)
                                            ? adPosList.rows.map(item => (
                                                    <Option key={item.positionNo} value={item.positionNo}>{item.positionName}</Option>
                                                ))
                                            : null
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="广告编号"
                            >
                                {getFieldDecorator('contentNo', {
                                    rules:[{
                                        len: 11, message: '请输入11位数字'
                                    },{
                                        validator: Utils.isNumber, message: '只能输入数字' 
                                    }]
                                })(
                                    <Input autoComplete="off" placeholder="请输入广告编号" onChange={this.handleNumberChange} />
                                )}
                            </FormItem>
                            <FormItem
                                label="广告名称"
                            >
                                {getFieldDecorator('bannerName', {
                                    rules:[{ 
                                        validator: Utils.validSpace, message: '请输入有效名称' 
                                    }, {
                                        max: 20, message: '最长位20个字符'
                                    }]
                                })(
                                    <Input autoComplete="off" placeholder="请输入广告名称" onChange={this.handleNameChange} />
                                )}
                            </FormItem>
                            <FormItem
                                label="有效期"
                            >
                                {getFieldDecorator('rangPicker')(
                                    <RangePicker format="YYYY-MM-DD" onChange={this.handleDateChange} />
                                )}
                            </FormItem>
                            <FormItem
                                label="状态"
                            >
                                {getFieldDecorator('bannerState', {
                                    initialValue: ''
                                })(
                                    <Select placeholder="请选择状态" style={{ width: '174px' }} onChange={this.handleStateChange}>
                                        <Option value=''>全部</Option>
                                        <Option value='1'>启用</Option>
                                        <Option value='0'>停用</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button htmlType="submit">查询</Button>
                                <Button type="primary" onClick={this.showAddDrawer} style={{marginLeft: '20px'}}>新增广告内容</Button>
                            </FormItem>
                        </Form>
                        <Table
                            columns={this.columns}
                            dataSource={adContentList.rows}
                            rowKey="contentNo"
                            pagination={
                                Utils.pagination({ total: adContentList.total, pageNum: this.params.pageNum }, (current) => {
                                    this.params.pageNum = current;
                                    this.props.getSettingAdContentListAction(this.params);
                                })
                            }
                        />
                    </Card>
                    {<ContentDrawer
                        visible={visible}
                        close={this.onClose}
                        submit={this.handleDrawerSubmit}
                        type={type}
                        settingList={settingList.rows || []}
                        drawerData={drawerData}
                        adPosList={adPosList.rows || []}
                        handleAddPlatformChange = {(value) => this.handleAddPlatformChange(value) }
                    />}
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    
    componentDidMount() {
        // 获取所属平台
        this.props.settingAction({ pageSize: 100, pageNum: 1 });
        // 获取广告内容列表
        this.props.getSettingAdContentListAction(this.params);
    }
    componentWillReceiveProps(nextProps) {
        const nextUpdate = nextProps.setting.get('isUpdate');
        const adState = nextProps.setting.get('adState');
        const adContentAdd = nextProps.setting.get('adContentAdd');

        if (nextUpdate) {
            this.props.settingAdPosUpdateState({ status: false });
            this.props.getSettingAdContentListAction(this.params);
            this.state.visible && this.setState({
                visible: false
            })
        }
        if (adState) {
            // 获取广告内容列表
            this.props.getSettingAdContentListAction(this.params);
            this.props.getSettingAdContentStateSuc({status: false});
        }
        if (adContentAdd) {
            this.props.getSettingAdContentAddSuc({ status: false});
            // 获取广告内容列表
            this.params.pageNum = 1;
            this.props.getSettingAdContentListAction(this.params);
        }
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { bannerName, pageSize, beginTime, endTime } = this.params;
                const params = {
                    ...values,
                    bannerName,
                    pageSize,
                    pageNum: 1,
                    beginTime,
                    endTime
                }
                this.params.pageNum = 1;
                this.props.getSettingAdContentListAction(params);
            }
        });
    }
    showAddDrawer = () => {
        this.props.settingPosAndPlatformClear();
         // 获取所属平台
         this.props.settingAction({ pageSize: 100, pageNum: 1, platformState: 1 });
        this.drawerData = {};
        this.setState({
            visible: true,
            type: 1
        });

    }
    //新增
    handleDrawerSubmit = (data) => {
        this.props.getSettingAdContentAddAction(data);
    }
    //编辑
    handleEdit = (data) => {
        this.props.settingAction({ pageSize: 100, pageNum: 1, platformState: 1 });
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
        // 获取所属平台
        this.props.settingAction({ pageSize: 100, pageNum: 1 });
        // 获取位置
        this.props.getSettingAdPosListAction({
            pageSize: 100,
            pageNum: 1,
            positionNo: '',
            positionName: '',
            platformNo: this.params.platformNo,
            positionState: ''
        });
    }
    // 选择所属平台
    handlePlatformChange = (value) => {
        this.params.platformNo = value;
        this.props.form.setFieldsValue({ positionNo: '' });
        // 获取位置
        this.props.getSettingAdPosListAction({
            pageSize: 100,
            pageNum: 1,
            positionNo: '',
            positionName: '',
            platformNo: value,
            positionState: ''
        });
    }
    // 选择位置编号
    handlePosChange = (value) => {
        this.params.positionNo = value;
    }
    // 选择状态
    handleStateChange = (value) => {
        this.params.bannerState = value;
    }
    // 输入广告编号
    handleNumberChange = (e) => {
        this.params.contentNo = e.target.value;
    }
    // 输入广告名称
    handleNameChange = (e) => {
        const value = e.target.value;
        this.params.bannerName = value ? value.replace(/\s+/g, '') : '';
    }
    // 新增广告内容选择所属平台事件
    handleAddPlatformChange = (value) => {
        // 获取位置
        this.props.getSettingAdPosListAction({
            pageSize: 100,
            pageNum: 1,
            positionNo: '',
            positionName: '',
            platformNo: value,
            positionState: 1
        });
    }
    // 有效期
    handleDateChange = (e, data) => {
        this.params.beginTime = data[0];
        this.params.endTime = data[1];
    }
    // 刷新列表数据
    getSettingAdContentListAction = (value) => {
        this.props.getSettingAdContentListAction(this.params);
    }

}

export default AdContent;