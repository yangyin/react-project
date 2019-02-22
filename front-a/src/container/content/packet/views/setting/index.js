import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Input, Button, Col, Row, Radio,Icon,notification } from 'antd';

import SettingInput from './setting-input';

import { getSelectComissonAction,selectComissionDel ,selectComissionAdd, selectComissionUpdate,selectComissionUpdateSuc} from './../../store/actions';

import Utils from './../../../../../utils/utils';



const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};


@connect(
    state => ({
        packet: state.get('packet')
    }),
    { getSelectComissonAction,selectComissionDel,selectComissionAdd ,selectComissionUpdate,selectComissionUpdateSuc}
)
@Form.create()
class CommissionSetting extends PureComponent {

    static getDerivedStateFromProps(nextProps) {
        if(nextProps.packet.get('isUpdate')) {
            nextProps.selectComissionUpdateSuc({status:false});
            nextProps.getSelectComissonAction();
        }

        return null;
    }
    constructor(props) {
        super(props);
        this.state = { }
        this.handleAdd = this.handleAdd.bind(this);
    }
    // state = {}

    //删除
    handleDel = (id) => {
        this.props.selectComissionDel(id);
        this.props.form.resetFields();
    }
    //新增
    handleAdd =() => {
        // commissionSectionId, commission, promotionNumber
        const settingData = this.props.packet.get('setting');
        const {getFieldValue } = this.props.form;
        const data = getFieldValue(`commissionSectionList[${settingData.get('commissionSectionList').size -1}]`);
        if(data.promotionNumber === null || data.commission === null) {
            notification['warning']({
                description:'请先填写后再新增',
                message:'提示',
                duration:2
            });
        } else {
            this.props.selectComissionAdd({commissionSectionId:new Date().getTime().toString(), commission:null, promotionNumber:null,key:1})
        }
        // let len = settingData.get('commissionSectionList').filter(v => v.get('commissionSectionId') === '').size;
        // len === 0 ? 
        //     this.props.selectComissionAdd({commissionSectionId:'', commission:null, promotionNumber:null}) : 
        //     notification['warning']({
        //         description:'请先填写后再新增',
        //         message:'提示',
        //         duration:2
        //     });
    }

    

    componentDidMount() {
        this.props.packet.get('setting').size === 0 && this.props.getSelectComissonAction();
    }
    render() {
        const settingData = this.props.packet.get('setting').toJS();
        const { getFieldDecorator } = this.props.form;
        const formItems = JSON.stringify(settingData) !== '{}' && settingData['commissionSectionList'].map((k, index) => (
            <FormItem
                {...formItemLayout}
                colon={false}
                required={false}
                label=" "
                key={k.commissionSectionId}
            >
                {getFieldDecorator(`commissionSectionList[${index}]`, {
                    validateTrigger: ['onChange'],
                    initialValue: k,
                    rules: [{validator:Utils.isvoid.bind(this,settingData['commissionSectionList'],k.commissionSectionId)}],
                })(
                    <SettingInput delete={this.handleDel} disabled={index === 0 ? true:false} />
                )}
            </FormItem>
        ))
        return (
            <Form onSubmit={this.onSubmit}>
                <Card title="推广佣金设置" style={{ marginBottom: 10 }}>
                    <FormItem
                        label="佣金计算方式"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('commissionMethod', {
                            initialValue: settingData.commissionMethod
                        })(
                            <RadioGroup>
                                <Radio value={1}>按金额发放</Radio>
                                {/* <Radio value={2}>按比例发放</Radio> */}
                            </RadioGroup>
                        )}
                    </FormItem>

                    <FormItem
                        label=" "
                        {...formItemLayout}
                        required={false}
                        colon={false}
                    >
                        <Row gutter={24}>
                            <Col span={6}>推广每满X人</Col>
                            <Col span={6}>设置佣金标准Y元</Col>
                        </Row>
                    </FormItem>
                    {formItems}
                    <FormItem
                        label=' '
                        {...formItemLayout}
                        colon={false}
                        required={false}
                    >   {

                        }
                        { (JSON.stringify(settingData) !== '{}' && settingData['commissionSectionList'].length ) < 5 ? <Button onClick={this.handleAdd} prefix={<Icon type="plus" />}>新增项</Button> : null}
                    </FormItem>
                </Card>
                <Card title="佣金提现设置" style={{ marginBottom: 10 }}>
                    <FormItem
                        label="默认提现最低额度"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('minAmount', {
                            rules: [{ required: true, message: '默认提现最低额度' }],
                            initialValue:settingData.minAmount
                        })(
                            <Input style={{ width: 100 }} />
                        )}
                    </FormItem>
                </Card>
                <Card title="注册推广激励设置" style={{ marginBottom: 10 }}>
                    <FormItem
                        label="是否启用直接发放红包给新注册账户"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('isPay', {
                            initialValue: settingData.isPay
                        })(
                            <RadioGroup>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        label="默认发放红包额度"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('defaultPayNum', {
                            rules: [{ required: true, message: '必填' }],
                            initialValue: settingData.defaultPayNum
                        })(
                            <Input style={{ width: 100 }} />
                        )}
                    </FormItem>
                </Card>
                <Button type="primary" htmlType="submit" className="login-form-button">更 新</Button>
            </Form>

        );
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                
                const  { id ,commissionSectionId} = this.props.packet.get('setting').toJS();
                const delList = this.props.packet.get('delList');
                const data = values.commissionSectionList.map(v => {
                    if(v.key) {
                        delete v.commissionSectionId;
                    }
                    return v;
                })
                const params = {...values,id ,commissionSectionId,commissionSectionListJosn:JSON.stringify(data),deleteSectionListJosn:JSON.stringify(delList)};
                delete params.commissionSectionList;
                this.props.selectComissionUpdate(params);
                this.props.form.resetFields()
            }
        });
    }
}

export default CommissionSetting;