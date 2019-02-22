
import React, { PureComponent } from 'react';
import { Card,Divider } from 'antd';
import { connect } from 'react-redux';

import './project-data-info.less';

import Utils from '@/utils/utils';

import { dataAction } from './store/actions';

import PanelComp from '@/components/panel/panel';
import EchartsProInfo from './project-data-info-echarts';


@connect(
    state => ({
        proDataInfo: state.get('proDataInfo')
    }),
    { dataAction }
)

class ProjectDataInfo extends PureComponent {
    constructor(props) {
        super(props);
        const urlParams = this.props.location.search;
        const urlObj = Utils.linkParamsToObj(urlParams);
        const { proId, proName } = urlObj;
        this.params = {
            id: proId,
            proName,
            staffObj: {
                title: "人员组成",
                centerTxt: "合计",
                labelName1: '管理人员人数',
                labelName2: '班组数量',
                labelName3: '工人人数',
            },
            attendanceObj: {
                title: "今日考勤信息",
                centerTxt: "出勤率",
                labelName1: '实到岗',
                labelName2: '未到岗',
                labelName3: '场内人数',
            },
            threeObj: {
                title: "三级教育信息",
                centerTxt: "合格率",
                labelName1: '工人总数量',
                labelName2: '已通过',
                labelName3: '未通过',
            },
            disputeObj: {
                title: "纠纷处理",
                centerTxt: "处理率",
                labelName1: '纠纷总数量',
                labelName2: '已处理',
                labelName3: '未处理',
            },
            safetyInspectionObj: {
                title: "安全巡检",
                centerTxt: "处理率",
                labelName1: '事件总数量',
                labelName2: '已处理',
                labelName3: '未处理',
            },
            qualityInspectionObj: {
                title: "质量巡检",
                centerTxt: "处理率",
                labelName1: '事件总数量',
                labelName2: '已处理',
                labelName3: '未处理',
            },
        }
    }
    componentDidMount () {
        const { id } = this.params;
        this.props.dataAction({ proId: id });
    }
    render () {
        const infoData = this.props.proDataInfo.get('infoData').toJS();
        // 数据组装
        const { staffMap, attendanceMap, threeMap, disputeMap, safetyInspectionMap, qualityInspectionMap } = infoData;
        const { staffObj,proName, attendanceObj, threeObj, disputeObj, safetyInspectionObj, qualityInspectionObj } = this.params;
        // panel数据
        const panelData = {
            title: `${proName}数据信息`,
            isBack: true,
        };
        // 人员组成and今日考勤数据
        let staffAndAttend = new Array();
        if (staffMap && attendanceMap) {
            staffAndAttend = [
                {
                    ...staffMap, ...staffObj,
                    labelValue1: staffMap.manageStaffCount,
                    labelValue2: staffMap.teamCount,
                    labelValue3: staffMap.workerCount,
                    formmarter: staffMap.totalCount,
                },
                {
                    ...attendanceMap,
                    ...attendanceObj,
                    labelValue1: attendanceMap.posted,
                    labelValue2: attendanceMap.noposted,
                    labelValue3: attendanceMap.factoryNumber,
                    formmarter: attendanceMap.postRate,
                }
            ];
        }
        // 三级教育and纠纷处理
        let threeAndDispute = new Array();
        if (threeMap && disputeMap) {
            threeAndDispute = [
                {
                    ...threeMap, ...threeObj,
                    labelValue1: threeMap.educationCount,
                    labelValue2: threeMap.educationDeonCount,
                    labelValue3: threeMap.educationFaultCount,
                    formmarter: threeMap.educationRate,
                },
                {
                    ...disputeMap,
                    ...disputeObj,
                    labelValue1: disputeMap.disputeCount,
                    labelValue2: disputeMap.disputeDoneCount,
                    labelValue3: disputeMap.disputeFaultCount,
                    formmarter: disputeMap.disputeDoneRate,
                }
            ];
        }
        // 安全巡检and质量巡检
        let safeAndAQuality = new Array();
        if (safetyInspectionMap && qualityInspectionMap) {
            safeAndAQuality = [
                {
                    ...safetyInspectionMap, ...safetyInspectionObj,
                    labelValue1: safetyInspectionMap.safetyInspectionCount,
                    labelValue2: safetyInspectionMap.safetyInspectionSucceed,
                    labelValue3: safetyInspectionMap.safetyInspectionFault,
                    formmarter: safetyInspectionMap.safetyInspectionRate,
                },
                {
                    ...qualityInspectionMap,
                    ...qualityInspectionObj,
                    labelValue1: qualityInspectionMap.qualityInspectionCount,
                    labelValue2: qualityInspectionMap.qualityInspectionSucceed,
                    labelValue3: qualityInspectionMap.qualityInspectionFault,
                    formmarter: qualityInspectionMap.qualityInspectionRate,
                }
            ];
        }

        return (
            <div className="proDataInfo">
                <PanelComp panelData={panelData} />
                <Card style={{ margin: 24,padding:24 }}>
                    <EchartsProInfo pinDataList={staffAndAttend} />
                    < Divider />
                    <EchartsProInfo pinDataList={threeAndDispute} />
                    < Divider />
                    <EchartsProInfo pinDataList={safeAndAQuality} />
                </Card>

            </div>

        );
    }


}

export default ProjectDataInfo;