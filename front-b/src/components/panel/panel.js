import React, { Component } from 'react';
import { Row, Col,Icon} from 'antd';
import { withRouter } from 'react-router-dom';

import './panel.less';

// const panelData = {
//     pathname:'任务 /计划任务',
//     title:'计划任务',
//     desc:'项目管理人员通过在这里计划周任务和月任务的方式，进行产值任务规划；'
//     isBack:false  是否显示返回按钮
// }

{/* <Panel panelData={panelData} /> */}


@withRouter
class Panel extends Component {
    goBack = () => {
        // console.log(this.props)
        this.props.history.go(-1);
    }

    render() {
        return (
            <div id="panel">
                {/* <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>{this.props.panelData.pathname}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row> */}
                <Row className="user-info">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        {
                            <div>
                                {
                                    this.props.panelData.isBack ? <Icon type="arrow-left" theme="outlined" className="back" onClick={this.goBack} /> :null
                                }
                                
                                <p className="title">{this.props.panelData.title}</p>
                                {/* <label>{this.props.panelData.desc}</label> */}
                            </div>
                        }

                    </Col>
                </Row>
                {/* <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <p className="user-title">用户管理，是指提供平台所有用户的管理列表功能。</p>
                    </Col>
                </Row> */}
            </div>

        )
    }

}

export default Panel;