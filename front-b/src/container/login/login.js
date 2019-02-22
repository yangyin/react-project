import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Tabs, Row, Col } from 'antd';
import Cookies from 'js-cookie';
import Utils from './../../utils/utils';
import { clearAll } from './../../utils/localStorage';


import './login.less';
import { login, resetErrorMsg } from './store/actions';
import { validPhoneRegister, getValidCodeAsync,userCommonStatusInit } from './../../redux/user-common/actions';
import { homeStoreClear } from './../home/store/actions';
import BgComponent from '../../components/login-common/bg';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


@connect(
    state => ({
        user: state.user,
        userCommon: state.userCommon
    }),
    { login, getValidCodeAsync, resetErrorMsg, validPhoneRegister,userCommonStatusInit ,homeStoreClear}
)
@Form.create()

class Login extends React.Component {

    constructor(props) {
        super(props);
        let { hostname } = window.location;
        Cookies.remove('authorization',{ domain: hostname.indexOf('.benefitech.cn') !== -1? '.benefitech.cn' : hostname});
        clearAll();
    }
    state = {
        discodeBtn: false,
        btnText: '获取验证码',
        timer: 60,
        activeKey: '1'
    }

    //切换Tabs
    handleTabChange = (key) => {
        // console.log(key)
        this.setState({
            activeKey: key
        })
        this.props.form.resetFields();
        this.props.resetErrorMsg('');
        this.props.userCommonStatusInit();
    }

    // 获取验证码
    getValid = (e) => {
        this.props.form.validateFields(['userPhone'], (err, value) => {
            if (!err) {
                this.props.getValidCodeAsync(value);
                this.count();
            } else {
                this.props.form.setFields({ userPhone: { errors: [new Error('请输入正确手机号码')] } });
            }
        })
    }

    //倒计时
    count = () => {
        if (!this.clearInter) {
            this.clearInter = setInterval(() => {
                this.setState((prevState, props) => {
                    if (prevState.timer === 0) {
                        clearInterval(this.clearInter);
                        return {
                            btnText: '重新发送',
                            discodeBtn: false
                        }
                    } else {
                        return {
                            timer: prevState.timer - 1,
                            btnText: `倒计时${prevState.timer}S`,
                            discodeBtn: true
                        }
                    }
                })
            }, 1000);
        }

    }
    componentDidUpdate() {
        const { hostname } = window.location;
        const authorization = Cookies.get('authorization',{ domain: hostname.indexOf('.benefitech.cn') !== -1? '.benefitech.cn' : hostname });
        if(authorization) {
            this.props.homeStoreClear();
        }
    }
    componentWillUnmount() {
        //TODO 清空reduce 数据->显示MSG问题、倒计时清除
        this.clearInter && clearInterval(this.clearInter);
    }
    //失焦验证手机号是否注册
    handlePhoneBlur = (e) => {
        e.preventDefault();
        this.props.form.validateFields(({ userPhone }, values) => {
            if (!userPhone) {
                this.props.validPhoneRegister({ phone: values.userPhone });
            }
        });
        this.props.form.resetFields(['verifyCode']);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isPhoneRegister, phoneRegMsg } = this.props.userCommon;
        const {  msg, userRelatedCompanyMap } = this.props.user;

        const { hostname } = window.location;
        const authorization = Cookies.get('authorization',{ domain: hostname.indexOf('.benefitech.cn') !== -1? '.benefitech.cn' : hostname });
        // console.log(authorization)
        const dataMsg = {
            title: '账户登录',
            explain: '项目数据及用户管理的运营平台'
        }
        return (
            <div style={{ width: '100%', height: '100%' }}>
                {authorization ? (JSON.stringify(userRelatedCompanyMap) !== '{}' ? <Redirect to="/" /> : <Redirect to="/securitySetting" />) : null}
                <BgComponent dataMsg={dataMsg} form={this.props.form} handleSubmit={this.props.login} activeKey={this.state.activeKey} >
                    <Tabs className="login-tab" defaultActiveKey="1" activeKey={this.state.activeKey} onChange={this.handleTabChange}>
                        <TabPane tab="账户密码登录" key="1">
                            <p className="error-msg">{this.props.user.msg}</p>
                            <FormItem style={{ position: 'relative' }}>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: <div>请输入账户!</div> }],
                                })(
                                    <Input autoComplete="off" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账户" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )
                                }
                            </FormItem>
                        </TabPane>
                        <TabPane tab="手机号登录" key="2">
                            <p className="error-msg">{msg || phoneRegMsg}</p>
                            <FormItem>
                                {getFieldDecorator('userPhone', {
                                    rules: [{ required: true, message: '请输入手机号码!' }, { validator: Utils.validFhone }],
                                })(
                                    <Input autoComplete="off" onBlur={this.handlePhoneBlur} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Row gutter={8}>
                                    <Col span={15}>
                                        {getFieldDecorator('verifyCode', {
                                            rules: [{ required: true, message: '请输入验证码!' }],
                                        })(
                                            <Input disabled={!isPhoneRegister} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
                                        )}
                                    </Col>
                                    <Col span={9}>
                                        <Button disabled={this.state.discodeBtn || !isPhoneRegister} onClick={this.getValid}>{this.state.btnText}</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </TabPane>
                    </Tabs>

                    <FormItem>
                        {getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true })(
                            <Checkbox>自动登录</Checkbox>
                        )}
                        <Link className="login-form-forgot" to="/get-valid-code">重设密码</Link>
                        <Button type="primary" htmlType="submit" className="login-form-button">登 录</Button>
                        <div>
                            <div style={{ display: 'inline-block' }}>其他登录方式：
                                {/* <Icon className="wechat" type="wechat" /> */}
                            </div>
                            <Link className="login-form-forgot" to="/register">注册账户</Link>
                        </div>
                    </FormItem>

                </BgComponent>
            </div>
        );
    }
}

// export default BgComponent(Login);
export default Login;


