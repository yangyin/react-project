import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Input, Popconfirm, Form, InputNumber, Button, Select } from 'antd';

import { getProjectRoleListAction, saveRoleAction, saveRoleStatus, editRoleAction, delRoleAction } from './store/actions';


import PanelComp from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';




import './project-role.less';


const panelData = {
    title: '项目角色',
};
const FormItem = Form.Item;
const Option = Select.Option;
const EditableContext = React.createContext();

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
};


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
        let rules = [];
        switch (dataIndex) {
            case 'roleName':
                rules.push({ max: 5, message: '5个字以内' });
                rules.push({ required: true, message: `${title}不能为空!` });
                break;
            case 'roleContent':
                rules.push({ max: 12, message: '12个字以内' });
                break;
            case 'roleSort':
                rules.push({ required: true, message: `${title}不能为空!` });
                break;
            default:
                break;
        }
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <React.Fragment>
                                    <FormItem style={{ margin: 0 }}>
                                        {getFieldDecorator(dataIndex, {
                                            rules,
                                            initialValue: record[dataIndex],
                                        })(this.getInput())}
                                    </FormItem>
                                </React.Fragment>
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
        projectRole: state.get('projectRole')
    }),
    { getProjectRoleListAction, saveRoleAction, saveRoleStatus, editRoleAction, delRoleAction }
)
@Form.create()
class ProjectRole extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: false
        }
        this.columns = [
            {
                title: '项目角色名称',
                dataIndex: 'roleName',
                width: '25%',
                editable: true,
            },
            {
                title: '描述',
                dataIndex: 'roleContent',
                width: '30%',
                editable: true,
            },
            {
                title: '类型',
                dataIndex: 'roleType',
                width: '10%',
                editable: false,
            },
            {
                title: '排序',
                dataIndex: 'roleSort',
                width: '10%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'isOperation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record.roleId)}
                                                style={{ marginRight: 8 }}
                                            >
                                                保存 |
                            </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="确定放弃?"
                                        onConfirm={() => this.cancel(record.key)}
                                    >
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                    <span>
                                        {record.isOperation === '1' ? <span>
                                            <a onClick={() => this.edit(record.roleId)}>编辑</a> |
                                            <Popconfirm title="确定要删除?" onConfirm={() => this.del(record.roleId)} okText="确定" cancelText="取消">
                                                <a href="#"> 删除</a>
                                            </Popconfirm>
                                        </span> : <span>不可操作</span>}
                                    </span>
                                )}
                        </div>
                    );
                },
            },
        ];
    }

    isEditing = record => record.roleId === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };
    //编辑，保存
    save = (form, key) => {
        form.validateFields((err, values) => {
            if (!err) {
                this.props.editRoleAction({ ...values, roleId: key, flag: 'update' });
            }
        });
    }

    //删除
    del = (roleId) => {
        this.props.delRoleAction({ roleId });
    }

    //点击编辑
    edit = (key) => {
        this.setState({ editingKey: key });
    }
    componentDidMount() {
        const roleList = this.props.projectRole.get('roleList');
        roleList.size === 0 && this.props.getProjectRoleListAction();
    }
    componentWillReceiveProps(nextProps) {
        const isAdd = nextProps.projectRole.get('isAdd');
        //新增成功，编辑，删除，刷新
        if (isAdd) {
            this.props.getProjectRoleListAction();
            this.props.saveRoleStatus(false);
            this.setState({ editingKey: '' });
        }
    }
    render() {
        const roleList = this.props.projectRole.get('roleList').toJS();
        const isJur = this.props.projectRole.get('isJur');
        const { getFieldDecorator } = this.props.form;
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
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <React.Fragment>
                {
                    !isJur
                        ? <div>
                            <PanelComp panelData={panelData} />
                            <Card style={{ margin: 24 }}>
                                <Table
                                    rowKey="roleId"
                                    components={components}
                                    bordered={false}
                                    dataSource={roleList}
                                    columns={columns}
                                    rowClassName="editable-row"
                                    pagination={false}
                                />
                            </Card>
                            <Card style={{ margin: 24 }} title="添加新角色">
                                <Form onSubmit={this.handleAddSubmit}>
                                    <FormItem
                                        label="名称"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('roleName', {
                                            rules: [{ required: true, message: '名称不能为空' }],
                                        })(
                                            <Input maxLength={5} autoComplete="off" placeholder="请输入角色名称，5个字以内" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="描述"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('roleContent', {
                                            rules: [{ required: false, message: '描述不能为空' }],
                                        })(
                                            <Input maxLength={12} autoComplete="off" placeholder="请输入角色描述，12个字以内" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="类型"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('roleType', {
                                            rules: [{ required: true, message: '角色类型不能为空' }],
                                            initialValue: ''
                                        })(
                                            <Select style={{ width: '100%' }}>
                                                <Option value="">请选择角色类型</Option>
                                                <Option value="C">内置</Option>
                                                <Option value="A">自定义</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="排序"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('roleSort', {
                                            rules: [
                                                { required: true, message: '排序不能为空' },
                                                
                                            ],
                                        })(
                                            <InputNumber style={{width:'100%'}} min={1} autoComplete="off" placeholder="请输入角色排序" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label=" "
                                        {...formItemLayout}
                                        colon={false}
                                    >
                                        <Button type="primary" htmlType="submit">提交</Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                        : <Unauthorized />
                }
            </React.Fragment>

        );
    }

    handleAddSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.saveRoleAction(values);
            }
        });
    }
}

export default ProjectRole;