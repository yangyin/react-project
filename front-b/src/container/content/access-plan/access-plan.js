import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Divider, Table, Input, InputNumber, Form } from 'antd';
import { connect } from 'react-redux';
import { getAuthorityList, copyAuthority, deleteAuthority, updateAuthority, jurisdictionStatus,accessPlanUpdate } from './store/action';

import Panel from '../../../components/panel/panel';
import { Unauthorized } from './../../error-page/not-found-page';
import './access-plan.less';

const FormItem = Form.Item;
const EditableContext = React.createContext();

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
    state => state.authorityAssistantReducer,
    { getAuthorityList, copyAuthority, deleteAuthority, updateAuthority, jurisdictionStatus,accessPlanUpdate }
)
class AccessPlan extends React.Component {
    constructor(props) {
        super(props);


        this.columns = [
            {
                title: '方案名称',
                dataIndex: 'pgeName',
                width: '20%',
                editable: true,
            },
            {
                title: '备注',
                dataIndex: 'pgeRemarks',
                width: '40%',
                editable: true,
            },
            {
                title: '应用项目',
                dataIndex: 'projectList',
                width: '20%',
                render(text, record) {
                    const proNameArr = record.projectList.slice(0, 2);
                    return proNameArr.map((item, index) => {
                        return (

                            <span
                                key={item.proId}
                            ><span style={{ marginLeft: 5, display: `${index === 0 ? 'none' : 'inline-block'}` }}>.</span>
                                {item.proName}
                            </span>
                        )
                    })



                }
            },

            {
                title: '操作',
                dataIndex: 'operation',
                width: '20%',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable
                                ? <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                onClick={() => this.save(form, record.pgeId)}
                                                style={{ marginRight: 8 }}
                                            >
                                                保存
                        </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <a onClick={() => this.cancel(record.pgeId)}>取消</a>
                                </span>
                                : <a onClick={() => this.edit(record.pgeId)}>编辑</a>}
                            <Divider type="vertical" />
                            <a onClick={() => this.copy(record.pgeId, record.pgeName, record.pgeRemarks)}>复制</a>

                            <Divider type="vertical" style={{ display: `${record.pgeType === 'A' ? 'none' : 'inline-block'}` }} />
                            <a onClick={() => this.del(record.pgeId)} style={{ display: `${record.pgeType === 'A' ? 'none' : 'inline-block'}` }} >删除</a>
                            <Divider type="vertical" />
                            <Link to={`/sdpbusiness/businessPge/authorityDetail/${record.pgeId}`}>管理权限</Link>
                        </div>
                    );
                },
            },
        ];

        this.state = {
            data: [],
            editingKey: '',
            redirect: false
        };
    }

    componentDidMount() {
        this.props.getAuthorityList();
    }

    componentWillReceiveProps(nextProps) {
        const list = nextProps.authoritylist;
        const listPgeList = list ? list.pgeList : [];
        const { isUpdate } = nextProps;

        if(isUpdate) {
            this.props.getAuthorityList();
            this.props.accessPlanUpdate({status:false});
        }

        this.setState({
            data: listPgeList
        })

    }

    // jumpToDetail = () => {
    //     this.setState({
    //         redirect: true
    //     })
    //     console.log(this.state.redirect);
    // };
    isEditing = record => {
        return record.pgeId === this.state.editingKey;
    };

    edit(id) {
        this.setState({ editingKey: id });
    }

    save(form, id) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => id === item.pgeId);

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

            const params = {
                pgeId: id,
                pgeName: newData[index].pgeName,
                pgeRemarks: newData[index].pgeRemarks
            }

            this.props.updateAuthority(params);

        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    }

    copy(id, name, desc) {
        //   const newData = [...this.state.data];
        //   const index = newData.findIndex (item => key === item.key);
        //   if (index > -1) {
        //     const item = newData[index];
        //     newData.push(item)
        //     this.setState ({data: newData, editingKey: ''});
        //   }

        const params = {
            pgeId: id,
            pgeName: name,
            pgeRemarks: desc
        }

        this.props.copyAuthority(params)
        this.props.getAuthorityList();
    }

    del(id) {
        // const dataSource = [...this.state.data];
        // const index = dataSource.findIndex (item => key === item.key);
        // dataSource.splice( index, 1 )
        // this.setState({ data: dataSource });
        const pgeId = id

        this.props.deleteAuthority(pgeId)
        
    }

    render() {
        const panelData = {
            pathname: '系统 / 项目设置 / 项目权限方案',
            title: '权限助手',
            desc: '项目权限方案允许您建立一系列权限控制，并将权限方案应用到任何项目中。项目权限方案中的所有权限都将应用到关联的项目中。',
        };

        // if(this.state.redirect){
        //     return <Redirect push to="../common/addTask"/>
        // }

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

        const { isJurisdiction } = this.props;

        return (
            <div>
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card bordered={false} style={{ background: '#f3f3f3' }}>
                            <Table
                                className="content"
                                rowClassName="editable-row"
                                components={components}
                                bordered={false}
                                dataSource={this.state.data}
                                columns={columns}
                                pagination={false}
                                locale={{emptyText:'暂无数据'}}
                                rowKey="pgeId"
                            />
                        </Card>
                    </React.Fragment>
                    : <Unauthorized />
                }

            </div>
        );
    }
}

export default AccessPlan;
