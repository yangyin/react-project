import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Card, Form, Input, Button, InputNumber, Popconfirm } from 'antd';

import './biss-role-list.less';
import Panel from '../../../components/panel/panel';
import { Unauthorized } from './../../error-page/not-found-page';
import { getBissRoleList, updateRole, deleteRole, addRole, jurisdictionStatus,updateRoleStatus } from './store/actions';

const FormItem = Form.Item;
const EditableContext = React.createContext();
const panelData = { pathname: '系统 / 项目角色', title: '项目角色', desc: '项目角色是帮助项目管理员进行分组项目人员及班组的工具' }




const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{ required: title==="描述"?false:true, message: `${title}不能为空!` }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

@connect(
    state => ({
        projectRole: state.projectRole
    }),
    { getBissRoleList, updateRole, deleteRole, addRole, jurisdictionStatus,updateRoleStatus }
)
@Form.create()
class BissRoleList extends Component {
    constructor(props) {
        super(props);
        this.state = { editingKey: '' };
        this.columns = [
            { title: '项目角色名称', dataIndex: 'roleName', editable: true },
            { title: '描述', dataIndex: 'roleContent', editable: true },
            { title: '排序', dataIndex: 'roleSort' },
            {
                title: '操作', dataIndex: 'operation', render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record)}
                                                style={{ marginRight: 8 }}
                                            >保存</a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="确定放弃修改?"
                                        okText="确定" 
                                        cancelText="取消"
                                        onConfirm={() => this.cancel(record.roleId)}
                                    >
                                        <a>关闭</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                    record['isOperation'] == 1 ?
                                        <span>
                                            <a onClick={() => this.edit(record.roleId)}>编辑 | </a>
                                            <Link to={"/sdpbusiness/roleRelation/getBissRoleList/management/" + record.roleId}>详情</Link>
                                            {/* <a onClick={() => this.findDetail(record.roleId)}>详情</a> */}
                                            {record['roleType'] != 'A' && <a onClick={() => this.delete(record.roleId)}> | 删除</a>}
                                        </span> : <span>不可操作</span>
                                )}
                        </div>
                    )
                },
            },
        ];
    }
    isEditing = (record) => {
        return record.roleId === this.state.editingKey;
    };
    add = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addRole({ ...values, roleSource: 'B', roleType: 'B', roleState: 'y' });
                this.props.form.resetFields();
            }
        });

    }
    edit(key) {
        this.setState({ editingKey: key });
    }
    delete(key) {
        this.props.deleteRole({ roleId: key });
    }
    findDetail(key) {

    }
    save(form, { roleId }) {
        // e.preventDefault();
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            // console.log(row, roleId)
            this.props.updateRole({ ...row, roleId, flag: 'update' });
            this.setState({ editingKey: '' });
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    componentDidMount() {
        this.props.getBissRoleList();
    }
    componentDidUpdate() {
        const { isUpdateRole } = this.props.projectRole;
        if(isUpdateRole === true) {
            this.props.updateRoleStatus(false);
            this.props.getBissRoleList();
        }
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { isJurisdiction } = this.props.projectRole;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div className="biss-role-list">
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Table
                            components={components}
                            locale = {{emptyText:'暂无数据'}}
                            style={{ margin: '24px', background: '#fff' }}
                            dataSource={this.props.projectRole.roleList}
                            columns={columns}
                            rowKey={record => record.roleId}
                            pagination={false}
                        />
                        <Card title="添加新角色">
                            <Form onSubmit={this.add}>
                                <FormItem
                                    {...formItemLayout}
                                    label="名称"
                                >
                                    {getFieldDecorator('roleName', {
                                        rules: [{ required: true, message: '请输入名称!' }],
                                    })(
                                        <Input type="text" autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="描述"
                                >
                                    {getFieldDecorator('roleContent', {
                                        rules: [],
                                    })(
                                        <Input type="text" autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem  >
                                    <div className="btn-group clearfix">
                                        <Button>取消</Button>
                                        <Button type="primary" htmlType="submit">提交</Button>
                                    </div>
                                </FormItem>
                            </Form>
                        </Card>
                    </React.Fragment>
                    : <Unauthorized />
                }
            </div>
        )
    }
}







export default BissRoleList;