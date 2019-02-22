
import React, { Component } from "react";
import { Card, Modal, Input, Form, Button } from "antd";
import Utils from '@/utils/utils';
import { connect } from "react-redux";

import '@/container/content/safe-manage/safe-manage.less';

import Panel from '@/components/panel/panel';
import ComSafeAndQua from '@/container/content/safe-manage/safeAndQuaInfo';

import { getDetailInfo, auditAction, updateSafeAndQua, updateAction } from './store/action.js';

const { TextArea } = Input;
@Form.create()
@connect(
    state => ({
        safeAndQua: state.safeManage,
    }), { getDetailInfo, auditAction, updateSafeAndQua, updateAction }
)
class SafeDetail extends Component {
    constructor(props) {
        super(props);
        const { location } = this.props;
        // 获取参数
        let recvId;
        let recvType;
        if (location.state) {
            sessionStorage.setItem('recvId', location.state.id);
            sessionStorage.setItem('recvType', location.state.type);
            recvId = location.state.id;
            recvType = location.state.type;
        } else {
            recvId = sessionStorage.getItem('recvId');
            recvType = sessionStorage.getItem('recvType');
        }
        this.state = {
            visible: false,
            pageType: recvType,
        }
        this.params = {
            id: recvId,
            type: '',
            wifd: '',
            agree: '1',// 1同意 0拒绝
            handleNote: '',
        }

    }
    componentDidMount () {
        this.request();
    }
    request = () => {
        const { id } = this.params
        this.props.getDetailInfo({ id });
    }
    componentWillReceiveProps (nextProps) {
        const { detailInfo } = this.props.safeAndQua;
        const nextDetailInfo = nextProps.safeAndQua.detailInfo;
        const isUpdate = nextProps.safeAndQua.isUpdate;
        this.params.wifd = nextDetailInfo.wifd;
        // if (JSON.stringify(detailInfo) != JSON.stringify(nextDetailInfo)) {
        //     this.request();
        // }
        if (isUpdate) {
            this.request();
            this.props.updateAction(false);
        }
    }
    // 组件销毁
    componentWillUnmount () {
        sessionStorage.removeItem('recvId');
        sessionStorage.removeItem('recvType');
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    // 拒绝理由
    handleOk = (e) => {

        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.params.handleNote = Utils.replaceSpace(values.handleNote);
                this.audit('1');
                this.setState({
                    visible: false,
                });
            }
        });

    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    // 审核
    audit = (auditType) => {
        const { pageType } = this.state;
        this.params.type = pageType;
        this.params.agree = auditType;
        this.props.auditAction(this.params);
    }
    // 整改
    updateSectity = () => {
        const { id } = this.params;
        this.props.updateSafeAndQua({ id })
    }
    render () {
        const { pageType } = this.state;
        const panelData = { title: pageType === 'AQ' ? '安全管理详情' : '质量管理详情', isBack: true };
        const { getFieldDecorator } = this.props.form;
        const { detailInfo } = this.props.safeAndQua;
        return (
            <div>
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    <ComSafeAndQua dataInfo={detailInfo} />
                    <div className='btnBox'>
                        {/* <Affix offsetBottom={100} > */}
                        {detailInfo.isAuditor === 1 ?
                            <React.Fragment>
                                <Button type="primary" size='large' onClick={() => this.audit('1')}>审核通过</Button>
                                <Button type="danger" size='large' onClick={this.showModal}>审核不通过</Button>
                            </React.Fragment> : null}

                        {detailInfo.isExecutor === 1 ? <Button size='large' onClick={() => this.updateSectity()}>已整改</Button> : null}
                        {/* </Affix> */}
                    </div>
                    <Modal
                        title="备注信息"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('handleNote', {
                                    rules: [{ required: true, message: '请输入备注信息！' },
                                    { validator: Utils.validSpace }],

                                })(
                                    <TextArea maxLength={100} placeholder="请输入拒绝理由" rows={4} />
                                )}
                            </Form.Item>
                        </Form>

                    </Modal>
                </Card>
            </div>
        )
    }
}

export default SafeDetail;
