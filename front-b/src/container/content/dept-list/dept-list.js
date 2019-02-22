import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Divider, Form, Input, Button, Select } from 'antd';
import Panel from '../../../components/panel/panel';
import DeptEdit from './dept-edit';
import { deleteDept, editDept, addDept, deleteDeptStatus, editDeptStatus, addDeptStatus } from './store/action';
import { initDepartment, searchLink } from '../employ-list/store/action';

import './dept-list.less';

const FormItem = Form.Item;
const Option = Select.Option;
@connect(
    state => ({
        departmentManagerReducer: state.departmentManagerReducer,
        staffManagerReducer: state.staffManagerReducer
    }),
    { deleteDept, editDept, addDept, initDepartment, searchLink, deleteDeptStatus, editDeptStatus, addDeptStatus }
)
@Form.create()
class DeptList extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName'
          }, {
            title: '部门负责人',
            dataIndex: 'userName',
            key: 'userName',
          }, {
            title: '手机号码',
            key: 'userPhone',
            dataIndex: 'userPhone'
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a onClick={() => this.edit (record)} >编辑</a>
                <Divider type="vertical" />
                <a onClick={() => this.delete (record)} >删除</a>
              </span>
            ),
        }];
        this.state = {
            fetching: false,
            visible: false,
            id: '',
            editName:'',
            editPerson:'',
            editPhone: ''
        };
    }
    componentDidMount() {
        this.props.initDepartment();
        this.props.searchLink('');
    }
    componentDidUpdate(prevProps) {
        const { deptDelete, deptAdd, deptEdit } = this.props.departmentManagerReducer;
        /**
         * 判断删除任务，成功时，更改isPlanDelete状态，并且刷新界面
         */
        if(deptDelete === true) {
            this.props.deleteDeptStatus(false);
            this.props.initDepartment();
        }
        if(deptAdd === true) {
            this.props.addDeptStatus(false);
            this.props.initDepartment();
        }
        if(deptEdit === true) {
            this.props.editDeptStatus(false);
            this.props.initDepartment();
        }
    }
    render() {
        const panelData = { pathname: '系统 / 员工管理/ 部门设置', title: '部门管理', desc: '部门设置是支持企业用户对部门的设置管理，暂不支持多层级设置；', isBack: false }
        const { getFieldDecorator } = this.props.form;
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
        const {  visible } = this.state;
        const editDatas = {
            show: visible,
            ...this.state
        }
        const { personList, departList } = this.props.staffManagerReducer
        return (
            <div >
                <Panel panelData={panelData} />
                <Card bordered={false} style={{margin: 24}}>
                    <Table 
                        columns={this.columns}
                        rowKey='deptId'
                        pagination={false}
                        locale={{emptyText: '暂无数据'}}
                        dataSource={departList} 
                        />
                </Card>
                <div className="dept-add">
                    <Card title="新增部门" bordered={false} style={{margin: 24}}>
                        <Form onSubmit={this.handleAddSubmit}>
                            <FormItem
                            {...formItemLayout}
                            label="部门名称"
                            >
                            {getFieldDecorator('deptName', {
                                rules: [{
                                    required: true, message: '部门名称不能为空！',
                                }],
                            })(
                                <Input type="text" placeholder="请输入部门名称" />
                            )}
                            </FormItem>
                            <FormItem
                            {...formItemLayout}
                            label="部门负责人"
                            >
                            {getFieldDecorator('deptHead', {
                                rules: [{
                                    required: true, message: '部门负责人不能为空！',
                                }],
                            })(
                                <Select
                                    placeholder="请选择搜索手机号或姓名"
                                    onSearch={this.fetchUser}
                                    showSearch={true}
                                    style={{ width: '100%' }}
                                    filterOption={false}
                                    notFoundContent="暂无数据"
                                >
                                    {
                                        personList && Array.isArray(personList)
                                        ? personList.map(subOpt => {
                                                return(
                                                    <Option value={subOpt.id} key={subOpt.id}>{subOpt.text}&nbsp;&nbsp;{subOpt.userName}</Option>
                                                )
                                            })
                                        : null   
                                    }
                                </Select>
                            )}
                            </FormItem>
                            <FormItem
                            {...formItemLayout}
                            label=" "
                            >
                                <Button type="primary" htmlType="submit">提交</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
                <DeptEdit editDatas = {editDatas} handleEdit={this.handleEdit.bind(this)} /> 
            </div>
        )
    }
    // 删除
    delete (result) {
        this.props.deleteDept(result.deptId);
    }
    // 编辑
    edit (result) {
        this.setState({
            visible: true,
            id: result.deptId,
            editName: result.deptName,
            editPerson: result.userName,
            editPhone: result.userPhone,
            deptMangerId: result.deptMangerId
        });
    }
    handleAddSubmit = () => {
        this.props.form.validateFields((err, values) => {      
          if (!err) {
            const options = {
                deptName: values.deptName,
                deptContent: '',
                deptMangerId: values.deptHead
            }
            this.props.addDept(options);
            this.props.form.resetFields();
          }
        });
    }
    // 搜索部门负责人框获取焦点
    fetchUser = (val) => {
        this.props.searchLink(val);
    }
    // 子组件操作父组件
    handleEdit= (event) => {
        this.setState({
            visible: false
        })
    }


}

export default DeptList;