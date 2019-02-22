import React from 'react';
import { connect } from 'react-redux';
import { Card, Avatar, Row, Col, Input, Modal, Form } from 'antd';


import Utils from './../../../utils/utils';
import './system-message.less';
import Panel from '../../../components/panel/panel';
import { getAppUserBusinessInfoNew,updateAdminPhone,updateStatusPhone } from './store/actions';

const panelData = { pathname: '设置/系统信息', title: '系统信息', desc: '系统信息，是当前企业系统的基本应用信息' }
const { Meta } = Card;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

@connect(
    state => state.companyBaseInfo,
    { getAppUserBusinessInfoNew,updateAdminPhone,updateStatusPhone }
)
@Form.create()
class SystemMessage extends React.PureComponent {
    state = {
        visible: false,
    }
    params = {
        inputValue: ''
    }
    handleEdit = (e) => {
        e.preventDefault();
        this.setState(() => ({
            visible: true
        }))
    }
    //提交,修改电话号码
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.updateAdminPhone({adminPhone:values});
            }
        });
    }
    handleCancel = () => {
        this.setState(() => ({
            visible:false
        }))
    }

    componentDidMount() {
        this.props.getAppUserBusinessInfoNew();
    }
    componentDidUpdate() {
        if(!this.props.companyBaseInfo) return;
        const { isUpdate } = this.props.companyBaseInfo;
        if(isUpdate === true) {
            this.props.updateStatusPhone(false);
            this.props.getAppUserBusinessInfoNew();
            this.setState(() =>({
                visible:false
            }))
        }
    }
    render() {
        const ColLayout = {
            xs: 24,
            sm: 12,
            md: 8,
            xl: 5,
            xxl: 4
        }
        const ColLayout2 = {
            xs: 24,
            sm: 12,
            md: 12
        }
        const ColLayout3 = {
            xs: 24,
            sm: 24,
            md: 12,
            xl: 12,
            xxl: 10
        }
        const { getFieldDecorator } = this.props.form;
        const { companyBaseInfo } = this.props;
        // const { inputValue } = this.state;
        return (
            <div className="syestem-message">
                <Panel panelData={panelData} />
                <Card
                    bordered={false}
                    style={{ margin: 24 }}
                    bodyStyle={{ padding: '12px 0' }}
                    title={<Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="企业信息"
                        description={<Row {...ColLayout2}><Col {...ColLayout}>认证编号</Col><Col>{companyBaseInfo&&companyBaseInfo.businessId}</Col></Row>}
                    />}
                >
                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>企业类别</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.companyCategory}</span></Col>
                            </Row>
                        </Col>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col  {...ColLayout}>企业银行账户</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.businessBankCode}</span></Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>企业类型</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.companyTypeName}</span></Col>
                            </Row>
                        </Col>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col  {...ColLayout}>企业银行账号</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.busineBankNo}</span></Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>企业名称</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.companyName}</span></Col>
                            </Row>
                        </Col>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col  {...ColLayout}>企业银行开户行</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.busineOpenBank}</span></Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>企业法人</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.legalPerson}</span></Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>认证有效期</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.endTime}</span></Col>
                            </Row>
                        </Col>
                    </Row>
                    <p className="card-footer">注：企业信息修改请通过商务函授权进行修改。</p>
                </Card>
                <Card bordered={false}
                    style={{ margin: 24 }}
                    bodyStyle={{ padding: '12px 0' }}
                    title={
                        <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="项目信息" />
                    }
                >
                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>项目数量</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.proNum}个</span></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>累计项目班组</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.proTeamNum}个</span></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>项目总造价</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.proPriceTotal}亿</span></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>累计参建单位</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.companyNum}家</span></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>竣工项目</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.projectEndNum}个</span></Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

                <Card bordered={false}
                    style={{ margin: 24 }}
                    bodyStyle={{ padding: '12px 0' }}
                    title={
                        <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="系统管理员" />
                    }
                >
                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>管理员姓名</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.userName}</span></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>管理员账户</Col>
                                <Col><span>{companyBaseInfo&&companyBaseInfo.userCode}</span></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col {...ColLayout2}>
                            <Row>
                                <Col style={{ marginLeft: 48 }} {...ColLayout}>手机号</Col>
                                <Col {...ColLayout3} style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ display: 'inline-block', width: '70%', marginRight: 10 }}>{companyBaseInfo&&companyBaseInfo.userPhone}</label>
                                    <a href="" onClick={this.handleEdit}>修改</a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <p className="card-footer warning">警告：修改管理员手机号会导致原手机号无法登陆系统！</p>
                </Card>
                <Modal
                    title="更换手机号"
                    visible={this.state.visible}
                    okText="提交"
                    cancelText="关闭"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem
                            label="手机号码"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入手机号码' }, { validator: Utils.validFhone }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default SystemMessage;