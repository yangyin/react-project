import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Row, Col, Select } from 'antd';
import Bg from './../../components/bg';
import Utils from '@/utils/utils';

import { getValidAction,nextValidAction,updateNextValidStatus } from './store/actions';

import './forget.less';

const FormItem = Form.Item;
const Option = Select.Option;


@connect(
    state=>({
        forget:state.get('forget')
    }),
    {getValidAction,nextValidAction,updateNextValidStatus}
)
@Form.create()
class ForgetValid extends PureComponent {

    state = {
        btnText: '获取验证码',
        timer: 60,
        discodeBtn: false
    }

    // 获取验证码
    getValid = (e) =>{
        e.preventDefault();
        this.props.form.validateFields(['name'], (err, value) => {
            if (!err) {
                this.props.getValidAction({ userPhone: value.name ,option:'重置密码'});
                this.count();
            } else {
                this.props.form.setFields({ userPhone: { errors: [new Error('请输入正确手机号码')] } });
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.nextValidAction(values)
            }
        });
    }

    count () {
        if(!this.clearInter) {
            this.clearInter = setInterval(() => {
                this.setState((prevState,props) => {
                    if(prevState.timer === 0) {
                        clearInterval(this.clearInter);
                        this.clearInter=null;
                        return {
                            btnText: '重新发送', 
                            discodeBtn: false,
                            timer:60
                        }
                    } else {
                        return {
                            timer:prevState.timer - 1,
                            btnText: `倒计时${prevState.timer}S`, 
                            discodeBtn: true
                        }                    
                    }
                })
            }, 1000);            
        }
    }

    componentWillUnmount() {
        //TODO 清空reduce 数据->显示MSG问题、倒计时清除
        this.clearInter && clearInterval(this.clearInter);
        this.clearInter=null;
        //还原手机号是否注册的状态
        this.props.updateNextValidStatus(false);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                {/* <Option value="87">+87</Option> */}
            </Select>
        );
        const isValid = this.props.forget.get('isValid');
        return (
            <React.Fragment>
                {isValid ? <Redirect to={`/reset/${this.props.form.getFieldValue('name')}`} />:null}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入手机号!' }, { validator: Utils.validFhone }],
                        })(
                            <Input autoComplete="off" addonBefore={prefixSelector} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Row gutter={8}>
                            <Col span={15}>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入验证码!' }],
                                })(
                                    <Input autoComplete="off" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
                                )}
                            </Col>
                            <Col span={9}>
                                <Button disabled={this.state.discodeBtn} onClick={this.getValid}>{this.state.btnText}</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Link to="/login">想起密码</Link>
                        <br />
                        <Button size="large" type="primary" htmlType="submit" className="login-form-button">下一步</Button>
                    </FormItem>
                </Form>
            </React.Fragment>
        );
    }
}

export default Bg(ForgetValid)('账户手机号验证');