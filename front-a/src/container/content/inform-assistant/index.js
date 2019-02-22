import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';


import {
    getInfoAssListAction,
    infoAssistantEditAction,
    infoAssistantUpdate
} from './store/actions';




import Panel from '@/components/panel/panel';
import Etable from '@/components/Etable';
import { Unauthorized } from '@/container/error-page/not-found-page';

const panelData = {
    title: '通知助手',
};
// const EditableContext = React.createContext();

@connect(
    state => ({
        infoAssistant: state.get('infoAssistant')
    }),
    { getInfoAssListAction, infoAssistantEditAction, infoAssistantUpdate }
)
class InformAssistant extends PureComponent {
    state = {}

    //判断是否编辑
    isEditing = (record, key) => {
        if (typeof key === 'string') {
            return record.notProId === key
        }
    }

    columns = [
        { title: '方案名称', dataIndex: 'notProName', editable: true },
        { title: '备注', dataIndex: 'notProRemark', editable: true },
        {
            title: '操作', dataIndex: 'notProType', render: (text, record) => {
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
                                    <a onClick={() => this.edit(record.notProId)}>编辑 </a> |
                                <a onClick={() => this.copy(record)}> 复制 </a>|
                                {record['notProType'] === 'B' ? <span>
                                        <Popconfirm title="确定要删除?" onConfirm={() => this.del(record.notProId)} okText="确定" cancelText="取消">
                                            <a href="#"> 删除 </a>|
                                        </Popconfirm>
                                    </span> : null
                                    }
                                    <Link to={`/setting/informAssistant/manage?id=${record.notProId}&name=${encodeURI(record.notProName)}`}> 管理方案</Link>
                                </span>
                            )}
                    </div>
                );
            }
        },
    ]

    //编辑按钮
    edit = (key) => {
        this.refs.updateState(key);
    }
    //编辑保存
    save = (form, { notProId }) => {
        form.validateFields((err, values) => {
            if (!err) {
                this.props.infoAssistantEditAction({ url: 'updateNoticeProgramme', params: { ...values, id: notProId } });
            }
        });
    }
    //复制通知
    copy = (record) => {
        const { notProId, notProName, notProRemark } = record;
        this.props.infoAssistantEditAction({ url: 'copyNoticeProgramme', params: { notProName, notProRemark, copyNotProId: notProId } });
    }
    //取消关闭
    cancel = () => {
        this.refs.updateState('');
    }
    //删除
    del = (notProId) => {
        this.props.infoAssistantEditAction({ url: 'deleteNoticeProgramme', params: { notProId } });
    }



    componentDidMount() {
        this.props.getInfoAssListAction();
    }
    componentWillReceiveProps(nextProps) {
        const isUpdate = nextProps.infoAssistant.get('isUpdate');

        //更新完成，复制，编辑
        if (isUpdate) {
            this.props.getInfoAssListAction();
            this.props.infoAssistantUpdate({ status: false });
            this.refs.updateState('');
        }
    }
    render() {
        const infoList = this.props.infoAssistant.get('infoList').toJS();
        const isJur = this.props.infoAssistant.get('isJur');
        return (
            <React.Fragment>
                {
                    !isJur
                        ? <div className="inform-assistant">
                            <Panel panelData={panelData} />
                            <Etable
                                rowKey="notProId"
                                data={infoList}
                                columns={this.columns}
                                isEditing={this.isEditing}
                                ref={(el) => this.refs = el}
                            />
                        </div>
                        :<Unauthorized />
                }
            </React.Fragment>

        );
    }


}

export default InformAssistant;