import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';

import './dashboard-panel.less';

// const panelData = {
//     pathname:'系统面板',
//     showProject: true
// }

@connect(
    state => state.home
)
class DashboardPanel extends Component {
    render() {
        const { userName, userHeadPortrait} = this.props.userInfo;
        return (
            <div className="dashboard-header">
                <Card bordered={false}>
                    <Row>
                        <Col span={12}>
                            <p className="dashboard-title">{this.props.panelData.pathname}</p>
                            <div className="account-info">
                                <span className="account-photo"><img src={userHeadPortrait ?  userHeadPortrait : require('../../images/default_avatar.png')} alt=""/></span>
                                <span className="account-text">你好，{userName}，祝你开心每一天！</span>
                            </div>
                        </Col>
                        <Col span={12}>
                            {
                                this.props.panelData.showProject
                                ?
                                <div className="account-projects">
                                    <Row>
                                        <Col span={6}></Col>
                                        <Col span={6}>
                                            <div className="account-title">参与项目数量</div>
                                            <div className="account-number">{this.props.panelData.datas.proNum}</div>
                                            <hr className="hr"/>
                                        </Col>
                                        <Col span={6}>
                                            <div className="account-title">企业班组数量</div>
                                            <div className="account-number">{this.props.panelData.datas.team}</div>
                                            <hr className="hr"/>
                                        </Col>
                                        <Col span={6}>
                                            <div className="account-title">员工数量</div>
                                            <div className="account-number">{this.props.panelData.datas.employ}</div>
                                            <hr className="hr"/>
                                        </Col>
                                    </Row>
                                </div>
                                :
                                null
                            }
                        </Col>
                    </Row>
                </Card>    
            </div>
        )
    }

}

export default DashboardPanel;