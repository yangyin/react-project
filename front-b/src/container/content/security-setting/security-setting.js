import React, { Component } from 'react';
import { Card, Button, Modal, Avatar, Input, Form, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSecurityInfo, updateSecurityInfo, jurisdictionStatus,updateSecurityStatus } from './store/action';
import { getValidCodeAsync } from '../../../redux/user-common/actions';
import Panel from '../../../components/panel/panel';

import { Unauthorized } from './../../error-page/not-found-page';
import './security-setting.less';

const FormItem = Form.Item;

@connect(
    state => ({
        securitySettingReducer: state.securitySettingReducer
    }),
    { getSecurityInfo, getValidCodeAsync, updateSecurityInfo, jurisdictionStatus,updateSecurityStatus }
)
@Form.create()
class SecuritySetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnText: '获取验证码',
            timer: 60,
            discodeBtn: false,
            graduateTime: '',
            visible: false,
            confirmDirty: false,
        };
        this.clearInter = null;
        // this.params = {
        //     userPwd: '',
        //     msgCode: '',
        //     userPhone: '',
        //     newUserPhone: ''
        // } 
    }

    componentDidMount() {
        this.props.getSecurityInfo()
    }
    componentWillUnmount() {
        this.clearInter = null;
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        const security = nextProps.securitySettingReducer;
        const { securityinfo,isUpdatePhone } = security;
        if( securityinfo ){
            this.setState({
                userInfo: securityinfo
            })
        }
        if(isUpdatePhone) {
            this.props.updateSecurityStatus(false);
            this.props.getSecurityInfo();
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    /**
     * 验证密码是否一致
     */
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('pwd')) {
            callback('两次密码输入不一致！');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPwd'], { force: true });
        }
        callback();
    }

    // 获取验证码
    getValid = (type) => {
        if (type === 0) {
            const { userPhone } = this.state.userInfo;
            this.props.getValidCodeAsync({ userPhone: userPhone });
            this.count();
        } else if (type === 1) {
            this.props.form.validateFields(['userPhone'], (err, value) => {
                if (!err) {
                    this.props.getValidCodeAsync({ userPhone: value.userPhone },'sdpbusiness/user/changeSendCode');
                    this.count();
                } else {
                    this.props.form.setFields({ userPhone: { errors: [new Error('请输入正确手机号码')] } });
                }
            })
        }
    }

    // 计算验证码发送倒计时
    count() {
        // if (!this.clearInter) {
            this.clearInter = setInterval(() => {
                this.setState((prevState) => {
                    if (prevState.timer === 0) {
                        clearInterval(this.clearInter);
                        return {
                            btnText: '重新发送',
                            discodeBtn: false,
                            timer:60
                        }
                    } else {
                        return {
                            timer: prevState.timer - 1,
                            btnText: `倒计时${prevState.timer}s`,
                            discodeBtn: true
                        }
                    }
                })
            }, 1000);
        // }

    }

    showModal(name) {
        this.setState({
            typeName: name,
            visible: true
        })
    }

    hideModal = () => {
        this.setState({
            visible: false
        })
    }

    handleOk = (e) => {
        this.handleSubmit(e);
    }
    handleSubmit = (e) => {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    userPwd: values.pwd || '',
                    msgCode: values.phoneCode || values.phoneCodeTwo || '',
                    userPhone: this.state.userPhone || '',
                    newUserPhone: values.userPhone || ''
                }
                this.props.updateSecurityInfo(params);
                this.setState({
                    visible: false
                })
            }
        });
    }

    render() {
        const panelData = { pathname: '账户 / 安全设置', title: '安全设置', desc: '安全设置，是用来设置当前注册账户的信息安全' }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const { getFieldDecorator } = this.props.form;
        const { typeName, visible, userInfo } = this.state;
        const { isJurisdiction } = this.props.securitySettingReducer;
        return (
            <div className="account-cont">
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card title="账户资料" bordered={false} style={{ margin: 24 }}>
                            <ul className="my-account">
                                <li>
                                    <div>账户图像</div>
                                    <div><Avatar size={64} src={ (userInfo && userInfo.userHeadPortrait) || require("../../../images/default_avatar.png")} /></div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>注册账号</div>
                                    <div>{userInfo && userInfo.userCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>注册时间</div>
                                    <div>{userInfo && userInfo.createTime}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>登录密码</div>
                                    <div>{ userInfo && `${userInfo.userPwd.substr(0, 1)}**********`}</div>
                                    <div className="change" onClick={() => this.showModal('更换密码')}>更换密码</div>
                                </li>
                                <li>
                                    <div>绑定手机</div>
                                    <div>{userInfo && userInfo.userPhone}
                                        {
                                            userInfo && userInfo.userCard && <span className="security-text">(你已通过实名认证)</span>
                                        }
                                    </div>
                                    <div className="change" onClick={() => this.showModal('换绑手机')}>换绑手机</div>
                                </li>
                            </ul>
                        </Card>
                        <Card bordered={false} style={{ margin: 24, padding: 32 }}>
                            <div>更新资料是对账户使用功能的完善，去更新一下吧！</div>
                            <Link to="/basicData" className="ant-btn ant-btn-primary" style={{ marginTop: 25 }}>马上更新资料</Link>
                        </Card>
                        <Modal
                            title={typeName}
                            visible={visible}
                            onOk={this.handleOk}
                            onCancel={this.hideModal}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Form onSubmit={this.handleSubmit}>
                                {
                                    typeName === '更换密码'
                                        ? <div>
                                            <p>温馨提示：请使用你账号绑定的手机接收验证码！</p>
                                            <FormItem
                                                {...formItemLayout}
                                                label="验证码"
                                            >
                                                <Row gutter={8}>
                                                    <Col span={16}>
                                                        {getFieldDecorator('phoneCode', {
                                                            rules: [{ required: true, message: '验证码必填!' }],
                                                        })(
                                                            <Input maxLength='5' />
                                                        )}
                                                    </Col>
                                                    <Col span={8}>
                                                        <Button type="primary" disabled={this.state.discodeBtn} onClick={() => this.getValid(0)}>{this.state.btnText}</Button>
                                                    </Col>
                                                </Row>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="请设置新密码"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('pwd', {
                                                    rules: [{
                                                        required: true, message: '请输入密码!',
                                                    }, {
                                                        validator: this.validateToNextPassword,
                                                    }],
                                                })(
                                                    <Input type="password" />
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="确认新密码"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('confirmPwd', {
                                                    rules: [{
                                                        required: true, message: '请再次输入密码!',
                                                    }, {
                                                        validator: this.compareToFirstPassword,
                                                    }],
                                                })(
                                                    <Input type="password" onBlur={this.handleConfirmBlur} />
                                                )}
                                            </FormItem>
                                        </div>
                                        : null
                                }
                                {
                                    typeName === '换绑手机'
                                        ? <div>
                                            <p>温馨提示：请使用有效的手机账号</p>
                                            <FormItem
                                                {...formItemLayout}
                                                label="新手机号码"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('userPhone', {
                                                    rules: [{ required: true, message: '手机号码必填!' }],
                                                })(
                                                    <Input maxLength='11' />
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="验证码"
                                            >
                                                <Row gutter={8}>
                                                    <Col span={16}>
                                                        {getFieldDecorator('phoneCodeTwo', {
                                                            rules: [{ required: true, message: '验证码必填!' }],
                                                        })(
                                                            <Input maxLength='5' />
                                                        )}
                                                    </Col>
                                                    <Col span={8}>
                                                        <Button type="primary" disabled={this.state.discodeBtn} onClick={() => this.getValid(1)}>{this.state.btnText}</Button>
                                                    </Col>
                                                </Row>
                                            </FormItem>

                                        </div>
                                        : null
                                }


                            </Form>
                        </Modal>
                    </React.Fragment>
                    : <Unauthorized />
                }


            </div>
        )
    }

}

export default SecuritySetting;