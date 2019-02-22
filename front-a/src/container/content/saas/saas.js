import React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Select, Input, Divider, Button, Modal, Form, Card, Popconfirm } from 'antd';

import './saas.less';
import Panel from '@/components/panel/panel';
import { 
    saasManagementAction, 
    hardwareCodeAction, 
    hardwareRegisterAction, 
    addHardwareRegister, 
    saasOperationAction, 
    saasOpreationSuccess, 
    jurisdictionStatus,
    searchProAction,
    addRelatedAction,
    addRelatedSuccess
} from './store/actions';
import { projectTypeAction, projectTypeList } from '@/core/common/actions';
import { Unauthorized } from '@/container/error-page/not-found-page';
import Utils from '@/utils/utils';

const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;

@connect(
    state => ({
        saas: state.get('saas'),
        common: state.get('common')
    }),
    { 
        saasManagementAction, projectTypeAction, 
        hardwareCodeAction, hardwareRegisterAction, 
        addHardwareRegister, saasOperationAction, 
        saasOpreationSuccess, jurisdictionStatus,
        projectTypeList, searchProAction,
        addRelatedAction, addRelatedSuccess
    }
)
@Form.create()
class Saas extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false, //注册设备弹窗显示隐藏
            hardwareTypeVal: ''
        };
        this.params = {
            pageNum: 1,
            pageSize: 10,
            paramName: '',
            hardwareType: ''
        };
        this.dailog = {
            type: 'register',
            title: 'SaaS硬件注册'
        }; 
        this.code = '';
        this.columns = [{
            title: '设备编号',
            dataIndex: 'hardwareCode',
            key: 'hardwareCode'
        }, {
            title: '设备机器码',
            dataIndex: 'hardwareMachineCode',
            key: 'hardwareMachineCode',
        }, {
            title: '设备类型',
            dataIndex: 'hardwareTypeName',
            key: 'hardwareTypeName',
        }, {
            title: '注册时间',
            key: 'createTime',
            dataIndex: 'createTime'
        }, {
            title: '设备安装地址',
            key: 'installAddress',
            dataIndex: 'installAddress',
            render: (text) => (
                <span>
                    <p>{text ? text : '-'}</p>
                </span>
            )
        }, {
            title: '操作',
            key: 'action',
            render: (text) => {
                const { hardwareState, hardwareCode, hardwareTypeName } = text;
                let operationStr;
                if (hardwareTypeName === '摄像头') {
                    operationStr = ( <a style={{cursor: 'default', color: 'gray'}}>停止</a> )
                } else {
                    const str = hardwareState === 'C' ? '确定启用设备？' : '确定停止设备？';
                    const text = hardwareState === 'C' ? '启用' : '停止';
                    operationStr = ( <Popconfirm placement="top" title={str} onConfirm={(e) => this.handleStop(hardwareCode, text)} okText="确定" cancelText="取消">
                                        <a>{ hardwareState === 'C' ? '启用' : '停止'}</a>
                                     </Popconfirm> )
                }
                return(
                    <div>
                        <Popconfirm placement="top" title="注销后将无法使用设备，确定注销？" onConfirm={() => this.handleLogout(hardwareCode)} okText="确定" cancelText="取消">
                            <a>注销</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        { operationStr }
                        <Divider type="vertical" />
                        <a onClick={() => this.showDailog('project', hardwareCode)}>关联项目</a>
                    </div>
                );
            }
        }];     
    }
    render() {
        const panelData = { title: '注册管理' };
        const { getFieldDecorator } = this.props.form;
        const isJurisdiction = this.props.saas.get('isJurisdiction');
        const AppList = this.props.saas.get('AppList');
        const projectType = this.props.common.get('projectType') || [];
        const hardwareCode = this.props.saas.get('hardwareCode') || '';
        const searchProList = this.props.saas.get('searchProList') || [];
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 18 },
            },
        };
        const { hardwareTypeVal, visible } = this.state;
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24}}>
                        <div className="filter-box">
                            <Row>
                                <Col span={16}>
                                    <Select 
                                        defaultValue="设备类型"
                                        onChange={this.handleTypeChange}
                                    >
                                        <Option value="">全部</Option>
                                        {
                                            projectType && Array.isArray(projectType)
                                            ? projectType.map(subOpt => {
                                                return(
                                                    <Option value={subOpt.categoryId} key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                )
                                            })
                                            : null
                                        }
                                    </Select>
                                    <Button type="primary" onClick={() => this.showDailog('register', null)}>注册硬件</Button>
                                </Col>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                <Search
                                    placeholder="请输入设备编号查询"
                                    onSearch={this.handleSearch}
                                    style={{ width: 380 }}
                                />
                                </Col>
                            </Row>
                        </div>
                        <Table 
                            columns={this.columns} 
                            dataSource={AppList.rows} 
                            rowKey="hardwareCode"
                            locale={{emptyText: '暂无数据'}}
                            pagination={
                                Utils.pagination({...AppList, pageNum: this.params.pageNum },(current) =>{
                                    this.params.pageNum =current;
                                    this.props.saasManagementAction(this.params);
                                })
                            }
                        />
                    </Card>
                    <Modal
                        title={this.dailog.title}
                        visible={visible}
                        onOk={this.handleOk}
                        okText="确定"
                        onCancel={this.handleCancel}
                        cancelText="取消"
                        width="640px"
                    >
                        <Form onSubmit={this.handleSubmit}>
                            {
                                this.dailog.type === 'register'
                                ?
                                <React.Fragment>
                                    <FormItem
                                        {...formItemLayout}
                                        label="设备编号"
                                        extra="注：请根据商务需求编号，默认值系统生成；"
                                        >
                                        {getFieldDecorator('hardwareCode', {
                                            initialValue: hardwareCode,
                                            rules: [{
                                                required: true, message: '请根据商务需求编号，默认值系统生成!',
                                            }],
                                        })(
                                            <Input readOnly />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="设备机器码"
                                        >
                                        {getFieldDecorator('hardwareMachineCode', {
                                            rules: [
                                                { required: true, message: '请正确填写设备机器码!' }
                                            ],
                                        })(
                                            <Input placeholder="请正确填写设备机器码" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="注册密码"
                                        >
                                        {getFieldDecorator('hardwarePwdStr', {
                                            initialValue: '666666',
                                            rules: [{
                                                validator: Utils.isNumber, message: '请输入数字'
                                            }, {
                                                max: 6, message: '最长为6位字符'
                                            }, {
                                                required: true, message: '请输入密码!',
                                            }],
                                        })(
                                            <Input placeholder="默认666666，支持6位数字密码" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="设备类型"
                                        >
                                        {getFieldDecorator('hardwareType', {
                                            initialValue: hardwareTypeVal,
                                            rules: [
                                                { required: true, message: '请选择设备类型!'}
                                            ],
                                        })(
                                            <Select onChange={this.hardwareTypeChange} >
                                                {
                                                    projectType && Array.isArray(projectType)
                                                    ? projectType.map((subOpt, index) => {
                                                        if (index === 0) {
                                                            this.setState({
                                                                hardwareTypeVal: subOpt.categoryId
                                                            })
                                                        }
                                                        return(
                                                            <Option value={subOpt.categoryId} key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                        )
                                                    })
                                                    : null
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <FormItem
                                        {...formItemLayout}
                                        label="项目名称"
                                        >
                                        {getFieldDecorator('proName', {
                                            rules: [
                                                { required: true, message: '请选择项目!'}
                                            ],
                                        })(
                                            <Select
                                                placeholder="请输入项目名称搜索要添加的项目" 
                                                showSearch={true} 
                                                filterOption={false}
                                                onSearch={this.handleSearchProject}
                                                notFoundContent="暂无数据"
                                                labelInValue={true}
                                            >
                                                {
                                                    searchProList && Array.isArray(searchProList)
                                                    ? searchProList.map((subOpt, index) => {
                                                        return(
                                                            <Option key={subOpt.proId}>
                                                                {subOpt.proName}
                                                                <p className="select-addr">{subOpt.proAddr}</p>
                                                            </Option>
                                                        );
                                                    })
                                                    : null
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="安装位置"
                                        >
                                        {getFieldDecorator('proPosition', {
                                            rules: [{
                                                required: true, message: '请填写项目位置!',
                                            }],
                                        })(
                                            <Input placeholder="请填写项目位置" />
                                        )}
                                    </FormItem>
                                </React.Fragment>
                            }
                        </Form> 
                    </Modal>
                    </React.Fragment>
                    : <Unauthorized /> }
            </div>
        );
    }
    componentDidMount () {
        // 获取注册硬件列表
        this.props.saasManagementAction(this.params);
        // 获取硬件类型
        this.props.projectTypeAction({
            dicType: 'SBLX'
        });
    }
    componentWillReceiveProps(nextProps) {
        const saasOpreation = nextProps.saas.get('saasOpreation');
        const addHardware = nextProps.saas.get('addHardware');
        const addRelated = nextProps.saas.get('addRelated');
        if (saasOpreation) {
            // 当操作设备成功后刷新设备列表
            this.props.saasManagementAction(this.params);
            // 当操作设备成功后把状态置为false
            this.props.saasOpreationSuccess(false);
        }
        if (addHardware){
            // 注册设备成功后把状态置为false
            this.props.addHardwareRegister({
                status: false
            });
            // 当注册设备成功后刷新设备列表
            this.props.saasManagementAction(this.params);
        }
        if (addRelated) {
            // 当添加关联成功后刷新设备列表
            this.props.saasManagementAction(this.params);
            // 当添加关联成功后把状态置为false
            this.props.addRelatedSuccess(false);
        }
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
        this.props.projectTypeList([]);
    }
    // 硬件类型切换
    handleTypeChange = (value) => {
        this.params.hardwareType = value;
        this.params.pageNum = 1;
        // 获取注册硬件列表
        this.props.saasManagementAction(this.params);
    }
    // 硬件设备搜索查询
    handleSearch = (value) => {
        this.params.paramName = value;
        this.params.pageNum = 1;
        // 获取注册硬件列表
        this.props.saasManagementAction(this.params);
    }
    // 注销设备
    handleLogout = (code) => {
        this.props.saasOperationAction({
            hardwareCode: code,
            buttonType: 'Type_a'
        })
    }
    // 停用设备
    handleStop = (code, text) => {
        let type;
        if (text === '停止') {
            type = 'Type_e';
        } else {
            type = 'Type_b';
        }
        this.props.saasOperationAction({
            hardwareCode: code,
            buttonType: type
        });
    }
    // 显示注册硬件弹框
    showDailog = (type, code) => {
        if (type === 'register') {
            this.dailog = {
                type: 'register',
                title: 'SaaS硬件注册'
            }; 
            // 获取注册设备编码
            this.props.hardwareCodeAction({
                hardwareType: ''
            });
        } else if (type === 'project') {
            this.dailog = {
                type: 'project',
                title: '关联项目',
            }; 
            this.code = code;
        }
        this.setState({
            visible: true
        });
    }
    // 注册硬件时切换设备类型
    hardwareTypeChange = (id) => {
        // 获取注册设备编码
        this.props.hardwareCodeAction({
            hardwareType: id
        });
    }
    // 注册硬件
    handleOk = () => {
        this.handleSubmit();
    }
    // 提交注册硬件表单事件
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.dailog.type === 'register') {
                    this.props.hardwareRegisterAction(values);
                } else {
                    this.props.addRelatedAction({
                        proId: values.proName.key,
                        hardwareCode: this.code,
                        address: values.proPosition
                    });
                } 
                this.setState({
                    visible: false,
                });
                this.props.form.resetFields();
            }
        });
    }
    // 取消注册硬件
    handleCancel = () => {
        this.setState({
            visible: false,
        });
        this.props.form.resetFields();
    }
    // 搜索查询项目列表
    handleSearchProject = (value) => {
        this.props.searchProAction({
            proName: value
        });
    }
}


export default Saas;


