import React, { PureComponent } from 'react';
import { Drawer, Button, Popconfirm, notification } from 'antd';

import Etable from '@/components/Etable';

class TaskModal extends PureComponent {
    state = {}
    columns = [
        { title: '任务类型名称', dataIndex: 'taskTypeName', editable: true },
        // { title: '类型选项', dataIndex: 'taskTypeList', editable: false },
        { title: '排序', dataIndex: 'taskTypeSort', editable: true },
        {
            title: '操作', dataIndex: 'taskType', render: (text, record) => {
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
                                    <a onClick={() => this.edit(record.taskTypeId)}>编辑 </a>
                                    {text === 'B' && <span>| <a onClick={() => this.del(record.taskTypeId)}> 删除 </a></span>}
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
            return record.taskTypeId === key
        }
    }
    //编辑按钮
    edit = (key) => {
        this.refs.updateState(key);
    }
    //编辑保存
    save = (form, { taskTypeId }) => {
        form.validateFields((err, values) => {
            if (!err) {
                const { taskProId } = this.props;
                if(taskTypeId) { //编辑保存
                    this.props.handleSubmit({ url: 'updateTaskType', params: { ...values, taskProId, taskTypeId } });
                } else { //新增保存
                    this.props.handleSubmit({ url: 'addTaskType', params: { ...values, taskProId } });
                }
            }
        });
    }
    //编辑取消
    cancel = () => {
        this.refs.updateState('');
    }
    //删除
    del = (taskTypeId) => {
        this.props.handleSubmit({ url: 'deleteTaskType', params: { taskTypeId } });
    }

    componentWillReceiveProps(nextProps) {
        const isModal = nextProps.isModal;
        if (isModal) {
            this.refs.updateState('');
        }
    }
    render() {
        const { data, visible } = this.props;

        return (
            <Drawer
                className="task-modal"
                title="新建/管理任务类型方案"
                width={720}
                onClose={this.onClose}
                visible={visible}
            >
                <Etable
                    rowKey="taskTypeId"
                    data={data}
                    columns={this.columns}
                    isEditing={this.isEditing}
                    ref={(el) => this.refs = el}
                    pagination={false}
                />
                <Button onClick={this.handleAdd}>新增</Button>
                <div className="footer">
                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={this.onClose} type="primary">提交</Button>
                </div>
            </Drawer>
        );
    }
    handleAdd = () => {
        const { data } = this.props;
        const filterData = data.filter(v => v.taskTypeId === '');
        if (filterData.length === 0) {
            this.refs.updateState('');
            this.props.modalAdd();
        } else {
            notification.warning({
                key:'1',
                message: '提示',
                description: '不能同时新增多行数据',
            });
            return false;
        }
    }
    onClose=() => {
        this.props.onClose();
    }
}

export default TaskModal;