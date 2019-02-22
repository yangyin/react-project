

import React, { PureComponent, Component } from 'react';
import { Card, Divider, Table, Input, Form, Popconfirm, } from 'antd';
import { Link } from 'react-router-dom';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';
import Utils from '@/utils/utils';
import { Unauthorized } from '@/container/error-page/not-found-page';


import { eduAssisListAction, statusControl, eduAssisEditAction, eduAssisCopyAction, eduAssisDelAction } from './store/actions';

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
        eduAssistant: state.get('eduAssistant'),
    }),
    { eduAssisListAction, statusControl, eduAssisEditAction, eduAssisCopyAction, eduAssisDelAction }
)
class EduAssistant extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data,
            editingKey: '',
            redirect: false,
        };
        this.columns = [
            { title: '名称', width: '30%', dataIndex: 'programName', editable: true, },
            { title: '备注', width: '30%', dataIndex: 'programContent', editable: true, },

            {
                title: '操作',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    const programType = record.programType;
                    return (
                        <div>
                            {editable
                                ? <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                onClick={() => this.save(form, record.programId)}
                                                style={{ marginRight: 8 }}
                                            >
                                                保存
                                    </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <a onClick={() => this.cancel(record.programId)}>取消</a>
                                </span>
                                : <a onClick={() => this.edit(record.programId)}>编辑</a>}
                            <Divider type="vertical" />
                            <Link
                                to={{
                                    pathname: '/setting/eduAssistantDetail',
                                    search: `?programId=${record.programId}`
                                }}
                            >
                                详情
                          </Link>
                            <Divider type="vertical" />
                            <a onClick={() => this.copy(record.programId)}>
                                复制
                          </a>
                            {programType !== 'A' ? <span><Divider type="vertical" />
                                {/* <a onClick={() => this.del(record.programId)}
                                >删除</a> */}
                                <Popconfirm title="确认删除该条数据?" onConfirm={() => this.del(record.programId)}>
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
        this.props.eduAssisListAction();
    }
    // 更新 组件接受新的props时调用
    componentWillReceiveProps (nextProps) {
        const nextGroupData = nextProps.eduAssistant.get('eduAssisData');
        const isRefresh = nextProps.eduAssistant.get('isRefresh');
        if (isRefresh) {
            this.props.statusControl(false);
            this.props.eduAssisListAction()
        }
        // 用户组列表数据
        if (nextGroupData.length > 0) {
            this.setState({
                data: nextGroupData,
            });
        }

    }
    componentWillUnmount () {
    }

    isEditing = record => {
        return record.programId === this.state.editingKey;
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
            const index = newData.findIndex(item => key === item.programId);
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
                programId: newData[index].programId,
                programName: newData[index].programName,
                programContent: newData[index].programContent,
            };
            this.props.eduAssisEditAction(updateParams);
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    copy (key) {
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.programId);
        if (index > -1) {
            const item = newData[index];
            this.setState({ editingKey: '' });
            const copyParams = {
                programId: item['programId'],
            };

            this.props.eduAssisCopyAction(copyParams);
        }
    }
    del (key) {
        this.props.eduAssisDelAction({ programId: key });
    }
    render () {
        const panelData = {
            title: '默认教育方案',
        };
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const isJur = this.props.eduAssistant.get('isJur');
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
        const { data } = this.state;
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
                                rowKey="programId"
                                dataSource={data}
                                columns={columns}
                            />
                        </Card>
                    </div>
                    : <Unauthorized />}
            </React.Fragment>
        );
    }
}


export default EduAssistant;






