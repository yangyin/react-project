import React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, DatePicker, Button, Card } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Cookies from 'js-cookie';

import './user-data.less';
import Panel from '@/components/panel/panel';
import DataCharts from './user-data-echarts';
import { Unauthorized } from '@/container/error-page/not-found-page';
import { userDataAction, userDataChartsAction, userDataSourceAction, userDataCountsAction, userDataCommissionAction, jurisdictionStatus } from './store/actions';


const { RangePicker } = DatePicker;
moment.locale('zh-cn');  //设置日期中文格式

const columnsSource = [{
    title: '用户来源',
    dataIndex: 'source',
    key: 'source',
  }, {
    title: '前一天用户数量',
    dataIndex: 'dayCount',
    key: 'dayCount',
  }, {
    title: '前一天用户占比',
    dataIndex: 'dayOcc',
    key: 'dayOcc',
  }, {
    title: '近一周新增用户',
    dataIndex: 'weekCount',
    key: 'weekCount',
  }, {
    title: '近一周占比',
    dataIndex: 'weekOcc',
    key: 'weekOcc',
  }, {
    title: '近一月新增用户',
    dataIndex: 'monthCount',
    key: 'monthCount',
  }, {
    title: '近一月占比',
    dataIndex: 'monthOcc',
    key: 'monthOcc',
}];

const columnsCount = [{
    title: '时间',
    dataIndex: 'dateTime',
    key: 'dateTime',
  }, {
    title: '新增人数',
    dataIndex: 'addCount',
    key: 'addCount',
  }, {
    title: '活动人数',
    dataIndex: 'activeCount',
    key: 'activeCount',
  }, {
    title: '实名人数',
    dataIndex: 'jzCount',
    key: 'jzCount',
  }, {
    title: '累积人数',
    dataIndex: 'totalCount',
    key: 'totalCount',
}];

const columnsCommission = [{
    title: '推广排行',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    title: '分享次数',
    dataIndex: 'shareCount',
    key: 'shareCount',
  }, {
    title: '有效用户数',
    dataIndex: 'effectiveUser',
    key: 'effectiveUser',
  }, {
    title: '占比',
    dataIndex: 'occupation',
    key: 'occupation',
  }, {
    title: '佣金累积（元）',
    dataIndex: 'money',
    key: 'money',
}];

@connect(
    state => ({
        userData: state.get('userData')
    }),
    { userDataAction, userDataChartsAction, userDataSourceAction, userDataCountsAction, userDataCommissionAction, jurisdictionStatus }
)
class UserData extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'add',
            defaultDate1: null,
            defaultDate2: null,
            name: '新增人数',
            dataName: [],
            datas: []
        };
        this.paramsSource = {
            isUpload: false
        };
        this.paramsCount = {
            isUpload: false,
            type: 0,
            startTime: '',
            endTime: ''
        };
        this.paramsCommission = {
            isUpload: false,
            type: 0,
            startTime: '',
            endTime: ''
        };
    }
    render() {
        const panelData = { title: '用户数据' };
        const { defaultDate1, defaultDate2 } = this.state;
        const isJurisdiction = this.props.userData.get('isJurisdiction');
        const userData = this.props.userData.get('userData');
        const userDataSource = this.props.userData.get('userDataSource') || [];
        const userDataCount = this.props.userData.get('userDataCount') || [];
        const userDataCommission = this.props.userData.get('userDataCommission') || [];
        const totals = [{
            columns: columnsSource,
            results: Array.isArray(userDataSource) ? userDataSource : []
        },  {
            columns: columnsCount,
            results: Array.isArray(userDataCount) ? userDataCount.slice(0, 10) : []
        }, {
            columns: columnsCommission,
            results: Array.isArray(userDataCommission) ? userDataCommission : []
        }];
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24}}>
                        <div className='user-data-title'>
                            昨日关键指标
                        </div> 
                        <Row className='user-data-item user-data-key'>
                            <Col span={6}>
                                <p>新增人数</p>
                            </Col>
                            <Col span={6}>
                                <p>活动人数</p>
                            </Col>
                            <Col span={6}>
                                <p>实名人数</p>
                            </Col>
                            <Col span={6}>
                                <p>累积人数</p>
                            </Col>
                        </Row>
                        
                        {
                            userData.map((item, index) => {
                                let items = {}, text = '', dom = '';
                                switch (index) {
                                    case 0:
                                        items = item.one;
                                        break;
                                    case 1:
                                        items = item.day;
                                        text = '日';
                                        break;
                                    case 2:
                                        items = item.week;
                                        text = '周';
                                        break;
                                    case 3:
                                        items = item.month;
                                        text = '月';
                                        break;
                                    default:
                                        return false;
                                };
                                if (index === 0) {
                                    dom = <Row className='user-data-item' key={index}>
                                            <Col span={6}>
                                                <p className='user-data-number'>{text} {items ? items.addCount : 0 }</p>
                                            </Col>
                                            <Col span={6}>
                                                <p className='user-data-number'>{text} {items ? items.activeCount : 0 }</p>
                                            </Col>
                                            <Col span={6}>
                                                <p className='user-data-number'>{text} {items ? items.jzCount : 0 }</p>
                                            </Col>
                                            <Col span={6}>
                                                <p className='user-data-number'>{text} {items ? items.totalCount : 0 }</p>
                                            </Col>
                                        </Row>;
                                } else {
                                const addCount =  items.addCount.split(',');
                                const activeCount =  items.activeCount.split(',');
                                const jzCount =  items.jzCount.split(',');
                                const totalCount =  items.totalCount.split(',');
                                    dom = <Row className='user-data-item' key={index}>
                                            <Col span={6}>
                                                <p>{text} {addCount[0] === '0' ? '-' : (addCount[1]/addCount[0]*100).toFixed(2) + '%' }</p>
                                            </Col>
                                            <Col span={6}>
                                                <p>{text} {activeCount[0] === '0' ? '-' : (activeCount[1]/activeCount[0]*100).toFixed(2) + '%' }</p>
                                            </Col>
                                            <Col span={6}>
                                                <p>{text} {jzCount[0] === '0' ? '-' : (jzCount[1]/jzCount[0]*100).toFixed(2) + '%'}</p>
                                            </Col>
                                            <Col span={6}>
                                                <p>{text} {totalCount[0] === '0' ? '-' : (totalCount[1]/totalCount[0]*100).toFixed(2) + '%'}</p>
                                            </Col>
                                        </Row>;
                                }
                                return dom;
                            })
                        }
                    </Card>
                    {/* 用户统计折线图 */}
                    <DataCharts></DataCharts>
                    
                    {
                        totals.map((item, index) => {
                            let rowKey = 'source';
                            if (index === 1) {
                                rowKey = 'dateTime';
                            } else if(index === 2) {
                                rowKey = 'userId';
                            }
                            return (
                                <div key={index}>
                                    <Card bordered={false} style={{ margin: 24}}>
                                        <Row className='user-data-title'>
                                            <Col span={23}>
                                                {
                                                    index === 0 ? '用户来源统计' :
                                                    <div>
                                                        <RangePicker
                                                            value = {index === 1 ? defaultDate1 : defaultDate2 }
                                                            data-index={index}
                                                            onChange={ index === 1 ? this.handleCountDate : this.handleCommissionDate }
                                                            style={{ margin: '0 10px'}}
                                                            disabledDate={(current) => { // 最近3个月可选时间段
                                                                return !(current < moment().endOf('day') && current > moment().subtract(3, 'month'));
                                                            }} 
                                                        />
                                                        <Button type="primary" onClick={this.handleThirtyDaysTable} style={{marginLeft: 10}} data-index={index}>最近30天</Button>
                                                    </div>
                                                }
                                            </Col>
                                            <Col span={1} className='data-download' onClick={this.handleDownload} data-index={index}>下载数据</Col>
                                        </Row>
                                        <Table 
                                            dataSource={item.results} 
                                            columns={item.columns} 
                                            pagination={false}
                                            rowKey={rowKey}
                                            style={{marginTop: '20px'}} 
                                        />
                                    </Card>
                                </div>
                            );
                        })
                    }
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    componentDidMount () {
        // 获取昨日关键指标
        this.props.userDataAction();
        // 获取用户来源统计
        this.props.userDataSourceAction(this.paramsSource);
        // 获取用户数据统计
        this.props.userDataCountsAction(this.paramsCount);
        // 获取用户佣金统计
        this.props.userDataCommissionAction(this.paramsCommission);
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    // 最近30天
    handleThirtyDaysTable = (e) => {
        const index = e.currentTarget.dataset.index;
        if (index) {
            if(index === '1') {
                this.paramsCount = {
                    startTime: '',
                    endTime: '',
                    type: '0',
                    isUpload: false
                };
                this.setState({
                    defaultDate1: null
                });
                // 获取用户数据统计
                this.props.userDataCountsAction(this.paramsCount);
            } else if(index === '2') {
                this.paramsCommission = {
                    startTime: '',
                    endTime: '',
                    type: '0',
                    isUpload: false
                };
                this.setState({
                    defaultDate2: null
                });
                // 获取用户佣金统计
                this.props.userDataCommissionAction(this.paramsCommission);
            } 
        }
        
    }
    // 用户统计时间段
    handleCountDate = (e, data) => {
        this.paramsCount.startTime = data[0];
        this.paramsCount.endTime = data[1];
        this.paramsCount.type = 1;
        this.setState({
            defaultDate1: [moment(data[0]), moment(data[1])]
        });
        // 获取用户数据统计
        this.props.userDataCountsAction(this.paramsCount);
    }
    // 用户佣金
    handleCommissionDate = (e, data) => {
        this.paramsCommission.startTime = data[0];
        this.paramsCommission.endTime = data[1];
        this.paramsCommission.type = 1;
        this.setState({
            defaultDate2: [moment(data[0]), moment(data[1])]
        })
        // 获取用户数据统计
        this.props.userDataCommissionAction(this.paramsCommission);
    }
    // 下载数据
    handleDownload = (e) => {
        const index = e.currentTarget.dataset.index;
        const _path = window.systemBaseConfig.urldown;
        const authorization = Cookies.get('authorization');
        let url = '';
        switch(index) {
            case '0':
                url = `${_path}sdpprevail/user/findOccupationByUserSource?isUpload=true&authorization=${authorization}`;
                break;
            case '1':
                const { type, startTime, endTime } = this.paramsCount;
                url = `${_path}sdpprevail/user/findAllNestMonth?isUpload=true&type=${type}&startTime=${startTime}&endTime=${endTime}&authorization=${authorization}`;
                break;
            case '2':
                const typeComm = this.paramsCommission.type;
                const startTimeComm = this.paramsCommission.startTime;
                const endTimeComm  = this.paramsCommission.endTime;
                url = `${_path}sdpprevail/user/findAllNestMonthComissonList?isUpload=true&type=${typeComm}&startTime=${startTimeComm}&endTime=${endTimeComm}&authorization=${authorization}`;
                break;
            default:
                return;
        }
        window.open(url);

    }
   
}


export default UserData;


