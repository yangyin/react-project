import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Popconfirm } from 'antd';

import './task.less';

import { getListAction, taskHandleAction, taskHandleSuccess, taskModalAction, taskModalSuccess, taskTypeListAction, taskModalAddAction } from './store/actions';


import Panel from '@/components/panel/panel';
import Etable from '@/components/Etable';
import TaskModal from './views/drawer';
import { Unauthorized } from '@/container/error-page/not-found-page';


const panelData = {
    title: '任务助手',
};


@connect(
    state => ({
        task: state.get('task')
    }),
    { getListAction, taskHandleAction, taskHandleSuccess, taskModalAction, taskModalSuccess, taskTypeListAction, taskModalAddAction }
)
class Task extends PureComponent {
    state = {
        visible: false,
        taskProId: '',//方案ID
    }
    columns = [
        { title: '方案名称', dataIndex: 'taskProName', editable: true },
        // { title: '类型选项', dataIndex: 'taskTypeList', editable: false },
        { title: '描述', dataIndex: 'taskProRemark', editable: true },
        { title: '适应项目类型', dataIndex: 'projectTypeName', editable: false },
        {
            title: '操作', dataIndex: 'taskProType', render: (text, record) => {
                const editable = this.isEditing(record, Object.keys(this.refs).length > 0 && this.refs.state.editingKey);
                const EditableContext = Object.keys(this.refs).length > 0 && this.refs.getContext();
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
                                    title="确定取消?"
                                    onConfirm={this.cancel}
                                ><a>取消</a>
                                </Popconfirm>
                            </span>
                        ) : (
                                <span>
                                    <a onClick={() => this.edit(record.taskProId)}>编辑 </a> |
                                    <a onClick={() => this.handleManage(record)}> 类型管理 </a> |
                                    <a onClick={() => this.copy(record)}> 复制 </a>
                                    {text === 'B' && <span>|
                                        <Popconfirm title="确定要删除?" onConfirm={() => this.del(record.taskProId)} okText="确定" cancelText="取消">
                                            <a href="#"> 删除 </a>
                                        </Popconfirm>
                                    </span>}
                                </span>
                            )}
                    </div>
                );
            }
        },
    ]
    //判断是否编辑
    isEditing = (record, key) => {
        if (typeof key === 'string') {
            return record.taskProId === key
        }
    }
    //编辑
    edit = (key) => {
        this.refs.updateState(key);
    }
    //编辑保存
    save = (form, { taskProId }) => {
        form.validateFields((err, values) => {
            if (!err) {
                this.props.taskHandleAction({ url: 'updateTaskProgramme', params: { ...values, taskProId } });
            }
        });
    }
    //编辑取消
    cancel = () => {
        this.refs.updateState('');
    }

    //复制
    copy = (record) => {
        let params = { ...record, taskTypeList: null, typeList: JSON.stringify({ taskTypeList: record.taskTypeList }) };
        delete params['taskTypeList'];
        this.props.taskHandleAction({ url: 'copyTaskProgramme', params });
    }
    //删除
    del = (taskProId) => {
        this.props.taskHandleAction({ url: 'deleteTaskProgramme', params: { taskProId } });
    }
    //类型管理
    handleManage = (record) => {
        this.setState(() => ({
            visible: true,
            taskProId: record.taskProId
        }))
        this.props.taskTypeListAction({ taskProId: record.taskProId });
    }
    componentDidMount() {
        this.props.getListAction();
    }

    componentWillReceiveProps(nextProps) {
        const isUpdate = nextProps.task.get('isUpdate');
        const isModal = nextProps.task.get('isModal');

        //更新完成，复制，编辑
        if (isUpdate) {
            this.props.getListAction();
            this.props.taskHandleSuccess({ status: false });
            this.refs.updateState('');
        }
        //modal更新完成
        if (isModal) {
            this.props.taskModalSuccess({ status: false });
            this.props.taskTypeListAction({ taskProId: this.state.taskProId });
        }
    }
    render() {
        const taskList = this.props.task.get('taskList').toJS();
        const typeList = this.props.task.get('typeList').toJS();
        const isModal = this.props.task.get('isModal');
        const isJur = this.props.task.get('isJur');
        const { visible, taskProId } = this.state;
        return (
            <React.Fragment>
                {
                    !isJur
                        ? <div>
                            <Panel panelData={panelData} />
                            <Etable
                                rowKey="taskProId"
                                data={taskList}
                                columns={this.columns}
                                isEditing={this.isEditing}
                                ref={(el) => this.refs = el}
                            />
                            <TaskModal
                                visible={visible}
                                data={typeList}
                                taskProId={taskProId}
                                isModal={isModal}
                                handleSubmit={this.handleModalSubmit}
                                modalAdd={this.modalAdd}
                                onClose={this.onModalClose}
                            />
                        </div>
                        : <Unauthorized />
                }
            </React.Fragment>

        );
    }
    //模态框，提交数据
    handleModalSubmit = (params) => {
        this.props.taskModalAction(params);
    }
    //模态框，新增按钮
    modalAdd = () => {
        this.props.taskModalAddAction();
    }
    onModalClose = () => {
        this.setState({
            visible: false,
        })
    }
}

export default Task;