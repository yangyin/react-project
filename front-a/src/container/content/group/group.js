import React, { PureComponent, Component } from 'react';
import { Popconfirm, Card, Divider, Table, Input, Form, } from 'antd';
import { Link } from 'react-router-dom';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';
import Utils from '@/utils/utils';
import { Unauthorized } from '@/container/error-page/not-found-page';

import './group.less';
import { statusControl,groupAction, groupEditAction, groupCopyAction, groupDelAction } from './store/actions';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
const data = [];
class EditableCell extends Component {
    getInput = () => {
        return <Input maxLength={15} />;
    };

    render () {
        const {
            editing,
            dataIndex,
            title,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {form => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing
                                ? <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [
                                            {
                                                required: true,
                                                message: `请输入 ${title}!`,
                                            },
                                        ],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                                : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}


@connect(
    state => ({
        group: state.get('group'),
    }),
    { statusControl,groupAction, groupEditAction, groupCopyAction, groupDelAction }
)
class Group extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data,
            editingKey: '',
            redirect: false,
        };
        this.columns = [
            { title: '用户名称', width: '25%', dataIndex: 'groupName', editable: true, },
            { title: '描述', width: '25%', dataIndex: 'groupContent', editable: true, },
            {
                title: '用户组类型', width: '25%', dataIndex: 'groupType', editable: false,
                render: (text, record) => {
                    let renderType = text === 'A' ? '内置' : '自定义';
                    return renderType;
                }
            },
            {
                title: '操作',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    const groupType = record.groupType;
                    return (
                        <div>
                            {editable
                                ? <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a onClick={() => this.save(form, record.groupId)}
                                                style={{ marginRight: 8 }}
                                            >
                                                保存
                                    </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <a onClick={() => this.cancel(record.groupId)}>取消</a>
                                </span>
                                : <a onClick={() => this.edit(record.groupId)}>编辑</a>}
                            <Divider type="vertical" />
                            <Link
                                to={{
                                    pathname: '/user/groupMember',
                                    search: `?groupId=${record.groupId}&groupName=${record.groupName}`
                                }}
                            >
                                成员管理
                          </Link>
                            {/* <a onClick={() => this.copy(record.groupId)}>
                                复制
                          </a> */}
                            {groupType !== 'A' ? <span><Divider type="vertical" />
                                <Popconfirm title="确认删除该条数据?" onConfirm={() => this.del(record.groupId)}>
                                    <a href="javascript:;">删除</a>
                                </Popconfirm>
                            </span>
                                : null}

                        </div>
                    );

                },
            },
        ];
        this.params = {
            pageNum: 1,
            pageSize: 10,
        }
    }
    componentDidMount () {
        this.props.groupAction(this.params);
    }
    // 更新 组件接受新的props时调用
    componentWillReceiveProps (nextProps) {
        const nextGroupData = nextProps.group.get('groupList');
        const nextdata = nextGroupData.rows || [];
        // 用户组列表数据
        if (nextdata.length > 0) {
            this.setState({
                data: nextdata,
            });
        }
        const refresh = nextProps.group.get('refresh');
        if (refresh) {
            this.params.pageNum = 1;
            this.props.groupAction(this.params);
            this.props.statusControl(false);
        }

    }
    isEditing = record => {
        return record.groupId === this.state.editingKey;
    };

    edit (key) {
        this.setState({ editingKey: key });
    }

    save (form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.groupId);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
            // 保存数据
            const updateParams = {
                groupName: newData[index].groupName,
                groupContent: newData[index].groupContent,
                groupId: newData[index].groupId,
                groupType: newData[index].groupType,
            };
            this.props.groupEditAction(updateParams);
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    copy (key) {
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.groupId);
        if (index > -1) {
            const item = newData[index];
            this.setState({ editingKey: '' });
            const copyParams = {
                groupName: `复制-${item['groupName']}`,
                groupContent: `复制-${item['groupContent']}`,
                groupType: 'B',
            }
            this.props.groupCopyAction(copyParams);
        }

    }

    del (key) {
        this.props.groupDelAction({ groupId: key });
    }


    render () {
        const panelData = {
            title: '用户组',
        };
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
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
        const dataList = this.props.group.get('groupList');
        const { data } = this.state;
        const isJur = this.props.group.get('isJur');
        return (
            <React.Fragment>
                {!isJur ?
                    <div className="user">
                        <Panel panelData={panelData} />
                        <Card bordered={false} style={{ margin: 24 }}>
                            <Table
                                className='tableStyle'
                                locale={{ emptyText: '暂无数据' }}
                                components={components}
                                rowKey="groupId"
                                dataSource={data}
                                columns={columns}
                                pagination={
                                    Utils.pagination({ ...dataList, pageNum: this.params.pageNum }, (current) => {
                                        this.params.pageNum = current;
                                        this.props.groupAction(this.params);
                                    })
                                }
                            />
                        </Card>
                    </div>
                    : <Unauthorized />}
            </React.Fragment>
        );
    }
}


export default Group;






