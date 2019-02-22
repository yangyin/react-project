import React , { Component } from 'react';
import { Icon } from 'antd';

import './collapse.less';

class CollapaseComp extends Component {
    state = {
        isShowCont:false
    }

    handleOpen = () => {
        this.setState({
            isShowCont:!this.state.isShowCont
        })
    }

    render() {
    //    console.log(this.state.isShowCont)
       const {isShowCont} = this.state;
       const { headerNode } = this.props;
        return (
            <div className="collapse-comp">
               <div className="header">
                    <div className="left">{headerNode}</div>
                    <div className="right" onClick={this.handleOpen}>{isShowCont?'收起':'展开'} <Icon type="down" /></div>
               </div>
               <div className={`content ${isShowCont?'block':'hide'}`}>{this.props.children}</div>
            </div>
        )
    }



}

export default CollapaseComp;