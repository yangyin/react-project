import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button,Row, Col,Select } from 'antd';
import { connect } from 'react-redux';

import BgComponent from '../../components/login-common/bg';
import Utils from './../../utils/utils';
import './forget.less';

import { getValidCodeAsync ,validPhoneRegisterStatus} from './../../redux/user-common/actions';
import { validCodeAsync,clearMsg } from './store/actions';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(
    state=>({
        forgetPsd:state.forgetPsd,
        userCommon:state.userCommon
    }),
    { getValidCodeAsync,validPhoneRegisterStatus,validCodeAsync ,clearMsg}
)
@Form.create()
class GetValidCode extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            btnText:'获取验证码',
            timer:60,
            discodeBtn:false
        }

        this.getValid = this.getValid.bind(this);
    }
    // 获取验证码
    getValid(e) {
        this.props.form.validateFields(['name'],(err,value) => {
            if(!err) {
                this.props.getValidCodeAsync({userPhone:value.name});
                this.count();
            } else {
                this.props.form.setFields({userPhone:{errors:[new Error('请输入正确手机号码')]}});
            }
        })
    }

    componentWillUnmount() {
        //TODO 清空reduce 数据->显示MSG问题、倒计时清除
        this.clearInter && clearInterval(this.clearInter);
        //还原手机号是否注册的状态
        this.props.validPhoneRegisterStatus(false);
    }

    count () {
        if(!this.clearInter) {
            this.clearInter = setInterval(() => {
                this.setState((prevState,props) => {
                    if(prevState.timer === 0) {
                        clearInterval(this.clearInter);
                        return {
                            btnText: '重新发送', 
                            discodeBtn: false
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
    //聚焦时，清空错误信息
    handleClearMsg = () =>{
        this.props.clearMsg();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { validCodeSuccess ,forgetMsg} = this.props.forgetPsd;
        const dataMsg = {
            title:'账户手机号验证',
            explain:'这是一个工程项目效能管理系统',
        }
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              {/* <Option value="87">+87</Option> */}
            </Select>
        );
        return (
            <div style={{width:'100%',height:'100%'}}>
                {validCodeSuccess ? <Redirect to={{pathname:"/reset"}} />:null}
                <BgComponent dataMsg={dataMsg} form={this.props.form} handleSubmit={this.props.validCodeAsync} msg={forgetMsg}>
                <p className="error-msg">{forgetMsg}</p>
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入手机号!' }, {validator: Utils.validFhone}],
                            })(
                            <Input onFocus={this.handleClearMsg} addonBefore={prefixSelector} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Row gutter={8}>
                            <Col span={15}>
                                {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入验证码!' }],
                                })(
                                <Input onFocus={this.handleClearMsg} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
                                )}
                            </Col>
                            <Col span={9}>
                                <Button disabled={this.state.discodeBtn} onClick={this.getValid}>{this.state.btnText}</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Link  to="/login">想起密码</Link>
                        <br/>
                        {/* <Link to="/reset" className="next">下一步</Link> */}
                        <Button type="primary" htmlType="submit" className="login-form-button">下一步</Button>
                    </FormItem>
                </BgComponent>
            </div>
        );
    }
}

export default GetValidCode;


