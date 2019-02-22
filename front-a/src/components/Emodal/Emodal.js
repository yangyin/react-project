import React, { Component } from 'react';
import { Modal, Form, Row, Col, Input, Select, Button, notification, InputNumber, Cascader } from 'antd';
import { addressSelector } from '@/container/content/address/address';
import Utils from '@/utils/utils';

import { connect } from 'react-redux';
import { getProvinceAction, getValidCodeAction } from '@/core/common/actions';


const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
@connect(
    state => ({
        common: state.get('common'),
        address: addressSelector(state.get('common'))
    }),
    { getProvinceAction, getValidCodeAction }
)
class Emodal extends Component {
    constructor(props) {
        super(props);
        this.params = {
            urlValue: ''
        }
        this.state = {
            btnText: '获取验证码',
            timer: 60,
            discodeBtn: false,
        }
        this.clearInter = null;
    }
    componentWillUnmount(){
        this.clearInter= null;
    }
    /**
     * 获取验证码
     * tag  1-修改手机号  0银行账号、银行开户行
     * 
     */
    getValid = (tag) => {
        let tagType = tag === 'userPhone' ? 1 : 0;
        if (tagType === 0) { // 修改银行账号
            const modalData = this.props.modalData;
            const currentUserPhone = modalData[0].userPhone;
            let params = {};
            if (currentUserPhone) {
                if (tag === 'bankNo') {
                    params = {
                        userPhone: currentUserPhone,
                        option: '修改银行卡号',
                    }
                } else if (tag === 'openBank') {
                    params = {
                        userPhone: currentUserPhone,
                        option: '修改开户行',
                    }
                }
                console.log(params, '短信接口参数');
                this.props.getValidCodeAction(params);
                this.count();
            } else {
                notification.error({
                    message: '获取验证码失败',
                    description: '请提交手机号码',
                });
            }

        } else if (tagType === 1) { // 修改手机号
            this.props.form.validateFields(['userPhone'], (err, value) => {
                if (!err) {
                    const phoneParams = {
                        option: "更换手机号码",
                        userPhone: value.userPhone,
                    }
                    console.log(this.props.modalData, '请求短信接口参数集');
                    this.props.getValidCodeAction(phoneParams);
                    this.count();
                } else {
                    this.props.form.setFields({ userPhone: { errors: [new Error('请输入正确手机号码')] } });
                }
            })
        }
    }
    // 计算验证码发送倒计时
    count = () => {
        // if (!this.clearInter) {
        this.clearInter = setInterval(() => {
            this.setState((prevState) => {
                if (prevState.timer === 0) {
                    clearInterval(this.clearInter);
                    return {
                        btnText: '重新发送',
                        discodeBtn: false,
                        timer: 60
                    }
                } else {
                    return {
                        timer: prevState.timer - 1,
                        btnText: `倒计时${prevState.timer}s`,
                        discodeBtn: true
                    }
                }
            })
        }, 1000);
        // }

    }
    /**
     * 下拉选项
     * type:workType-
     * COMPANYTYPE 企业类型 擅长工种
     */
    renderOption = (item) => {
        return <Select placeholder={`请输入${item.label}`}>
            {item.options.map(v => {
                if (item.worktype === 'worktype') {
                    return <Option key={v.value}>{v.name}</Option>
                } else if (item.selectType === 'COMPANYTYPE') {
                    return <Option value={v.categoryId} key={v.categoryId}>{v.categoryValue}</Option>
                }
            }
            )}
        </Select>
    }
    bindCancel = () => {
        clearInterval(this.clearInter);
        this.clearInter = null;
        this.setState({
            btnText: '获取验证码',
            timer: 60,
            discodeBtn: false,
        })
        this.props.handleCancel();

    }
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                let addrParams = {};
                if (values.userAddr) {
                    const addr = values.userAddr;
                    addrParams = {
                        userAddrProvince: addr[0],
                        userAddrCity: addr[1],
                        userAddrArea: addr[2],
                        userAddr: values.addrDetail,
                    }
                    this.props.handleSubmit(addrParams);
                } else {
                    this.props.handleSubmit(values);
                }
                // console.log(values, 'form表单获取到的数据');
                this.bindCancel();
            }
        })
    }
    loadData = (selectedOptions) => {
        // console.log(selectedOptions);//数组里面装对象
        const targetOption = selectedOptions[selectedOptions.length - 1];// 对象
        this.props.getProvinceAction({ type: targetOption['key'], id: targetOption['regionValue'] });
    }
    getAddrChoose = (value) => {
        // console.log(value)
    }
    render () {
        const { visible, modalData } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div><Modal
                title="修改"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.bindCancel}
                destroyOnClose={true}
            >
                <Form className="login-form">
                    {modalData.map(item => (
                        item.type === 'INPUT' ? <FormItem key={item.tagName} {...formItemLayout}
                            label={item.label}>
                            {getFieldDecorator(`${item.tagName}`, {
                                initialValue: item.defaultValue,
                                rules: [
                                    { required: true, message: `${item.label}不能为空!` },
                                    { validator: item.rule }
                                ],
                            })(
                                <Input maxLength={item.maxlength} placeholder={`请输入${item.label}`} />
                            )}
                        </FormItem> : item.type === 'SELECT' ? <FormItem key={item.tagName} {...formItemLayout}
                            label={item.label}>
                            {getFieldDecorator(`${item.tagName}`, {
                                initialValue: item.defaultValue,
                                rules: [
                                    { required: true, message: `${item.label}不能为空!` },
                                    // { validator: '' }
                                ],
                            })(<Select placeholder={`请选择${item.label}`}>
                                {item.options.map(v => {
                                    if (item.worktype === 'worktype') {
                                        return <Option key={v.value}>{v.name}</Option>
                                    } else if (item.selectType === 'COMPANYTYPE') {
                                        return <Option value={v.categoryId} key={v.categoryId}>{v.categoryValue}</Option>
                                    }
                                }
                                )}
                            </Select>)}
                        </FormItem> : item.type === 'INPUTNUM' ? <FormItem key={item.tagName} {...formItemLayout}
                            label={item.label}>
                            {getFieldDecorator(`${item.tagName}`, {
                                // initialValue: item.defaultValue,
                                rules: [
                                    { required: true, message: `${item.label}不能为空!` },
                                ],
                            })(<Input style={{ width: '100%' }} maxLength={item.maxlenght} />)}
                        </FormItem> : item.type === 'ADDRESS' ?
                                        <div><FormItem key={item.tagName} {...formItemLayout}
                                            label={item.label}>
                                            {getFieldDecorator(`${item.tagName}`, {
                                                rules: [
                                                    { required: true, message: `${item.label}不能为空!` },
                                                ],
                                            })(<Cascader
                                                // defaultValue={["76H3y2o6sjHFYV1iFan","iDkcmHRhHleujZ5Eh3v","NKqVPVFkWAw9KidpMdj"]}
                                                key={item.tagName}
                                                options={item.options}
                                                onChange={this.getAddrChoose}
                                                loadData={this.loadData}
                                                placeholder='请选择'
                                                fieldNames={{ label: 'regionKey', value: 'regionValue' }}
                                                changeOnSelect
                                            />)}
                                        </FormItem>
                                            <FormItem key='addrDetail' {...formItemLayout}
                                                label='详细地址'>
                                                {getFieldDecorator('addrDetail', {
                                                    rules: [
                                                        { required: true, message: '详细地址不能为空!' },
                                                    ],
                                                })(<Input  style={{ width: '100%' }} maxLength={30} />)}
                                            </FormItem></div>
                                        : item.type === 'PHONECODE' ? <div><FormItem key={item.tagName} {...formItemLayout}
                                            label={item.label}>
                                            {getFieldDecorator(`${item.tagName}`, {
                                                initialValue: item.defaultValue,
                                                rules: [
                                                    { required: true, message: `${item.label}不能为空!` },
                                                    { validator: item.rule }
                                                ],
                                            })(<Input style={{ width: '100%' }} maxLength={item.maxlenght} />)}
                                        </FormItem><FormItem key='validCode' {...formItemLayout}
                                            label='验证码'>
                                                <Row>
                                                    <Col span={15}>
                                                        {getFieldDecorator('msgCode', {
                                                            initialValue: '',
                                                            rules: [
                                                                { required: true, message: `验证码不能为空!` },
                                                            ],
                                                        })(<Input style={{ width: '100%' }} maxLength={4} />)}
                                                    </Col>
                                                    <Col span={5}>
                                                        <Button style={{ marginLeft: 15 }} type="primary" disabled={this.state.discodeBtn} onClick={() => this.getValid(item.tagName)}>{this.state.btnText}</Button>
                                                    </Col>
                                                </Row>
                                            </FormItem></div> : null
                    ))
                    }

                </Form>
            </Modal>
            </div>
        )
    }
}
export default Emodal;

/**
 * modalData的数据格式
 */
/* let modalData = [{
    type: 'INPUT',
    label: '用户账号',
    rule: '',
    tagName: 'userName',
    defaultValue:'默认值'
}, {
    type: 'SELECT',
    label: '企业类型',
    rule: '',
    tagName: 'useraaaName',
    options: [{ name: '总包公司', value: 1 }, { name: '劳务公司', value: 2 }],
    defaultValue:'1'
    selectType：'' // 下拉类型
}]; */