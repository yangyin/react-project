
import React, { Component } from "react";
import { Card, DatePicker, Form, Table, Button } from "antd";
import { Link } from 'react-router-dom';
import Utils from '@/utils/utils';
import { connect } from "react-redux";
import '@/container/content/employ-list/employ-list.less';

import Panel from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';

import { getCompactInfo, jurisdictionStatus } from './store/action.js';




const { RangePicker } = DatePicker;
@Form.create()
@connect(
    state => ({
        compact: state.compact,
    }), { getCompactInfo, jurisdictionStatus }
)
class Compact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyValue: 1,
            typeCode: 0,
        };
        this.params = {
            beginDate: '',
            endDate: '',
            typeCode: 0,
            pageNum: 1,
            pageSize: 10,
        };
        this.columns = [
            { title: '合同名称', dataIndex: 'contractName' },
            { title: '合同简称', dataIndex: 'contractShortName' },
            { title: '合同类型', dataIndex: 'dictionariesName' },
            { title: '甲方代表', dataIndex: 'representativeForA' },
            { title: '乙方代表', dataIndex: 'representativeForB' },
            { title: '签订日期', dataIndex: 'signDate' },
            {
                title: '操作', render: (record) => (
                    <Link to={{ pathname: `/project/contractDetail/${record.contractId}` }}>
                        详情
                    </Link>)
            },
        ];

    }
    componentDidMount () {
        this.request();
    }
    componentWillUnmount () {
        this.props.jurisdictionStatus(false);
    }
    request = () => {
        this.params.pageNum = 1;
        this.props.getCompactInfo(this.params);
    }
    handleTime = (date, dateString) => {
        this.params.beginDate = dateString[0];
        this.params.endDate = dateString[1];
        this.params.typeCode = 1;
        this.setState({
            typeCode: 1
        })
        this.request();
    }
    handleMonth = () => {
        this.setState({ keyValue: new Date() })
        this.params.typeCode = 0;
        this.params.beginDate = '';
        this.params.endDate = '';
        this.setState({
            typeCode: 0
        })
        this.request();
    }
    getFields = () => {
        const { typeCode } = this.state;
        return (
            <div className="clearfix employ_filter">
                <React.Fragment>
                    {typeCode === 0 ? <Button type="primary" onClick={this.handleMonth}>最近30天</Button> : <Button onClick={this.handleMonth}>最近30天</Button>}
                    <RangePicker key={this.state.keyValue} onChange={this.handleTime} />
                </React.Fragment>
            </div >

        )

    }
    render () {
        const panelData = { title: '合同管理' };
        const { pageNum } = this.params;
        const {isJurisdiction}=this.props;
        const { compactInfo } = this.props.compact;
        const compactRows = compactInfo.rows ? compactInfo.rows : [];
        return (
            <div className='attendDetail'>
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card bordered={false} style={{ margin: 24 }}>
                            {this.getFields()}
                            <Table
                                locale={{ emptyText: '暂无数据' }}
                                columns={this.columns}
                                rowKey="contractId"
                                pagination={Utils.pagination(
                                    {
                                        ...compactInfo,
                                        pageNum: pageNum,
                                    },
                                    current => {
                                        this.params.pageNum = current;
                                        this.request();
                                    }
                                )}
                                dataSource={compactRows}
                            />
                        </Card>
                    </React.Fragment>
                    : <Unauthorized />}
            </div>
        )
    }
}

export default Compact;