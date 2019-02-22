import React, { PureComponent } from 'react';
import { Form, Button, Card, Row, Col, Input, Table, DatePicker } from 'antd';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';
import { Unauthorized } from '@/container/error-page/not-found-page';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './record.less';
import Utils from '@/utils/utils';
import { loginListAction, } from './store/actions.js';

const { RangePicker } = DatePicker;
moment.locale('zh-cn');  //设置日期中文格式

@Form.create()
@connect(
    state => ({
        loginRecord: state.get('loginRecord')
    }),
    { loginListAction }
)
class LoginRecord extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            { title: '账号', dataIndex: 'userCode' },
            { title: '手机号', dataIndex: 'userPhone' },
            { title: '姓名', dataIndex: 'userName' },
            {
                title: '企业名称', dataIndex: 'companyName', render: (text, record) => {
                    return record.companyName ? text : '--';
                }
            },
            { title: '登录时间', dataIndex: 'createTime', },
        ];
        this.params = {
            pageNum: 1,
            pageSize: 10,
            userPhone: '',
            userName: '',
            beginTime: '',
            endTime: '',
        }
    }
    // 组建渲染之后调用  只调用一次
    componentDidMount () {
        this.request();
    }
    request = () => {
        // 获取用户列表
        this.props.loginListAction(this.params);
    }
    // 不可选今天之后的日期
    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }
    // 筛选
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.params.userPhone = values.userPhone;
                this.params.userName = Utils.replaceSpace(values.userName);
                this.params.pageNum = 1;
                this.request();
            }
        });
    }
    // 获取时间
    onChange = (date, dateString) => {
        this.params.beginTime = dateString[0];
        this.params.endTime = dateString[1];
    }
    render () {
        const panelData = {
            title: '登录记录',
        };
        const { getFieldDecorator } = this.props.form;
        const recordData = this.props.loginRecord.get('recordData');
        const tableList = recordData.rows;
        const isJur = this.props.loginRecord.get('isJur');
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 18 },
            },
        };
        return (
            <React.Fragment>
                {!isJur ?
                    <div className="loginRecord">
                        <Panel panelData={panelData} />
                        <Card bordered={false} style={{ margin: 24 }}>
                            <Row>

                                <Form onSubmit={this.handleSubmit}>
                                    <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="手机号"
                                        >
                                            {getFieldDecorator('userPhone', {
                                                rules: [
                                                    { validator: Utils.validFhone }
                                                ],
                                            })(
                                                <Input placeholder='请输入完整手机号' maxLength={11} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="姓名"
                                        >
                                            {getFieldDecorator('userName', {
                                                rules: [
                                                    { validator: Utils.validSpace },
                                                ],
                                            })(
                                                <Input placeholder='请输入姓名' maxLength={8} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="登录时间"
                                        >
                                            {getFieldDecorator('loginTime', {
                                                rules: [],
                                            })(
                                                <RangePicker
                                                    format="YYYY-MM-DD"
                                                    disabledDate={this.disabledDate}
                                                    onChange={this.onChange} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item {...formItemLayout}>
                                            <Button type="primary" htmlType="submit">查询</Button>
                                        </Form.Item>
                                    </Col>

                                </Form>

                            </Row>
                            <Table
                                className='tableStyle'
                                locale={{ emptyText: '暂无数据' }}
                                rowKey="id"
                                dataSource={tableList}
                                columns={this.columns}
                                pagination={
                                    Utils.pagination({ ...recordData, pageNum: this.params.pageNum }, (current) => {
                                        this.params.pageNum = current;
                                        this.props.loginListAction(this.params);
                                    })
                                }
                            />
                        </Card>
                    </div>
                    : <Unauthorized />}
            </React.Fragment>
        );
    }
}


export default LoginRecord;






