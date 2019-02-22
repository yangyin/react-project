import React, { Component } from "react";
import { Card, Modal, Input, Form, Button } from "antd";
import Utils from '@/utils/utils';
import { connect } from 'react-redux';

import Panel from '@/components/panel/panel';
import ComDisputeInfo from './view/compInfo';
import './manage-disputeDetail.less';
import { getDisputeDetail,getDisputeAudit } from './store/actions';

const { TextArea } = Input;

@Form.create()
@connect(state => ({
    dispute: state.manageDispute,
}), { getDisputeDetail,getDisputeAudit }
)
class DisputeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        const {id} = this.props.match.params;
        this.params={
            id:id,
            type:1, // 3-拒绝 1-同意
            handleNote:'',
        }
    }
    //装载完成，在render之后调用
    componentDidMount () {
        this.request();
    }
    request = () => {
        const {id}=this.params;
        this.props.getDisputeDetail({id});
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
                this.audit('3');
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
        this.params.type=auditType;
        this.props.getDisputeAudit(this.params);
    }
    render () {
        const panelData = { title: '纠纷管理详情', isBack: true };
        const { disputeDetail } = this.props.dispute;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="disputeDetailCon">
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    <ComDisputeInfo dataInfo={disputeDetail} />
                    {disputeDetail.isApprove != 'yes' ? <div className='btnBox'>
                        <Button type="danger" size='large' onClick={this.showModal}>不处理</Button>
                        <Button type="primary" size='large' onClick={() => this.audit('1')}>已处理</Button>
                    </div> : null}
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
export default DisputeDetail;