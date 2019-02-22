
import React, { PureComponent } from 'react';
import { Button, Card, Table, Tabs, Modal, Form, Input, Popconfirm, InputNumber, Select } from 'antd';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import './pro-data.less';

import { getDictionAction, getProjectDataTypeAction, proDataDelAction, proDataUpdateSuc, proDataEditAction ,projectDataClearStore} from './store/actions';
import { getProjectRoleListAction, saveRoleAction, saveRoleStatus, editRoleAction, delRoleAction } from '../project-role/store/actions';

import UploadComp from '@/components/update';
import PanelComp from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';

const panelData = {
    title: '项目数据',
};

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const EditableContext = React.createContext();
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

const tabsList = createSelector(
    state => state,
    state => {
        let arr = [];
        arr = state.map((v, i) => {
            return v;
        });
        const moreOne = fromJS([{
            dictionariesTypeName: '项目角色',
            dictionariesTypeId: '1'
        }]);
        if (arr.size < 1) {
            return []
        } else {
            arr = arr.merge(moreOne);
            return arr;
        }
    }
)

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
        proData: state.get('proData'),
        projectRole: state.get('projectRole')
    }),
    {   getProjectDataTypeAction, getDictionAction, proDataDelAction, proDataUpdateSuc, proDataEditAction,projectDataClearStore,
        getProjectRoleListAction, saveRoleAction, saveRoleStatus, editRoleAction, delRoleAction
    }
)
@Form.create()
class ProjectData extends PureComponent {
    state = {
        visible: false,
        type: 1, //1:新增，2：编辑
        mTitle: '', //modal弹出框 title
        icon: '', //图标
        dictionariesId: '',//当前ID
        dictionariesName: ''//当前编辑名称
    }
    param = {
        key: '', // tab的id值
        url: '' // 上传图片值
    }
    columns = [{
        title: '名称',
        dataIndex: 'dictionariesName'
    }, {
        title: '图标',
        dataIndex: 'icon',
        render: (text) => text ? <img className="pro-data-img" src={text} alt="" /> : null
    }, {
        title: '发布人',
        dataIndex: 'createBy'
    }, {
        title: '操作',
        dataIndex: '',
        render: (record) => {

            return (
                <React.Fragment>
                    <a href="javascript:;" onClick={() => this.edit(record)}>编辑 </a>|
                    <Popconfirm title="确定要删除?" onConfirm={() => this.del(record)} okText="确定" cancelText="取消">
                        <a href="#"> 删除 </a>
                    </Popconfirm>
                </React.Fragment>
            )
        }
    }];
    roleColumns = [
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
                                        <a onClick={() => this.edit(record.roleId)}>编辑</a> 
                                        {/* |
                                        <Popconfirm title="确定要删除?" onConfirm={() => this.del(record.roleId)} okText="确定" cancelText="取消">
                                            <a href="#"> 删除</a>
                                        </Popconfirm> */}
                                    </span> : <span>不可操作</span>}
                                </span>
                            )}
                    </div>
                );
            },
        },
    ];
    //新增
    handleAdd = () => {
        this.setState(() => ({
            visible: true,
            type: 1,
            mTitle: '新增数据'
        }));
    }
    //编辑
    edit = (record) => {
        this.setState(() => ({
            visible: true,
            mTitle: '编辑数据',
            type: 2,
            dictionariesName: record.dictionariesName,
            icon: record.icon,
            dictionariesId: record.dictionariesId
        }))
    }
    //删除
    del = (record) => {
        this.props.proDataDelAction({ dictionariesId: record.dictionariesId });
    }


    componentDidMount() {
        this.props.getProjectDataTypeAction();
    }
    componentWillReceiveProps(nextProps) {

        let typeList = nextProps.proData.get('typeList');
        const currentTypeList = this.props.proData.get('typeList');
        const isUpdate = nextProps.proData.get('isUpdate');
        const isAdd = nextProps.projectRole.get('isAdd');

        //新增成功，编辑，删除，刷新
        if (isAdd) {
            this.props.getProjectRoleListAction();
            this.props.saveRoleStatus(false);
            this.setState({ editingKey: '' });
            //清空state的值
            const { visible } = this.state;
            if (visible) {
                this.handleCancel();
            }
        }

        //初始化数据 ， 默认第一条tabs的数据
        if (typeList.size > 0 && currentTypeList.size === 0) {
            const key = typeList.getIn([0, 'dictionariesTypeId']);
            this.props.getDictionAction({ dictionariesTypeId: key });
            this.param.key = key;
        }
        //isUpdate 如为true，更新页面
        if (isUpdate) {
            this.props.proDataUpdateSuc({ status: false });
            this.props.getDictionAction({ dictionariesTypeId: this.param.key });
            //清空state的值
            const { visible } = this.state;
            if (visible) {
                this.handleCancel();
            }
        }
    }

    componentWillUnmount = () => {
        this.props.projectDataClearStore();
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const typeList = tabsList(this.props.proData.get('typeList'));
        const isJur = this.props.proData.get('isJur');
        const activeKey = typeList.size > 0 ? typeList.getIn([0, 'dictionariesTypeId']) : '';
        const { getFieldDecorator } = this.props.form;
        const { dictionariesName, icon, mTitle, visible } = this.state;
        return (
            <React.Fragment>
                {
                    !isJur
                        ? <div className="project-data">
                            <PanelComp panelData={panelData} />
                            <Card style={{ margin: 24 }}>
                                <Tabs defaultActiveKey={activeKey} onChange={this.handleTabChange} >
                                    {typeList.map(v =>
                                        <TabPane tab={v.get('dictionariesTypeName')} key={v.get('dictionariesTypeId')}>{this.itemRender(v.get('dictionariesTypeId'))}</TabPane>
                                    )}
                                    {/* <TabPane tab='项目角色' key=''>
                                        <div className="pro-data-title">
                                            <Button onClick={this.handleAdd}>新增数据</Button>
                                        </div>
                                        <Table
                                            rowKey="roleId"
                                            components={components}
                                            bordered={false}
                                            dataSource={roleList}
                                            columns={roleColumns}
                                            rowClassName="editable-row"
                                            pagination={false}
                                        />
                                    </TabPane> */}
                                </Tabs>
                            </Card>
                            <Modal
                                title={mTitle}
                                visible={visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                {
                                    this.param.key === ''
                                    ? 
                                    <Form>
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
                                        {/* <FormItem
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
                                        </FormItem> */}
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
                                    </Form>
                                    : 
                                    <Form>
                                        <FormItem label="名称" {...formItemLayout}>
                                            {getFieldDecorator('dictionariesName', {
                                                rules: [{ required: true, message: '名称不能为空!' }],
                                                initialValue: dictionariesName
                                            })(
                                                <Input type="text" />
                                            )}
                                        </FormItem>
                                        <FormItem label="图标" {...formItemLayout}>
                                            {getFieldDecorator('icon')(
                                                <UploadComp
                                                    planPic={icon ? [{ url: icon }] : []}
                                                    maxlength={1}
                                                    uploadSuccess={this.uploadSuccess}
                                                    removeFileImg={this.removeFileImg}
                                                    type="GZ"
                                                    ids={this.state.dictionariesId}
                                                />
                                            )}
                                        </FormItem>
                                    </Form>
                                }
                            </Modal>
                        </div>
                        : <Unauthorized />
                }
            </React.Fragment>

        );
    }


    itemRender = (key) => {
        const data = this.props.proData.getIn(['diction', 'dictionariesList']) || List();
        const total = this.props.proData.getIn(['diction', 'totals']);
        const updateTime = this.props.proData.getIn(['diction', 'updateTime']);
        const roleList = this.props.projectRole.get('roleList').toJS();
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const roleColumns = this.roleColumns.map((col) => {
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
        return (<React.Fragment>
            {
                key !== '1' ?
                <div>
                    <div className="pro-data-title">
                        <Button onClick={this.handleAdd}>新增数据</Button>
                        <div>更新时间：{updateTime},总计：{total}条数据</div>
                    </div>
                    <Table
                        rowKey="dictionariesId"
                        columns={this.columns}
                        dataSource={data.toJS()}
                    />
                </div>
                : 
                <div>
                    <div className="pro-data-title">
                        <Button onClick={this.handleAdd}>新增数据</Button>
                        {/* <div>更新时间：{updateTime},总计：{total}条数据</div> */}
                    </div>
                    <Table
                        rowKey="roleId"
                        components={components}
                        bordered={false}
                        dataSource={roleList}
                        columns={roleColumns}
                        rowClassName="editable-row"
                        pagination={false}
                    />
                </div>
            }
        </React.Fragment>)
    }

    //切换tabs
    handleTabChange = (key) => {
        this.param.key = key;
        this.props.getDictionAction({ dictionariesTypeId: key });
        if (key === '1') {
            const roleList = this.props.projectRole.get('roleList');
            roleList.size === 0 && this.props.getProjectRoleListAction();
        }
    }

    //关闭弹窗
    handleCancel = () => {
        this.setState(() => ({
            visible: false,
            dictionariesName: '',
            icon: '',
            dictionariesId: ''
        }));
        this.props.form.resetFields();
    }

    // 编辑提交
    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dictionariesId, type } = this.state;
                const { key, url } = this.param;
                let params = {};
                if (key === '') {
                    params = {
                        ...values
                    };
                    this.props.saveRoleAction(params);
                } else {
                    if (type === 1) { //新增
                        params = { url: 'sdpprevail/dictionaries/addDictionaries', params: { ...values, dictionariesTypeId: key, icon: url || this.state.icon } };
                    } else { //编辑
                        params = { url: 'sdpprevail/dictionaries/updateDictionaries', params: { ...values, dictionariesId, dictionariesTypeId: key, icon: url || this.state.icon } };
                    }
                    this.props.proDataEditAction(params);
                }
            }
        });
    }
    //上传成功
    uploadSuccess = (data) => {
        this.setState(() => ({
            icon: data[0].url
        }))
        this.param.url = data[0].url;
    }
    //图片删除成功 TODO
    removeFileImg = (data) => {
        this.setState({
            icon: ''
        })
        this.param.url = '';
        this.props.getDictionAction({ dictionariesTypeId: this.param.key });
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
}

export default ProjectData;