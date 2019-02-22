import React, { PureComponent } from 'react';
import { Modal, Popconfirm, Tabs, Checkbox, Card, Row, Col, Select, Input, Divider, Table } from 'antd';
import { Link } from 'react-router-dom';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';
import { Unauthorized } from '@/container/error-page/not-found-page';

import './organization.less';
import Utils from '@/utils/utils';
import { companyAction, userDeleteAction, companyAuditAction, statusControl } from './store/actions.js';
import { projectTypeAction } from '@/core/common/actions';

const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

@connect(
    state => ({
        organization: state.get('organization'),
        common: state.get('common')
    }),
    { companyAuditAction, statusControl, companyAction, userDeleteAction, projectTypeAction }
)
class Organization extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            { title: '单位名称', dataIndex: 'orgName' },
            { title: '负责人', dataIndex: 'adminName' },
            { title: '联系电话', dataIndex: 'adminPhone' },
            { title: '法人', dataIndex: 'orgLegalPerson' },
            // { title: '认证类型', dataIndex: 'orgType' },
            { title: '认证时间', dataIndex: 'auditTime' },
            {
                title: '操作',
                render: (text, record) => {
                    const orgState = record.orgState;
                    let optionArea = '';
                    if (orgState == 'B') {
                        optionArea = <Link to={{ pathname: `/user/organizationDetail/${record.orgId}` }}>详情</Link>;
                    } else if (orgState == 'A') {
                        optionArea = <span>
                            <Link to={{ pathname: `/user/organizationDetail/${record.orgId}` }}>详情</Link>
                            <Divider type="vertical" />
                            <a onClick={() => this.showMadal(record)}>待审核</a>
                            <Divider type="vertical" />
                            <Popconfirm title="确认删除该条数据?" onConfirm={() => this.delete(record.orgId)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        </span>
                    }
                    return optionArea;

                },
            },
        ];
        this.options = [
            { label: '企业信息与附件不符合；', value: '企业信息与附件不符合；' },
            { label: '法人信息与附件不符合；', value: '法人信息与附件不符合；' },
            { label: '附件不合格，像素太低，看不清楚；', value: '附件不合格，像素太低，看不清楚；' },
        ];
        this.state = {
            visible: false,
            defaultTab: 'C', // c不通过 B 通过
        }
        this.paramAudit = {
            orgId: '',
            orgState: 'C',
            adminId: '',
            withoutReason: '企业信息与附件不符合；',
        }
        this.params = {
            offset: 0,
            limit: 10,
            orgType: '',
            pageNum: 1,
            pageSize: 10,
            queryStr: ''
        }
    }
    // 组建渲染之后调用  只调用一次
    componentDidMount () {
        this.request();
    }
    componentWillReceiveProps (nextProps) {
        const isRefresh = nextProps.organization.get('isRefresh');
        if (isRefresh) {
            this.request();
            this.props.statusControl(false);
        }
    }
    request = () => {
        // 获取用户列表
        this.params.pageNum = 1;
        this.props.companyAction(this.params);
        // 获取认证企业类型
        // this.props.projectTypeAction({ dicType: 'companytype' });
    }
    // 删除
    delete = (id) => {
        const deleteParam = {
            orgId: id
        }
        this.props.userDeleteAction(deleteParam);
        this.params.pageNum = 1;
        this.props.companyAction(this.params);
    }
    //切换用户组
    handleGroupChange = (value) => {
        this.params.orgType = value;
        this.params.pageNum = 1;
        this.props.companyAction(this.params);
    }
    //搜索
    handleSearch = (value) => {
        this.params.queryStr = value;
        this.params.pageNum = 1;
        this.props.companyAction(this.params);
    }
    // 显示用户组
    renderGroup = (data) => {
        return (
            data.map(item => (
                <Option key={item.categoryId}>{item.categoryValue}</Option>
            ))
        )
    }
    showMadal = (record) => {
        this.setState({
            visible: true,
        })
        this.paramAudit.orgId = record.orgId;
        this.paramAudit.adminId = record.adminId;
    }
    // 审核modal确定按钮事件
    handleSubmit = () => {
        this.props.companyAuditAction(this.paramAudit);
        this.handleCancel();
    }
    // 关闭审核modal
    handleCancel = () => {
        this.setState({
            visible: false
        })
        this.paramAudit.orgId = '';
        this.paramAudit.orgState = 'C';
        this.paramAudit.adminId = '';
        this.paramAudit.withoutReason = '';
    }
    handleTabChange = (key) => {
        this.paramAudit.orgState = key;
    }
    // 不通过理由
    handleCheckbox = (checkedValues) => {
        const reasonStr = checkedValues.join();
        this.paramAudit.withoutReason = reasonStr;
    }
    render () {
        const panelData = {
            title: '行政部门',
        };
        const userData = this.props.organization.get('orgData');
        const { visible, defaultTab } = this.state;
        const isJur = this.props.organization.get('isJur');
        const tableList = userData.rows || [];
        const groupList = this.props.common.get('companyType') || [];
        return (
            <React.Fragment>
                {!isJur ?
                    <div className="org">
                        <Panel panelData={panelData} />
                        <Card bordered={false} style={{ margin: 24 }}>
                            <Row className="search_filter">
                                <Col span={4}>
                                    {/* <Select
                                        style={{ width: '100%' }}
                                        placeholder="请选择认证机构类型"
                                        onChange={this.handleGroupChange}
                                    >
                                        <Option key={1} value=''>所有认证机构类型</Option>
                                        {this.renderGroup(groupList)}
                                    </Select> */}
                                </Col>
                                <Col span={20} className='searchInput'>
                                    <Search
                                        placeholder="请输入法人、代理人姓名或公司名称"
                                        onSearch={this.handleSearch}
                                        style={{ width: 380 }}
                                    />
                                </Col>
                            </Row>
                            <Table
                                className='tableStyle'
                                locale={{ emptyText: '暂无数据' }}
                                rowKey="orgId"
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
                        <Modal
                            title="机构入驻审核"
                            visible={visible}
                            onOk={this.handleSubmit}
                            onCancel={this.handleCancel}
                        >
                            <Tabs defaultActiveKey={defaultTab} onChange={this.handleTabChange}>
                                <TabPane tab="不通过" key="C">
                                    <CheckboxGroup options={this.options} defaultValue={['企业信息与附件不符合；']} onChange={this.handleCheckbox} />
                                </TabPane>
                                <TabPane tab="通过" key="B">
                                    <p>通过审核</p>
                                </TabPane>
                            </Tabs>

                        </Modal>
                    </div>
                    : <Unauthorized />}
            </React.Fragment>
        );
    }
}


export default Organization;





