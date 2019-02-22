import React, { Component } from "react";
import { Card, Input, Form, Select, Table } from "antd";

import Panel from '@/components/panel/panel';

import { getEducationDetailRes } from './store/action.js'

import '@/style/common.less';
import '@/container/content/employ-list/employ-list.less';
import Utils from '@/utils/utils';
import { connect } from "react-redux";

const { Search } = Input;

@Form.create()
@connect(
    state => ({
        eduInfoRender: state.eduInfoRender,
        topbar: state.topbar
    }), { getEducationDetailRes }
)
class EduDetailRes extends Component {
    constructor(props) {
        super(props);
        const {location}=this.props;
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
        const { proId } = this.props.topbar;
        this.params = {
            proId: proId,
            teamId: teamId,
            pageNum: 1,
            pageSize: 10,
            param: '',
        };
        this.teamName = teamName;
        this.columns = [
            { title: '姓名', dataIndex: 'userName' },
            { title: '电话', dataIndex: 'userPhone' },
            { title: '项目角色', dataIndex: 'roleName' },
            {
                title: '考试情况', dataIndex: 'isAdopt', render: (text, record) => (
                     record.isAdopt === '0' ? <span className="font_red">未通过</span> : <span className="font_green">已通过</span>
                )
            },
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
        this.props.getEducationDetailRes(this.params);
    }
    handleSearch = (value) => {
        this.params.param = value;
        this.request();
    }
    getFields = () => {
        return (
            <div className="clearfix employ_filter">
                <Search maxLength={11} placeholder="请输入手机号或姓名" onSearch={this.handleSearch} style={{ width: 280 }} />
            </div >

        )

    }
    render () {
        const { proName } = this.props.topbar;
        const panelData = { title: `${proName}${this.teamName}三级教育信息`, isBack: true };
        const { pageNum } = this.params;
        const { eduInfoRes } = this.props.eduInfoRender;
        const tableRows = eduInfoRes.rows ? eduInfoRes.rows : [];

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
                                ...eduInfoRes,
                                pageNum: pageNum,
                            },
                            current => {
                                this.params.pageNum = current;
                                this.request();
                            }
                        )}
                        dataSource={tableRows}
                    />
                </Card>
            </div>
        )
    }
}

export default EduDetailRes;