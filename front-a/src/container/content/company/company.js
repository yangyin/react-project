import React, { PureComponent } from 'react';
import { Card, Row, Col, Select, Input, Divider, Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';
import { write } from '@/utils/localStorage';
import { Unauthorized } from '@/container/error-page/not-found-page';

import './company.less';
import Utils from '@/utils/utils';
import { companyAction, userDeleteAction, companySystemAction, companyAuditAction, statusControl } from './store/actions.js';


const Option = Select.Option;
const Search = Input.Search;


@connect(
    state => ({
        company: state.get('company'),
        // common: state.get('common')
    }),
    { companyAction, statusControl, companyAuditAction, companySystemAction, userDeleteAction }
)
class Company extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            { title: '企业名称', dataIndex: 'companyName' },
            { title: '负责人', dataIndex: 'userName' },
            { title: '联系电话', dataIndex: 'userPhone' },
            { title: '法人', dataIndex: 'legalPerson' },
            { title: '认证时间', dataIndex: 'createTime' },
            {
                title: '操作',
                render: (text, record) => {
                    let delBtn = record.companyState; // 删除按钮显示判断
                    return (
                        <div>
                            {delBtn === 'A' ?
                                <span>  <Popconfirm title="确认删除?" onConfirm={() => this.delete(record)}>
                                    <a className='companyDelBtn' href="javascript:;">移除</a>
                                </Popconfirm>
                                    <Divider type="vertical" /></span> : null}
                            <Link to={{ pathname: `/user/companyDetail/${record.userId}` }}>详情</Link>
                            <Divider type="vertical" />
                            <a onClick={() => this.handEnterBSystem(record)}>代管</a>
                            {delBtn === "A" ? <span>
                                <Divider type="vertical" />
                                <Popconfirm title="企业认证审核?" onConfirm={() => this.auditCompany('B', record)} onCancel={() => this.auditCompany('C', record)} okText="通过" cancelText="拒绝">
                                    <a className='auditCompanyBtn' href="#">{record.isExamine}</a>
                                </Popconfirm>
                            </span> : null
                            }
                        </div>
                    );
                },
            },
        ];
        this.params = {
            offset: 0,
            limit: 10,
            type: 'R2',
            companyTypeId: '',
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
        // 获取用户列表
        this.params.pageNum = 1;
        const {categoryId}=this.props.pageData;
        this.params.companyTypeId=categoryId;
        this.props.companyAction(this.params);
        // 获取认证企业类型
        // this.props.projectTypeAction({ dicType: 'companytype' });
    }
    componentWillReceiveProps (nextProps) {
        const { data, status } = nextProps.company.get('toBsystemRes');
        // 代管到b端
        if (status === true) {
            const { appId } = data;
            write('appId', appId);
            window.location.href = 'http://b.benefitech.cn/#/'
            // window.location.href = window.systemBaseConfig.toBsystem;
        }
        const isRefresh = nextProps.company.get('isRefresh');
        if (isRefresh) {
            this.request();
            this.props.statusControl(false);
        }
    }
    /**
     * 审核
     */
    auditCompany = (type, record) => {
        const paramAudit = {
            isflag: type,
            businessId: record.businessId,
            userId: record.userId,
        }
        this.props.companyAuditAction(paramAudit);
    }
    /**
     * 代管
     * proxyBusinessAdminUserCode	是	string	代理管理员编号
     * proxyBusinessAdminUserId	是	string	代理管理员id
     * proxyBusinessId	否	string	代理企业的id
     * proxyCompanyName	否	string	代理企业名字
     * proxyBusinessAdminUserName	否	string	代理管理员名字
     */
    handEnterBSystem = (record) => {
        const params = {
            proxyBusinessAdminUserCode: record.userCode,
            proxyBusinessAdminUserId: record.userId,
            proxyBusinessId: record.businessId,
            proxyCompanyName: record.companyNameProxry,
            proxyBusinessAdminUserName: record.userName,
        }
        this.props.companySystemAction(params);
    }
    // 删除
    delete = (record) => {
        let typeUser = record.groupName === 'administrator' ? 'B' : 'A'
        const deleteParam = {
            type: typeUser,
            id: record.userId,
            businessId: record.businessId,
        }
        this.props.userDeleteAction(deleteParam);
    }
    //切换用户组
    handleGroupChange = (value) => {
        this.params.companyTypeId = value;
        this.params.pageNum = 1;
        this.props.companyAction(this.params);
    }
    //搜索
    handleSearch = (value) => {
        this.params.paramName = value;
        this.params.pageNum = 1;
        this.props.companyAction(this.params);
    }
    // 显示用户组
    // renderGroup = (data) => {
    //     return (
    //         data.map(item => (
    //             <Option key={item.categoryId}>{item.categoryValue}</Option>
    //         ))
    //     )
    // }

    render () {
        const panelData = {
            title: '企业管理',
        };
        const isJur = this.props.company.get('isJur');
        const userData = this.props.company.get('userData');
        const tableList = userData.rows;
        // const groupList = this.props.common.get('companyType') || [];
        return (
           
                    <Card bordered={false} style={{ margin: 24 }}>
                        <Row className="search_filter">
                            <Col span={4}>
                                {/* <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择认证企业类型"
                                    onChange={this.handleGroupChange}
                                >
                                    <Option key={1} value=''>所有企业类型</Option>
                                    {this.renderGroup()}
                                </Select> */}
                            </Col>
                            <Col span={20} className='searchInput'>
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
                                Utils.pagination({ ...userData, pageNum: this.params.pageNum }, (current) => {
                                    this.params.pageNum = current;
                                    this.props.companyAction(this.params);
                                })
                            }
                        />
                    </Card>
        );
    }
}


export default Company;





