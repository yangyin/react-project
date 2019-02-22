import React, { Component } from 'react';
import { Row, Col, Card, } from 'antd';
import { connect } from 'react-redux';

import Panel from '../../../components/panel/panel';
import EchartsPieCom from '@/components/echartsPie/echartsPie';
import SubPieInfo from '@/components/subPieInfo/subPieInfo';
import SubPieList from '@/components/subPieList/subPieList';
import { Unauthorized } from '@/container/error-page/not-found-page';

import { getEducationInfoAction, jurisdictionStatus } from './store/action';


@connect(
    state => ({
        topbar: state.topbar,
        eduInfo: state.eduInfoRender
    }), { getEducationInfoAction, jurisdictionStatus }
)
class EducationInfo extends Component {
    constructor(props) {
        super(props);
        this.params = {
            proId: '',
        }
    }
    componentDidMount () {
        this.request();
        console.log('饼状图里的数据');
    }
    componentWillUnmount () {
        this.props.jurisdictionStatus(false);
    }
    request = () => {
        const { proId } = this.props.topbar;
        this.params.proId = proId;

        const params = {
            proId
        };
        this.props.getEducationInfoAction(params);
    }
    render () {
        const { eduInfo } = this.props.eduInfo;
        const { proName } = this.props.topbar;
        const { isJurisdiction } = this.props;
        let { threeEducionInfo, threeEducionInfoTeamListMap } = eduInfo;
        threeEducionInfo = threeEducionInfo ? threeEducionInfo : {};
        threeEducionInfoTeamListMap = threeEducionInfoTeamListMap ? threeEducionInfoTeamListMap : [];
        const panelData = {
            title: `${proName}三级教育信息`,
            isBack: false,
        }
        const pieData = {
            title: '三级教育',
            centerTxt: '合格率',
            formmarter: threeEducionInfo.threeCountResult ? `${threeEducionInfo.threeCountResult}%` : `0%`,
            showData: [
                // { value: threeEducionInfo.totalUser ? threeEducionInfo.totalUser : 0, name: '工人总数量' },
                { value: threeEducionInfo.noPassUser ? threeEducionInfo.noPassUser : 0, name: '未通过' },
                { value: threeEducionInfo.passUser ? threeEducionInfo.passUser : 0, name: '已通过'},
            ],
            color:['#c23531','#61a0a8']
        }
        // 饼状图右边相关数据
        const subPieInfo = [
            { value: threeEducionInfo.passUser ? threeEducionInfo.passUser : 0, name: '已通过', pathname: '', color: '#61a0a8' },
            { value: threeEducionInfo.noPassUser ? threeEducionInfo.noPassUser : 0, name: '未通过', pathname: '', color: '#c23531' },
            { value: threeEducionInfo.totalUser ? threeEducionInfo.totalUser : 0, name: '工人总数量', pathname: '', color: '#2f4554' },
        ];

        // 下方列表
        const resAttendace = threeEducionInfoTeamListMap.map(v => {
            v.labelValue1 = v.sus;
            v.labelValue2 = v.fal;
            v.labelValue3 = v.susOdds ? `${v.susOdds}` : '0%';
            return v;
        })
        const subListData = {
            subList: resAttendace,
            labelNames: ['已通过', '未通过', '通过率'],
            pathname: '/project/eduDetailRes',
        };
        return (
            <div className="attendance">
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card
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

export default EducationInfo;