import React, { Component } from "react";
import { Card, Input, Form, Select, Table } from "antd";

import Panel from '@/components/panel/panel';

import { getAttendDetail } from '@/container/content/attendance/store/action.js'


import '@/container/content/employ-list/employ-list.less';
import Utils from '../../../utils/utils';
import { connect } from "react-redux";

const { Option } = Select;
const { Search } = Input;

@Form.create()
@connect(
    state => ({
        attendance: state.attendanceList,
        topbar: state.topbar
    }), { getAttendDetail }
)
class AttendDetail extends Component {
    constructor(props) {
        super(props);
        const { proId } = this.props.topbar;
        const { location } = this.props;
        let teamName;
        let teamId;
        if (location.state) {
            sessionStorage.setItem('teamName', location.state.teamName);
            sessionStorage.setItem('teamId', location.state.teamId);
            teamName = location.state.teamName;
            teamId = location.state.teamId;
        } else {
            teamName = sessionStorage.getItem('teamName');
            teamId = sessionStorage.getItem('teamId');
        }
        this.params = {
            proId: proId,
            teamId: teamId,
            pageNum: 1,
            pageSize: 10,
            signTime: Utils.getCurrentData(),
            param: '',
            type: 'D'
        };
        this.teamName = teamName;
        this.columns = [
            { title: '姓名', dataIndex: 'userName' },
            { title: '电话', dataIndex: 'userPhone' },
            { title: '项目角色', dataIndex: 'role' },
            { title: '今日上工', dataIndex: 'upTime' },
            { title: '今日下工', dataIndex: 'outTime' },
        ];

    }
    componentDidMount () {
        this.request();
    }
    // 组件销毁
    componentWillUnmount () {
        sessionStorage.removeItem('teamName');
        sessionStorage.removeItem('teamId');
    }
    request = () => {
        this.params.pageNum = 1;
        this.props.getAttendDetail(this.params);
    }
    handleSearch = (value) => {
        this.params.param = value;
        this.request();
    }
    handleChange = (value) => {
        this.params.type = value;
        this.request();
    }
    getFields = () => {
        return (
            <div className="clearfix employ_filter">

                <React.Fragment>
                    <Select placeholder="请选择考勤状态" style={{ width: 250 }} onChange={this.handleChange}>
                        <Option key='D'>全部</Option>
                        <Option key='B'>缺勤</Option>
                        <Option key='A'>未缺勤</Option>
                    </Select>
                </React.Fragment>

                <Search maxLength={11} placeholder="请输入手机号或姓名" onSearch={this.handleSearch} style={{ width: 280 }} />
            </div >

        )

    }
    render () {
        const { proName } = this.props.topbar;
        const panelData = { title: `${proName}${this.teamName}考勤信息`, isBack: true };
        const { pageNum } = this.params;
        const { attendDetailList } = this.props.attendance;
        const attendRows = attendDetailList.list ? attendDetailList.list : [];

        return (
            <div className='attendDetail'>
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    {this.getFields()}
                    <Table
                        locale={{ emptyText: '暂无数据' }}
                        columns={this.columns}
                        rowKey="userId"
                        pagination={Utils.pagination(
                            {
                                ...attendDetailList,
                                pageNum: pageNum,
                            },
                            current => {
                                this.params.pageNum = current;
                                this.request();
                            }
                        )}
                        dataSource={attendRows}
                    />
                </Card>
            </div>
        )
    }
}

export default AttendDetail;