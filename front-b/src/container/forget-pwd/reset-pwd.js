import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';

import { read, clearAll } from './../../utils/localStorage';
import { forgetPwdSubmit } from './store/actions';
import BgComponent from '../../components/login-common/bg';
import './forget.less';

const FormItem = Form.Item;

@connect(
    state=>state.forgetPsd,
    {forgetPwdSubmit}
)
@Form.create()
export default class ResetPwd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorization: read('authorization'),
            lvl:0, //强度等级Class
            lvlTxt:''//强度text
        }
    }

    componentDidMount() {
        // const authorization = read('authorization');
        !this.state.authorization && <Redirect to="/get-valid-code" />;
    }
    componentWillUnmount() {
        clearAll();
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
        value ? value !== form.getFieldValue('password') ? callback('两次密码输入不一致！') : callback() : callback()
    }
    render() {
        // console.log(this.props)
        const { getFieldDecorator } = this.props.form;
        const { isreset } = this.props;
        const { lvl,lvlTxt } = this.state;
        const dataMsg = {
            title: '请设置新密码',
            explain: '这是一个工程项目效能管理系统',
        }
        return (
            <div style={{ width: '100%', height: '100%' }}>
                {/* handleSubmit={this.props} msg={this.props.forgetPwdReducer.msg} */}
                { isreset===true &&  <Redirect to="/login" />}
                <BgComponent form={this.props.form} dataMsg={dataMsg} handleSubmit={this.props.forgetPwdSubmit}>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入密码!' },
                                { validator: this.checkLvl }
                            ],
                        })(
                            <div>
                                <Input autoComplete="off" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入新密码" />
                                <div className={`checkLvl checkLvl${lvl}`} hidden={lvl === 0}>密码强度：<p className="lvl-p"><label className={`lvl${lvl}`}></label></p><span>{lvlTxt}</span></div>
                            </div>
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                { required: true, message: '请再次输入密码!' },
                                { validator: this.checkPassword },
                            ],
                        })(
                            <Input autoComplete="off" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请确认密码" />
                        )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">提 交</Button>
                    </FormItem>
                </BgComponent>
            </div>
        )
    }
}