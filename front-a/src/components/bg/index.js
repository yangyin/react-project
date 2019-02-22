import React, { PureComponent } from 'react';

import './bg.less';

export default (WrapperComponent) => (text) => class extends PureComponent {

    render() {
        return (
            <div className="bg-comp">
                <div className="bg-dailog">
                    <h1 className="title"><img src={require('./../../images/logo1.png')} alt="" />司空<span>v0.3.9</span></h1>
                    <p className="title-label">项目数据及用户管理的运营中心</p>
                    <p className="name">{text}</p>
                    <WrapperComponent />
                </div>
            </div>
        )
    }
}
