import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Radio, DatePicker, Select, Table ,notification } from 'antd';
import Utils from './../../../utils/utils';
import moment from 'moment';
import 'moment/locale/zh-cn';

import { getPacketListAction } from './store/actions';

import PanelComp from '@/components/panel/panel';
import CommissionSetting from './views/setting';
import { Unauthorized } from '@/container/error-page/not-found-page';
import Cookies from 'js-cookie';

import './packet.less';
moment.locale('zh-cn');


const panelData = {
    title: '红包营销'
};
const { RangePicker } = DatePicker;
const Option = Select.Option;
const columns = [
    { title: '支付单号', dataIndex: 'paymentOrder' },
    { title: '账户识别码', dataIndex: 'accountIdentNumber' },
    { title: '账户名称', dataIndex: 'accountName' },
    { title: '发放佣金（元）', dataIndex: 'commissionNum' },
    { title: '发放时间', dataIndex: 'outTime' },
    { title: '类型', dataIndex: 'typeName' },
    {
        title: '状态', dataIndex: 'issueState', render: (text) => {
            return text === '0' ? <span className="red">失败</span> : '成功';
        }
    },
]


@connect(
    state => ({
        packet: state.get('packet')
    }),
    { getPacketListAction }
)
class Packet extends PureComponent {
    state = {
        radioValue: 'a', //a:佣金报表  b: 发放报表  c:佣金设置
        rangValue: [],//日期
        selectValue: ''
    }
    params = {
        reportType: 1,// 0发放报表 1 佣金报表 2: 佣金设置
        lastdays: 1,//0未点击 1 点击
        state: 2,//0 待申请/发放失败 1 待发放/成功 2 所有转态
        pageSize: 10,
        pageNum: 1,
        beginTime: '',
        endTime: ''
    }
    columns = [
        { title: '推广账户', dataIndex: 'promoteAccount' },
        { title: '推广有效用户（人）', dataIndex: 'promoteEffectiveUserNum' },
        { title: '可申请佣金（元）', dataIndex: 'applicableCommission' },
        { title: '累积发放佣金（元）', dataIndex: 'accumulatedCommissions' },
        { title: '上一次发放时间', dataIndex: 'lastTime' },
        { title: '申请时间', dataIndex: 'applyTime' },
        { title: '申请佣金额（元）', dataIndex: 'pendingCommission' },
        {
            title: '状态', dataIndex: 'issueState', render: (text) => {
                return text === '0' ? <span>待申请</span> : <span className="red">待发放</span>;
            }
        },
        {
            title: '操作', render: (text, record) => {
                return record.text === '0' ? <span>待发放</span> : <span className="green">发放</span>;
            }
        },
    ]

    componentDidMount() {
        this.props.getPacketListAction(this.params);
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                selectValue: selectedRows
            })
        }
    };
    render() {
        const commission = this.props.packet.get('commissionList').toJS();
        const isJur = this.props.packet.get('isJur');
        const grant = this.props.packet.get('grant').toJS();

        const { reportType, pageNum } = this.params;
        let key = reportType === 1 ? commission : grant;

        return (
            <React.Fragment>
                {
                    !isJur
                        ? <div className="packet-page">
                            <PanelComp panelData={panelData} />
                            <Card title={this.cardHeader()} style={{ margin: 24 }}>
                                {reportType !== 2 &&
                                    <Table
                                        rowKey={reportType === 1 ? 'userId' : 'paymentOrder'}
                                        columns={reportType === 1 ? this.columns : columns}
                                        dataSource={key.rows}
                                        rowSelection={reportType === 1 ? this.rowSelection : null}
                                        pagination={
                                            Utils.pagination({ total: key.total, pageNum }, (data) => {
                                                this.params.pageNum = data;
                                                this.props.getPacketListAction(this.params);
                                            })
                                        }
                                    />}
                                {reportType === 2 &&
                                    <CommissionSetting />
                                }
                            </Card>
                        </div>
                        : <Unauthorized />
                }
            </React.Fragment>

        );
    }
    onRadioChange = (e) => {
        const { value } = e.target;

        if (value === 'a') {
            this.params.reportType = 1;
            this.params.pageNum = 1;
            this.props.getPacketListAction(this.params);
        } else if (value === 'b') {
            this.params.reportType = 0;
            this.params.pageNum = 1;
            this.props.getPacketListAction(this.params);
        } else {
            this.params.reportType = 2;
        }
        this.setState({
            radioValue: value
        })
    }
    cardHeader = () => {
        const { reportType } = this.params;
        const { rangValue } = this.state;
        return (
            <div>
                <Radio.Group defaultValue="a" buttonStyle="solid" onChange={this.onRadioChange}>
                    <Radio.Button value="a">佣金报表</Radio.Button>
                    <Radio.Button value="b">发放报表</Radio.Button>
                    <Radio.Button value="c">佣金设置</Radio.Button>
                </Radio.Group>
                <span className={`group ${reportType === 2 ? 'hide' : null}`} >
                    <Button onClick={this.handleLastDays}>最近30天</Button>
                    <RangePicker 
                        className="rang-picker" 
                        value={rangValue} 
                        format="YYYY-MM-DD" 
                        onChange={this.onPickerChange}  
                        disabledDate={(current) => { // 最近3个月可选时间段
                            return !(current < moment().endOf('day') && current > moment().subtract(3, 'month'));
                        }}
                    />
                    <Select defaultValue={this.params.state} style={{ width: 150 }}>
                        <Option value={2}>所有状态</Option>
                        <Option value={1}>待发放</Option>
                        <Option value={0}>待申请</Option>
                    </Select>
                    <Button className="filter" onClick={this.onFilter}>筛选</Button>
                </span>
                <Button className={reportType !== 1 ? 'hide' : null} onClick={this.handleDownload}>批量导出</Button>
            </div>
        )
    }
    onPickerChange = (date, dateString) => {
        this.params.beginTime = dateString[0];
        this.params.endTime = dateString[1];
        this.params.lastdays = 0;
        this.setState({
            rangValue: date
        })
    }
    //最近30天
    handleLastDays = () => {
        this.params.lastdays = 1;
        this.params.beginTime = '';
        this.params.endTime = '';
        this.props.getPacketListAction(this.params);
        this.setState({
            rangValue: []
        })
    }
    //筛选
    onFilter = () => {
        this.props.getPacketListAction(this.params);
    }
    // 批量导出
    handleDownload = (e) => {
        const { selectValue } = this.state;
        const _path = window.systemBaseConfig.urldown;
        const authorization = Cookies.get('authorization');
        let downloadListStr = '';
        if (selectValue && Array.isArray(selectValue)) {
            selectValue.forEach((value, index) => {
                index === 0 ? downloadListStr += `${value.userId}` : downloadListStr += `,${value.userId}`;
                
            })
            const url = `${_path}sdpprevail/commission/batchDownloadReport?reportType=1&downloadListStr=${downloadListStr}&authorization=${authorization}`;
            window.open(url);
        } else {
            notification.warning({
                message:'提示',
                description:'请选择数据后下载',
                key:'1'
            })
        }

    }
}

export default Packet;