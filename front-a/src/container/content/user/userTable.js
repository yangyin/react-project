import React, { PureComponent } from 'react';
import { Popconfirm, Avatar, Card, Row, Col, Select, Input, Divider, Table } from 'antd';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';


import './user.less';
import Utils from '@/utils/utils';
import { userAction, statusControl, usergroupAction, userDeleteAction } from './store/actions.js';

const Option = Select.Option;
const Search = Input.Search;


@connect(
    state => ({
        user: state.get('user')
    }),
    { userAction, statusControl, usergroupAction, userDeleteAction }
)
class User extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '', dataIndex: 'userId', render: (text, record) => {
                    const wxHeadImgSrc = record.wxHeadImage;
                    let imgSrc = wxHeadImgSrc ? wxHeadImgSrc : ''
                    return (
                        <Avatar size="small" icon="user" src={imgSrc} />
                    )
                }
            },
            { title: '姓名（账号）', dataIndex: 'userName' },
            { title: '微信名称/昵称', dataIndex: 'wxUserName' },
            { title: '身份证号', dataIndex: 'userCard' },
            { title: '电话号码', dataIndex: 'userPhone' },
            {
                title: '注册方式', dataIndex: 'regist_way', render: (text, record) => {
                    return record.regist_way === 0 ? '自主注册' : '代注册';
                }
            },
            {
                title: '注册渠道', dataIndex: 'userSource', render: (text, record) => {
                    const sourceStr = record.userSource;
                    let renderSource = '其他';
                    if (sourceStr) {
                        if (sourceStr === 'C') {
                            renderSource = 'app注册';
                        } else if (sourceStr === 'A') {
                            renderSource = 'A端注册';
                        } else if (sourceStr.indexOf("mini0") === 0) {
                            renderSource = '活多多注册';
                        } else if (sourceStr.indexOf("mini1") === 0) {
                            renderSource = '小云图注册';
                        } else if (sourceStr.indexOf("batch") === 0) {
                            renderSource = '未知来源注册';
                        } else if (sourceStr.indexOf("umini") === 0) {
                            renderSource = '未知来源注册';
                        } else if (sourceStr.indexOf("app_entry") === 0) {
                            renderSource = 'APP实名录入';
                        } else if (sourceStr.indexOf("add_user") === 0) {
                            renderSource = 'C端注册';
                        }

                    }
                    return renderSource;

                }
            },
            { title: '用户组', dataIndex: 'groupName' },
            { title: '职业工种', dataIndex: 'userWorkType' },
            { title: '住址', dataIndex: 'userAddr' },
            { title: '创建时间', dataIndex: 'createTime' },
            {
                title: '操作',
                render: (text, record) => {
                    let optionArea;
                    if (record.userId == "1o0a8aURfQrJoaz7GIU") {
                        optionArea = <Link to={{ pathname: `/user/userDetail/${record.userId}` }}>详情</Link>;
                    } else {
                        optionArea = <span> <Popconfirm title="确认删除该用户?" onConfirm={() => this.delete(record)}>
                            <a className="btnColorRed" href="javascript:;">删除</a>
                        </Popconfirm>
                            <Divider type="vertical" />
                            <Link to={{ pathname: `/user/userDetail/${record.userId}` }}>详情</Link>
                        </span>
                    }
                    return optionArea;
                },
            },
        ];
        this.params = {
            offset: 0,
            limit: 10,
            type: 'R0',
            groupId: '',
            pageNum: 1,
            pageSize: 10,
            paramName: ''
        }
    }
    // 组建渲染之后调用  只调用一次
    componentDidMount () {
        this.request();
    }
    request = () => {
        const {pageType}=this.props.userType;
        if(pageType==='BLACK'){
            this.params.groupId='PHfqyqldPIVzaY15r4b';
        }
        // 获取用户列表
        this.props.userAction(this.params);
        // 获取用户组
        // this.props.usergroupAction();
    }
    // 更新 组件初始化时不调用，组件接受新的props时调用。
    componentWillReceiveProps (nextProps) {
        const isRefresh = nextProps.user.get('isRefresh');
        if (isRefresh) {
            this.request();
            this.props.statusControl(false);
        }
    }
  
    // 删除
    delete = (record) => {
        let typeUser = record.groupName === 'administrator' ? 'B' : 'A'
        const deleteParam = {
            type: typeUser,
            id: record.userId
        }
        this.props.userDeleteAction(deleteParam)
    }
    //切换用户组
    handleGroupChange = (value) => {
        this.params.groupId = value;
        this.params.pageNum = 1;
        this.props.userAction(this.params);
    }
    //搜索
    handleSearch = (value) => {
        this.params.paramName =Utils.replaceSpace(value);
        this.params.pageNum = 1;
        this.props.userAction(this.params);
    }
    // 显示用户组
    renderGroup = (data) => {
        const mydata = [{createBy: null,
            createTime: null,
            groupContent: "平台管理员",
            groupId: "00782a4d8a8a4602a83363980710c04f",
            groupJurisdiction: null,
            groupName: "平台管理员",
            groupState: "y",
            groupType: "A"}]
        return (
                mydata.map(item => (
                <Option key={item.groupId} value={item.groupId}>{item.groupName}</Option>
            ))
        )
    }

    render () {
        const userData = this.props.user.get('userData');
        const tableList = userData.rows;
        // const groupList = this.props.user.get('userGroupList');// 下拉暂时写死
        const {filterShow}=this.props.userType;
        return (
                    <Card bordered={false} style={{ margin: 24 }}>
                    {filterShow&&<Row className="search_filter">
                            <Col span={4}>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择用户分组"
                                    onChange={this.handleGroupChange}
                                >
                                    <Option key={1} value=''>所有用户</Option>
                                    {this.renderGroup()}
                                </Select>
                            </Col>
                            <Col span={20} className='searchInput'>
                                <Search
                                    placeholder="请输入手机号或姓名"
                                    onSearch={this.handleSearch}
                                    style={{ width: 380 }}
                                />
                            </Col>
                        </Row>}
                        
                        <Table
                            className='tableStyle'
                            locale={{ emptyText: '暂无数据' }}
                            rowKey="userId"
                            dataSource={tableList}
                            columns={this.columns}
                            pagination={
                                Utils.pagination({ ...userData, pageNum: this.params.pageNum }, (current) => {
                                    this.params.pageNum = current;
                                    this.props.userAction(this.params);
                                })
                            }
                        />
                    </Card>
        );
    }
}


export default User;






