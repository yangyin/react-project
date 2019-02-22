import React, { PureComponent } from 'react';
import { Avatar, Card, Row, Col, Select, Input, Divider, Table } from 'antd';
import { Link } from 'react-router-dom';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';

import './group.less';
import Utils from '@/utils/utils';
import { groupMemberAction, memberDelAction } from './store/actions.js';

const Search = Input.Search;

@connect(
    state => ({
        group: state.get('group'),
    }),
    { groupMemberAction, memberDelAction }
)
class Company extends PureComponent {
    constructor(props) {
        super(props);
        const urlParams = this.props.location.search;
        const urlObj = Utils.linkParamsToObj(urlParams);
        const { groupId, groupName } = urlObj;
        this.columns = [
            { title: '姓名', dataIndex: 'userName' },
            { title: '身份证号', dataIndex: 'userCard' },
            { title: '联系电话', dataIndex: 'userPhone' },
            { title: '职业工种', dataIndex: 'userWorkType' },
            { title: '住址', dataIndex: 'userAddr' },
            { title: '创建时间', dataIndex: 'createTime' },
            {
                title: '操作',
                render: (text, record) => {
                    return (
                        <Link to={{pathname: `/user/userDetail/${record.userId}`}}>详情</Link>)

                },
            },
        ];
        this.groupName = groupName;
        this.params = {
            pageNum: 1,
            pageSize: 10,
            groupId: groupId,
            paramName: '',
        }
    }
    // 组建渲染之后调用  只调用一次
    componentDidMount () {
        // 获取用户列表
        this.props.groupMemberAction(this.params);
    }
    componentWillReceiveProps (nextProps) {
        const refresh = nextProps.group.get('refresh');
        // 刷新
        if (refresh) {
            this.props.groupMemberAction(this.params);
        }
    }
    // 删除
    delete = (record) => {
        const deleteParam = {
            groupId: this.params.groupId,
            userId: record.userId,
        }
        this.props.memberDelAction(deleteParam)
    }
    //切换用户组
    handleGroupChange = (value) => {
        this.params.companyTypeId = value;
        this.props.companyAction(this.params);
    }
    //搜索
    handleSearch = (value) => {
        this.params.paramName = value;
        this.props.groupMemberAction(this.params);
    }

    render () {
        const panelData = {
            title: `${this.groupName}成员管理`,
            isBack: true,
        };
        const dataList = this.props.group.get('groupMemberList');
        const tableList = dataList.rows;


        return (
            <div className='group_member'>
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    <Row className='search_filter'>
                        <Col span={24} className='searchCol'>
                            <Search
                                placeholder="请输入手机号、联系人或公司名称"
                                onSearch={this.handleSearch}
                                style={{ width: 380 }}
                            />
                        </Col>
                    </Row>
                    <Table
                        className='tableStyle'
                        locale={{ emptyText: '暂无数据' }}
                        rowKey="userId"
                        dataSource={tableList}
                        columns={this.columns}
                        pagination={
                            Utils.pagination({ ...dataList, pageNum: this.params.pageNum }, (current) => {
                                this.params.pageNum = current;
                                this.props.groupMemberAction(this.params);
                            })
                        }
                    />
                </Card>
            </div>
        );
    }
}


export default Company;





