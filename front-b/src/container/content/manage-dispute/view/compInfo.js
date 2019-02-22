import React, { Component } from 'react';
import { Row, Col, Avatar, Affix, Popover, Table, Button } from 'antd';

import Utils from '@/utils/utils';

import '@/container/content/safe-manage/safeAndQuaInfo.less';
class ComDisputeInfo extends Component {
    render () {
        const { dataInfo } = this.props;
        const concernedList = dataInfo.concernedList ? dataInfo.concernedList : [];// 当事人
        const aporoveList = dataInfo.executorList ? dataInfo.aporoveList : [];// 处理人
        const logs = dataInfo.logs ? dataInfo.logs : []; // 备注信息
        const picurlArr = dataInfo.picList?dataInfo.picList:[];
        const columns = [{
            title: '操作人',
            dataIndex: 'userName',
            width: 200,
            render:(text,record)=>{
                return `${record.userName} ${record.userPhone}`
            }
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
                        <p><label>纠纷说明：</label>{dataInfo.disputesContent ? dataInfo.disputesContent : '未填写'} </p>
                    </Col>


                    {concernedList.length > 0 ?
                        <Col span={24}>
                            <Row style={{ marginBottom: 20 }}>
                                <Col span={4} className='labelTil' style={{ width: 80 }}>当事人：</Col>
                                <Col span={20}>
                                    {concernedList.map((item, index) => (
                                        <span className='conText' key={index}>{item.userName}  {item.userPhone}</span>
                                    ))}
                                </Col>
                            </Row>
                        </Col> : null}
                    {aporoveList.length > 0 ?
                        <Col span={24}>
                            <Row style={{ marginBottom: 20 }}>
                                <Col span={4} className='labelTil' style={{ width: 80 }}>处理人：</Col>
                                <Col span={20}>
                                    <ul>
                                        {aporoveList.map((item, index) => (
                                            <li className='conText' key={index}>{item.userName} {item.userPhone}  <span className='auditTime'>处理时间：{item.handleTime}</span></li>
                                        ))}
                                    </ul>
                                </Col>
                            </Row>
                        </Col> : null
                    }



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
export default ComDisputeInfo;