import React, { Component, lazy } from 'react';
import { Row, Col, Button, Card, notification, Avatar, Modal, Form, Input, Select, Cascader, Icon } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { initDashboardTeam, createProject, jurisdictionStatus, createProjectStatus, getBulletedListAction } from './store/action';
import DashboardPanel from '../../../components/dashboard-panel/dashboard-panel';
import { getProjectList, updateProId } from '../../../components/topbar/store/action';
import { addressSelector } from '../../../reselect/address';
import { getRegion } from '../../../redux/address/action';
import { getManagerList, findProTagList, fieldJurisdictionStatus } from '../../../redux/findField/actions';
// import BaiduMap from './project-map';
import { Unauthorized } from './../../error-page/not-found-page';

import './dashboard.less';
const BaiduMap = lazy(() => import('./project-map'));
const FormItem = Form.Item;
const Option = Select.Option;

const gridStyle = {
    width: '33.333%',
    padding: '0'
};

@connect(
    state => ({
        address: addressSelector(state.address),
        topbar: state.topbar,
        // projectType: state.projectType,
        findField: state.findField,
        dashboardReducer: state.dashboardReducer
    }),
    {
        initDashboardTeam, createProject,
        getRegion, findProTagList, getManagerList,
        jurisdictionStatus, getProjectList,
        createProjectStatus, updateProId,
        fieldJurisdictionStatus,
        getBulletedListAction
    }
)
@Form.create()
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showText: '收起',
            visible: false,
            mapVisible: false,
            city: '成都市',
            address: this.props.address,
            detailAddress: '', // 项目位置
            addressUse: true, // 详细地址是否可用
            mangerList: [] // 负责人
        }
        this.params = {
            donePageNum: 1, //已完成项目当前页数
            donePageSize: 8,//已完成项目每页显示个数
            doingPageNum: 1,//进行中的项目当前页数
            doingPageSize: 8 //进行中项目每页显示个数
        }

        this.addrObj = {}
    }
    componentDidMount() {
        // this.props.initDashboardTeam();
        this.props.getBulletedListAction();
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps) {
        const { proManageList } = nextProps.findField;
        if (proManageList !== this.props.findField.proManageList) {
            this.setState({
                mangerList: proManageList
            })
        }
    }
    componentDidUpdate(prevProps) {
        /**
        * 判断创建项目，成功时，更改createProject状态，并且刷新界面
        */
        const { createProject,addProInfo } = this.props.dashboardReducer;
        if (createProject === true) {
            this.props.createProjectStatus(false);
            // setTimeout(()=>{
            this.props.getProjectList(this.params);
            // },2000)
            if(JSON.stringify(addProInfo) !== '{}') {
                this.props.updateProId(addProInfo.proId,addProInfo.proShortName);
                this.props.history.push('/project');
            }
        }
        const { isFieldJurisdiction } = this.props.findField;
        if (isFieldJurisdiction === true) {
            this.props.fieldJurisdictionStatus(false);
            this.setState({
                mangerList: []
            })
        }
    }
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        this.props.getRegion({ type: targetOption['key'], id: targetOption['regionValue'] });
    }
    handleChange = (val, data) => {

        if (data.length > 0) {
            this.setState({
                addressUse: false,
                // city: data.length > 2 ? `${data[1].regionKey}${data[2].regionKey}`: data[1].regionKey,
                city: data.length > 2 ? [data[1].regionKey, data[2].regionKey] : [data[1].regionKey],
                detailAddress: '',
            })
            this.addrObj.lat = '';
            this.addrObj.lng = '';
            this.props.form.resetFields('projectAddr');
        }
    }
    render() {
        const projectDatas = this.props.dashboardReducer ? this.props.dashboardReducer.teamList : [];
        // const panelData = { pathname: '系统面板', showProject: true, datas: projectDatas ? projectDatas : {} }
        // const teams = projectDatas.deptList ? projectDatas.deptList : [];
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
        const { address, topbar, form, findField, isJurisdiction } = this.props;
        // const { doingProjectList } = topbar;
        const { getFieldDecorator } = form;
        const { projectTypeList } = findField;
        const { mapVisible, city, show, showText, mangerList } = this.state;
        const dataSource = {
            visible: mapVisible,
            city
        }
        const { detailAddress, addressUse } = this.state;
        // console.log(this.props.dashboardReducer)
        const { hardwareList, pending, prolist ,deptList,countPro} = this.props.dashboardReducer.dashInit;
        const panelData = { pathname: '系统面板', showProject: true, datas: countPro ? countPro : {} }
        return (
            <div>
                {isJurisdiction !== true ? <React.Fragment>
                    <DashboardPanel panelData={panelData}></DashboardPanel>
                    <div className="dashboard-content">
                        {/* <Card title="我的面板" extra={<a>添加面板</a>}> </Card> */}
                        <div className="mt-24">
                            <Row>
                                <Col span={18}>
                                    <Card title={<div><span>进行中的项目</span><Button type="primary" icon="plus" onClick={this.createProject}>创 建</Button></div>} className="projects">
                                        <div hidden={show}>
                                            {
                                                (prolist && Array.isArray(prolist))
                                                    ? prolist.map((item, i) => {
                                                        return (
                                                            <Card.Grid style={gridStyle} key={i} onClick={() => this.goToDetails(item)}>
                                                                <div className="project-panel">
                                                                    <div className="name"><Avatar icon="user" src={item.proPic} />{item.proName}</div>
                                                                    <div className="address">
                                                                        {item.proProvince ? item.proProvince + ',' : ''}
                                                                        {item.proCity ? item.proCity + ',' : ''}
                                                                        {item.proArea ? item.proArea + ',' : ''}
                                                                        {item.proAddr}
                                                                    </div>
                                                                    <div className="address time">{item.proBeginTime ? item.proBeginTime.substring(0, 10) : ''} 至 {item.proEndTime ? item.proEndTime.substring(0, 10) : ''}</div>
                                                                    <div className="address person">
                                                                        <span>负责人:{item.userName}</span>
                                                                        {/* <span>{item.proBeginTime ? item.proBeginTime.substring(0, 10) : ''}</span> */}
                                                                    </div>
                                                                </div>
                                                            </Card.Grid>
                                                        )
                                                    })
                                                    : null
                                            }
                                        </div>
                                    </Card>
                                    <Card title={<div><span>待处理的事项</span></div>} className="projects">
                                        {
                                            pending && pending.map( (item,i) => (
                                                <Card.Grid style={gridStyle} key={i} onClick={() => this.goToDetails(item)}>
                                                    <div className="project-panel">
                                                        <div className="name"><Avatar icon="user" src={item.proPic} />{item.type}</div>
                                                        <div className="address">{item.depict}</div>
                                                        <div className="address time">{item.jointime && moment(item.jointime).format('YYYY-MM-DD hh:mm:ss')}</div>
                                                        <div className="address person">
                                                            <span>提交人:{item.uname}</span>
                                                        </div>
                                                    </div>
                                                </Card.Grid>
                                            ))
                                        }
                                        {
                                            pending && pending.length === 0 && <Card.Grid style={gridStyle}>
                                            <div className="project-panel">
                                                <div className="address">暂无待处理事项</div>
                                            </div>
                                        </Card.Grid>
                                        }
                                    </Card>

                                    <Card title={<div><span>异常硬件</span></div>} className="projects">
                                        {
                                            hardwareList && hardwareList.map( (item,i) => (
                                                <Card.Grid style={gridStyle} key={i} onClick={() => this.goToDetails(item)}>
                                                    <div className="project-panel">
                                                        <div className="name"><Avatar icon="user" src={item.proPic} />{item.hardwareTypeName}</div>
                                                        <div className="address time">{item.proName}</div>
                                                        <div className="address">{item.installAddress}</div>
                                                        {/* <div className="address ">{item.jointime && item.proBeginTime}</div> */}
                                                        {/* <div className="address person">
                                                            <span>报修电话:{item.uname}</span>
                                                        </div> */}
                                                    </div>
                                                </Card.Grid>
                                            ))
                                        }
                                    </Card>

                                </Col>
                                <Col span={6}>
                                    <Card title="企业组织架构">
                                        <ul className="my-team">
                                            {
                                                deptList && deptList.map(item => {
                                                    return <li key={`${item.deptId}`}> <span><img src={require('../../../images/logo1.png')} alt="" /></span> {item.deptName}</li>
                                                })
                                            }
                                        </ul>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Modal
                        title="创建项目"
                        width="640px"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        okText="确定"
                        onCancel={this.handleCancel}
                        cancelText="取消"
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="项目名称"
                                hasFeedback
                            >
                                {getFieldDecorator('projectName', {
                                    rules: [{ required: true, message: '项目名称必填!' }],
                                })(
                                    <Input maxLength='8' placeholder="请填写项目名称" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="项目简称"
                                hasFeedback
                            >
                                {getFieldDecorator('projectIntro', {
                                    rules: [{ required: true, message: '项目简称必填!' }],
                                })(
                                    <Input maxLength='20' placeholder="请填写项目简称" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="负责人"
                                hasFeedback
                            >
                                {getFieldDecorator('projectLeader', {
                                    rules: [
                                        { required: true, message: '负责人必选！' },
                                    ],
                                })(
                                    <Select
                                        placeholder="请选择搜索手机号或姓名"
                                        showSearch={true}
                                        onSearch={this.searchLeader}
                                        filterOption={false}
                                        notFoundContent="暂无数据"
                                    >
                                        {
                                            (mangerList && Array.isArray(mangerList))
                                                ? mangerList.map(subOpt => {
                                                    return (
                                                        <Option value={subOpt.userId} key={subOpt.userId}>{subOpt.userPhone}&nbsp;&nbsp;{subOpt.userName}</Option>
                                                    )
                                                })
                                                : null
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="项目类型"
                                hasFeedback
                            >
                                {getFieldDecorator('projectType', {
                                    rules: [{ required: true, message: '项目类型必选!' }],
                                })(
                                    <Select
                                        placeholder="请选择项目类型"
                                        onChange={this.selectChange}
                                        notFoundContent="暂无数据"
                                    >
                                        <Option value="">请选择项目类型</Option>
                                        {
                                            (projectTypeList && Array.isArray(projectTypeList))
                                                ? projectTypeList.map(subOpt => {
                                                    return (
                                                        <Option value={subOpt.categoryId} key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                    )
                                                })
                                                : null
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="项目位置"
                            >
                                {getFieldDecorator('addr', {
                                    rules: [{
                                        required: true, message: '地址不能为空！',
                                    }],
                                })(
                                    <Cascader
                                        // defaultValue={["76H3y2o6sjHFYV1iFan","iDkcmHRhHleujZ5Eh3v","NKqVPVFkWAw9KidpMdj"]}
                                        fieldNames={{ label: 'regionKey', value: 'regionValue' }}
                                        options={address}
                                        placeholder="请选择项目位置"
                                        loadData={this.loadData}
                                        onChange={this.handleChange}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="详细地址"
                            // hasFeedback
                            >
                                {getFieldDecorator('projectAddr', {
                                    initialValue: detailAddress,
                                    rules: [{ required: true, message: '详细地址必填!' }],
                                })(
                                    <Input disabled={addressUse} placeholder="请选择先选择项目位置再操作" suffix={<Icon type="environment" onClick={this.getAddress} style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                )}
                            </FormItem>
                        </Form>
                        <BaiduMap dataSource={dataSource} handleShow={this.handleShow} />
                    </Modal>
                </React.Fragment> : <Unauthorized />}
            </div>
        )
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
        this.props.fieldJurisdictionStatus(false);
    }
    // 创建项目
    createProject = () => {
        this.props.getRegion({ type: 1, id: 1 });
        this.props.findProTagList({
            'dicType': 'XMLX',
            'proId': ''
        })
        this.props.getManagerList({
            'queryStr': '',
            'proId': ''
        });

        this.setState({
            visible: true,
            addressUse: true,
            detailAddress: ''
        });

    }
    // 跳转至详情页
    goToDetails = (data) => {
        this.props.updateProId(data.proId, data.proName);
        let url = '';
        switch(data.tz) {
            case 'A': //项目详情
                url = '/project';
                break;
            case 'B'://跳转道闸
                url = '/project/hardware/1';
                break;
            case 'C'://任务计划
                url = '/project/task';
                break;
            case 'D'://质量管理
                url = '/project/returnQualityPage';
                break;
            case 'F'://安全管理
                url = '/project/returnSecityPage';
                break;
            case 'G'://纠纷处理
                url = '/project/dispute';
                break;
        }
        
        this.props.history.push(url);
    }
    // 跳转至员工列表页
    toEmployList = (id) => {
        // this.props.history.push(`/sdpbusiness/user/employList?deptId=${id}`);
    }
    // 正在进行中项目面板展示收起
    handleMore = () => {
        // const { show } = this.state;
        // if (show) {
        //     this.setState({
        //         showText: '收起'
        //     })
        // } else {
        //     this.setState({
        //         showText: '展开'
        //     })
        // }
        // this.setState({
        //     show: !this.state.show
        // })
    }
    handleOk = (e) => {
        this.handleSubmit(e);
    }
    // 提交创建项目表单
    handleSubmit = (e) => {
        //e.preventDefault();
        const { lat, lng } = this.addrObj;
        if (!lat || !lng) {
            notification.error({
                key: '1',
                message: '提示',
                description: '请先在地图选择坐标',
            })
            return false;
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    latitude: lat,
                    longitude: lng,
                    proAddr: values.projectAddr,
                    proName: values.projectName,
                    proProvince: values.addr[0],
                    proCity: values.addr[1],
                    proArea: values.addr[2],
                    proResponsible: values.projectLeader,
                    proType: values.projectType,
                    proShortName: values.projectIntro
                }
                this.props.createProject(params);
                this.setState({
                    visible: false,
                });
                this.props.form.resetFields();
            }
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.props.form.resetFields();
    }
    // 搜索负责人框获取焦点
    searchLeader = (val) => {
        this.props.getManagerList({
            'queryStr': val,
            'proId': ''
        });
    }
    // 选择地址
    getAddress = () => {
        if (this.state.addressUse) {
            return;
        }
        this.handleShow();
        //this.handleCancel();
    }
    // 显示隐藏地图弹框
    handleShow = (data, isMap) => {
        // console.log(data)
        const { mapVisible, visible } = this.state;

        if (data) {
            this.props.form.setFieldsValue({ projectAddr: data.address });
            this.addrObj = {
                lat: data.lat,
                lng: data.lng,
                // detailAddress: data.address
            }
        }

        isMap !== true && this.setState({
            mapVisible: !mapVisible,
            visible: !visible
        })


    }
}

export default Dashboard;
