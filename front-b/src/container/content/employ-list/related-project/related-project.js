import React , { Component } from 'react';
import { Card, Table, Modal, Button, Select, Input, Form, Row, Col, Popconfirm  } from 'antd';
import { connect } from 'react-redux';
import { relatedProList, removeRelated, getRelatedProject, getProjectRole, addRelated, removeRelatedStatus, addRelatedStatus } from '../store/action';
import Panel from '../../../../components/panel/panel';
import Utils from '../../../../utils/utils';

import '../employ-list.less';

const FormItem = Form.Item;
const Option = Select.Option;
@connect(
    state => ({
        staffManagerReducer: state.staffManagerReducer
    }),
    { relatedProList, removeRelated, getRelatedProject, getProjectRole, addRelated, removeRelatedStatus, addRelatedStatus }
)
@Form.create()
class RelatedProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        //列表数据
        this.params = {
            pageNum: 1,
            pageSize: 10
        }
        this.userData = {};
        this.type = "";
        this.columns = [{
            title: '项目名称',
            dataIndex: 'proName',
            key: 'proName'
          }, {
            title: '项目地址',
            dataIndex: 'proAddr',
            key: 'proAddr',
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm 
                        title="确定解除项目关联?" 
                        onConfirm={() => this.confirm(record)} 
                        // onCancel={this.cancel} 
                        okText="确定" 
                        cancelText="取消"
                    >
                        <a>解除关联</a>
                    </Popconfirm>
                </span>
            ),
          }]
    }

    componentDidMount() {
        const { location, match } = this.props;
        this.userData = location.state || {};
        this.type = match.params.type;

        console.log(this.type)
        // 获取关联项目列表
        this.getRelatedList();
    }
    // 获取关联项目列表
    getRelatedList() {
        let params = {}, url = '';
        if (this.type == 'teamGroup') {
            url = 'sdpbusiness/team/selectRelatedProjects';
            params = {
                teamId: this.userData.teamId,
                ...this.params
            }
        } else if (this.type == 'employGroup') {
            url = 'sdpbusiness/user/selectRelatedProjects';
            params = {
                userId: this.userData.userId,
                ...this.params
            }
        }
        this.props.relatedProList(url, params);
    }
    // 更新 组件初始化时不调用，组件接受新的props时调用。
    componentWillReceiveProps(nextProps) {
        const { removeStatus, addStatus } = nextProps.staffManagerReducer;
        // 解除关联成功
        if(removeStatus) {
            this.props.removeRelatedStatus(false);
            // 获取关联项目列表
            this.getRelatedList();
        }
        // 添加关联成功
        if(addStatus) {
            this.props.addRelatedStatus(false);
           // 获取关联项目列表
           this.getRelatedList();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const panelData = { pathname: '人员管理 / 员工管理', title: '关联项目' }
        const { visible } = this.state;
        const { relatedList, relatedProjectList, projectRole } = this.props.staffManagerReducer;
        return (
            <div>
               <Panel panelData={panelData} />
               <Card bordered={false} style={{ margin: 24 }}>
                    <div style={{marginBottom: '20px'}}>
                        <Row>
                            <Col span={22}>
                                <div className='related-userinfo'>
                                    {
                                        this.type == 'employGroup'
                                        ? 
                                        <React.Fragment>
                                            <span>{this.userData.userName}</span>
                                            <span>{this.userData.userPhone}</span>
                                        </React.Fragment>
                                        : 
                                        <span>{this.userData.teamName}</span>
                                    }
                                    已关联项目
                                </div>
                            </Col>
                            <Col span={2} style={{ textAlign: 'right'}}>
                                <Button type="primary" onClick={this.showModal}>添加关联</Button>
                            </Col>
                        </Row>
                    </div>
                    <Table 
                        columns={this.columns} 
                        rowKey="proId"
                        locale={{emptyText: '暂无数据'}}
                        pagination={
                            Utils.pagination({...relatedList, pageNum: this.params.pageNum },(current) =>{
                                this.params.pageNum =current;
                                this.props.initStaffManagement(this.params);
                            })
                        }
                        dataSource={ relatedList ? relatedList.rows : []}
                        />
               </Card>
               <Modal
                    title="添加关联"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="确定"
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="项目名称"
                                hasFeedback
                                >
                                {getFieldDecorator('seleProName', {
                                    rules: [
                                    { required: true, message: '请搜索选择要添加的项目!' },
                                    ],
                                })(
                                    <Select 
                                        placeholder="请搜索选择要添加的项目" 
                                        showSearch={true} 
                                        filterOption={false}
                                        onSearch={this.onProjectsSearch}
                                        // onChange={this.onProjectsChange}
                                        notFoundContent="暂无数据"
                                    >
                                        {
                                            relatedProjectList && Array.isArray(relatedProjectList)
                                            ? relatedProjectList.map(personOpt => {
                                                return(
                                                    <Option 
                                                        key={[
                                                            personOpt.proComId,
                                                            personOpt.proId
                                                        ]}
                                                    >
                                                        {personOpt.proName}
                                                        <p className="select-addr">{personOpt.proAddr}</p>
                                                    </Option>
                                                )
                                            })
                                            : null
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            {
                                this.type == 'employGroup'
                                ?
                                <FormItem
                                    {...formItemLayout}
                                    label="项目角色"
                                    hasFeedback
                                >
                                    {getFieldDecorator('seleRole', {
                                        rules: [
                                        { required: true, message: '请选择项目角色！' },
                                        ],
                                    })(
                                        <Select placeholder="请选择项目角色" notFoundContent="暂无数据">
                                                {
                                                    projectRole && Array.isArray(projectRole)
                                                    ?  projectRole.map(subOpt => {
                                                        return(
                                                            <Option value={subOpt.roleId} key={subOpt.roleId}>{subOpt.roleName}</Option>
                                                        )
                                                    })
                                                    : null
                                                }
                                        </Select>
                                    )}
                                </FormItem>
                                :
                                null
                            }
                        </Form>
                </Modal>
            </div>
        )
    }
    // 确定移除
    confirm = (result) => {
        let url = '', options = {};
        if (this.type == 'employGroup') {
            url = 'sdpbusiness/user/deleteRelatedProjects';
            options = {
                proId: result.proId,
                userId: this.userData.userId,
                proComUserId: result.proComUserId
            }
        } else if(this.type == 'teamGroup') {
            url = 'sdpbusiness/team/deleteRelatedProjects';
            options = {
                proId: result.proId,
                teamId: this.userData.teamId,
                proTeamId: result.proTeamId
            }
        }
        this.props.removeRelated(url, options);
    }
    // 搜索查询项目列表
    onProjectsSearch = (value) => {
        let url = this.type == 'employGroup' ? 'sdpbusiness/user/selectAddRelatedProjects' : 'sdpbusiness/team/selectAddRelatedProjects';
        this.props.getRelatedProject(url, {
            queryStr: value
        });      
    }
    // onProjectsChange = (value) => {
    //     this.props.form.setFieldsValue({
    //         seleProName: value.split(',')[0]
    //     })
    // }
    // 新增员工弹窗
    showModal = () => {
        this.setState({
            visible: true,
        });
        if (this.type == 'employGroup') {
            this.props.getProjectRole({});
        }
    }
    
    handleOk = (e) => {
        this.handleSubmit();
    }
    // 添加关联
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const seleProName = values.seleProName.split(',');
                let url = '', options = '';
                if (this.type == 'employGroup') {
                    url = 'sdpbusiness/user/addRelatedProjects';
                    options = {
                        proId: seleProName[1],
                        roleId: values.seleRole,
                        userId: this.userData.userId,
                        userPhone: this.userData.userPhone,
                        proComId: seleProName[0]
                    }
                } else if(this.type == 'teamGroup') {
                    url = 'sdpbusiness/team/addRelatedProjects';
                    options = {
                        proId: seleProName[1],
                        teamId: this.userData.teamId
                    }
                }
                console.log(url)
                console.log(options)
                this.props.addRelated(url, options);
                this.setState({
                    visible: false,
                });
                this.props.form.resetFields();
            }
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.props.form.resetFields();
    }
}

export default RelatedProject;