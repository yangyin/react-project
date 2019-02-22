import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Popconfirm } from 'antd';

import './index.less';


import { 
    getInfoAssisManageListAcion, 
    getInfoAssisManageEditAcion, 
    getInfoAssisManageUpdate ,
    getInfoAssisManageFetchUser,
    getInfoAssisManageTargetListAction,
    clearUserListAction
} from './store/actions';



import Panel from '@/components/panel/panel';
import Etable from '@/components/Etable';
import InfoAssisModal from './views/modal';




@connect(
    state => ({
        infoManage: state.get('infoAssisManage')
    }),
    { 
        getInfoAssisManageListAcion, 
        getInfoAssisManageEditAcion, 
        getInfoAssisManageUpdate,
        getInfoAssisManageFetchUser,
        getInfoAssisManageTargetListAction,
        clearUserListAction
    }
)
class InfoAssisManage extends PureComponent {
    constructor(props) {
        super(props);
        const { search } = this.props.location;
        const data = search.split('?')[1].split('=');

        this.state = {
            title: '',
            visible: false,
            id:'',//点击当前数据的ID
            type: 1, //1:新增，2：详情
            eventName: '',//添加时，通知事件名称
        }

        this.params = {
            notProId: data[1].split('&')[0],
            title: decodeURI(data[2]) //当前通知方案名称
        }
        this.panelData = {
            title: decodeURI(data[2]),
            isBack: true
        }
        this.columns = [
            { title: '通知事件及描述', dataIndex: 'eventName' },
            { title: '模板内容设置（设置前需要报运营商审核）', dataIndex: 'messageContent', editable: true },
            { title: '提示', dataIndex: 'promptInfo' },
            {
                title: '通知对象设置', render: (text, record) => {
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
                                        <a onClick={() => this.edit(record.id)}>编辑 </a> |
                                        <a onClick={() => this.add(record)}> 添加 </a>|
                                        <a onClick={() => this.details(record.id)}> 详情 </a>
                                    </span>
                                )}
                        </div>
                    );
                }
            },
        ]
    }
    //判断是否编辑
    isEditing = (record, key) => {
        if (typeof key === 'string') {
            return record.id === key
        }
    }
    //编辑按钮
    edit = (key) => {
        this.refs.updateState(key);
    }
    //编辑保存
    save = (form, { id }) => {
        form.validateFields((err, values) => {
            if (!err) {
                this.props.getInfoAssisManageEditAcion({ url: 'updateMessageTemplate', params: { ...values, id } });
            }
        });
    }
    //编辑取消
    cancel = () => {
        this.refs.updateState('');
    }
    //添加按钮
    add = (record) => {
        this.setState(() => ({
            type: 1,
            title: '添加通知对象设置',
            visible: true,
            eventName: record.eventName,
            id:record.id
        }))
    }
    //详情 
    details = (id) => {
        this.setState(() => ({
            type: 2,
            title: '移除通知对象',
            visible: true
        }))
        this.props.getInfoAssisManageTargetListAction({programmedReId:id});
    }

    componentDidMount() {
        this.props.getInfoAssisManageListAcion({ notProId: this.params.notProId });
    }
    componentWillReceiveProps(nextProps) {
        const isUpdate = nextProps.infoManage.get('isUpdate');
        //更新完成，复制，编辑
        if (isUpdate) {
            this.props.getInfoAssisManageListAcion({ notProId: this.params.notProId });
            this.props.getInfoAssisManageUpdate({ status: false });
            this.refs.updateState('');
            const { visible } = this.state;
            if(visible) {
                this.setState({
                    visible:false
                })
            }
        }
    }
    render() {
        const eventList = this.props.infoManage.get('eventList').toJS();
        const userList = this.props.infoManage.get('userList').toJS();
        const targetList = this.props.infoManage.get('targetList').toJS();
        const { type, title, visible ,eventName} = this.state;
        const eventTitle = this.params.title;
        return (
            <div className="info-assis-manage">
                <Panel panelData={this.panelData} />
                <Etable
                    rowKey="id"
                    data={eventList}
                    columns={this.columns}
                    isEditing={this.isEditing}
                    ref={(el) => this.refs = el}
                />
                <InfoAssisModal 
                    title={title}
                    visible={visible}
                    type={type}
                    addField={{eventName,eventTitle}}
                    changeVisible ={this.changeState}
                    fetchUser={this.fetchUser}
                    userList={type === 1 ? userList : targetList}
                    handleSubmit={this.handleSubmit}
                    clearUserList={this.clearUserList}
                />
            </div>
        );
    }
    //清空弹窗下拉数据
    clearUserList = () => {
        this.props.clearUserListAction();
    }
    //用户搜索
    fetchUser = (value) => {
        this.props.getInfoAssisManageFetchUser({...value,programmedReId:this.state.id});
    }
    //弹窗提交
    handleSubmit = (value) => {
        const { type ,id } = this.state;
        if(type === 1) {
            this.props.getInfoAssisManageEditAcion({url:'addTargetButton',params:{...value,programmedReId:id}});
        } else {
            this.props.getInfoAssisManageEditAcion({url:'deleteTatgetButton',params:{...value,programmedReId:id}});
        }
    }
    changeState = (key,val) => {
        this.setState(()=>({
            [key]:val
        }))
    }
}

export default InfoAssisManage;