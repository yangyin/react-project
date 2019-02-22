import React, { Component } from "react";
import { Card, Tabs, Table } from 'antd';
import { connect } from 'react-redux';
import Utils from '@/utils/utils';
import Panel from '@/components/panel/panel';

import './attendance-info.less';

import { getAttendInfoList } from './store/action';

const TabPane = Tabs.TabPane;

@connect(
    state => ({
        topbar: state.topbar,
        getAttendInfo: state.attendInfoReducer.attendanceList
    }), { getAttendInfoList }
)
class AttendInfo extends Component {
    constructor(props) {
        super(props);
        this.params = {
            proId: '',
            signTime: Utils.getCurrentData(),
            pageNum: 1,
            pageSize: 10,
            type: this.props.match.params.type
        }
        this.columns = [
            { title: '姓名', dataIndex: 'userName' },
            { title: '电话', dataIndex: 'userPhone' },
            { title: '项目角色', dataIndex: 'role' },
        ];

    }
    componentDidMount () {
        this.request();
    }
    request = () => {
        const { proId } = this.props.topbar;
        this.params.proId = proId;
        this.props.getAttendInfoList(this.params);
    }

    changeTab = (key) => {
        this.params.type = key;
        this.props.getAttendInfoList(this.params);
    }
    renderTable = (dataInfo, rowList) => {
        const { pageNum } = this.params;
        return (<Table
            locale={{ emptyText: '暂无数据' }}
            columns={this.columns}
            rowKey="userIdBS"
            pagination={Utils.pagination(
                {
                    ...dataInfo,
                    pageNum: pageNum,
                },
                current => {
                    this.params.pageNum = current;
                    this.request();
                }
            )}
            dataSource={rowList}
        />

        )
    }
    render () {
        const {proName}=this.props.topbar;
        const typeName={
            A:'实到岗',
            B:'未到岗',
            C:'场内人员',
        }
        const { type } = this.params;
        const panelData = {
            title: `${proName}${typeName[type]}明细`,
            isBack: true,
        };
        
        const { getAttendInfo } = this.props;
        const rowAtendInfo = getAttendInfo.list ? getAttendInfo.list : [];
        return (
            <div className="attendInfo">
                <Panel panelData={panelData} />
                <Card headStyle={{ background: '#f3f3f3' }}>
                    <Tabs activeKey={type} onChange={this.changeTab} type="card">
                        <TabPane tab="实到岗" key="A">
                            {this.renderTable(getAttendInfo, rowAtendInfo)}
                        </TabPane>
                        <TabPane tab="未到岗" key="B">
                            {this.renderTable(getAttendInfo, rowAtendInfo)}
                        </TabPane>
                        <TabPane tab="场内人员" key="C">
                            {this.renderTable(getAttendInfo, rowAtendInfo)}
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        )

    }
}
export default AttendInfo;