import React , { Component } from 'react';
import { Card, Table, Input  } from 'antd';
import { connect } from 'react-redux';
import { getMemberManagement } from '../store/action';
import { getEmployMember } from '../../employ-group/store/action';
import Panel from '../../../../components/panel/panel';
import Utils from './../../../../utils/utils';

import '../../employ-list/employ-list.less';

const Search = Input.Search;
@connect(
    state => ({
        teamManagementReducer: state.teamManagementReducer,
        employTeamManagementReducer: state.employTeamManagementReducer
    }),
    { getMemberManagement, getEmployMember }
)

class MemberManagement extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName'
          }, {
            title: '身份证号',
            dataIndex: 'userCard',
            key: 'userCard',
          }, {
            title: '电话号码',
            dataIndex: 'phone',
            key: 'phone',
          }, {
            title: '年龄',
            key: 'userBirthday',
            dataIndex: 'userBirthday'
          }, {
            title: '职业工种',
            key: 'userWorkType',
            dataIndex: 'userWorkType'
          }, {
            title: '工卡卡号',
            key: 'rfid',
            dataIndex: 'rfid'
          }, {
            title: '住址',
            key: 'userAddr',
            dataIndex: 'userAddr'
          }];
        this.state = {
            datas: [],
            types: []
        };
        this.params = {
            pageNum: 1,
            pageSize: 10,
            teamId: this.props.match.params.id,
            queryStr: ''
        }
        this.type = "";
    }
    componentDidMount(){
        this.type = this.props.match.params.type;
        // 获取成员列表
        this.getMemberList();
    }
    // 获取成员列表
    getMemberList() {
        if (this.type == 'employGroup') {
            this.props.getEmployMember(this.params);
        } else if (this.type == 'proGroup') {
            this.props.getMemberManagement(this.params);
        }
    }
    render() {
        const panelData = { pathname: '班组管理 / 成员管理', title: '成员管理', desc: 'manager的成员列表，你可以对当前的成员进行移除或添加操作', isBack: true }
        let memberManagement;
        if (this.type == 'employGroup') {
            memberManagement = this.props.employTeamManagementReducer.EmployMemberManagement;
        } else if (this.type == 'proGroup') {
            memberManagement = this.props.teamManagementReducer.memberManagement;
        }
        return (
            <div>
               <Panel panelData={panelData} />
               <Card bordered={false} style={{ margin: 24 }}>
                    <div className="clearfix employ_filter">
                        <Search placeholder="请输入手机号或姓名" onSearch={this.handleSearch.bind(this)} style={{ width: 280 }} />
                    </div>
                    <Table 
                    columns={this.columns} 
                    dataSource={memberManagement ? memberManagement.rows : []}
                    rowKey="workerId"
                    locale={{emptyText: '暂无数据'}}
                    pagination={
                        Utils.pagination({...memberManagement, pageNum: this.params.pageNum },(current) =>{
                            this.params.pageNum =current;
                            // 获取成员列表
                            this.getMemberList();
                        })
                    }
                    />
               </Card>
            </div>
        )
    }
    handleSearch(value) {
        this.params.queryStr = value;
        // 获取成员列表
        this.getMemberList();
    }
}

export default MemberManagement;