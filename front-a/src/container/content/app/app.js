import React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Select, Input, Button, DatePicker , Card, Popconfirm, Tag, Divider, Modal, Radio, Checkbox } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './app.less';
import Panel from '@/components/panel/panel';
import { 
    appAction, appDeleteAction, 
    appDeleteSuccess, jurisdictionStatus,
    auditAction, auditSuccess
} from './store/actions';
import { projectTypeAction, projectTypeList } from '@/core/common/actions';
import { Unauthorized } from '@/container/error-page/not-found-page';
import Utils from '@/utils/utils';

const Option = Select.Option;
const Search = Input.Search;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
moment.locale('zh-cn');  //设置日期中文格式

@connect(
    state => ({
        app: state.get('app'),
        common: state.get('common')
    }),
    { 
        appAction, projectTypeAction, 
        appDeleteSuccess, appDeleteAction,
        jurisdictionStatus, projectTypeList,
        auditAction, auditSuccess,
    }
)
class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false, // 是否显示审核弹框
            isReason: false, //默认展示不通过理由
            audit: 4,//radio默认选中值
            defaultReason: [],
            defaultDate: null
        };
        this.reason = ['招聘信息不实审核不通过；', '发布人企业认证信息不符合规范；']; // 审核不通过理由
        this.params = {
            pageNum: 1,
            pageSize: 10,
            keyword: '',
            domainType: '',
            workerType: '',
            startTime: '',
            endTime: ''
        };
        this.date = ''; 
        this.auditId = '';  // 存放审核数据id
        this.reasonStr = ''; // 存放不通过理由
        this.columns = [{
            title: '信息编号',
            dataIndex: 'code',
            key: 'code'
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <span>
                    { text ? text : '-'}
                </span>
            )   
        }, {
            title: '招工人数',
            dataIndex: 'workerNum',
            key: 'workerNum',
        }, {
            title: '用工时间',
            key: 'workTime',
            dataIndex: 'workTime'
        }, {
            title: '工种',
            key: 'workerTypeName',
            dataIndex: 'workerTypeName'
        }, {
            title: '用工待遇',
            key: 'maxSalary',
            dataIndex: 'maxSalary',
            render: (text, record) => (
                <span>
                    {record.minSalary && (record.minSalary !== 'null') ? record.minSalary : ''} - {record.maxSalary && (record.maxSalary !== 'null') ? record.maxSalary : ''}
                </span>
            )
        }, {
            title: '用工类型',
            key: 'domainType',
            dataIndex: 'domainType',
            render: (text) => (
                <span>
                    {
                        text === 1 ? '招工人' : '招班组'
                    }
                </span>
            )
        }, {
            title: '发布时间',
            key: 'createDate',
            dataIndex: 'createDate'
        }, {
            title: '操作',
            key: 'action',
            render: (text) => {
                let dom = '';
                if (text.status === 1) {
                    dom = (<span><Divider type="vertical" /><a onClick={() => this.handleAudit(text.id, text.status)} style={{color: '#1890ff'}}>待审核</a></span>);
                } else if(text.status === 4) {
                    dom = (<span><Divider type="vertical" /><a style={{color: 'red', cursor: 'default'}}>未通过</a></span>);
                }
                    
                return (
                    <div>
                        <Popconfirm placement="top" title='确定删除招聘列表？' onConfirm={() => this.handleDelete(text.id)} okText="确定" cancelText="取消">
                            <a href="javascript:;" >删除</a>
                        </Popconfirm>
                        {dom}
                    </div>
                );
            }
        }];     
    }

    // 详情
    expandedRowRender = (record) => {
        const mark =  record.remarkName ? record.remarkName.split(',') : [];
        return (
          <div>
            <Row style={{padding: '10px 0'}}>
                <Col span={6}>发布账户：{record.createUserName && record.createUserName !== 'null' ? record.createUserName : '-'}</Col>
                <Col span={6}>招工项目：{record.projectName ? record.projectName : '-'}</Col>
                <Col span={6}>招工年龄：{record.ageName ? record.ageName : '-'}</Col>
                <Col span={6}>待遇标签：{
                    mark && Array.isArray(mark)
                    ? mark.map((item, index) => {
                        return <Tag color="blue" key={index}>{item}</Tag>
                    })
                    : null
                }</Col>
            </Row>
            <Row style={{padding: '10px 0'}}>
                <Col span={6}>发布类型：{record.issueType ? record.issueType : '-'}</Col>
                <Col span={6}>招工班组：{record.teamName ? record.teamName : '-'}</Col>
                <Col span={6}>用工工龄：{record.seniorityName ? record.seniorityName : '-'}</Col>
                <Col span={6}>用工地址：{record.address ? record.address : '-'}</Col>
            </Row>
          </div>
        );
      };

    render() {
        const panelData = { title: '招聘审核' };
        const isJurisdiction = this.props.app.get('isJurisdiction');
        const appList = this.props.app.get('appList');
        const teamType = this.props.common.get('teamType') || [];
        const { defaultDate, visible, isReason, audit, defaultReason } = this.state;
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24}}>
                        <div className="filter-box">
                            <Row>
                                <Col span={16}>
                                    <Button type="primary" onClick={this.handleBtn}>最近30天</Button>
                                    <RangePicker
                                        value={defaultDate}
                                        onChange={this.handleDateChange}
                                        style={{ margin: '0 10px'}}
                                    />
                                    <Select 
                                        defaultValue="招聘类型"
                                        onChange={this.handleTypeChange}
                                    >
                                        <Option value="">全部</Option>
                                        <Option value="2">招班组</Option>
                                        <Option value="1">招工人</Option>
                                    </Select>
                                    <Select 
                                        defaultValue="工种类型"
                                        onChange={this.handleWorkTypeChange}
                                    >
                                        
                                        <Option value="">全部</Option>
                                        {
                                            teamType && Array.isArray(teamType)
                                            ? teamType.map(subOpt => {
                                                return(
                                                    <Option value={subOpt.categoryId} key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                )
                                            })
                                            : null
                                        }
                                    </Select>
                                </Col>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                <Search
                                    placeholder="请输入手机号或姓名查询"
                                    onSearch={this.handleSearch}
                                    style={{ width: 380 }}
                                />
                                </Col>
                            </Row>
                        </div>
                        <Table 
                            columns={this.columns} 
                            dataSource={appList.rows} 
                            rowKey="id"
                            locale={{emptyText: '暂无数据'}}
                            expandedRowRender={(record) => this.expandedRowRender(record)}
                            pagination={
                                Utils.pagination({...appList, pageNum: this.params.pageNum },(current) =>{
                                    this.params.pageNum =current;
                                    this.props.appAction(this.params);
                                })
                            }
                        />
                    </Card>
                    <Modal
                        title="招聘信息审核"
                        visible={visible}
                        width='600px'
                        height='380px'
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                        <RadioGroup onChange={this.handleRadio} value={audit}>
                            <Radio value={4}>不通过</Radio>
                            <Radio value={2}>通过</Radio>
                        </RadioGroup>
                        <div hidden={isReason} style={{ margin: '20px 0 10px'}}>不通过理由</div>
                        <CheckboxGroup hidden={isReason} options={this.reason} value={defaultReason} onChange={this.handleReason} />
                    </Modal>
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    componentDidMount () {
        // 获取招聘列表
        this.props.appAction(this.params);
        // 获取招聘类型
        this.props.projectTypeAction({
            dicType: 'worktype'
        });
    }
    componentWillReceiveProps (nextProps) {
        const appDelete = nextProps.app.get('appDelete'); // 删除设备列表状态
        const auditApp = nextProps.app.get('auditApp'); // 审核招聘状态
        if (appDelete) {
            // 获取招聘列表
            this.props.appAction(this.params);
            this.props.appDeleteSuccess({status: false});
        }
        if (auditApp) {
            this.props.auditSuccess({status: false});
            // 获取招聘列表
            this.props.appAction(this.params);
        }

    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
        this.props.projectTypeList([]);
    }
    // 招聘类型切换
    handleTypeChange = (value) => {
        this.params = {
            ...this.params,
            domainType: value,
            pageNum: 1
        }
        // 获取招聘列表
        this.props.appAction(this.params);
    }
    // 工种类型切换
    handleWorkTypeChange = (value) => {
        this.params = {
            ...this.params,
            workerType: value,
            pageNum: 1
        }
        // 获取招聘列表
        this.props.appAction(this.params);
    }
    // 招聘搜索查询
    handleSearch = (value) => {
        this.params = {
            ...this.params,
            keyword: value,
            pageNum: 1
        }
        // 获取招聘列表
        this.props.appAction(this.params);
    }
    // 删除招聘数据
    handleDelete = (id) => {
        this.props.appDeleteAction({
            employeeId: id
        })
    }
    // 选择时间段
    handleDateChange = (value, data) => {
        this.params = {
            ...this.params,
            startTime: data[0],
            endTime: data[1],
            pageNum: 1
        };
        this.setState({
            defaultDate: [moment(data[0]), moment(data[1])]
        });
        // 获取招聘列表
        this.props.appAction(this.params);
    }
    changeTimeStr = time => {
        return moment (time).format ('YYYY-MM-DD');
    };
    // 最近30天招聘列表
    handleBtn = () => {
        this.params = {
            ...this.params,
            startTime: '',
            endTime: '',
            pageNum: 1
        }
        this.setState({
            defaultDate: null
        });
        // 获取招聘列表
        this.props.appAction(this.params);
    }
    saveInputRef = input => this.input = input
    // 审核
    handleAudit = (id) => {
        this.auditId = id;
        this.setState({
            visible: true
        });
    }
    // 切换审核意见
    handleRadio = (e) => {
        const value = e.target.value;
        this.reasonStr = '';
        this.setState({
            isReason: value === 4 ? false : true,
            audit: value,
            defaultReason: []
        });
    }
    // 选中不通过理由
    handleReason = (value) => {
        this.reasonStr = '';
        this.setState({
            defaultReason: value
        });
        value.forEach(element => {
            if (value.length > 1) {
                this.reasonStr += ',' + element;
            } else {
                this.reasonStr += element;
            }
        })
    }
    // 提交审核
    handleOk = () => {
        this.props.auditAction({
            employeeId: this.auditId,
            status: this.state.audit,
            content: this.reasonStr
        })
        this.setState({
            visible: false
        })
    }
    // 取消审核
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
}


export default App;


