import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Cookies from 'js-cookie';

import Bg from './../../components/bg';

import './login.less';
import { loginAction } from './store/actions';


const FormItem = Form.Item;


@connect(
    state => ({
        user: state.get('login')
    }),
    { loginAction }
)
@Form.create()
class Login extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.loginAction(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        
        const { hostname } = window.location;
        const authorization = Cookies.get('authorization', { domain: hostname.indexOf('.benefitech.cn') !== -1 ? '.benefitech.cn' : hostname });

        return (
            <React.Fragment>
                {authorization ? <Redirect to="/home" /> : null}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入账号/手机号' }],
                        })(
                            <Input autoComplete="off" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账户/手机号" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem className="forget">
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>自动登录</Checkbox>
                        )}
                        <Link to="/forgetValid" className="login-form-forgot">重设密码</Link>
                    </FormItem>
                    <FormItem>
                        <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </React.Fragment>
        );
    }
}


export default Bg(Login)('登录');


