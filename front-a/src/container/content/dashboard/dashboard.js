import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Card, Row, Col, Icon, List } from 'antd';
import { Link } from 'react-router-dom';

import { getLoginUserInfoAction, getListActon, getbulletedListAction } from './store/actions';

import Topbar from '@/components/topBar/topBar';
import { Unauthorized } from '@/container/error-page/not-found-page';

import './dashboard.less';

const columns = [
    { title: '项目名称', dataIndex: 'proName' },
    {
        title: '项目地址', render: (text, record) => {
            const { proProvinceName, proCityName, proAreaName, proAddr } = record;
            return `${proProvinceName},${proCityName},${proAreaName},${proAddr}`;
        }
    },
    { title: '创建时间', dataIndex: 'createTime' },
    {
        title: '负责人', dataIndex: 'userName', render: (text) => {
            return '负责人：' + text;
        }
    },

]






@connect(
    state => ({
        dash: state.get('dash')
    }),
    { getLoginUserInfoAction, getListActon, getbulletedListAction }
)
class Dashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            topBarData: {
                title: '',
                headImg: '',
                userName: '',
                countPro: {}
            }
        }
    }
    componentDidMount() {
        const userInfo = this.props.dash.get('userInfo');
        if (!userInfo.get('userName')) {
            this.props.getLoginUserInfoAction();
            // this.props.getListActon({ pageNum: 1, pageSize: 10, order: 'asc' });
            this.props.getbulletedListAction();
        } else {
            this.setState({
                topBarData: {
                    headImg: userInfo.get('userHeadPortrait'),
                    userName: userInfo.get('userName'),
                    title: ''
                }
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        const userName = nextProps.dash.getIn(['userInfo', 'userName']);

        if (userName) {
            this.setState({
                topBarData: {
                    title: '',
                    headImg: nextProps.dash.getIn(['userInfo', 'userHeadPortrait']),
                    userName: userName
                }
            })
        }
    }
    render() {
        // const list = this.props.dash.get('list');
        const bulleted = this.props.dash.get('bulleted');//改版后数据
        const isJur = this.props.dash.get('isJur');
        console.log('***', bulleted.toJS());
        return (
            <React.Fragment>

                {!isJur ? <div className="dash-page">
                    {bulleted.size > 0 ?
                        <React.Fragment>
                            <Topbar topBarData={this.state.topBarData} countPro={bulleted.get('countPro')} />
                            <Row type="flex">
                                <Col span={16}>
                                    <Card style={{ margin: 24 }} bodyStyle={{ margin: 0 }} title={<div className="card-title-page"><p>信息缺失的项目</p><Link to="/project">查看更多</Link></div>}>
                                        {
                                            bulleted.get('prolist').map((v, i) => (
                                                <Card.Grid className="gridStyle" key={i}>
                                                    <div className="title"><Icon type="smile" /><label style={{ marginLeft: 10 }}>{v.get('proName')}</label></div>
                                                    <p className="addr">{v.get('proProvinceName')}{v.get('proCityName')}{v.get('proAreaName')}{v.get('proAddr')}</p>
                                                    <p className="addr">{v.get('proBeginTime')} {v.get('proEndTime') && `至 ${v.get('proEndTime')}`}</p>
                                                    <div className="footer"><label>负责人：{v.get('userName')}</label></div>
                                                </Card.Grid>
                                            ))
                                        }
                                    </Card>
                                    <Card style={{ margin: 24 }} bodyStyle={{ margin: 0 }} title={<div className="card-title-page"><p>异常硬件</p></div>}>
                                        {
                                            bulleted.get('hardwareList').map((v, i) => (
                                                <Card.Grid className="gridStyle" key={i}>
                                                    <div className="header">
                                                        <div><Icon type="smile" /><label style={{ marginLeft: 10 }}>{v.get('hardwareTypeName')}</label></div>
                                                        <div>{v.get('hardwareStateName')}</div>
                                                    </div>
                                                    <p className="addr">{v.get('proName')}</p>
                                                    <p className="addr">{v.get('installAddress')}</p>
                                                </Card.Grid>
                                            ))
                                        }
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card style={{ margin: 24 }} bodyStyle={{ margin: 0, height: 180 }} title={<div className="card-title-page"><p>最新项目</p></div>}>
                                        <List
                                            size="small"
                                            header={null}
                                            footer={null}
                                            dataSource={bulleted.get('nextProList')}
                                            renderItem={item => (<List.Item>
                                                <div className="right-card">
                                                    <div><Icon type="smile" />{item.get('proName')}</div>
                                                    <div>创建于{item.get('createTime').substring(0, 10)}</div>
                                                </div>
                                            </List.Item>)}
                                        />
                                    </Card>
                                    <Card style={{ margin: 24 }} bodyStyle={{ margin: 0, height: 180 }} title={<div className="card-title-page"><p>最新企业</p></div>}>
                                        <List
                                            size="small"
                                            header={null}
                                            footer={null}
                                            dataSource={bulleted.get('nextCompanyList')}
                                            renderItem={item => (<List.Item>
                                                <div className="right-card">
                                                    <div><Icon type="smile" />{item.get('companyName')}</div>
                                                    <div>创建于{item.get('createTime').substring(0, 10)}</div>
                                                </div>
                                            </List.Item>)}
                                        />
                                    </Card>
                                </Col>
                            </Row> </React.Fragment> : null}
                </div>
                    : <Unauthorized />}
            </React.Fragment>

        )
    }
}

export default Dashboard;






