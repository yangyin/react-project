import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Collapse, Card, List } from 'antd';

import PanelComp from '@/components/panel/panel';
import JurDetailModal from './../modal';
import { getJurDetailsListAction ,getJurDetailFetchUserAction ,jurDetailUserListClear,postJurDetailUpdateAction,jurUpdateSuccess,postJurDetailProAction} from './../../store/actions';

const Panel = Collapse.Panel;

@connect(
    state => ({
        jur: state.get('jurisdction')
    }),
    { getJurDetailsListAction,getJurDetailFetchUserAction,jurDetailUserListClear ,postJurDetailUpdateAction,jurUpdateSuccess,postJurDetailProAction}
)
class PlatformJurisdiction extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, 
            jurName:'',//当前行名称
            jurProRelationId:'',//当前行ID
            type:1, //弹窗类型，1：授权，2：详情
        }
        const { search } = this.props.location;
        const pathname = search.split('?')[1].split('&');
        
        this.params = {
            id: pathname[1].split('=')[1],
            name: decodeURI(pathname[0].split('=')[1]) + '权限方案'
        }
        this.panelData = {
            title: this.params.name,
            isBack: true
        };
    }

    drawerData = {
        type: 1, // 0:删除授权 1:授权
        userGroup: [],
        isDrawerShow: false //控制是否加载弹窗
    }

    componentDidMount() {
        this.props.getJurDetailsListAction({ pgeId: this.params.id });
    }
    componentWillReceiveProps(nextProps) {
        const isUpdate = nextProps.jur.get('isUpdate');
        if(isUpdate) {
            this.props.jurUpdateSuccess({status:false});
            this.setState({
                visible:false
            })
        }
    }
    handleEditClick = (record,e) => {
        e.preventDefault();
        this.setState({
            jurProRelationId:record.jurProRelationId,
            jurName:record.jurName,
            visible:true,
            type:1
        })
    }

    //授权对象 详情
    handleDelClick = (record,e) => {
        e.preventDefault();
        this.props.postJurDetailProAction({jurProRelationId:record.jurProRelationId});
        this.setState({
            jurProRelationId:record.jurProRelationId,
            jurName:record.jurName,
            visible:true,
            type:2
        })
    }
    listRender = () => {
        const detailList = this.props.jur.get('detailList');
        if (detailList.size > 0) {
            let data = detailList.toJS();
            return Object.keys(data).map(item => {
                let header = this.listTitleRender(item);
                return typeof header === 'string' && <Panel header={header} key={item}>
                    <List
                        bordered
                        dataSource={data[item]}
                        renderItem={v => (
                            <List.Item actions={[<a href="#" onClick={(e) => this.handleEditClick(v,e)} >授权</a>, <a href="#" onClick={(e) => this.handleDelClick(v,e)} >详情</a>]}>
                                <List.Item.Meta
                                    title={v.jurName}
                                    description={v.jurDescribe}
                                />
                            </List.Item>
                        )}
                    />
                </Panel>
            })
        }
    }

    listTitleRender = (key) => {
        let name = '';
        switch (key) {
            case 'project_attendance':
                name = '考勤管理权限';
                break;
            case 'project_auth':
                name = '实名管理权限';
                break;
            case 'project_disputes':
                name = '纠纷处理权限';
                break;
            case 'project_education':
                name = '三级教育权限';
                break;
            case 'project_environment':
                name = '环境监测权限';
                break;
            case 'project_output':
                name = '产值管理权限';
                break;
            case 'project_project':
                name = '项目管理权限';
                break;
            case 'project_quality':
                name = '质量巡检权限';
                break;
            case 'project_saas':
                name = '智能硬件权限';
                break;
            case 'project_security':
                name = '安全巡检权限';
                break;
            case 'project_task':
                name = '任务计划权限';
                break;
            case 'project_video':
                name = '视频监控权限';
                break;
            default:
                return false;
        }
        return name;
    }


    render() {
        const { visible,type,jurProRelationId ,jurName} = this.state;
        const { name} = this.params;
        const userList = this.props.jur.get('userList');
        const isUpdate = this.props.jur.get('isUpdate');
        const proList = this.props.jur.get('proList');
        const jurMap = this.props.jur.get('jurMap');
        return (
            <div>
                <PanelComp panelData={this.panelData} />
                <Card style={{ margin: 24 }}>
                    <Collapse 
                        accordion 
                        // defaultActiveKey={['project_education']}
                    >
                        {this.listRender()}
                    </Collapse>
                </Card>
                <JurDetailModal 
                    params={{visible,type,jurProRelationId,jurName,name}}
                    fetchUser={this.fetchUser}
                    userList={type === 1 ? userList : proList}
                    clearUserList={this.clearUserList}
                    modalSubmit={this.modalSubmit}
                    isUpdate={isUpdate}
                    onClose={this.onModalClose}
                    jurMap={jurMap}
                />
            </div>
        );
    }

    //授权，用户搜索
    fetchUser = (value) => {
        this.props.getJurDetailFetchUserAction({...value,jurProRelationId:this.state.jurProRelationId});
    }

    //清空userlist数据
    clearUserList = () => {
        this.props.jurDetailUserListClear();
    }

    //弹窗 提交
    modalSubmit = (params) => {
        const { type,jurProRelationId } = this.state;

        let param = {
            params:{...params}
        };

        if(type === 1) { //授权提交
            param.url = 'addJurProRelation';
            param.params.jurProRelationId = jurProRelationId;
        } else { //删除授权
            param.url = 'deletePurRelation';
            param.params.pgeId = this.params.id
        }
        this.props.postJurDetailUpdateAction(param);
    }
    //弹窗关闭
    onModalClose = () => {
        this.setState({
            visible:false
        })
    }
}

export default PlatformJurisdiction;