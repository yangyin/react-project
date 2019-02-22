import React, { Component } from 'react';
import {
    Card,
    Select,
    Form,
    Input,
    Icon,
    Row,
    Col,
    Button,
    Radio,
    Tabs,
    InputNumber,
    DatePicker,
    Cascader,
    notification,
    Popconfirm
} from 'antd';
import Panel from '../../../components/panel/panel';
import UploadComp from '../../../components/upload';
import ProjectDetailsTables from '../../../components/project-details-tables/project-details-tables';
import { connect } from 'react-redux';
import moment from 'moment';
import Utils from '../../../utils/utils';

import {
    delProject,
    projectDetail,
    updateProjectInfo,
    jurisdictionStatus,
    getUnitList
} from './store/action';
import { getProjectList } from '../../../components/topbar/store/action';
import { Unauthorized } from './../../error-page/not-found-page';
import { addressSelector } from '../../../reselect/address';
import { getRegion } from '../../../redux/address/action';
import './project-detail.less';
import {
    getManagerList,
    getBelongCompany,
    findProTagList,
} from '../../../redux/findField/actions';

import BaiduMap from '../../content/dashboard/project-map';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

@Form.create()
@connect(
    state => ({
        topbar: state.topbar,
        proDelInfo: state.project.proDelInfo,
        proDetail: state.project.proDetail,
        isJurisdiction: state.project.isJurisdiction,
        address: addressSelector(state.address),
        proManageList: state.findField.proManageList,
        companyBelongList: state.findField.companyBelongList,
        projectTagList: state.findField.projectTagList,
        projectSortList: state.findField.projectSortList,
        projectTypeList: state.findField.projectTypeList,
        projectUnitList: state.project.projectUnitList
    }),
    {
        getManagerList,
        getBelongCompany,
        delProject,
        projectDetail,
        updateProjectInfo,
        getProjectList,
        jurisdictionStatus,
        getRegion,
        findProTagList,
        getUnitList
    }
)
class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        const { proDetail } = this.props;
        this.state = {
            proId: '',
            pictures: [],
            visible: false,
            mapVisible: false,
            city: '成都市',
            address: this.props.address,
            lat: proDetail.latitude,
            lng: proDetail.longitude,
            detailAddress: proDetail.proAddr,
            addressUse: true, // 详细地址是否可用
            upPrice: '',
            proBeginTime: proDetail.proBeginTimeStr,
            proEndTime: proDetail.proEndTimeStr,
            createTime: proDetail.createTime,
            listBelongCompany: [], // 所属单位
            listManager: [], //负责人
            managerName: '', //负责人姓名
            type: ''
        };
        this.params = {
            donePageNum: 1, //已完成项目当前页数
            donePageSize: 8, //已完成项目每页显示个数
            doingPageNum: 1, //进行中的项目当前页数
            doingPageSize: 8, //进行中项目每页显示个数
        };
    }

    componentDidMount() {
        this.props.getRegion({ type: 1, id: 1 });
        const { proId } = this.props.topbar;

        if (proId) {
            this.request();
        }
    }


    // 完成更新后 this.props 最新的
    componentDidUpdate(prevProps) {
        const { proId } = this.props.topbar;
        const prevId = prevProps.topbar.proId;
        const { proDetail, proManageList, companyBelongList } = this.props;
        const prevDeatal = prevProps.proDetail;
        const prevPonseName = prevDeatal ? prevDeatal.proResponsibleName : '';
        const proResponsibleName= proDetail ? proDetail.proResponsibleName : '';
        const prevManageList = prevProps.proManageList;
        const prevBelongList = prevProps.companyBelongList;

        //判断2次ID是否一致，不一致请求数据
        if (proId && prevId !== proId) {

            this.request();
        }

        //请求省市区
        if (proDetail != prevDeatal && proDetail) {
            proDetail['proProvince'] && setTimeout(_ => { this.props.getRegion({ type: 2, id: proDetail['proProvince'] }) }, 50);
            proDetail['proCity'] && setTimeout(_ => { this.props.getRegion({ type: 3, id: proDetail['proCity'] }) }, 80);
        }

        //查询负责人
        if (proResponsibleName != prevPonseName) {
            this.setState({
                managerName: proResponsibleName,
            }, () => {
                this.getManagerList(proResponsibleName);
                // this.props.getManagerList ({
                //     queryStr:proResponsibleName?proResponsibleName:'',
                //     proId: proId,
                //   });
            })
        }
        //查询所属单位
        if (proManageList != prevManageList || prevBelongList != companyBelongList) {
            this.setState({
                listBelongCompany: companyBelongList,
                listManager: proManageList,
            });
        }

        //设置地图 坐标，图片
        // if (Object.keys (proDetail).length > 0) {
        if (proDetail && (Object.keys(proDetail).length > 0) && JSON.stringify(proDetail) !== JSON.stringify(prevDeatal)) {
            const {
                latitude,
                longitude,
                proPic,
            } = this.props.proDetail;
            const preLatitude = prevProps.proDetail.latitude;
            const preLongitude = prevProps.proDetail.longitude;
            const prePropic = prevProps.proDetail.proPic;
            if (latitude !== preLatitude || longitude !== preLongitude) {
                this.setState(prevState => ({
                    lat: latitude,
                    lng: longitude,
                    proBeginTime: proDetail.proBeginTimeStr,
                    proEndTime: proDetail.proEndTimeStr,
                    createTime: proDetail.createTime,
                    detailAddress: proDetail.proAddr,
                }));
            }
            if (proPic && proPic !== prePropic) {
                this.setState({
                    pictures: [{ url: proPic, uid: 1 }],
                });
            }
        }

    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    request() {
        this.props.form.resetFields();
        const { proId } = this.props.topbar;
        this.setState(
            {
                proId: proId,
                addressUse: true,
            },
            () => {
                this.props.getBelongCompany({
                    param: '',
                });
                this.props.findProTagList({
                    dicType: 'XMBQ',
                    proId: proId,
                });
                this.props.findProTagList({
                    proId: proId,
                    dicType: 'XMLX',
                });
                this.props.findProTagList({
                    proId: proId,
                    dicType: 'XMLB',
                });
                this.props.projectDetail({ proId });
            }
        );
    }

    //负责人
    getManagerList(val) {
        const { proId } = this.props.topbar;
        this.props.getManagerList({
            queryStr: val,
            proId: proId,
        });
    }
    // 上传成功回调
    uploadSuccess = data => {
        this.setState(prevState => ({
            pictures: data,
        }));
    };
    // 项目删除
    delProject = e => {
        e.preventDefault();
        const { proId } = this.state;
        this.props.delProject({ proId }, this.params);
        window.location.reload();
    };
    changeTimeStr = time => {
        return moment(time).format('YYYY-MM-DD');
    };
    /**
       * 约束开始时间不能大于结束时间
       */
    disabledStartDate = startValue => {
        const endValue = this.state.proEndTime;
        const createTime = this.state.createTime.substr(0, 10);
        if ((!startValue || !endValue)) {
            if (createTime && startValue) {
                return moment(startValue).valueOf() < moment(createTime).valueOf();
            } else {
                return false;
            }
        }
        let start = moment(endValue).valueOf()  <= moment(startValue).valueOf();
        let end   = moment(startValue).valueOf() < moment(createTime).valueOf();
        return start + end;
    };

    disabledEndDate = endValue => {
        const startValue = this.state.proBeginTime;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= moment(startValue).valueOf();
    };
    /**
       * 点击时间，设值
       */
    handleChange(key, v) {
        this.setState({
            [key]: moment(v).format('YYYY-MM-DD'),
        });
    }
    // 保存
    handleSubmit = e => {
        e.preventDefault();
        const { lat, lng, proId, pictures } = this.state;
        if (!lat || !lng) {
            notification.error({
                key: '1',
                message: '提示',
                description: '请先在地图选择坐标',
            })
            return false;
        }
        const strPic = pictures.length > 0 ? pictures[0].url : '';
        this.props.form.validateFields((errors, values) => {
            let proBeginTimeStr = values.proBeginTime
                ? this.changeTimeStr(values.proBeginTime)
                : '';
            let proEndTimeStr = values.proEndTime
                ? this.changeTimeStr(values.proEndTime)
                : '';
            if (!errors) {
                //    proPriceUp暂时传空
                const params = {
                    proPriceUp: '',
                    isApproval: values.isApproval,
                    belongCompany: values.belongCompany,
                    proLable: values.proLable.join(','),
                    proEndTime: proEndTimeStr,
                    proBeginTime: proBeginTimeStr,
                    proCategory: values.proCategory,
                    proType: values.proType,
                    proResponsible: values.proResponsible,
                    proPrice: values.proPrice,
                    latitude: lat,
                    longitude: lng,
                    proAddr: Utils.replaceSpace(values.proAddr),
                    proProvince: values.addr[0],
                    proCity: values.addr[1],
                    proArea: values.addr[2],
                    proPic: strPic,
                    proId: proId,
                    proName: Utils.replaceSpace(values.proName),
                    proShortName: Utils.replaceSpace(values.proShortName),
                    proNo: Utils.replaceSpace(values.proNo),
                };
                this.props.updateProjectInfo(params, this.params);
            }
        });
    };

    // 选择地址
    getAddress = () => {
        const { addressUse } = this.state;
        if (!addressUse) {
            this.props.form.resetFields('proAddr');
            this.handleShow();
        } else {
            return false;
        }
    };
    // 显示隐藏地图弹框
    handleShow = (data, isMap) => {
        const { mapVisible, visible } = this.state;
        if (data) {
            if (isMap !== true) {
                this.setState({
                    mapVisible: !mapVisible,
                    visible: !visible,
                    lat: data.lat,
                    lng: data.lng,
                    detailAddress: data.address,
                });
            }
        } else {
            this.setState({
                mapVisible: !mapVisible,
                visible: !visible,
            });
        }
    };
    //删除图片
    removeFileImg = () => {
        this.setState({
            pictures: []
        })
    };
    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        this.props.getRegion({
            type: targetOption['key'],
            id: targetOption['regionValue'],
        });
    };
    handleChangeMap = (val, data) => {
        if (data.length > 0) {
            this.setState({
                addressUse: false,
                city: data.length > 2 ? [data[1].regionKey, data[2].regionKey] : [data[1].regionKey],
                detailAddress: '',
            });
            this.props.form.resetFields('projectAddr');
        }
    };
    // 所属单位搜索
    searchCompany = val => {
        this.props.getBelongCompany({
            param: val ? val : '',
        });
    };
    // 负责人搜索
    searchManager = val => {
        // const {proId} = this.props.topbar;
        this.getManagerList(val)
        // this.props.getManagerList ({
        //   queryStr: val ? val : '',
        //   proId: proId,
        // });
    };
    render() {
        const panelData = { title: '项目详情' };
        const {
            proDetail,
            projectSortList,
            projectTypeList,
            isJurisdiction,
            address,
            projectTagList,
            projectUnitList
        } = this.props;
        let proLableVal = [];
        if (proDetail && proDetail.proLable) {
            proLableVal = proDetail.proLable.split(',');
        }
        const {
            pictures,
            addressUse,
            city,
            detailAddress,
            listBelongCompany,
            listManager,
            proId,
            type
        } = this.state;
        const dataSource = {
            visible: this.state.mapVisible,
            city,
        };
        const dateFormat = 'YYYY-MM-DD';

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };

        const ColLayout1 = {
            xs: 24,
            sm: 24,
            md: 12,
        };
        return (
            <div className="proDetail" id="proDetail">
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card bordered={false} style={{margin:24}} >
                            <Tabs onChange={this.handleTabsChange} type="card">
                                <TabPane tab="项目介绍" key="1">
                                    <header className="detail-header">
                                        <p className="tilTip">
                                            立项信息
                                            <Popconfirm 
                                                placement="top" 
                                                title="是否删除项目?" 
                                                onConfirm={this.delProject} 
                                                okText="确定" 
                                                cancelText="取消"
                                            >
                                                <a className="delBtn"> 删除项目 </a>
                                            </Popconfirm>
                                        </p>
                                    </header>
                                    <Card className="detailForm" bordered={false}>
                                        {proDetail
                                            ? <Form onSubmit={this.handleSubmit}>
                                                <Row
                                                    className="proList"
                                                    gutter={24}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="项目名称" {...formItemLayout}>

                                                            {getFieldDecorator('proName', {
                                                                initialValue: (proDetail && proDetail.proName) ||
                                                                    '',
                                                                rules: [
                                                                    { required: true, message: <div>请输入!</div> },
                                                                    { validator: Utils.validSpace },
                                                                ],
                                                            })(<Input maxLength={15} placeholder="请输入" />)}
                                                        </FormItem>
                                                    </Col>
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="项目简称" {...formItemLayout}>
                                                            {getFieldDecorator('proShortName', {
                                                                initialValue: (proDetail &&
                                                                    proDetail.proShortName) ||
                                                                    '',
                                                                rules: [
                                                                    { required: true, message: <div>请输入!</div> },
                                                                    { validator: Utils.validSpace },
                                                                ],
                                                            })(
                                                                <Input maxLength={8} placeholder="支持少于8个汉字长度" />
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row
                                                    className="proList"
                                                    gutter={24}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="项目编号(自动)" {...formItemLayout}>
                                                            {getFieldDecorator('proNo', {
                                                                initialValue: (proDetail && proDetail.proNo) ||
                                                                    '',
                                                            })(<Input maxLength={15} placeholder="请输入" />)}
                                                        </FormItem>
                                                    </Col>
                                                    {proDetail &&
                                                        <Col {...ColLayout1}>
                                                            <FormItem label="项目类型" {...formItemLayout}>
                                                                {getFieldDecorator('proType', {
                                                                    initialValue: (proDetail &&
                                                                        proDetail.proType) ||
                                                                        '',
                                                                    rules: [
                                                                        {
                                                                            required: true,
                                                                            message: <div>请选择项目类型!</div>,
                                                                        },
                                                                    ],
                                                                })(
                                                                    <Select notFoundContent="暂无数据">
                                                                        {projectTypeList.map(item => (
                                                                            <Option key={item.categoryId}>
                                                                                {item.categoryValue}
                                                                            </Option>
                                                                        ))}
                                                                    </Select>
                                                                )}

                                                            </FormItem>
                                                        </Col>}
                                                </Row>
                                                <Row
                                                    className="proList"
                                                    gutter={24}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="项目造价" {...formItemLayout}>
                                                            {getFieldDecorator('proPrice', {
                                                                initialValue: (proDetail && proDetail.proPrice) ||
                                                                    '',
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: <div>项目造价有效数字最多10位,小数保留2位</div>,
                                                                    },
                                                                    { validator: Utils.validSpace },
                                                                ],
                                                            })(
                                                                <InputNumber
                                                                    style={{ width: '100%' }}
                                                                    placeholder="项目造价有效数字最多10位,小数保留2位"
                                                                    onChange={this.toPriceUp}
                                                                    maxLength={10}
                                                                    step={0.01}
                                                                />
                                                            )}

                                                        </FormItem>
                                                    </Col>
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="项目类别" {...formItemLayout}>
                                                            {getFieldDecorator('proCategory', {
                                                                initialValue: (proDetail &&
                                                                    proDetail.proCategory) ||
                                                                    '',
                                                                rules: [
                                                                    { required: true, message: <div>请选择项目类别!</div> },
                                                                ],
                                                            })(
                                                                <Select notFoundContent="暂无数据">
                                                                    {projectSortList.map(item => (
                                                                        <Option key={item.categoryId}>
                                                                            {item.categoryValue}
                                                                        </Option>
                                                                    ))}
                                                                </Select>
                                                            )}
                                                        </FormItem>

                                                    </Col>
                                                </Row>
                                                <Row
                                                    className="proList"
                                                    gutter={24}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="所属单位" {...formItemLayout}>
                                                            {getFieldDecorator('belongCompany', {
                                                                initialValue: proDetail.belongCompanyId || '',
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: <div>请输入单位名称搜索选择!</div>,
                                                                    },
                                                                ],
                                                            })(
                                                                <Select
                                                                    placeholder="请输入单位名称搜索选择"
                                                                    showSearch={true}
                                                                    onSearch={this.searchCompany}
                                                                    filterOption={false}
                                                                    notFoundContent="暂无数据"
                                                                    onFocus={this.searchCompany}
                                                                >
                                                                    {listBelongCompany &&
                                                                        listBelongCompany.map(subOpt => {
                                                                            return (
                                                                                <Option key={subOpt.belongCompany}>
                                                                                    {subOpt.belongCompanyName}
                                                                                </Option>
                                                                            );
                                                                        })}
                                                                </Select>
                                                            )}

                                                        </FormItem>
                                                    </Col>
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="负责人" {...formItemLayout}>

                                                            {getFieldDecorator('proResponsible', {
                                                                initialValue: proDetail.proResponsible || '',
                                                                rules: [
                                                                    { required: true, message: <div>请输入!</div> },
                                                                ],
                                                            })(
                                                                <Select
                                                                    notFoundContent="暂无数据"
                                                                    placeholder="请选择搜索手机号或姓名"
                                                                    showSearch={true}
                                                                    filterOption={false}
                                                                    onSearch={this.searchManager}
                                                                    onFocus={this.searchManager}
                                                                >
                                                                    {listManager &&
                                                                        listManager.map(subOpt => {
                                                                            return (
                                                                                <Option key={subOpt.userId}>
                                                                                    {subOpt.userPhone}
                                                                                    &nbsp;&nbsp;
                                                    {subOpt.userName}
                                                                                </Option>
                                                                            );
                                                                        })}
                                                                </Select>
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row
                                                    className="proList"
                                                    gutter={24}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="计划开始时间" {...formItemLayout}>
                                                            {getFieldDecorator('proBeginTime', {
                                                                initialValue: proDetail &&
                                                                    proDetail.proBeginTime &&
                                                                    moment(proDetail.proBeginTime, dateFormat),
                                                                format: { dateFormat },
                                                            })(
                                                                <DatePicker
                                                                    disabledDate={this.disabledStartDate}
                                                                    onChange={v => {
                                                                        this.handleChange('proBeginTime', v);
                                                                    }}
                                                                    placeholder="请选择"
                                                                    style={{ width: '100%' }}
                                                                />
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="计划结束时间" {...formItemLayout}>
                                                            {getFieldDecorator('proEndTime', {
                                                                initialValue: proDetail &&
                                                                    proDetail.proEndTime &&
                                                                    moment(proDetail.proEndTime, dateFormat),
                                                                format: { dateFormat },
                                                            })(
                                                                <DatePicker
                                                                    disabledDate={this.disabledEndDate}
                                                                    onChange={v =>
                                                                        this.handleChange('proEndTime', v)}
                                                                    placeholder="请选择"
                                                                    style={{ width: '100%' }}
                                                                />
                                                            )}

                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row
                                                    className="proList"
                                                    gutter={24}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Col {...ColLayout1}>
                                                        <FormItem {...formItemLayout} label="所属区域">
                                                            {getFieldDecorator('addr', {
                                                                initialValue: [
                                                                    proDetail && proDetail['proProvince'],
                                                                    proDetail && proDetail['proCity'],
                                                                    proDetail && proDetail['proArea'],
                                                                ],
                                                                rules: [
                                                                    { required: true, message: <div>所属区域不能为空!</div> },
                                                                ],
                                                            })(
                                                                <Cascader
                                                                    fieldNames={{
                                                                        label: 'regionKey',
                                                                        value: 'regionValue',
                                                                    }}
                                                                    options={address}
                                                                    placeholder="请选择项目所属区域"
                                                                    loadData={this.loadData}
                                                                    onChange={this.handleChangeMap}
                                                                />
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="项目地址" {...formItemLayout}>
                                                            {getFieldDecorator('proAddr', {
                                                                initialValue: detailAddress,
                                                                rules: [
                                                                    { required: true, message: <div>项目地址不能为空!</div> },
                                                                ],
                                                            })(
                                                                <Input
                                                                    placeholder="先选择项目位置再操作"
                                                                    disabled={addressUse}
                                                                    suffix={
                                                                        <Icon
                                                                            onClick={this.getAddress}
                                                                            type="environment"
                                                                            theme="outlined"
                                                                        />
                                                                    }
                                                                />
                                                            )}

                                                        </FormItem>
                                                        <BaiduMap
                                                            dataSource={dataSource}
                                                            handleShow={this.handleShow}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row
                                                    className="proList"
                                                    gutter={24}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="项目标签" {...formItemLayout}>
                                                            {getFieldDecorator('proLable', {
                                                                initialValue: proLableVal,
                                                            })(
                                                                <Select placeholder="请选择" mode="tags">
                                                                    {projectTagList &&
                                                                        Array.isArray(projectTagList)
                                                                        ? projectTagList.map(subOpt => {
                                                                            return (
                                                                                <Option
                                                                                    value={subOpt.categoryValue}
                                                                                    key={subOpt.categoryId}
                                                                                >
                                                                                    {subOpt.categoryValue}
                                                                                </Option>
                                                                            );
                                                                        })
                                                                        : null}
                                                                </Select>
                                                            )}

                                                        </FormItem>
                                                    </Col>
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="项目图标" {...formItemLayout}>
                                                            <UploadComp
                                                                maxlength={1}
                                                                uploadSuccess={this.uploadSuccess}
                                                                planPic={pictures}
                                                                removeFileImg={this.removeFileImg}
                                                                type="XM"
                                                            />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row
                                                    className="proList"
                                                    gutter={24}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Col {...ColLayout1}>
                                                        <FormItem label="是否审批" {...formItemLayout}>
                                                            {getFieldDecorator('isApproval', {
                                                                initialValue: proDetail && proDetail.isApproval,
                                                            })(
                                                                <RadioGroup onChange={this.onChange}>
                                                                    <Radio value={0}>是</Radio>
                                                                    <Radio value={1}>否</Radio>
                                                                </RadioGroup>
                                                            )}

                                                        </FormItem>
                                                    </Col>
                                                    <Col {...ColLayout1} />
                                                </Row>

                                                <FormItem wrapperCol={{ span: 2, offset: 2 }}>
                                                    <Button type="primary" htmlType="submit">保存</Button>
                                                </FormItem>

                                            </Form>
                                            : <p>请重新选择项目</p>}
                                    </Card>
                                </TabPane>
                                <TabPane tab="行政单位" key="QSjnnNzSgk2MnoemiQ4">
                                    <ProjectDetailsTables
                                        proId={proId}
                                        type={type}
                                        projectUnitList={projectUnitList}
                                        getContentList={(key) => this.getContentList(key)}
                                    /> 
                                </TabPane>
                                <TabPane tab="建设单位" key="1HLcJSdvLFoUlld0voH">
                                    <ProjectDetailsTables
                                        proId={proId}
                                        type={type}
                                        projectUnitList={projectUnitList}
                                        getContentList={(key) => this.getContentList(key)}
                                    /> 
                                </TabPane>
                                <TabPane tab="施工单位" key="7Va1tNd94LBrr0CKvc1">
                                    <ProjectDetailsTables
                                        proId={proId}
                                        type={type}
                                        projectUnitList={projectUnitList}
                                        getContentList={(key) => this.getContentList(key)}
                                    /> 
                                </TabPane>
                                <TabPane tab="劳务公司" key="x1Ba1qoEhfyP6S2qTvN">
                                    <ProjectDetailsTables
                                        proId={proId}
                                        type={type}
                                        projectUnitList={projectUnitList}
                                        getContentList={(key) => this.getContentList(key)}
                                    /> 
                                </TabPane>
                            </Tabs>
                        </Card>
                        
                    </React.Fragment>
                    : <Unauthorized />}
            </div>
        );
    }
    handleTabsChange = (key) => {
        this.setState({
            type: key
        })
        this.getContentList(key);
    }
    // 获取项目列表
    getContentList = (key) => {
        const { proId } = this.state;
        //初始化项目列表
        key != '1' && this.props.getUnitList({
            proId: proId,
            companyType: key
        });
    }

}

export default ProjectDetail;
