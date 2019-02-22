
import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

import './echartsPie.less';

class EchartsPie extends PureComponent {
    // 用户数据折线图参数配置
    getOption = (renderdata) => {
        return {
            title: {
                text: `${renderdata.centerTxt}\n\n${renderdata.formmarter}`,
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
                    name: renderdata.title,
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    // label: { // 饼图边的标签
                    //     normal: {
                    //         show: false,
                    //         position: 'center'
                    //     },
                    //     emphasis: {
                    //         show: false,
                    //         textStyle: {
                    //             fontSize: '18',
                    //             fontWeight: 'bold'
                    //         }
                    //     }
                    // },
                    // labelLine: {
                    //     normal: {
                    //         show: false
                    //     }
                    // },
                    data: renderdata.showData,
                    color: renderdata.color
                }
            ]
        }
    };
    render () {
        const { pieData } = this.props;
        // const pieData = {
        //     title: '考勤信息',
        //     centerTxt: '出勤率',
        //     formmarter: '59%',
        // showData: [
        //     { value: 10, name: '实到岗' },
        //     { value: 20, name: '未到岗' },
        //     { value: 30, name: '场内人数' }
        // ],
        // color:['#61a0a8','#2f4554','#c23531']
        // }
        return (
            <div className="echartPin">
                <ReactEcharts
                    option={this.getOption(pieData)}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '250px' }}
                />
            </div>
        )
    }

}

export default EchartsPie;