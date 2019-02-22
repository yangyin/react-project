import React , { Component } from 'react';
import { Form } from 'antd';

import './bg.less';

const BgComponent = (WrapperComponent) => (text)=>class  extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const activeKey = this.props.activeKey;
            if(activeKey) {
                if(activeKey === '1') {
                    if( (err.name === undefined && err.password === undefined) ) {
                        this.props.handleSubmit(values);
                    }
                } else {
                    if( (err.userPhone === undefined && err.verifyCode === undefined) ) {
                        // console.log(values)
                        this.props.handleSubmit({name:values.userPhone,password:values.verifyCode,loginType:'bymobile'});
                    }
                }
            } else {
                if (!err) {
                    this.props.handleSubmit(values);
                }
            }
            
        });
    }
    render() {
        return(
            <div className="bg-common">     
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <div className="login-title">
                        <h1>
                            <img src={require('../../images/logo1.png')} alt="logo"/>
                            易工盛行 
                            <span>v1.0.0</span>
                        </h1>
                        {/* <p>{this.props.dataMsg.explain}</p> */}
                    </div>
                    {/* {this.props.children} */}
                    <WrapperComponent />
                </Form>     
                <div className="footer">
                    <p>帮助 隐私 条款</p>
                    <p>copyright © 四川大益科技有限公司</p>
                </div> 
            </div>
        )
    }
}
export default BgComponent;




