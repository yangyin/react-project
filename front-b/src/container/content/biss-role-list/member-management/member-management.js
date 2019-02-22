import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Modal, Card, Input, Button, Radio, Row, Col, Select, Spin,notification } from 'antd';

import './member-management.less';
import Utils from './../../../../utils/utils';
import Panel from '../../../../components/panel/panel';
import { getBissUserRoleRelationData,addBissUserRole,updateAddBissUserRole,updateBissUserRole ,updateBissUserRoleStatus} from './../store/actions';
import { selectUserByUserPhone } from './../../../../redux/findField/actions';

const Option = Select.Option;
const Search = Input.Search;
const panelData = { pathname: '系统 / 项目角色 / 角色成员', title: '角色成员', desc: '角色成员是提供给企业管理员的设置项目角色的人员管理工具', isBack: true }

@connect(
    state => ({
        roleStore: state.projectRole,
        findField:state.findField
    }),
    { getBissUserRoleRelationData,selectUserByUserPhone ,addBissUserRole,updateAddBissUserRole,updateBissUserRole,updateBissUserRoleStatus}
)
class LeaguerManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            open:false,
            selectValue:[]
        }
        this.params = {
            pageNum: 1,
            pageSize: 10,
            order: 'asc',
            roleId: this.props.match.params.id,
            paramName:''
        }
        this.selectedRowKeys = '';
        this.columns = [
            { title: '姓名', dataIndex: 'userName' },
            { title: '身份证号', dataIndex: 'userCard' },
            { title: '电话号码', dataIndex: 'userPhone' },
            { title: '职业工种', dataIndex: 'userWorkType' },
            { title: '住址', dataIndex: 'userAddr' },
            { title: '创建时间', dataIndex: 'createTime' },
            {
                title: '操作', render: (text, record) => {
                    return (
                        <a onClick={() => this.delete(record.roleRelationId)}>移除</a>
                    )
                }
            },
        ]
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`);
                this.selectedRowKeys = selectedRowKeys.join();
            },
            getCheckboxProps: record => ({
                name: record.name,
            }),
        }
    }
    //点击新增按钮
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    //新增提交
    handleOk = (e) => {
        const { selectValue } = this.state;
        const { roleId } = this.params;
        if(selectValue.length==0) {
            notification.warning({
                message: '提示',
                description:'请选择要添加的成员',
                key:'1'
            })
            return;
        }
        this.props.addBissUserRole({roleId,userId:selectValue,relationState:'y'});
    }
    //关闭模态框
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            selectValue:[]
        });
    }
    //搜索
    fetchUser = (value) => {
        // console.log(value)
        this.props.selectUserByUserPhone({userPhone:value});
        this.setState((prevState) =>({
            open:true
        }))
    }
    //选中option，时
    handleChange = (value) => {
        // console.log(value)
        this.setState(()=> ({
            selectValue:value[value.length -1],
            open:false
        }))
    }
    //select失焦
    handleBlur=() => {
        this.setState(() => ({
            open:false
        }))
    }
    //select获得焦点
    handleFocus=() => {
        this.setState(() => ({
            open:true
        }))
    }
    //单个移除
    delete = (roleRelationId) => {
        // console.log(id)
        this.updateRoleRequest({roleRelationId,relationState:'n'});
    }
    //批量删除
    handleDelte = () => {
        if(!this.selectedRowKeys) {
            notification.warning({
                message:'提示',
                description: '请选择要移除的成员',
                key:'1'
            })
            return;
        }
        this.updateRoleRequest({roleRelationId:this.selectedRowKeys,relationState:'n'});

    }

    updateRoleRequest = (params) => {
        this.props.updateBissUserRole(params);
    }
    componentDidMount() {
        this.request(this.params);
    }
    componentDidUpdate() {
        const { isAddBissUserRole,isUpdateBissUserRole } = this.props.roleStore;
        if(isAddBissUserRole == true) {
            this.params.pageNum = 1;
            this.props.updateAddBissUserRole(false);
            this.request(this.params);
            this.setState({
                visible: false,
                selectValue:[]
            });
        }
        if(isUpdateBissUserRole == true) {
            this.params.pageNum = 1;
            this.props.updateBissUserRoleStatus(false);
            this.request(this.params);
            this.selectedRowKeys = '';
        }
    }
    //请求列表
    request = (params) => {
        this.props.getBissUserRoleRelationData(params);
    }
    //搜索
    onSearch = (v) => {
        this.params.paramName = v;
        this.request(this.params);
    }
    render() {
        const { roleDetails } = this.props.roleStore;
        const { selectUserList } = this.props.findField;
        const { selectValue,open } = this.state;
        return (
            <div className="member-management">
                <Panel panelData={panelData} />
                <Card style={{ margin: 24 }}>
                    <Row type="flex" justify="space-between">
                        <Col>
                            <Button type="primary" onClick={this.showModal}>新增</Button>
                            <Radio.Group style={{ marginLeft: 10 }} onChange={this.handleSizeChange}>
                                <Radio.Button value="large" onClick={this.handleDelte}>批量删除</Radio.Button>
                                {/* <Radio.Button value="default">冻结</Radio.Button> */}
                            </Radio.Group>
                        </Col>
                        <Col>
                            <Search
                                placeholder="请输入"
                                onSearch={value => this.onSearch(value)}
                                style={{ width: 200 }}
                            />
                        </Col>
                    </Row>
                </Card>
                <Card style={{ margin: 24 }}>
                    <Table style={{ background: '#fff' }}
                        rowKey="roleRelationId"
                        columns={this.columns}
                        locale = {{emptyText:'暂无数据'}}
                        dataSource={roleDetails['rows'] && roleDetails['rows']}
                        rowSelection={this.rowSelection}
                        pagination={
                            Utils.pagination({ ...roleDetails['rows'], pageNum: this.params.pageNum }, (current) => {
                                this.params.pageNum = current;
                                this.request();
                            })
                        }
                    />
                </Card>
                <Modal
                    title="添加成员"
                    cancelText="取消"
                    okText="提交"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Select
                        mode="multiple"
                        open={open}
                        // maxTagCount={1}
                        // labelInValue
                        value={selectValue}
                        placeholder="请输入姓名或电话"
                        notFoundContent={selectUserList.length>0 ? <Spin size="small" /> : null}
                        filterOption={false}
                        onSearch={this.fetchUser}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                        style={{ width: '100%' }}
                    >
                        {selectUserList.map(d => <Option key={d.userId}>{d.userName}  {d.userPhone}</Option>)}
                    </Select>
                </Modal>
            </div>
        )
    }



}

export default LeaguerManagement;