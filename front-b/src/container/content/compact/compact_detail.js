
import React, { Component } from "react";
import { Card, Avatar, Row, Col, Form, Popover } from "antd";

import Panel from '@/components/panel/panel';

import { compactDetail } from './store/action.js';


import './compact.less';
import Utils from '@/utils/utils';
import { connect } from "react-redux";


@Form.create()
@connect(
    state => ({
        compact: state.compact,
    }), { compactDetail }
)
class CompactDetail extends Component {
    constructor(props) {
        super(props);

        this.contractId = props.match.params.contractId;


    }
    componentDidMount () {
        this.request();
    }
    request = () => {

        this.props.compactDetail({ contractId: this.contractId });
    }

    render () {
        const panelData = { title: '合同详情', isBack: true };
        const { compactDetail } = this.props.compact;
        const picurlString = compactDetail.picurl ? compactDetail.picurl : '';
        let picurlArr = [];
        if (picurlString) {
            picurlArr = picurlString.split(',');
        }
        console.log(picurlString,picurlArr);
        return (
            <div>
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    <Row className='compact_detail'>
                        <Col span={12}>
                            <p><label>合同名称：</label> {compactDetail.contractName ? compactDetail.contractName : '未填写'}</p>
                        </Col>
                        <Col span={12}>
                            <p><label>合同简称：</label> {compactDetail.contractShortName ? compactDetail.contractShortName : '未填写'}</p>
                        </Col>
                        <Col span={12}>
                            <p><label>合同类型：</label>{compactDetail.dictionariesName ? compactDetail.dictionariesName : '未填写'} </p>
                        </Col>
                        <Col span={12}>
                            <p><label>合同编号：</label>{compactDetail.contractNo ? compactDetail.contractNo : '未填写'} </p>
                        </Col>
                        <Col span={24}>
                            <p><label>合同金额：</label>{compactDetail.wages ? compactDetail.wages : '未填写'} </p>
                        </Col>
                        <Col span={12}>
                            <p><label>甲方代表：</label>{compactDetail.representativeForA ? compactDetail.representativeForA : '未填写'} </p>
                        </Col>
                        <Col span={12}>
                            <p><label>乙方代表：</label>{compactDetail.representativeForB ? compactDetail.representativeForB : '未填写'} </p>
                        </Col>
                        <Col span={12}>
                            <p><label>签订日期：</label>{compactDetail.signDate ? compactDetail.signDate : '未填写'} </p>
                        </Col>
                        <Col span={24}>
                            <p><label>备注说明：</label>{compactDetail.note ? compactDetail.note : '未填写'}</p>
                        </Col>
                        <Col span={24}>
                            {picurlArr.map((item,index) => <Popover key={index} content={<Avatar src={item} shape="square" size={200} icon="file-pdf" />}>
                                <Avatar style={{ marginRight: '24px' }} src={item} shape="square" size={120} icon="file-pdf" />
                            </Popover>)}

                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default CompactDetail;