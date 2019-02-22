import React, { PureComponent } from 'react';
import { Card, Avatar, Row, Col } from 'antd';

import './topBar.less';

// const topBarData = {
//     title:'我的账户',
//     userName:'',
//     headImg:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
// }

class TopBar extends PureComponent {
    render() {
        const { countPro } = this.props;
        return (
            <Card className='topBar' bordered={false}>
                <p className='topBar_til'>{this.props.topBarData.title}</p>
                <Row type="flex" align='middle'>
                    <Col span={1} style={{ width: 80 }}><Avatar size={64} icon="user" src={this.props.topBarData.headImg} /></Col>
                    <Col span={16}>
                        <p className='topBarUser'>{`您好，${this.props.topBarData.userName}，祝您开心每一天！`}</p>
                    </Col>
                    {countPro && <Col span={6}>
                        <div className='topBarRight'>
                            <div className="item">
                                <p>项目数量</p>
                                <label>{countPro.get('project')}</label>
                            </div>
                            <div className="item">
                                <p>班组数量</p>
                                <label>{countPro.get('team')}</label>
                            </div>
                            <div className="item">
                                <p>工人数量</p>
                                <label>{countPro.get('worker')}</label>
                            </div>
                        </div>
                    </Col>}
                </Row>
            </Card>
        )
    }

}
export default TopBar;