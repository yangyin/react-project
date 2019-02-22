import React, { PureComponent } from 'react';
import { Card, Row, Col, Select, Input, Table } from 'antd';
import { Link } from 'react-router-dom';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';
import { Unauthorized } from '@/container/error-page/not-found-page';

import './team.less';
import Utils from '@/utils/utils';
import { teamAction } from './store/actions.js';
import { projectTypeAction } from '@/core/common/actions';

const Option = Select.Option;
const Search = Input.Search;


@connect(
    state => ({
        team: state.get('team'),
        common: state.get('common'),
    }),
    { teamAction, projectTypeAction }
)
class Team extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            { title: '班组名称', dataIndex: 'teamName' },
            { title: '负责人', dataIndex: 'teamManagerName' },
            { title: '联系电话', dataIndex: 'teamManagerPhone' },
            {
                title: '年产值', dataIndex: 'teamOutputValue', reder: (text, record) => {
                    return (`${record.teamOutputValue}万`)
                }
            },
            {
                title: '专项分包年限', dataIndex: 'subNumYears', reder: (text, record) => {
                    return `${text}年`
                }
            },
            { title: '工种', dataIndex: 'teamType' },
            { title: '认证时间', dataIndex: 'createTime' },
            {
                title: '操作',
                render: (text, record) => {
                    return <Link to={{
                        pathname: `/user/teamDetail`,
                        search: `?userId=${record.teamManager}&teamId=${record.teamId}`
                    }}>详情</Link>;
                },
            },
        ];
        this.params = {
            teamType: '',
            pageNum: 1,
            pageSize: 10,
            param: ''
        }
    }
    // 组建渲染之后调用  只调用一次
    componentDidMount () {
        // 获取班组列表
        this.props.teamAction(this.params);
        // 获取班组工种
        this.props.projectTypeAction({ dicType: 'worktype' });
    }
    //切换班组
    handleGroupChange = (value) => {
        this.params.teamType = value;
        this.params.pageNum = 1;
        this.props.teamAction(this.params);
    }
    //搜索
    handleSearch = (value) => {
        this.params.pageNum = 1;
        this.params.param = value;
        this.props.teamAction(this.params);
    }
    // 显示班组组
    renderGroup = (data) => {
        return (
            data.map(item => (
                <Option key={item.categoryId}>{item.categoryValue}</Option>
            ))
        )
    }

    render () {
        const panelData = {
            title: '班组管理',
        };
        const teamList = this.props.team.get('teamList');
        const tableList = teamList.rows;
        const teamType = this.props.common.get('teamType') || [];
        const isJur = this.props.team.get('isJur');
        return (
            <React.Fragment>
                {!isJur ?
                    <div className="user">
                        <Panel panelData={panelData} />
                        <Card bordered={false} style={{ margin: 24 }}>
                            <Row className="search_filter">
                                <Col span={4}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="请选择认证班组工种"
                                        onChange={this.handleGroupChange}
                                    >
                                        <Option key={1} value=''>所有班组工种</Option>
                                        {this.renderGroup(teamType)}
                                    </Select>
                                </Col>
                                <Col span={20} className='searchInput'>
                                    <Search
                                        placeholder="请输入姓名"
                                        onSearch={this.handleSearch}
                                        style={{ width: 380 }}
                                    />
                                </Col>
                            </Row>
                            <Table
                                className='tableStyle'
                                locale={{ emptyText: '暂无数据' }}
                                rowKey="teamId"
                                dataSource={tableList}
                                columns={this.columns}
                                pagination={
                                    Utils.pagination({ ...teamList, pageNum: this.params.pageNum }, (current) => {
                                        this.params.pageNum = current;
                                        this.props.teamAction(this.params);
                                    })
                                }
                            />
                        </Card>
                    </div> : <Unauthorized />}
            </React.Fragment>
        );
    }
}


export default Team;






