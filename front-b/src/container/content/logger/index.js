import React, { Component } from 'react';
import { Button, DatePicker, Table, Card, Row, Col } from 'antd';

import Utils from '@/utils/utils';
import { connect } from 'react-redux';

import Panel from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';

import '@/container/content/manage-dispute/manage-dispute.less';

import { getLoggerListAction, jurisdictionStatus } from './store/actions';

const { RangePicker } = DatePicker;
@connect(
    state => ({
        logger: state.logger
    }), { getLoggerListAction, jurisdictionStatus }
)
class Logger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeValKey: 1,
            buttonStyle: 0
        };
        this.columns = [
            { title: '时间', dataIndex: 'createTime', width: 200 },
            { title: '操作人', dataIndex: 'userName' },
            { title: '类别', dataIndex: 'systemSource' },
            { title: '日志内容', dataIndex: 'functionName' },
        ];
        this.params = {
            pageNum: 1,
            pageSize: 10,
            type: 0, // 0-最近一个月 1代表时间选择
            param: "y87VPvwADQTIZgl8bbb",
            startTime: '',
            endTime: ''
        };
    }
    //装载完成，在render之后调用
    componentDidMount () {
        this.request();
    }
    componentWillUnmount () {
        this.props.jurisdictionStatus(false);
    }
    request = () => {
        this.params.pageNum = 1;
        this.props.getLoggerListAction(this.params);
    }
    // 最近30天
    handleMonthClick = () => {
        this.setState({
            timeValKey: new Date(),
            buttonStyle: 0
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
        this.setState({
            buttonStyle: 1
        })
    };
    render () {
        const panelData = { title: '平台日志', isBack: false };
        const { isJurisdiction } = this.props;
        const { listInfo } = this.props.logger;
        const tableRows = listInfo.rows ? listInfo.rows : [];

        return (
            <div>
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card bordered={false} style={{ margin: 24 }}>
                            <Row className="search_filter">
                                <Col className="tableSelFilter" span={2}>
                                    {this.state.buttonStyle === 0 ? <Button
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
                            </Row>
                            <Table
                                locale={{ emptyText: '暂无数据' }}
                                columns={this.columns}
                                rowKey="id"
                                pagination={Utils.pagination(
                                    {
                                        ...listInfo,
                                        pageNum: this.params.pageNum,
                                    },
                                    current => {
                                        this.params.pageNum = current;
                                        this.request();
                                    }
                                )}
                                dataSource={tableRows}
                            />
                        </Card>
                    </React.Fragment>
                    : <Unauthorized />}
            </div>
        )
    }
}
export default Logger;

