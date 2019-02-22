import React, { Component } from 'react';
import { Card, Table, DatePicker, Modal, Button, Select, Input, Form, Radio, Row, Col, Tooltip, } from 'antd';

import { Link } from 'react-router-dom';
import Panel from '../../../components/panel/panel';
import { connect } from 'react-redux';
import moment from 'moment';
import Utils from '../../../utils/utils';
import { getSafeList, qualitAdd, jurisdictionStatus } from './store/action';
import {
    getSectionList,
    getProAddressBook,
    selectPlanList,
} from '../../../redux/findField/actions';
import UploadComp from '../../../components/upload';
import { Unauthorized } from '@/container/error-page/not-found-page';

import './safe-manage.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@Form.create()
@connect(
    state => ({
        isJurisdiction: state.safeManage.isJurisdiction,
        topbar: state.topbar,
        safeData: state.safeManage.safeList,
        sectionaList: state.findField.sectionList,
        isMark: state.safeManage.isMark,
        leaderList: state.findField.proLeaderList,
        selPlanList: state.findField.planAboutList,
    }),
    {
        jurisdictionStatus,
        getSafeList,
        getSectionList,
        qualitAdd,
        getProAddressBook,
        selectPlanList,
    }
)
class SafeManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.isMark,
            require: true,
            pictures: [],
            timeValKey: 1,
        };
        this.columns = [
            { title: '安全巡检编号', dataIndex: 'qualityNo' },
            {
                title: '检查标段区域',
                dataIndex: 'sectionName',
                render: text => {
                    return text ? text : '--';
                },
            },
            {
                title: '当日施工安全情况',
                dataIndex: 'checkSituation',
                render: text => {
                    let resSituation = '';
                    if (text) {
                        if (text.length > 12) {
                            let valContent = text.substr(0, 12);
                            resSituation = valContent + '...';
                        } else {
                            resSituation = text;
                        }
                    } else {
                        resSituation = '--';
                    }
                    return (
                        <Tooltip title={text}>
                            <span>{resSituation}</span>
                        </Tooltip>
                    );
                },
            },
            {
                title: '直接负责人',
                dataIndex: 'ExecutorPerson',
                render: text => {
                    return text ? text : '--';
                },
            },
            {
                title: '安检人员',
                dataIndex: 'qualityPerson',
                render: text => {
                    return text ? text : '--';
                },
            },
            {
                title: '处理要求及措施',
                dataIndex: 'checkContent',
                render: text => {
                    let resSituation = '';
                    if (text) {
                        if (text.length > 12) {
                            let valContent = text.substr(0, 12);
                            resSituation = valContent + '...';
                        } else {
                            resSituation = text;
                        }
                    } else {
                        resSituation = '--';
                    }
                    return (
                        <Tooltip title={text}>
                            <span>{resSituation}</span>
                        </Tooltip>
                    );
                },
            },
            {
                title: '整改要求时间',
                dataIndex: 'RectificationTime',
                render: text => {
                    return text ? text.substr(0, 10) : '--';
                },
            },
            {
                title: '检查日期',
                dataIndex: 'checkTime',
                render: text => {
                    return text ? text.substr(0, 10) : '--';
                },
            },
            {
                title: '审批状态',
                dataIndex: 'SucesStateId',
                render: (text, record) => {
                    return text === 'y' ? '已审核' : '审核中';
                },
            },
            {
                title: '整改结果',
                dataIndex: 'isCheckState',
            },
            {
                title: '操作', render: (record) => (
                    <Link to={{
                        pathname: '/project/returnSecityQuaDetail',
                        state: { id: record.id, type: 'AQ' }
                    }}>查看</Link>)
            },
        ];
        this.params = {
            proId: '',
            sectionId: '', // 标段id
            type: '', //1代表开始与结束时间都传 0代表最近30天 为空查询所有
            startTime: '',
            endTime: '',
            isCheck: '', // 1整改 0 不整改
            SucesState: '', //  y代表审批完成，n代表审核中
            pageNum: 1,
            pageSize: 10,
            isUpload: false, // true 代表下载 fasle不下载
        };
        this.addParams = {
            proId: '',
            checkTime: '',
            qualityPerson: '',
            checkSituation: '',
            pictures: [],
            isCheck: '1',
            checkContent: '',
            RectificationTime: '',
            ExecutorPerson: '',
            AuditorPerson: '',
        };
    }

    // 组建渲染之后调用  只调用一次
    componentDidMount () {
        const { proId } = this.props.topbar;
        if (proId) {
            this.request();
        }
    }

    // 组件初始化时不调用，组件更新完成后调用
    componentDidUpdate (prevProps) {
        const prevId = prevProps.topbar.proId;
        const { proId } = this.props.topbar;
        if (proId && prevId !== proId) {
            this.request();
        }
    }
    componentWillUnmount () {
        this.props.jurisdictionStatus(false);
    }
    //删除图片
    removeFileImg = (url) => {
        this.setState(prevState => ({
            pictures: prevState.pictures.filter(v => v.url !== url),
        }));
    };
    request = () => {
        const { proId } = this.props.topbar;
        this.params.proId = proId;
        this.props.getSafeList(this.params);
        this.props.getSectionList(proId);
        this.props.getProAddressBook(proId);
        this.props.selectPlanList({ proId: proId, paramName: '' });
    };
    handleSectionChange = (type, value) => {
        switch (type) {
            case 'sectionId':
                this.params.sectionId = value;
                break;
            case 'isCheck':
                this.params.isCheck = value;
                break;
            case 'SucesState':
                this.params.SucesState = value;
                break;
            default:
                break;
        }
        this.props.getSafeList(this.params);
    };
    handleMonthClick = () => {
        this.setState({
            timeValKey: new Date()
        });
        this.params.type = '0';
        this.params.startTime = '';
        this.params.endTime = '';
        this.props.getSafeList(this.params);
    };
    handleTimeChange = (data, dateString) => {
        this.params.type = '1';
        this.params.startTime = dateString[0];
        this.params.endTime = dateString[1];
        this.props.getSafeList(this.params);
    };
    handleExportClick = () => {
        const { proId } = this.props.topbar;
        const _path = window.systemBaseConfig.urldown;
        let url = `${_path}sdpbusiness/task/selectSecurityList?isUpload=true&proId=${proId}&sectionId=${this.params.sectionId}&type=&startTime=${this.params.startTime}&endTime=${this.params.endTime}&isCheck=${this.params.isCheck}&SucesState=${this.params.SucesState}&pageNum=${this.params.pageNum}&pageSize=${this.params.pageSize}`;
        window.open(url);
    };
    handleModalOk = () => {
        this.handleSubmit();
    };
    changeTimeStr = time => {
        return moment(time).format('YYYY-MM-DD');
    };
    clearSpace = str => {
        return str ? str.replace(/\s+/g, '') : '';
    };
    handleSubmit = () => {
        this.props.form.validateFields((errors, values) => {
            let rectificationTimeStr = values.RectificationTime
                ? this.changeTimeStr(values.RectificationTime)
                : '';
            let checkTimeStr = values.checkTime
                ? this.changeTimeStr(values.checkTime)
                : '';
            if (!errors) {
                this.addParams = {
                    proId: this.params.proId,
                    checkTime: checkTimeStr,
                    qualityPerson: values.qualityPerson,
                    checkSituation: this.clearSpace(values.checkSituation),
                    pictures: JSON.stringify(this.state.pictures),
                    isCheck: values.isCheck,
                    checkContent: this.clearSpace(values.checkContent),
                    rectificationTime: rectificationTimeStr,
                    executorPerson: values.executorPerson,
                    AuditorPerson: values.AuditorPerson,
                };
                this.props.qualitAdd(this.addParams, this.params);
                this.setState({
                    visible: false,
                });
            }
        });
    };
    handleModalCancel = e => {
        this.setState({ visible: false });
    };
    showModal = () => {
        this.setState(
            {
                visible: true,
                pictures: [],
            },
            () => {
                this.props.form.resetFields();
            }
        );
    };

    handleCheckType = e => {
        let checkVal = e.target.value;
        this.addParams.isCheck = checkVal;
        this.setState(
            {
                require: checkVal === '1' ? true : false,
            },
            () => {
                if (checkVal == '0') {
                    this.props.form.resetFields([
                        'checkContent',
                        'executorPerson',
                        'RectificationTime',
                    ]);
                }
            }
        );
    };
    // 责任人
    leaderPersonOption = arr => {
        if (arr.length > 0) {
            return arr.map(i => (
                <Option key={i.userId} value={i.userId}>
                    {i.userName} {i.userPhone}
                </Option>
            ));
        } else {
            return [];
        }
    };
    // 相关计划
    planeAboutOption = arr => {
        if (arr.length > 0) {
            return arr.map(i => (
                <Option key={i.id} value={i.planId}>
                    {i.taskName}
                </Option>
            ));
        } else {
            return [];
        }
    };
    // 上传成功回调
    uploadSuccess = data => {
        this.setState(prevState => ({
            pictures: [...prevState.pictures, ...data],
        }));
    };
    render () {
        const panelData = { title: '安全管理' };
        const { pageNum } = this.params;
        const getSectionList = this.props.sectionaList;
        const safeList = this.props.safeData;
        const safeRows = safeList ? safeList.rows : [];
        const selLeaderList = this.props.leaderList;
        const getPlanList = this.props.selPlanList.rows;
        const selPlanRows = getPlanList ? getPlanList : [];
        const { getFieldDecorator } = this.props.form;
        const { isJurisdiction } = this.props;
        const { pictures } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const formItemLayoutSingle = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            },
        };
        const ColLayout1 = {
            xs: 24,
            sm: 24,
            md: 12,
        };
        const ColLayoutSingle = {
            xs: 24,
            sm: 24,
            md: 24,
        };
        return (
            <div>
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card bordered={false} style={{ margin: 24 }}>
                            <Row className="safe_filter">
                                <Col className="tableSelFilter" span={2}>
                                    <Button
                                        style={{ width: '100%' }}
                                        type="primary"
                                        onClick={this.handleMonthClick}
                                    >
                                        最近30天
                    </Button>

                                </Col>

                                <Col className="tableSelFilter" span={4}>
                                    <RangePicker
                                        style={{ width: '100%' }}
                                        placeholder={['开始日期', '结束日期']}
                                        onChange={this.handleTimeChange}
                                        key={this.state.timeValKey}
                                    />
                                </Col>
                                <Col className="tableSelFilter" span={4}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="请选择标段区域"
                                        onChange={value =>
                                            this.handleSectionChange('sectionId', value)}
                                    >
                                        <Option value="" key="">所有标段区域</Option>
                                        {getSectionList.map(v => (
                                            <Option value={v.id} key={v.id}>{v.sectionName}</Option>
                                        ))}
                                    </Select>
                                </Col>

                                <Col className="tableSelFilter" span={4}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="请选择是否整改"
                                        onChange={v => this.handleSectionChange('isCheck', v)}
                                    >
                                        <Option value="" key="2">全部</Option>
                                        <Option value="1" key="1">整改</Option>
                                        <Option value="0" key="0"> 不整改 </Option>

                                    </Select>
                                </Col>

                                <Col className="tableSelFilter" span={4}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="请选择审批状态"
                                        onChange={v => this.handleSectionChange('SucesState', v)}
                                    >
                                        <Option value="" key="">所有状态</Option>
                                        <Option value="y" key="1">已完成</Option>
                                        <Option value="n" key="0"> 审核中 </Option>
                                    </Select>
                                </Col>
                                <Col span={2} className="tableSelFilter">
                                    <Button
                                        style={{ width: '100%' }}
                                        onClick={this.handleExportClick}
                                    >
                                        导出
                    </Button>
                                </Col>

                                <Col span={2}>
                                    <Button style={{ width: '100%' }} onClick={this.showModal}>
                                        安全巡检
                    </Button>
                                </Col>
                            </Row>
                            <Table
                                locale={{ emptyText: '暂无数据' }}
                                columns={this.columns}
                                rowKey="id"
                                pagination={Utils.pagination(
                                    {
                                        ...safeList,
                                        pageNum: pageNum,
                                    },
                                    current => {
                                        this.params.pageNum = current;
                                        this.request();
                                    }
                                )}
                                dataSource={safeRows}
                            />
                            <Modal
                                title="安全巡检"
                                visible={this.state.visible}
                                width={740}
                                bodyStyle={{
                                    height: 520,
                                    overflowY: 'auto',
                                }}
                                centered={true}
                                onOk={this.handleModalOk}
                                onCancel={this.handleModalCancel}
                                cancelText="取消"
                                okText="提交"
                            >
                                <Form>
                                    <Row gutter={24}>

                                        <Col {...ColLayout1}>
                                            <FormItem label="检查日期" {...formItemLayout}>
                                                {getFieldDecorator('checkTime', {
                                                    initialValue: null,
                                                    rules: [{ required: true, message: <div>请输入!</div> }],
                                                })(
                                                    <DatePicker
                                                        format="YYYY-MM-DD"
                                                        style={{ width: '100%' }}
                                                        placeholder="请选择"
                                                    />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col {...ColLayout1}>
                                            <FormItem label="相关计划" {...formItemLayout}>
                                                {getFieldDecorator('planId', {
                                                    initialValue: '',
                                                    rules: [{ message: <div>请选择相关计划!</div> }],
                                                })(
                                                    <Select notFoundContent="暂无数据"
                                                        style={{ width: '100%' }}>
                                                        {this.planeAboutOption(selPlanRows)}
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>

                                        <Col {...ColLayout1}>
                                            <FormItem label="质检人员" {...formItemLayout}>
                                                {getFieldDecorator('qualityPerson', {
                                                    initialValue: '',
                                                    rules: [{ message: <div>请选择质检人员!</div> }],
                                                })(
                                                    <Select style={{ width: '100%' }}>
                                                        <Option value="">请选择</Option>
                                                        {this.leaderPersonOption(selLeaderList)}
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col {...ColLayoutSingle}>
                                            <FormItem label="检查情况" {...formItemLayoutSingle}>

                                                {getFieldDecorator('checkSituation', {
                                                    initialValue: '',
                                                    rules: [
                                                        { required: true, message: <div>请输入!</div> },
                                                        { validator: Utils.validSpace },
                                                    ],
                                                })(
                                                    <TextArea
                                                        maxLength={100}
                                                        rows={4}
                                                        placeholder="请输入检查情况"
                                                    />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col {...ColLayoutSingle}>
                                            <FormItem label="附件上传" {...formItemLayoutSingle}>
                                                <UploadComp
                                                    maxlength={6}
                                                    uploadSuccess={this.uploadSuccess}
                                                    planPic={pictures}
                                                    removeFileImg={this.removeFileImg}
                                                    type="JH"
                                                />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col {...ColLayout1}>
                                            <FormItem label="是否整改" {...formItemLayout}>

                                                {getFieldDecorator('isCheck', {
                                                    initialValue: this.addParams.isCheck,
                                                    rules: [{ message: <div>请输入!</div> }],
                                                })(
                                                    <RadioGroup onChange={this.handleCheckType}>
                                                        <Radio value="1">需要整改</Radio>
                                                        <Radio value="0">无需整改</Radio>
                                                    </RadioGroup>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    {this.state.require &&
                                        <Row
                                            gutter={24}
                                            style={{
                                                display: '1' === this.addParams.isCheck
                                                    ? 'block'
                                                    : 'none',
                                            }}
                                        >
                                            <Col {...ColLayoutSingle}>
                                                <FormItem label="整改要求" {...formItemLayoutSingle}>

                                                    {getFieldDecorator('checkContent', {
                                                        initialValue: '',
                                                        rules: [
                                                            {
                                                                required: this.state.require,
                                                                message: <div>请输入!</div>,
                                                            },
                                                            { validator: Utils.validSpace },
                                                        ],
                                                    })(
                                                        <TextArea
                                                            maxLength={100}
                                                            rows={4}
                                                            placeholder="请输入整改要求"
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>}
                                    {this.state.require &&
                                        <Row
                                            gutter={24}
                                            style={{
                                                display: '1' === this.addParams.isCheck
                                                    ? 'block'
                                                    : 'none',
                                            }}
                                        >
                                            <Col {...ColLayout1}>
                                                <FormItem label="整改时间" {...formItemLayout}>
                                                    {getFieldDecorator('RectificationTime', {
                                                        initialValue: null,
                                                        rules: [
                                                            {
                                                                required: this.state.require,
                                                                message: <div>请输入整改时间!</div>,
                                                            },
                                                        ],
                                                    })(
                                                        <DatePicker
                                                            format="YYYY-MM-DD"
                                                            style={{ width: '100%' }}
                                                            placeholder="请选择"
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col {...ColLayout1}>
                                                <FormItem label="指定执行人" {...formItemLayout}>
                                                    {getFieldDecorator('executorPerson', {
                                                        initialValue: '',
                                                        rules: [
                                                            {
                                                                required: this.state.require,
                                                                message: <div>请选择执行人!</div>,
                                                            },
                                                        ],
                                                    })(
                                                        <Select style={{ width: '100%' }}>
                                                            <Option value="">请选择</Option>
                                                            {this.leaderPersonOption(selLeaderList)}
                                                        </Select>
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>}
                                    <Row gutter={24}>
                                        <Col {...ColLayout1}>
                                            <FormItem label="指定审批人" {...formItemLayout}>
                                                {getFieldDecorator('AuditorPerson', {
                                                    initialValue: '',
                                                    rules: [{ message: <div>请选择审批人!</div> }],
                                                })(
                                                    <Select style={{ width: '100%' }}>
                                                        <Option value="">请选择</Option>
                                                        {this.leaderPersonOption(selLeaderList)}
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>

                                </Form>
                            </Modal>
                        </Card>
                    </React.Fragment>
                    : <Unauthorized />}
            </div>
        );
    }
}

export default SafeManage;
