import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
// import 'echarts/lib/chart/line';
import { Select, DatePicker, Radio, Button, Card } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './user-data.less';
import { userDataChartsAction } from './store/actions';


const Option = Select.Option;
const { RangePicker } = DatePicker;
moment.locale('zh-cn');  //设置日期中文格式

@connect(
    state => ({
        userData: state.get('userData')
    }),
    { userDataChartsAction }
)
class DataCharts extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'add',
            // isDisabled: true, //最近30天按钮是否可点，
            name: '新增人数',
            dataName: [],
            datas: [],
            source: false,
            defaultDate: null,
            sourceValue: '' //默认值
        };
        this.params = {
            type: 'add',
            userSource: '',
            startTime: '',
            endTime: ''
        };
    }
    render() {
        const { mode, defaultDate, source, sourceValue } = this.state;
        return (
            <div>
                <Card bordered={false} style={{ margin: 24}}>
                    <div className='filter-box'>
                        <Radio.Group onChange={this.handleEchartsChange} value={mode} style={{ marginBottom: 8 }}>
                            <Radio.Button value="add" text='新增人数'>新增人数</Radio.Button>
                            <Radio.Button value="active" text='活动人数'>活动人数</Radio.Button>
                            <Radio.Button value="jzCount" text='实名人数'>实名人数</Radio.Button>
                            <Radio.Button value="total" text='累计人数'>累计人数</Radio.Button>
                        </Radio.Group>
                        <Button type="primary" onClick={this.handleThirtyDays} style={{marginLeft: 10}}>最近30天</Button>
                        <RangePicker
                            value={defaultDate}
                            onChange={this.handleDateChange}
                            style={{ margin: '0 10px'}}
                            disabledDate={(current) => { // 最近3个月可选时间段
                                return !(current < moment().endOf('day') && current > moment().subtract(3, 'month'));
                            }}
                        />
                        <span hidden={source}>
                            <Select
                                value={sourceValue}
                                onChange={this.handleTypeChange}
                            >
                                <Option value="">全部来源</Option>
                                <Option value="wx">微信登录</Option>
                                <Option value="C">APP注册</Option>
                                <Option value="umini">未知来源</Option>
                                <Option value="smallCound">小云图</Option>
                                <Option value="userRecruit">用工乐</Option>
                            </Select>
                        </span>
                    </div>
                    <div>
                        <ReactEcharts
                            option={this.getOption()} 
                            notMerge={true}
                            lazyUpdate={true}
                            onEvents={this.onEvents}
                            style={{width: '100%',height:'400px'}}
                        />
                    </div>
                </Card>
            </div>
        );
    }
    componentDidMount () {
        // 获取用户数据统计
        this.props.userDataChartsAction(this.params);
    }
    componentWillReceiveProps(nextProps) {
        const userDataCharts = this.props.userData.get('userDataCharts') || [];
        const newUserDataCharts = nextProps.userData.get('userDataCharts') || [];
        const { datas, dataName } = this.state;
        if ((datas.length < 1 && dataName.length < 1) || (JSON.stringify(newUserDataCharts) !== JSON.stringify(userDataCharts))) {
            let dataName = [], datas = [];
            newUserDataCharts.forEach((item, index) => {
                datas.push(item.addCount);
                dataName.push(item.dateTime);
            });
            this.setState({
                datas,
                dataName
            });
        }
    }
    // 切换类型展示用户数据统计-折线图
    handleEchartsChange = (e) => {
        const value = e.target.value;
        const name = e.target.text;
        this.params.type = value;
        this.setState({
            mode: value,
            source: value === 'active' ? true : false,
            name
        })
        if ( value === 'active') {
            this.params.userSource = '';
            this.setState({
                sourceValue: ''
            })
        }
        // 获取用户数据统计
        this.props.userDataChartsAction(this.params);
    }
    // 用户来源类型切换
    handleTypeChange = (value) => {
        this.params.userSource = value;
        this.setState({
            sourceValue: value
        });
        // 获取用户数据统计
        this.props.userDataChartsAction(this.params);
    }
    // 用户统计时间段
    handleDateChange = (e, data) => {
        this.params.startTime = data[0];
        this.params.endTime = data[1];
        // 选择时间段后最近30按钮可点击
        this.setState({
            defaultDate: [moment(data[0]), moment(data[1])]
        });
        // 获取用户数据统计
        this.props.userDataChartsAction(this.params);
    }
    // 最近30天
    handleThirtyDays = (e) => {
        this.params.startTime = '';
        this.params.endTime = '';
        // 选择时间段后最近30按钮可点击
        this.setState({
            defaultDate: null
        });
        // 获取用户数据统计
        this.props.userDataChartsAction(this.params);
        
    }
    // 用户数据折线图参数配置
    getOption = () => {
        const { datas, dataName, name } = this.state;
        return {
          title: {
            text: '用户数据趋势图'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:[name]
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : dataName
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name: name,
              type:'line',
              stack: '总量',
              areaStyle: {color: 'rgba(24, 144, 255, .4)'},
              lineStyle: {color: 'rgba(24, 144, 255, .5)'},
              itemStyle: {color: 'rgba(24, 144, 255, .8)'},
              data: datas
            }
          ]
        };
      };
   
}


export default DataCharts;


