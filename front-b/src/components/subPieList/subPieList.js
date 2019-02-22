
import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './subPieList.less';

/**
 * 考勤信息和三级教育信息公用列表数据
 * subList:具体数据
 * labelNames:标签名字
 * pathnames:跳转路由
 */
class SubPieList extends PureComponent {
    render () {
        const { subListData } = this.props;
        // const subListData = {
        //     subList: [{ teamName: 1111 }],
        //     labelNames: ['实到岗', '未到岗', '出勤率'],
        //     pathname: '/project/attendanceDetail', 
        // };
        const { subList, labelNames, pathname } = subListData;
        const dataList = subList ? subList : [];
        return (
            <div className="subPieList">
                <Row gutter={16}>
                    {dataList.map((v, index) => {
                        return <Link  key={index} to={{ pathname: pathname,state:{teamName:v.teamName,teamId:v.teamId}}}>
                            <Col span={9} className="listColBox">
                                <Row type="flex" justify="start" align="middle">
                                    <Col span={6} className="subTil">{v.teamName}</Col>
                                    <Col span={6} className="viewInfo">
                                        <p>{labelNames[0]}</p>
                                        <p>{v.labelValue1}</p>
                                    </Col>
                                    <Col span={6} className="viewInfo">

                                        <p>{labelNames[1]}</p>
                                        <p>{v.labelValue2}</p>
                                    </Col>
                                    <Col span={6} className="viewInfo">
                                        <p>{labelNames[2]}</p>
                                        <p>{v.labelValue3}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Link>
                    })}
                </Row>
            </div>
        )
    }

}

export default SubPieList;