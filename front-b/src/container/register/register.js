import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col, Select } from 'antd';
import { connect } from 'react-redux';

import BgComponent from '../../components/login-common/bg';
import Utils from '../../utils/utils'
import './register.less';

import { getValidCodeRegister,validPhoneRegister,validPhoneRegisterStatus,userCommonStatusInit } from './../../redux/user-common/actions'; 
import { registerSubmit,registerStatus } from './store/actions';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(
    state=>({
        userCommon:state.userCommon,
        register:state.register
    }),
    { getValidCodeRegister,validPhoneRegister,validPhoneRegisterStatus,registerSubmit ,registerStatus,userCommonStatusInit}
)
@Form.create()
class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            btnText: '获取验证码',
            timer: 60,
            discodeBtn: false,
            lvl:0, //强度等级Class
            lvlTxt:''//强度text
        }

        this.getValid = this.getValid.bind(this);
    }
    /**
     * 失焦时，验证手机号是否注册
     */
    handlePhoneBlur = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['phone'],(err,value) => {
            if(!err) {
                this.props.validPhoneRegister(value);
            } else {
                this.props.form.setFields({phone:{errors:[new Error('请输入正确手机号码')]}});
            }
        })
    }
    // 获取验证码
    getValid(e) {
        this.props.form.validateFields(['phone'], (err, value) => {
            if (!err) {
                // console.log(value)
                this.props.getValidCodeRegister({userPhone:value.phone,option:'注册'});
                this.count();
            } else {
                this.props.form.setFields({ phone: { errors: [new Error('请输入正确手机号码')] } });
            }
        })
    }

    componentWillUnmount() {
        //TODO 清空reduce 数据->显示MSG问题、倒计时清除
        this.clearInter && clearInterval(this.clearInter);
        //还原手机号是否注册的状态
        this.props.validPhoneRegisterStatus(false);
        //还原注册页面是否注册
        this.props.registerStatus(false);
        //还原userCommon初始状态
        this.props.userCommonStatusInit();
    }

    count() {
        if (!this.clearInter) {
            this.clearInter = setInterval(() => {
                console.log(1)
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
    /**
     * 验证密码强度
     */
    checkLvl = (rule, value, callback) => {
        if (value) {
            //默认级别是0
            let lvl = 0;
            let txt ='';
            //判断这个字符串中有没有数字
            if (/[0-9]/.test(value)) {
                lvl++;
                txt='弱';
            }
            //判断字符串中有没有字母
            if (/[a-zA-Z]/.test(value)) {
                lvl++;
                txt='中';
            }
            //判断字符串中有没有特殊符号
            if (/[^0-9a-zA-Z_]/.test(value)) {
                lvl++;
                txt='强';
            }

            lvl>0 ?callback():callback('请输入密码')
            this.setState(() => ({
                lvl:lvl,
                lvlTxt:txt
            }))
        } else {
            callback();
            this.setState(() => ({
                lvl:0,
                lvlTxt:'弱'
            }))
        }
    }
    /**
     * 验证密码是否一致
     */
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        value ? ( value !== form.getFieldValue('password') ? callback('两次密码输入不一致！') : callback() ) : callback()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isPhoneRegister } = this.props.userCommon;
        const { msg,isRegister } = this.props.register;
        const { lvl,lvlTxt,discodeBtn } = this.state;
        // console.log(userCommon)
        const dataMsg = {
            title: '账户手机号验证',
            explain: '这是一个工程项目效能管理系统',
        }
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
            </Select>
        );
        return (
            <div style={{ width: '100%', height: '100%' }}>
                { isRegister===true ?  <Redirect to={{pathname:"/register-success",state:this.props.form.getFieldValue('email')}} /> :null}
                <BgComponent dataMsg={dataMsg} form={this.props.form} handleSubmit={this.props.registerSubmit}>
                    <div className="title">
                        <div>注册</div>
                    </div>
                    <p className="error-msg">{ msg || (isPhoneRegister&&'你的手机号已注册!') }</p>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: '请输入邮箱!' },
                                {pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,message:'请输入正确的邮箱地址'}
                            ],
                        })(
                            <Input autoComplete="off" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' },{ validator: this.checkLvl }]
                        })(
                            <div>
                                <Input autoComplete="off" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="6 - 16位密码，区分大小写" />
                                <div className={`checkLvl checkLvl${lvl}`} hidden={lvl === 0}>密码强度：<p className="lvl-p"><label className={`lvl${lvl}`}></label></p><span>{lvlTxt}</span></div>
                            </div>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('passwordSure', {
                            rules: [
                                { required: true, message: '请输入!' },
                                { validator: this.checkPassword }
                            ],
                        })(
                            <Input autoComplete="off" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="确认密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号!' }, { validator: Utils.validFhone }],
                        })(
                            <Input autoComplete="off" onBlur={this.handlePhoneBlur} addonBefore={prefixSelector} prefix={<Icon type="phone" theme="outlined" />} placeholder="手机号" />
                        )}
                    </FormItem>
                    <FormItem>
                        <FormItem style={{display:'inline-block',width:'60%'}}  validateStatus={this.props.form.getFieldValue('msgCode')?'success':''} hasFeedback>
                            {getFieldDecorator('msgCode', {
                                rules: [{ required: true, message: '请输入验证码!' }],
                            })(
                                <Input autoComplete="off" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
                            )}
                        </FormItem>
                        <FormItem style={{display:'inline-block',width:'40%'}}><Button disabled={isPhoneRegister || discodeBtn} onClick={this.getValid}>{this.state.btnText}</Button></FormItem>
                    </FormItem>
                    <FormItem>
                        <Row gutter={24}>
                            <Col span={12}><Button type="primary" htmlType="submit" className="login-form-button">注册</Button></Col>
                            <Col span={12}><Link to="/login" className="login-form-forgot">使用已有帐户登录</Link></Col>
                        </Row>
                    </FormItem>
                </BgComponent>
            </div>
        );
    }
}

export default Register;


