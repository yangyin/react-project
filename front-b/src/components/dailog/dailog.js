import React , { Component } from 'react';
import { Modal, Input, Select, Form, Row, Col, Button, Cascader, DatePicker  } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { oldAddressSelector } from '../../reselect/address';
import { getOldRegion } from '../../redux/address/action';
import { getWorkType, findWorkTypeList } from '../../redux/findField/actions';
import UploadComp from '../upload';
import { getValidCodeInfomation, validPhoneRegister } from '../../redux/user-common/actions';
import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY/MM';
moment.locale('zh-cn');  //设置日期中文格式

@connect(
    state => ({
        //basicDataReducer:state.basicDataReducer,
        infoManagementReducer: state.infoManagementReducer,
        address: oldAddressSelector(state.address),
        findField: state.findField,
        userCommon: state.userCommon
    }),
    { getOldRegion, getWorkType, findWorkTypeList, getValidCodeInfomation, validPhoneRegister }
)
@Form.create()
class Dailog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCont:false,
            address: this.props.address,
            btnText: '获取验证码',
            timer:60,
            discodeBtn: false,
            graduateTime: '',
            certificateUrl: []
        }
        this.flag = false;
    }
    componentDidMount() {
        const { workType, workTypeList } = this.props.findField;
        this.props.getOldRegion({type:1,id:1});
        workType.length === 0 && this.props.getWorkType();
        workTypeList.length === 0 && this.props.findWorkTypeList('JTGX');
    }
    
    // 电话号码根据输入是否有值设置flag控制验证码按钮是否可点
    handlePhone = (e) => {
        if (!e.target.value) {
            this.flag = true;
        } else {
            this.flag = false;
        }
        e.preventDefault();
        this.props.form.validateFields(['userPhone'],( err, values) => {
            if (!err) {
                this.props.validPhoneRegister({ phone: values.userPhone });
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        const { type, form, infoManagementReducer } = nextProps;
        let certificateUrl = [];
        if (type === 'certificateUrls'&&infoManagementReducer.infoList&&Array.isArray(infoManagementReducer.infoList.certificateUrls)) {
            infoManagementReducer.infoList.certificateUrls.map((item, i) => {
                certificateUrl.push({
                    url: item
                })
                return i;
            })
            this.setState({
                certificateUrl
            })
        }
        if(type === "userPhone" && !form.getFieldValue('userPhone') && this.flag) {
            this.setState({
                discodeBtn: true
            })
        } else {
            this.setState({
                discodeBtn: false
            })
        }
        
    }
    render() {
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        const { visible, title, type, defaultVal, form, address, findField } = this.props;
        const { getFieldDecorator } = form;
        const {  workType, workTypeList } = findField;
        const { discodeBtn, btnText, certificateUrl } = this.state;
        const { isPhoneRegister } = this.props.userCommon;
        let userAddress = '', userAddr = '', newDate = moment().format('YYYY/MM/DD');
        if (type === 'userAddress') {
            userAddress = [defaultVal[0],defaultVal[1],defaultVal[2]];
            userAddr = defaultVal[3];
        }
        if (type === 'graduateTime') {
            if (defaultVal){
                newDate = defaultVal
            } 
        }
        return (
            <Modal
                title={ title }
                width="550px"
                visible={ visible }
                onOk={this.handleOk}
                okText="确定"
                onCancel={this.handleCancel}
                cancelText="取消"
                >
                    <Form onSubmit={this.handleSubmit}>
                        {
                            type === "userNikeName" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="用户昵称"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('userNikeName', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '用户昵称必填!' }],
                                    })(
                                        <Input maxLength = '8' />
                                    )}
                                </FormItem>
                            : null
                        }
                        {
                            type === "userPhone" 
                            ? <div>
                                <FormItem
                                    {...formItemLayout}
                                    label="手机号码"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('userPhone', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '手机号码必填!' }, { validator: Utils.validFhone }],
                                    })(
                                        <Input maxLength = '11' placeholder="请输入手机号码" onBlur={this.handlePhone} />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="验证码"
                                    hasFeedback
                                    >
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            {getFieldDecorator('phoneCode', {
                                                rules: [{ required: true, message: '验证码必填!' }],
                                            })(
                                                <Input maxLength = '5' placeholder="请输入验证码" disabled={isPhoneRegister} />
                                            )}
                                        </Col>
                                        <Col span={12}>
                                            <Button type="primary" disabled={discodeBtn || isPhoneRegister} onClick={this.getValid}>{btnText}</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </div>
                            : null
                        }
                        {
                            type === "userAddress" 
                            ? <div>
                                <FormItem
                                    {...formItemLayout}
                                    label="省市区"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('userAddress', {
                                        initialValue: userAddress,
                                        rules: [{ required: true, message: '家庭地址必选!' }],
                                    })(
                                        <Cascader 
                                            // defaultValue={["76H3y2o6sjHFYV1iFan","iDkcmHRhHleujZ5Eh3v","NKqVPVFkWAw9KidpMdj"]}
                                            fieldNames={{ label: 'regionKey', value: 'regionValue' }}
                                            options={address} 
                                            placeholder="请选择家庭地址"
                                            loadData={this.loadData}
                                        />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="详细地址"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('userAddr', {
                                        initialValue: userAddr,
                                        rules: [{ required: true, message: '详细地址必填!' }],
                                    })(
                                        <Input maxLength = '20' />
                                    )}
                                </FormItem>
                            </div>
                            : null
                        }
                        {
                            type === "userWorkType" 
                            ? <FormItem
                                {...formItemLayout}
                                label="岗位或工种"
                                hasFeedback
                                >
                                {getFieldDecorator('userWorkType', {
                                    initialValue: defaultVal,
                                    rules: [{ required: true, message: '岗位或工种必选!' }],
                                })(
                                    <Select placeholder="请选择所擅长的工种" notFoundContent="暂无数据">
                                        <Option value="">请选择所擅长的工种</Option>
                                        {
                                            (workType && Array.isArray(workType)) 
                                            ? workType.map(subOpt => {
                                                return(
                                                    <Option key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                )
                                            })
                                            : null
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            : null
                        }
                        {
                            type === "education" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="最高学历"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('education', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '最高学历必填!' }],
                                    })(
                                        <Input maxLength = '20' />
                                    )}
                                </FormItem>
                            : null
                        } 
                        {
                            type === "graduateSchool" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="毕业学校"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('graduateSchool', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '毕业学校必填!' }],
                                    })(
                                        <Input maxLength = '20' />
                                    )}
                                </FormItem>
                            : null
                        }
                        {
                            type === "graduateTime" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="毕业时间"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('graduateTime', {
                                        initialValue: moment(newDate, monthFormat),
                                        rules: [{ required: true, message: '毕业时间必填!' }],
                                    })(
                                        <MonthPicker format={monthFormat} onChange={this.changeMonth} />
                                    )}
                                </FormItem>
                            : null
                        }
                        {
                            type === "major" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="所学专业"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('major', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '所学专业必填!' }],
                                    })(
                                        <Input maxLength = '20' />
                                    )}
                                </FormItem>
                            : null
                        }
                        {
                            type === "certificateUrls" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="相关证书"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('certificateUrls', {
                                        rules: [{ required: false, message: '相关证书必填!' }],
                                    })(
                                        <UploadComp 
                                            planPic={certificateUrl} 
                                            maxlength={6} 
                                            uploadSuccess={this.uploadSuccess} 
                                            removeFileImg={this.removeFileImg}
                                            type="ZH"
                                        />
                                    )}
                                </FormItem>
                            : null
                        }
                        {
                            type === "emergencyContactName" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="紧急联系人"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('emergencyContactName', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '紧急联系人必填!' }],
                                    })(
                                        <Input maxLength = '20' />
                                    )}
                                </FormItem>
                            : null
                        }
                        {
                            type === "emergencyContactPhone" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="紧急联系人手机号"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('emergencyContactPhone', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '紧急联系人手机号必填!' }],
                                    })(
                                        <Input maxLength = '20' />
                                    )}
                                </FormItem>
                            : null
                        }
                        {
                            type === "emergencyContactRelation" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="紧急联系人关系"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('emergencyContactRelation', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '紧急联系人关系必选!' }],
                                    })(
                                        <Select  placeholder="请选择联系人关系" notFoundContent="暂无数据">
                                            <Option value="">请选择联系人关系</Option>
                                            {
                                                (workTypeList && Array.isArray(workTypeList)) 
                                                ? workTypeList.map(subOpt => {
                                                    return(
                                                        <Option key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                    )
                                                })
                                                : null
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            : null
                        }
                        {
                            type === "teamOutPutValue" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="年产值"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('teamOutPutValue', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '年产值必填!' }],
                                    })(
                                        <Input maxLength = '20' />
                                    )}
                                </FormItem>
                            : null
                        }
                        {
                            type === "subNumYears" 
                            ?   <FormItem
                                    {...formItemLayout}
                                    label="专项分包年限"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('subNumYears', {
                                        initialValue: defaultVal,
                                        rules: [{ required: true, message: '专项分包年限必填!' }],
                                    })(
                                        <Input maxLength = '20' />
                                    )}
                                </FormItem>
                            : null
                        }
                    </Form>
            </Modal>
        )
    }
    handleOk = (e) => {
        this.flag = 0;
        this.handleSubmit(e);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { graduateTime, certificateUrl } = this.state;
                const newVal = Object.getOwnPropertyNames(values)[0];
                if ( newVal === 'graduateTime') {
                    this.props.handleUpdate({'graduateTime': graduateTime});
                } else if( newVal === 'certificateUrls'){
                    let newCertificate = [];
                    certificateUrl.map( (item) => {
                        newCertificate.push(item.url);
                        return ''
                    })
                    this.props.handleUpdate({'certificateUrls': newCertificate.join(',')});
                } else {
                    this.props.handleUpdate(values);
                }
                this.props.handleShow();
                this.props.form.resetFields();
            }
        });
    }
    handleCancel = (e) => {
        this.flag = 0;
        this.props.handleShow();
        this.props.form.resetFields();
    }
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        this.props.getOldRegion({type:targetOption['key'],id:targetOption['regionValue']});
    }
    //上传成功回调
    uploadSuccess = (data) => {
        const len = this.state.certificateUrl.length;
        const val = {url: data[0].url};
        this.setState({
            certificateUrl: [...this.state.certificateUrl, val]
        })
    }
    // 删除已上传图片
    removeFileImg = (file) => {
        this.setState(prevState =>({
            certificateUrl:prevState['certificateUrl'].filter(v=>v.url !== file)
        }))
        // this.props.removeFileImg();
    }
    // 获取验证码
    getValid = () => {
        const { infoList } = this.props.infoManagementReducer;
        this.props.form.validateFields(['userPhone'],(err,value) => {
            if(!err) {
                this.props.getValidCodeInfomation({
                    option: infoList.userPhone,
                    newUserPhone: value.userPhone
                });
                this.count();
            } else {
                this.props.form.setFields({userPhone:{errors:[new Error('请输入正确手机号码')]}});
            }
        })
    }
    // 计算验证码发送倒计时
    count () {
        const { isPhoneRegister } = this.props.userCommon;
        if(isPhoneRegister &&!this.clearInter) {
            this.clearInter = setInterval(() => {
                this.setState((prevState,props) => {
                    if(prevState.timer === 0) {
                        clearInterval(this.clearInter);
                        return {
                            btnText: '重新发送', 
                            discodeBtn: false
                        }
                    } else {
                        return {
                            timer:prevState.timer - 1,
                            btnText: `倒计时${prevState.timer}s`, 
                            discodeBtn: true
                        }                    
                    }
                })
            }, 1000);            
        }

    }
    // 修改月份
    changeMonth = (date, value) => {
        this.setState({
            graduateTime: value
        })
    }
}

Dailog.protoTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    defaultVal: PropTypes.string,
    handleUpdate: PropTypes.func
}
Dailog.defaultProps = {
    title: '修改'
}

export default Dailog;