import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Modal } from 'antd';
import { editDept } from './store/action';
import { initDepartment, searchLink } from '../employ-list/store/action';

const FormItem = Form.Item;
const Option = Select.Option;
@connect(
    state => {return(state.departmentManagerReducer, state.staffManagerReducer)},
    { editDept, initDepartment, searchLink}
)
@Form.create()
class DeptEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            personId: '' // 负责人id
        };
    }
    componentWillReceiveProps(nextProps) {
        const { deptMangerId } = nextProps.editDatas;
        if ( deptMangerId !== this.props.editDatas.deptMangerId) {
            this.setState({
                personId: deptMangerId
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let editPersonStr = '';
        const { editName, editPerson, editPhone } = this.props.editDatas;
        if(editPerson || editPhone) {
            editPersonStr = editPhone + ' ' + editPerson
        }
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
        return (
            <div >
                <Modal
                    title="编辑部门"
                    visible={this.props.editDatas.show}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确定"
                    >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="部门名称"
                            hasFeedback
                            >
                            {getFieldDecorator('deptNameEdit', {
                                initialValue: editName,
                                rules: [
                                { required: true, message: '部门名称必填!' },
                                ],
                            })(
                                <Input/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="部门负责人"
                            hasFeedback
                            >
                            {getFieldDecorator('deptPersonEdit', {
                                initialValue: editPersonStr,
                                rules: [
                                { required: true, message: '部门负责人必填！' },
                                ],
                            })(
                                <Select 
                                    placeholder="请选择搜索手机号或姓名" 
                                    showSearch={true} 
                                    onSearch={this.fetchUser}
                                    onChange= {this.handleChange}
                                    filterOption={false}
                                    notFoundContent="暂无数据"
                                >
                                    {
                                        this.props.personList.map(subOpt => {
                                            return(
                                                <Option value={subOpt.id} key={subOpt.id}>{subOpt.text}&nbsp;&nbsp;{subOpt.userName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
    // 提交编辑
    handleOk = (e) => {
        this.handleSubmit();
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {     
          if (!err) {
            const options = {
                deptId: this.props.editDatas.id,
                deptName: values.deptNameEdit,
                deptContent: '',
                deptMangerId: this.state.personId
            }
            this.props.editDept(options);
            this.props.handleEdit();
            this.props.form.resetFields();
          }
        });
    }
    // 取消编辑
    handleCancel = (e) => {
        this.props.handleEdit();
        this.props.form.resetFields();
    }
    // 搜索部门负责人框获取焦点
    fetchUser = (val) => {
        this.props.searchLink(val);
    }
    // 选择部门负责人后
    handleChange = (data) => {
        this.setState({
            personId: data
        })
    }
}

export default DeptEdit;