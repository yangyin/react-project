import React, { Component } from 'react';
import { Card, Button, Row, Col, Icon, Modal, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserAuthInfo, submitAuthInfo, jurisdictionStatus,authStatus } from './store/action';
import Panel from '../../../components/panel/panel';
import UploadComp from '../../../components/upload';
import { Unauthorized } from './../../error-page/not-found-page';

import './real-name.less';

const FormItem = Form.Item;

@connect(
    state => state.realNameReducer,
    { getUserAuthInfo, submitAuthInfo, jurisdictionStatus,authStatus }
)
@Form.create()
class RealName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authModalVisible: false,
            pictures: []
        }

        this.props.getUserAuthInfo();
    }
    componentWillReceiveProps(nextProps) {
        
        const { isAuth } = nextProps;
        if(isAuth) {
            console.log(nextProps)
            this.props.authStatus(false);
            this.props.getUserAuthInfo();
        }
    }

    // 上传成功回调
    uploadSuccess = data => {

        this.setState((prevState) => ({
            pictures: [...prevState.pictures, ...data]
        }))
    };

    showAuthModal = () => {
        this.setState({
            authModalVisible: true
        })
    }

    handleCancel = () => {
        this.setState({
            authModalVisible: false
        })

        console.log(this.state)
    }

    handleOk = (e) => {
        this.handleSubmit();
    }

    handleSubmit = (e) => {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { pictures } = this.state;
                const plen = pictures.length;

                // if(plen < 2){
                //     notification.error({
                //         message: '提示',
                //         description:'请上传身份证正反面两张图片',
                //     });
                //     return;
                // }
                
                const opts = {
                    userName: values.realName,
                    userCard: values.idCard,
                    userCardUrl: plen === 1 ? pictures[0].url : '',
                    userCardBackUrl: plen === 2 ? pictures[1].url : ''
                }

                this.props.submitAuthInfo(opts);
                

                this.setState({
                    authModalVisible: false,
                });
            }
        });
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const { getFieldDecorator } = this.props.form;

        const panelData = { pathname: '账户 / 实名认证', title: '实名认证', desc: '实名认证，是您开通高级业务的必要条件。' }

        const { authModalVisible, pictures } = this.state;
        const { authinfo, isJurisdiction } = this.props;
        return (
            <div>
                { isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card
                            bordered={false} style={{ margin: 24 }}
                            className={authinfo && authinfo.isAuth !== '1' ? '' : 'hide'}
                        >
                            <Row>
                                <Col span={20}><div className="name-text"><Icon type="idcard" theme="outlined" style={{ fontSize: 30, color: 'red' }} />请您使用个人身份证进行实名认证。</div></Col>
                                <Col span={4} style={{ textAlign: 'right' }}><Button type="primary" onClick={this.showAuthModal}>马上实名认证</Button></Col>
                            </Row>
                        </Card>
                        <Card bordered={false} style={{ margin: 24 }} className={authinfo && authinfo.isAuth !== '1' ? 'hide' : ''}>
                            <div className="name-title">
                                <Icon type="check-circle" theme="twoTone" style={{ fontSize: 60, color: 'green' }} />
                                <span>你已经完成易工盛行系统个人实名认证</span>
                            </div>
                            <ul className="name-list">
                                <li>
                                    <div>认证姓名</div>
                                    <div className="name-info">{authinfo&&authinfo.userName && `*${authinfo.userName.substr(-(authinfo.userName.length -1))}`}</div>
                                </li>
                                <li>
                                    <div>证件号码</div>
                                    <div className="name-info">{authinfo&&authinfo.userCard && `${authinfo.userCard.substr(0, 8)}**********`}</div>
                                </li>
                            </ul>
                        </Card>
                        <Card bordered={false} style={{ margin: 24, padding: 32 }} className={authinfo && authinfo.isAuth !== '1' ? 'hide' : ''}>
                            <div>您可以开通企业或机构服务，体验更高级的业务管理</div>
                            <Link to="/corporateCertification" style={{ marginTop: 25 }} className="ant-btn">马上去企业认证</Link>
                        </Card>

                        <Modal title=" 实名认证"
                            visible={authModalVisible}
                            onCancel={this.handleCancel}
                            width={600}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" onClick={this.handleOk}>提交</Button>
                            ]}
                        >
                            <p>温馨提示：请使用真实有效身份证认证您的账户！</p>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                >
                                    {getFieldDecorator('realName', {
                                        rules: [{ required: true, message: '请输入真实姓名', whitespace: true }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                >
                                    {getFieldDecorator('idCard', {
                                        rules: [{ required: true, message: '请输入身份证号', whitespace: true }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="上传证件"
                                >
                                    <UploadComp
                                        maxlength={2}
                                        uploadSuccess={this.uploadSuccess}
                                        planPic={pictures}
                                    />
                                </FormItem>
                            </Form>
                        </Modal>
                    </React.Fragment>
                    : <Unauthorized />
                }

            </div>
        )
    }

}

export default RealName;