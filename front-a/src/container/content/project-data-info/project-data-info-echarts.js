
import React, { PureComponent } from 'react';
import { Row, Col, } from 'antd';
import ReactEcharts from 'echarts-for-react';

import './project-data-info.less';


class EchartsProInfo extends PureComponent {
    // 用户数据折线图参数配置
    getOption = (data) => {
        return {
            title: {
                text: `${data.centerTxt}\n\n${data.formmarter}`,
                textStyle: { color: '#333', fontSize: 16, fontWeight: 'bold' },
                top: 'middle',
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                show: false,
                top: 24,
            },

            series: [
                {
                    name: data.title,
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: data.labelValue1, name: data.labelName1 },
                        { value: data.labelValue2, name: data.labelName2 },
                        { value: data.labelValue3, name: data.labelName3 },
                    ]
                }
            ]
        }
    };
    render () {
        const { pinDataList } = this.props;
        return (
            <div>
                <Row>
                    {pinDataList.map((v, index) => {

                        return <Col key={index} span={12} className="viewBox">
                            <Row type="flex" justify="start" align="middle">
                                <Col span={6}>
                                <h2 className="pinTil">{v.title}</h2>
                                </Col>
                            </Row>
                            <Row type="flex" justify="start" align="middle">
                                <Col span={6}>
                                  
                                    <ReactEcharts
                                        option={this.getOption(v)}
                                        notMerge={true}
                                        lazyUpdate={true}
                                        onEvents={this.onEvents}
                                        style={{ width: '100%', height: '200px' }}
                                    /></Col>
                                <Col span={10}>
                                    <Row className="explain">
                                        <Col span={8}>
                                            <p>{v.labelName1}</p>
                                            <p style={{ color: '#c23531' }}>{v.labelValue1}</p>
                                        </Col>
                                        <Col span={8}>
                                            <p>{v.labelName2}</p>
                                            <p style={{ color: '#2f4554' }}>{v.labelValue2}</p>
                                        </Col>
                                        <Col span={8}>
                                            <p>{v.labelName3}</p>
                                            <p style={{ color: '#61a0a8' }}>{v.labelValue3}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    })}
                </Row>
            </div>

        );
    }


}

export default EchartsProInfo;