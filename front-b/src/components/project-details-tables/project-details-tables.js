import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Card, Button, Modal, Form, Select, Popconfirm, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { addUnitList, addUnitStatus, removeUnitList, removeUnitStatus, getEmpolyList, getTeamList, getWorkerList } from './store/action';
import { selectcompanyName } from '../../redux/findField/actions'; // 搜索企业/单位名称
import { connect } from 'react-redux';

import './project-details-tables.less';

const Option = Select.Option;
const FormItem = Form.Item;
@connect(
    state => ({
        unitList: state.projectDetailsTablesReducer,
        selComName: state.findField.selectCompanyList
    }),
    { addUnitList, addUnitStatus, selectcompanyName, removeUnitList, removeUnitStatus, getEmpolyList, getTeamList, getWorkerList }
)
@Form.create ()
@withRouter
class ProjectDetailsTables extends Component {
    static defaultProps = {
        proId: '',
        type: ''
    }
    constructor(props) {
        super(props);

        this.state = {
            isShowProject: true,
            isShowTeam: true,
            visible: false, //控制项目是否显示下拉
            tableVisible: false
        }
        this.name = '单位名称';
        this.dataType = 'employ';
        this.columns = [{
            title: '单位名称',
            dataIndex: 'companyName',
            key: 'companyName'
        }, {
            title: '负责人',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '联系电话',
            dataIndex: 'userPhone',
            key: 'userPhone',
        }, {
            title: '人员',
            dataIndex: 'userCount',
            key: 'userCount',
            render: (text, record) => (
                <span><a onClick={() => this.showTableList(record)} href="javascript:;" >{text ? text : '暂无信息'}</a></span>
            )
        }, {
            title: '操作',
            dataIndex: '',
            key: '',
            render: (text, record) => (
                <span>
                    <Popconfirm placement="top" title="您是否确定从该项目中移除该对象？" onConfirm={() => this.handleRemove(record)} okText="确定" cancelText="删除">
                        <a href="javascript:;" >移除</a>
                    </Popconfirm>
                </span>
            )
        }];
        this.employColumns = [{
            title: '员工姓名',
            dataIndex: 'companyName',
            key: 'companyName'
        }, {
            title: '联系电话',
            dataIndex: 'userPhone',
            key: 'userPhone',
        }, {
            title: '项目角色',
            dataIndex: 'userCount',
            key: 'userCount'
        }];
        this.teamColumns = [{
            title: '班组名称',
            dataIndex: 'teamName',
            key: 'teamName'
        }, {
            title: '班组负责人',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '联系电话',
            dataIndex: 'userPhone',
            key: 'userPhone'
        }, {
            title: '工人人数',
            dataIndex: 'teamWorkerCount',
            key: 'teamWorkerCount',
            render: (text, record) => (
                <span><a onClick={() => this.showWorkerList(record)} href="javascript:;" >{text ? text : '暂无信息'}</a></span>
            )
        }];
        this.workerColumns = [{
            title: '员工姓名',
            dataIndex: 'userName',
            key: 'userName'
        }, {
            title: '联系电话',
            dataIndex: 'userPhone',
            key: 'userPhone',
        }];
    }

    // 更新 组件初始化时不调用，组件接受新的props时调用。
    componentWillReceiveProps (nextProps) {
        const { unitListAdd, unitListRemove } = nextProps.unitList;
        const { type } = this.props;
        if (unitListAdd){ // 判断新增成功刷新列表
            //初始化项目列表
            this.props.getContentList(type);
            this.props.addUnitStatus(false); // 更新状态
        }
        if (unitListRemove){ // 判断移除成功刷新列表
            //初始化项目列表
            this.props.getContentList(type);
            this.props.removeUnitStatus(false); // 更新状态
        }
    }

    componentDidMount() {
        const { type } = this.props;
        if (type != 'QSjnnNzSgk2MnoemiQ4') {
            this.name = '企业名称';
        }
        if (type == '7Va1tNd94LBrr0CKvc1' || type == 'x1Ba1qoEhfyP6S2qTvN') {
            const addClum = {
                title: '班组',
                dataIndex: 'teamCount',
                key: 'teamCount',
                render: (text, record) => (
                    <span><a onClick={() => this.showTeamList(record)} href="javascript:;" >{text ? text : '暂无信息'}</a></span>
                )
            }
            this.columns.splice(4, 0, addClum);
        }
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { visible, tableVisible } = this.state;
        const { unitEmployList, unitTeamList, unitWorkerList } = this.props.unitList;
        const { selComName, projectUnitList } = this.props;
        let tableDatas = [], columns = [];
        if (this.dataType == 'employ') {
            tableDatas = unitEmployList;
            columns = this.employColumns;
        } else if (this.dataType == 'team') {
            tableDatas = unitTeamList;
            columns = this.teamColumns;
        } else if (this.dataType == 'worker') {
            tableDatas = unitWorkerList;
            columns = this.workerColumns;
        }
        console.log(tableDatas)
        console.log(columns)
        return (
            <div className="project-details">
                <Row style={{ marginBottom: '15px' }}>
                    <Col span={24} style={{ textAlign: 'right' }}><Button type="primary" onClick={this.showAddBox}>添加</Button></Col>
                </Row>
                <Table
                  rowKey="id"
                  dataSource={projectUnitList}
                  columns={this.columns}
                  pagination={false}
                  locale={{emptyText: '暂无数据'}}
                />
                <Modal
                    title="添加"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="确定"
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label={this.name}
                                hasFeedback
                                >
                                {getFieldDecorator('companyId', {
                                    rules: [
                                    { required: true, message: '请搜索选择要添加的名称!' },
                                    ],
                                })(
                                    <Select 
                                        placeholder="请搜索选择要添加的名称！" 
                                        showSearch={true} 
                                        filterOption={false}
                                        onSearch={this.onProjectsSearch}
                                        notFoundContent="暂无数据"
                                        labelInValue={true}
                                    >
                                    {   selComName.length > 0 &&
                                        selComName.map (item => (
                                        <Option
                                            key={item.companyId}
                                        >
                                            {item.companyName}
                                        </Option>
                                    ))}
                                    </Select>
                                )}
                            </FormItem>
                        </Form>
                </Modal>
                <Modal
                    title="详情"
                    visible={tableVisible}
                    onOk={this.handleOkTable}
                    okText="确定"
                    onCancel={this.handleCancelTable}
                    cancelText="取消"
                    width="750px"
                >
                    <Table
                        rowKey="id"
                        dataSource={tableDatas}
                        columns={columns}
                        pagination={false}
                        locale={{emptyText: '暂无数据'}}
                    />
                </Modal>
            </div>
        )
    }
    // 添加弹窗
    showAddBox = () => {
        this.setState({
            visible: true
        })
    }
    // 搜索查询项目列表
    onProjectsSearch = (value) => {
        let selCompanyName = {
            type: 'A',
            param: value,
            companyType: this.props.type,
        };
        this.props.selectcompanyName (selCompanyName);    
    }
    // 新增员工弹窗
    showModal = () => {
        this.setState({
            visible: true,
        });
        this.props.getProjectRole({});
    }
    handleOk = (e) => {
        this.handleSubmit();
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.props.form.resetFields();
    }    
    handleSubmit = () => {
        const { proId, type } = this.props;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const options = {
                proId: proId,
                typeId: type,
                companyName: values.companyId.label,
                companyId: values.companyId.key
            }
            this.props.addUnitList(options);
            this.setState({
                visible: false,
            });
            this.props.form.resetFields();
          }
        });
    }
    // 移除单位
    handleRemove = (data) => {
        const { proId } = this.props;
        this.props.removeUnitList({
            id: data.id,
            proId: proId,
            companyId: data.companyId
        });
    }
    // 弹窗人员列表
    showTableList = (data) => {
        this.dataType = 'employ';
        if (data.userCount > 0) {
            this.setState({
                tableVisible: true
            });
            this.props.getEmpolyList({
                companyId: data.id
            });
        }
    }
    // 弹窗班组列表
    showTeamList = (data) => {
        const { proId } = this.props;
        if (data.teamCount > 0) {
            this.dataType = 'team';
            this.setState({
                tableVisible: true
            });
            this.props.getTeamList({
                companyId: data.id,
                proId
            });
        }
    }
    // 弹窗班组工人列表
    showWorkerList = (data) => {
        this.dataType = 'worker';
        if (data.teamWorkerCount > 0) {
            this.setState({
                tableVisible: true
            });
            this.props.getWorkerList({
                teamId: data.id
            });
        }
    }
    handleOkTable = (e) => {
        this.setState({
            tableVisible: false
        });
    }
    handleCancelTable = (e) => {
        this.setState({
            tableVisible: false
        });
    }    

}

ProjectDetailsTables.propTypes = {
    proId:PropTypes.string,
    type:PropTypes.string
}


export default ProjectDetailsTables;