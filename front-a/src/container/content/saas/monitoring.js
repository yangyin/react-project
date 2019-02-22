import React , { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Row, Col, Select, Input, Card } from 'antd';

import './saas.less';
import Panel from '@/components/panel/panel';
import { saasMonitoringAction, jurisdictionStatus } from './store/actions';
import { Unauthorized } from '@/container/error-page/not-found-page';
import Utils from '@/utils/utils';

const Option = Select.Option;
const Search = Input.Search;
    
const columns = [{
    title: '设备编号',
    dataIndex: 'hardwareCode',
    key: 'hardwareCode'
}, {
    title: '设备机器码',
    dataIndex: 'hardwareMachineCode',
    key: 'hardwareMachineCode',
}, {
    title: '使用企业',
    dataIndex: 'companyName',
    key: 'companyName',
}, {
    title: '应用项目',
    key: 'proName',
    dataIndex: 'proName'
}, {
    title: '状态',
    key: 'hardwareStateName',
    dataIndex: 'hardwareStateName',
    render: (text) => {
        let textColor;
        if (text === '空闲') {
            textColor = {
                color: 'green'
            }
        } else if (text === '失联'){
            textColor = {
                color: 'red'
            }
        }
        return (
            <span>
                <p style={textColor}>{text}</p>
            </span>
        )
    }
}, {
    title: '内存(储)状态',
    key: 'memoryState',
    dataIndex: 'memoryState',
    render: (text) => (
        <span>
            <p>{text ? text : '-'}</p>
        </span>
    )
}, {
    title: '断开次数(24h)',
    key: 'breakNumber',
    dataIndex: 'breakNumber',
    render: (text) => (
        <span>
            <p>{text ? text : '-'}</p>
        </span>
    )
}, {
    title: '操作',
    key: 'hardwareId',
    render: (text, record) => (
        <span>
            <a href="javascript:;" style={{color: 'gray', cursor: 'default'}}>详情</a>
        </span>
    )
}];

@connect(
    state => ({
        saas: state.get('saas')
    }),
    { saasMonitoringAction, jurisdictionStatus }
)
class Saas extends React.PureComponent {
    constructor(props) {
        super(props);
        this.params = {
            pageNum: 1,
            pageSize: 10,
            memoryState: '',
            hardwareState: '',
            queryStr: ''
        }       
    }

    render() {
        const panelData = {
            title: '硬件监控',
        };
        const isJurisdiction = this.props.saas.get('isJurisdiction');
        const hardwareMonitorList = this.props.saas.get('hardwareMonitorList') || {};
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24}}>
                    <div className="filter-box">
                        <Row>
                            <Col span={16}>
                                <Select 
                                    defaultValue="设备状态"
                                    onChange={this.handleEquipmentStuChange}
                                >
                                    <Option value="">全部</Option>
                                    <Option value="A">失联</Option>
                                    <Option value="E">空闲</Option>
                                    <Option value="B">正常</Option>
                                </Select>
                                <Select 
                                    defaultValue="存储状态"
                                    onChange={this.handleStorageStuChange}
                                >
                                    <Option value="">全部</Option>
                                    <Option value="available">可用</Option>
                                    <Option value="notUse">不可用</Option>
                                </Select>
                            </Col>
                            <Col span={8} style={{ textAlign: 'right' }}>
                            <Search
                                placeholder="请输入设备编号查询"
                                onSearch={this.handleSearch}
                                style={{ width: 380 }}
                            />
                            </Col>
                        </Row>
                    </div>
                    <Table 
                        columns={columns} 
                        dataSource={hardwareMonitorList.rows} 
                        rowKey="hardwareId"
                        locale={{emptyText: '暂无数据'}}
                        pagination={
                            Utils.pagination({...hardwareMonitorList, pageNum: this.params.pageNum },(current) =>{
                                this.params.pageNum =current;
                                this.props.saasMonitoringAction(this.params);
                            })
                        }
                    />
                </Card>
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    componentDidMount () {
        // 获取注册硬件列表
        this.props.saasMonitoringAction(this.params);
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    // 设备状态切换
    handleEquipmentStuChange = (value) => {
        this.params.hardwareState = value;
        this.params.pageNum = 1;
        // 获取注册硬件列表
        this.props.saasMonitoringAction(this.params);
    }
    // 存储状态切换
    handleStorageStuChange = (value) => {
        this.params.memoryState = value;
        this.params.pageNum = 1;
        // 获取注册硬件列表
        this.props.saasMonitoringAction(this.params);
    }
    // 硬件设备搜索查询
    handleSearch = (value) => {
        this.params.queryStr = value.replace(/\s+/g, '');
        this.params.pageNum = 1;
        // 获取注册硬件列表
        this.props.saasMonitoringAction(this.params);
    }
}


export default Saas;


