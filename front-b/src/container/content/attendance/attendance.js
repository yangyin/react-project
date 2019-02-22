import React, { Component } from 'react';
import { Row, Col, Card, } from 'antd';
import { connect } from 'react-redux';
import Utils from '@/utils/utils';

import Panel from '../../../components/panel/panel';
import EchartsPieCom from '@/components/echartsPie/echartsPie';
import SubPieInfo from '@/components/subPieInfo/subPieInfo';
import SubPieList from '@/components/subPieList/subPieList';
import { Unauthorized } from '@/container/error-page/not-found-page';

import { getAttendList,jurisdictionStatus } from './store/action';


import './attendance.less';

@connect(
    state => ({
        attendance: state.attendanceList,
        topbar: state.topbar,
    }), { getAttendList,jurisdictionStatus }
)
class Attendance extends Component {
    constructor(props) {
        super(props);
        this.params = {
            proId: '',
            pageSize: 100,
            pageNum: 1,
            signTime: Utils.getCurrentData(),
        }
    }
    componentDidMount () {
        this.request();
    }
    componentWillUnmount(){
        this.props.jurisdictionStatus(false);
    }
    request = () => {
        const { proId } = this.props.topbar;
        this.params.proId = proId;
        const { pageSize, pageNum, signTime } = this.params;
        const params = {
            proId, pageSize, pageNum, signTime,
        };
        this.props.getAttendList(params);
    }
    render () {
        const { attendListObj } = this.props.attendance;
        const { proName, posted,rate, post, factoryNumber, signTime, teamSignList } = attendListObj;
        const { isJurisdiction } = this.props;
        const panelData = {
            title: `${proName}考勤信息`,
            isBack: false,
        };
        // 饼状图数据
        const pieData = {
            title: '考勤信息',
            centerTxt: '出勤率',
            formmarter: rate,
            showData: [
                { value: posted ? posted : 0, name: '实到岗' },
                { value: post || posted ? post - posted : 0, name: '未到岗' },
                { value: factoryNumber ? factoryNumber : 0, name: '场内人数' }
            ],
            color:['#61a0a8','#2f4554','#c23531']
        };

        // 饼状图右边相关数据
        const subPieInfo = [
            { value: posted ? posted : 0, name: '实到岗', pathname: '/project/attendanceInfo/A', color: '#61a0a8' },
            { value: post || posted ? post - posted : 0, name: '未到岗', pathname: '/project/attendanceInfo/B', color: '#2f4554' },
            { value: factoryNumber ? factoryNumber : 0, name: '场内人数', pathname: '/project/attendanceInfo/C', color: '#c23531' },
        ];

        // 下方列表
        const listAttendace = teamSignList ? teamSignList : [];
        const resAttendace = listAttendace.map(v => {
            v.labelValue1 = v.posted;
            v.labelValue2 = v.post - v.posted;
            v.labelValue3 = (v.post === 0 || v.posted === 0) ? `0%` : `${v.posted / v.post}%`;
            return v;
        });

        const subListData = {
            subList: resAttendace,
            labelNames: ['实到岗', '未到岗', '出勤率'],
            pathname: '/project/attendanceDetail',
        };
        return (
            <div className="attendance">
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card
                            title={signTime}
                            headStyle={{ background: '#f3f3f3' }}>
                            <Row>
                                <Col span={16}>
                                    <Row type="flex" justify="start" align="middle">
                                        <Col span={8}>
                                            <EchartsPieCom pieData={pieData} />
                                        </Col>
                                        <Col span={10}>
                                            <SubPieInfo subPieInfo={subPieInfo} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="attendView">
                                <SubPieList subListData={subListData} />
                            </div>
                        </Card>
                    </React.Fragment>
                    : <Unauthorized />}
            </div>
        )
    }
}

export default Attendance;