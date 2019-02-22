import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';
import { Icon, Button } from 'antd';

import Utils from './../../utils/utils';

import BgComponent from '../../components/login-common/bg';
import './register.less';


const dataMsg = {
    title: '账户手机号验证',
    explain: '这是一个工程项目效能管理系统',
}

class RegisterSuccess extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            email:this.props.location.state || '182316962@qq.com',
            emailUrl:Utils.findEmail(this.props.location.state || '182316962@qq.com')
        }
    }
    componentDidMount() {
        const { email } = this.state;
        !email ?<Redirect to="/login" />:null;
    }
    handleClick = () => {
        const { emailUrl } = this.state;
        window.open(emailUrl);
    }

    render() {
        const { email,emailUrl } = this.state;
        return (
            <BgComponent dataMsg={dataMsg}>
                <div className="register-success">
                    <Icon className="icon" type="check-circle" />
                    <h2>你的帐户：{ email } 注册成功</h2>
                    <p>激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。</p>
                    <div className="btn-group">
                        { emailUrl ? <Button type="primary" onClick={this.handleClick}>查看邮箱</Button>:null }
                        <Link className="back" to="/login">返回首页</Link>
                    </div>
                </div>
            </BgComponent>
        )
    }



}

export default RegisterSuccess;