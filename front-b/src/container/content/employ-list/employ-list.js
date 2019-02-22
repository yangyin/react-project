import React , { Component } from 'react';
import { Card, Table, Modal, Button, Select, Input, Form, Divider, Popconfirm  } from 'antd';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { initStaffManagement, deleteStaff, initDepartment, searchLink, addStaff, jurisdictionStatus, deleteStaffStatus, addStaffStatus } from './store/action';
import Panel from '../../../components/panel/panel';
import Utils from './../../../utils/utils';

import { Unauthorized } from './../../error-page/not-found-page';

import './employ-list.less';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
@connect(
    state => ({
        staffManagerReducer: state.staffManagerReducer
    }),
    { initStaffManagement, deleteStaff, initDepartment, searchLink, addStaff, jurisdictionStatus, deleteStaffStatus, addStaffStatus }
)
@Form.create()
class EnterpriseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            visible: false,
        };
        //列表数据
        this.params = {
            pageNum: 1,
            pageSize: 10,
            deptId:'', 
            paramName:''
        }
        this.columns = [{
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName'
          }, {
            title: '电话号码',
            dataIndex: 'userPhone',
            key: 'userPhone',
          }, {
            title: '部门',
            key: 'deptName',
            dataIndex: 'deptName'
          }, {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime'
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={{
                        pathname: `/employ/relatedProject/employGroup`,
                        state: record
                    }}>关联项目</Link>
                    <Divider type="vertical" />
                    <Popconfirm 
                        placement="top" 
                        title="移除用户时会同时将用户从企业已关联的项目中移除，您是否确定操作？" 
                        onConfirm={() => this.delete (record)} 
                        okText="确定"
                        cancelText="删除"
                    >
                        <a>移除</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <Link to={{
                        pathname: `/employ/jur/${record.userId},${encodeURIComponent(record.deptName)},${encodeURIComponent(record.userName)}`,
                    }}>权限</Link>
                    {/* <a onClick={() => this.delete (record)} >权限</a> */}
                </span>
            ),
          }]
    }
    componentDidMount() {
        const { search } = this.props.location;
        this.params.deptId = search.split('=')[1];
        this.props.initStaffManagement(this.params);
        this.props.initDepartment();
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    componentDidUpdate(prevProps) {
        /**
         * 判断删除任务，成功时，更改isPlanDelete状态，并且刷新界面
         */
        const { employAdd, employDelete } = this.props.staffManagerReducer;
        if(employAdd === true) {
            this.props.addStaffStatus(false);
            this.props.initStaffManagement(this.params);
        }
        if(employDelete === true) {
            this.props.deleteStaffStatus(false);
            this.props.initStaffManagement(this.params);
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const panelData = { pathname: '系统 / 员工管理', title: '员工管理', desc: '' }
        const { staffList, isJurisdiction, departList, personList } = this.props.staffManagerReducer;
        if (this.state.redirect) {
            return <Redirect push to="/user/findDeptList" />;
        }
        return (
            <div>
                {isJurisdiction !== true ?<React.Fragment>
               <Panel panelData={panelData} />
               <Card bordered={false} style={{ margin: 24 }}>
                    <div className="clearfix employ_filter">
                        <Button type="primary" onClick={this.showModal}>新增员工</Button>
                        <Select 
                            defaultValue="请选择所查找部门" 
                            style={{ width: 250 }} 
                            onChange={this.handleChange}
                            notFoundContent="暂无数据"    
                        >
                            <Option value="" key="">全部</Option>
                            {
                                departList && Array.isArray(departList)
                                ? departList.map(subOpt => {
                                    return(
                                        <Option value={subOpt.deptId} key={subOpt.deptId}>{subOpt.deptName}</Option>
                                    )
                                })
                                : null
                            }
                        </Select>
                        <Search placeholder="请输入电话号码或姓名" onSearch={this.handleSearch} style={{ width: 280 }} />
                    </div>
                    <Table 
                        columns={this.columns} 
                        rowKey="userId"
                        locale={{emptyText: '暂无数据'}}
                        pagination={
                            Utils.pagination({...staffList, pageNum: this.params.pageNum },(current) =>{
                                this.params.pageNum =current;
                                this.props.initStaffManagement(this.params);
                            })
                        }
                        dataSource={ staffList ? staffList.rows : []}
                        />
               </Card>
               <Modal
                    title="新增员工"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    okText="确定"
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="用户姓名"
                                hasFeedback
                                >
                                {getFieldDecorator('selePerson', {
                                    rules: [
                                    { required: true, message: '请搜索选择要添加的员工!' },
                                    ],
                                })(
                                    <Select 
                                        placeholder="请输入手机号或姓名" 
                                        showSearch={true} 
                                        filterOption={false}
                                        onSearch={this.onPersonSearch}
                                        notFoundContent="暂无数据"
                                    >
                                        {
                                            personList && Array.isArray(personList)
                                            ? personList.map(personOpt => {
                                                return(
                                                    <Option value={personOpt.text} key={personOpt.id}>{personOpt.text}&nbsp;&nbsp;{personOpt.userName}</Option>
                                                )
                                            })
                                            : null
                                        }
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="所属部门"
                                hasFeedback
                                >
                                {getFieldDecorator('seleDept', {
                                    rules: [
                                    { required: true, message: '请选择部门类型！' },
                                    ],
                                })(
                                    <Select placeholder="请选择部门类型" notFoundContent="暂无数据">
                                        {/* <Option value="" key="">请选择部门类型</Option> */}
                                            {
                                                departList && Array.isArray(departList)
                                                ?  departList.map(subOpt => {
                                                    return(
                                                        <Option value={subOpt.deptId} key={subOpt.deptId}>{subOpt.deptName}</Option>
                                                    )
                                                })
                                                : null
                                            }
                                    </Select>
                                )}
                            </FormItem>
                        </Form>
                </Modal>
                </React.Fragment> : <Unauthorized />}
            </div>
        )
    }
    // 移除
    delete (result) {
        const { params } = this.state;
        this.props.deleteStaff(result.userId, params);
    }
    handleChange = (value) => {
        this.params.deptId = value;
        this.props.initStaffManagement(this.params);
    }
    handleSearch = (value) => {
        this.params.paramName = value;
        this.props.initStaffManagement(this.params);
    }
    // 新增员工弹窗
    showModal = () => {
        this.props.searchLink('');
        this.setState({
          visible: true,
        });
      }
    
    handleOk = (e) => {
        this.handleSubmit();
    }
    
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { params } = this.state;
            const options = {
                userPhone: values.selePerson,
                deptId: values.seleDept,
                userType: 'type2'
            }
            this.props.addStaff(options, params);
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
    // 搜索框获取焦点
    onPersonSearch = (val) => {
        this.props.searchLink(val);
    }
}

export default EnterpriseInfo;