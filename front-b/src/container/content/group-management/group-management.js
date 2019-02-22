import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { Card, Table, Divider, Select, Input, Button, Drawer ,Row,Col} from 'antd';
import { connect } from 'react-redux';
import { getTeamManagement, deleteTeam, jurisdictionStatus, deleteTeamStatus,getProTeamByPhone,addProTeam ,addProTeamStatus} from './store/action';
import { getWorkType } from '../../../redux/findField/actions';
import Panel from '../../../components/panel/panel';
import Utils from './../../../utils/utils';

import { Unauthorized } from './../../error-page/not-found-page';

import '../employ-list/employ-list.less';
import './group-managerment.less';

const Option = Select.Option;
const Search = Input.Search;

const teamManagementSelector = createSelector(
    state=>state,
    (state)=> {
        let { searchTeamList } = state.teamManagementReducer;
        const { proId,proName } = state.topbar;
        if(searchTeamList.length>0) {
            searchTeamList = searchTeamList.map(v => {
                v.isActive = false;
                v.proId = proId;
                v.proName = proName;
                return v;
            })
        }
        return state.teamManagementReducer;
    }
)

@connect(
    state => ({
        teamManagementReducer: teamManagementSelector(state),
        topbar:state.topbar,
        findField: state.findField
    }),
    { getTeamManagement, getWorkType, deleteTeam, jurisdictionStatus, deleteTeamStatus,getProTeamByPhone,addProTeam ,addProTeamStatus}
)
class GroupManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled:true,
            visible: false,
            searchTeamList:[], //添加班组时，班组列表
            activeSearchTeamList:[] //添加班组时，选中的班组
        }
        this.columns = [{
            title: '班组名称',
            dataIndex: 'teamName',
            key: 'teamName'
        }, {
            title: '班组负责人',
            dataIndex: 'teamManagerName',
            key: 'teamManagerName',
        }, {
            title: '联系手机号',
            dataIndex: 'teamPhone',
            key: 'teamPhone',
        }, {
            title: '班组工种',
            key: 'teamType',
            dataIndex: 'teamType'
        }, {
            title: '班组创建人',
            key: 'creatyName',
            dataIndex: 'creatyName'
        }, {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime'
        }, {
            title: '操作',
            key: 'action',
            render: (text) => (
                <span>
                    <a onClick={() => { this.handleDelete(text.teamId) }}>删除</a>
                    <Divider type="vertical" />
                    <Link to={`/project/projectTeam/details/${text.teamId}/proGroup`}>详情</Link>
                </span>
            ),
        }];
        //列表数据
        this.params = {
            pageNum: 1,
            pageSize: 10,
            worktype: '',
            queryStr: '',
            proId: this.props.topbar.proId
        }
    }
    componentDidMount() {
        this.params.proId && this.props.getTeamManagement(this.params);
        this.props.getWorkType();
    }
    componentDidUpdate(prevProps) {
        const { groupDelete,searchTeamList,isTeamAdd } = this.props.teamManagementReducer;
        const prevSearchTeamList = prevProps.teamManagementReducer.searchTeamList;
        const prevProId = prevProps.topbar.proId;
        const { proId } = this.props.topbar;
        /**
         * proId 不同时，刷新班组列表
         */
        if( proId && (prevProId !== proId ) ) {
            this.params.proId = proId;
            this.props.getTeamManagement(this.params);
        }
        /**
         * 判断删除，成功时，更改groupDelete状态，并且刷新界面
         */
        if (groupDelete === true) {
            this.props.deleteTeamStatus(false);
            this.props.getTeamManagement(this.params);
        }
        /**
         * 添加班组时，判断搜索班组列表，每项添加isactive字段
         */
        if(JSON.stringify(searchTeamList) !== JSON.stringify(prevSearchTeamList)) {
            this.setState(() =>({
                searchTeamList:searchTeamList
            }))
        }
        /**
         * isTeamAdd 添加班组成功，刷新列表
         */
        if(isTeamAdd) {
            this.props.getTeamManagement(this.params);
            this.props.addProTeamStatus(false);
            this.setState({
                visible: false,
                searchTeamList:[], 
                activeSearchTeamList:[]
            });
        }
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
            searchTeamList:[], 
            activeSearchTeamList:[]
        });
    };
    onSubmit = () => {
        const { activeSearchTeamList } = this.state;
        const { proId} = this.props.topbar;
        if(activeSearchTeamList.length > 0) {
            this.props.addProTeam({proId,proTeam:JSON.stringify(activeSearchTeamList)});
        }
    }
    render() {
        const panelData = { pathname: '班组 / 班组管理', title: '班组管理', desc: '班组管理，是提供给企业用户对施工班组或其他班组管理的功能 ，可以创建班组，进行成员管理或批量管理' }
        const { isJurisdiction } = this.props;
        const { teamManagement } = this.props.teamManagementReducer;
        const { searchTeamList,disabled } = this.state;
        const { workType } = this.props.findField;
        return (
            <div id="group-managerment">
                {isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24 }}>
                        <div className="clearfix employ_filter">
                            <React.Fragment>
                                <Button onClick={this.showDrawer}>新增班组</Button>
                                <Select defaultValue="请选择工种类型" style={{ width: 250 }} onChange={this.handleChange.bind(this)}>
                                    <Option value=''>请选择工种类型</Option>
                                    {
                                        (workType && Array.isArray(workType))
                                            ? workType.map(subOpt => {
                                                return (
                                                    <Option value={subOpt.categoryId} key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                )
                                            })
                                            : null
                                    }
                                </Select>
                            </React.Fragment>

                            <Search placeholder="请输入手机号或姓名" onSearch={this.handleSearch.bind(this)} style={{ width: 280 }} />
                        </div>
                        <Table
                            columns={this.columns}
                            dataSource={teamManagement ? teamManagement.rows : []}
                            rowKey="teamId"
                            locale={{ emptyText: '暂无数据' }}
                            pagination={
                                Utils.pagination({ ...teamManagement, pageNum: this.params.pageNum }, (current) => {
                                    this.params.pageNum = current;
                                    this.props.getTeamManagement(this.params);
                                })
                            }
                        />
                    </Card>
                    <Drawer
                        title="添加班组"
                        placement="right"
                        width={600}
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Row type="flex" justify="center" style={{marginBottom:10}}>
                            <Col>请搜索你要添加班组负责人姓名或电话</Col>  
                        </Row>
                        <Row type="flex" justify="center" style={{marginBottom:10}}>
                            <Col span={16}>
                                <Search
                                    placeholder="请输入负责人姓名或电话"
                                    onSearch={value => this.handleDrawerSearch(value)}
                                    style={{ width: '100%' }}
                                />
                            </Col>
                        </Row>
                        <Divider />
                        <Row gutter={24} className="group-managerment-drawer-row">
                            {searchTeamList.map((v,i) => (
                                <Col className={v.isActive ? 'col-active' : null} span={8} title={`${v.teamName}(${v.teamType})`} key={v.teamId} onClick={()=>this.handleTeamItemClick(v,i)}>{v.teamName}({v.teamType})</Col>
                            ))}
                        </Row>
                        <div className="group-managerment-drawer-footer">
                            <Button style={{marginRight: 8}} onClick={this.onClose}>取消</Button>
                            <Button disabled={disabled} onClick={this.onSubmit} type="primary">确定</Button>
                        </div>
                    </Drawer>
                </React.Fragment> : <Unauthorized />}
            </div>
        )
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }

    // 下拉选择事件
    handleChange(value) {
        this.params.worktype = value
        this.props.getTeamManagement(this.params);
    }
    // 搜索事件
    handleSearch(value) {
        this.params.queryStr = value
        this.props.getTeamManagement(this.params);
    }
    //根据负责人电话 查询班组
    handleDrawerSearch = (v) => {
        const { proId } = this.props.topbar;
        v&&this.props.getProTeamByPhone({proId,query:v});
    }
    //点击班组Item,更改状态isActive
    handleTeamItemClick = (v,i) => {
        this.setState((prevState) => {
            prevState['searchTeamList'][i].isActive = !prevState['searchTeamList'][i].isActive;
            let arr = prevState['activeSearchTeamList'];
            prevState['searchTeamList'][i].isActive ? arr.splice(i,0,prevState['searchTeamList'][i]) : arr.splice(i,1)
            return {
                searchTeamList:prevState['searchTeamList'],
                activeSearchTeamList:arr,
                disabled:arr.length>0?false:true
            }
        })
    }
    // 删除事件
    handleDelete(value) {
        this.props.deleteTeam({ teamId: value }, this.params);
    }
}

export default GroupManagement;