import React, { Component } from 'react';
import { Card, Table, DatePicker,  Button, Select,  Row, Col } from 'antd';
import Utils from '@/utils/utils';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Panel from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';

import './manage-dispute.less';

import { getDisputeList,jurisdictionStatus} from './store/actions';

const Option = Select.Option;
const { RangePicker } = DatePicker;

@connect(
    state => ({
        isJurisdiction: state.manageDispute.isJurisdiction,
        dispute: state.manageDispute,
        topbar: state.topbar,
    }), { getDisputeList,jurisdictionStatus }
)
class ManageDispute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeValKey: 1,
        };
        this.columns = [
            { title: '纠纷标题', dataIndex: 'disputesTitle' },
            { title: '纠纷内容', dataIndex: 'disputesContent' },
            { title: '当事人', dataIndex: 'dName' },
            { title: '处理人', dataIndex: 'approveName' },
            { title: '处理时间', dataIndex: 'approveTime' },
            { title: '处理结果', dataIndex: 'sucesState' },
            {
                title: '操作', render: (record) => (<Link to={{
                    pathname: `/project/disputeDetail/${record.id}`,
                }}>查看</Link>)
            },
        ];
        const { proId } = this.props.topbar;
        this.params = {
            pageSize: 10,
            pageNum: 1,
            isUpload: false,
            type: 0,
            startTime: '',
            endTime: '',
            approveState: '5',
            proId,
        }
    }
    //装载完成，在render之后调用
    componentDidMount () {
        this.request();
    }
    componentWillUnmount(){
        this.props.jurisdictionStatus(false);
    }
    request = () => {
        this.params.pageNum = 1;
        this.props.getDisputeList(this.params);
    }
    // 最近30天
    handleMonthClick = () => {
        this.setState({
            timeValKey: new Date()
        });
        this.params.type = 0;
        this.params.startTime = '';
        this.params.endTime = '';
        this.request();
    }
    // 时间选择
    handleTimeChange = (data, dateString) => {
        this.params.type = 1;
        this.params.startTime = dateString[0];
        this.params.endTime = dateString[1];
        this.request();
    };
    // 状态筛选
    handleDisputeChange = value => {
        this.params.approveState = value;
        this.request();
    }
    // 导出
    handleExportClick = () => {
        const { type, pageNum, startTime, endTime, approveState, pageSize } = this.params;
        const _path = window.systemBaseConfig.urldown;
        let url = `${_path}sdpbusiness/task/selectDisputesList?isUpload=true&type=${type}&startTime=${startTime}&endTime=${endTime}&approveState=${approveState}&pageNum=${pageNum}&pageSize=${pageSize}`;
        window.open(url);
    };
    render () {
        const panelData = { title: '纠纷管理', isBack: false };
        const { isJurisdiction } = this.props;
        const { type } = this.params;
        const { disputeListInfo } = this.props.dispute;
        const safeRows = disputeListInfo.rows ? disputeListInfo.rows : [];
        return (
            <div>
                 {isJurisdiction !== true
                    ? <React.Fragment>
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    <Row className="search_filter">
                        <Col className="tableSelFilter" span={2}>
                            {type === 0 ? <Button
                                style={{ width: '100%' }}
                                type="primary"
                                onClick={this.handleMonthClick}
                            >最近30天</Button> : <Button
                                style={{ width: '100%' }}
                                onClick={this.handleMonthClick}
                            >最近30天</Button>}

                        </Col>

                        <Col className="tableSelFilter" span={4}>
                            <RangePicker
                                style={{ width: '100%' }}
                                placeholder={['开始日期', '结束日期']}
                                onChange={this.handleTimeChange}
                                key={this.state.timeValKey}
                            />
                        </Col>


                        <Col className="tableSelFilter" span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="请选择处理状态"
                                onChange={this.handleDisputeChange}
                            >
                                <Option value="5" key="5">全部</Option>
                                <Option value="1" key="1">待处理</Option>
                                <Option value="2" key="2">已处理</Option>
                                <Option value="3" key="3">拒绝处理</Option>
                            </Select>
                        </Col>
                        <Col span={2} className="tableSelFilter">
                            <Button
                                style={{ width: '100%' }}
                                onClick={this.handleExportClick}
                            >导出</Button>
                        </Col>


                    </Row>
                    <Table
                        locale={{ emptyText: '暂无数据' }}
                        columns={this.columns}
                        rowKey="id"
                        pagination={Utils.pagination(
                            {
                                ...disputeListInfo,
                                pageNum: this.params.pageNum,
                            },
                            current => {
                                this.params.pageNum = current;
                                this.request();
                            }
                        )}
                        dataSource={safeRows}
                    />
                </Card>  </React.Fragment>
                    : <Unauthorized />}
            </div>
        )
    }
}
export default ManageDispute;