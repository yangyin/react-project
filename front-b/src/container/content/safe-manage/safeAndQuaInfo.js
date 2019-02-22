import React, { Component } from 'react';
import { Row, Col, Avatar, Affix, Popover, Table, Button } from 'antd';

import Utils from '@/utils/utils';

import '@/container/content/safe-manage/safeAndQuaInfo.less';
class ComSafeAndQua extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { dataInfo } = this.props;
        const approveList = dataInfo.approveList?dataInfo.approveList:[];// 审核人
        const executorList = dataInfo.executorList?dataInfo.executorList:[];// 整改人
        const logs=dataInfo.logs?dataInfo.logs:[]; // 备注信息
        const picurlArr = [];
        const columns = [{
            title: '操作人',
            dataIndex: 'userName',
            width: 200,
        }, {
            title: '时间',
            dataIndex: 'createTime',
            width: 200,
        }, {
            title: '内容',
            dataIndex: 'handnote',
        }];
       
        return (
            <div className='safeAndQua'>
                <Row className='compact_detail'>
                    <Col span={12}>
                        <p><label>发起人：</label>{dataInfo.createByUserName ? dataInfo.createByUserName : '未填写'} </p>
                    </Col>
                    <Col span={12}>
                        <p><label>发起时间：</label> {dataInfo.createTime ? dataInfo.createTime : '未填写'}</p>
                    </Col>
                    <Col span={24}>
                        <p><label>检查情况：</label>{dataInfo.checkSituation ? dataInfo.checkSituation : '未填写'} </p>
                    </Col>
                    <Col span={24}>
                        <p><label>整改要求：</label>{dataInfo.checkContent ? dataInfo.checkContent : '未填写'} </p>
                    </Col>
                    {approveList.length > 0 ?
                        <Col span={24}>
                            <Row style={{marginBottom:20}}>
                                <Col span={4} className='labelTil' style={{ width: 80 }}>审核人：</Col>
                                <Col span={20}>
                                    <ul>
                                        {approveList.map((item,index) => (
                                            <li className='conText' key={index}>{item.userName} {item.userPhone}  <span className='auditTime'>审核时间：{item.handleTime}</span></li>
                                        ))}
                                    </ul>
                                </Col>
                            </Row>
                        </Col> : null
                    }
                    {executorList.length > 0 ?
                        <Col span={24}>
                            <Row style={{marginBottom:20}}>
                                <Col span={4} className='labelTil' style={{ width: 80 }}>整改人：</Col>
                                <Col span={20}>
                                    {executorList.map((item,index) => (
                                        <span className='conText' key={index}>{item.userName}  {item.userPhone}</span>
                                    ))}
                                </Col>
                            </Row>
                        </Col> : null}

                    <Col span={24}>
                        <p><label>完成整改：</label>{dataInfo.RectificationTime ? dataInfo.RectificationTime : '未填写'}</p>
                    </Col>

                    <Col span={24}>
                        <Row>
                            <Col span={4} style={{ width: 80 }}>
                                <label className='labelTil'>备注信息:</label>
                            </Col>
                            <Col span={20}>
                                <Table rowKey="createTime" size="small" showHeader={false} bordered pagination={false} columns={columns} dataSource={logs} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        {picurlArr.map((item, index) => <Popover key={index} content={<Avatar src={item} shape="square" size={200} icon="file-pdf" />}>
                            <Avatar style={{ marginRight: '24px' }} src={item} shape="square" size={120} icon="file-pdf" />
                        </Popover>)}
                    </Col>

                </Row>
            </div>
        )
    }
}
export default ComSafeAndQua;