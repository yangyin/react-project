import React, { PureComponent } from 'react';
import { Button, Form, Select, Row, Col, Input, Icon, InputNumber, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { findDictionaryList, findWorkTypeList } from './../../../../../redux/findField/actions';
import { updateMark } from './../../store/action';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const formItemLayout1 = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const formItemLayout2 = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

@connect(
    state => ({
        field: state.findField
    }),
    { findDictionaryList, findWorkTypeList,updateMark }
)
@Form.create({
    // mapPropsToFields(props) {
    //     return Form.createFormField({
    //         ...props.data
    //     });
    // }
})
class ModalPlanTaskForm extends PureComponent {

    state = {
        endOpen: false,
        planBeginTime: null,
        planEndTime: null,
    }
    componentDidMount() {
        const { dictionaryList, workTypeList } = this.props.field;
        dictionaryList.length === 0 && this.props.findDictionaryList();
        workTypeList.length === 0 && this.props.findWorkTypeList('worktype');
    }
    componentWillReceiveProps(nextProps) {
        const { isMark } = nextProps;
        if(!!isMark) {
            this.props.updateMark(false);
            this.onClose();
        }
        // console.log('********',nextProps)
    }
    /**
     * 点击时间，设值
     */
    handleChange(key, v) {
        // console.log(key, v)
        this.setState({
            [key]: moment(v).format('YYYY-MM-DD')
        })
    }
    /**
     * 约束开始时间不能大于结束时间
     */
    disabledStartDate = (startValue) => {
        const endValue = this.state.planEndTime;
        if (!startValue || !endValue) {
            return false;
        }
        return moment(startValue).valueOf() > endValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.planBeginTime;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= moment(startValue).valueOf();
    }
    //控制时间弹窗
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    //通知父级，点击的是负责人还是审批人 1：负责人 2：审批人
    handleTaskManager = (type) => {
        this.props.handleTaskManager(type)
    }
    //关闭弹窗
    onClose = () => {
        this.props.form.resetFields();
        this.props.onClose();
    }
    //审批人删除选中值
    onDeselect = (value) => {
        this.props.onDeselect(value);
    }

    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                let { planBeginTime , planEndTime,AuditorPerson} = values;
                planBeginTime = moment(planBeginTime).format('YYYY-MM-DD');
                planEndTime   = moment(planEndTime).format('YYYY-MM-DD');
                AuditorPerson = AuditorPerson.length>0?AuditorPerson.join():'';
                let option = { ...values,planBeginTime , planEndTime,AuditorPerson};
                this.props.onSubmit(option);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { sectionList, dictionaryList, workTypeList } = this.props.field;
        const { data ,isEdit} = this.props;
        // console.log(data)
        const AuditorPersonIdList = [];
        data.AuditorPerson.length > 0 && data.AuditorPerson.map(v => (
            AuditorPersonIdList.push(v.id)
        ))
        //工程量单位
        const prefixSelector = getFieldDecorator('quantitieUnit', {
            initialValue: '3423434243242432',
        })(
            <Select style={{ width: 70 }}>
                {dictionaryList.length > 0 && dictionaryList.map(v => (
                    <Option value={v.categoryId} key={v.categoryId}>{v.categoryValue}</Option>
                ))}
            </Select>
        );

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                    <Col sx={24} sm={24}>
                        <FormItem
                            {...formItemLayout1}
                            label="标段区域"
                        >
                            {getFieldDecorator('sectionId', {
                                initialValue: data.sectionId
                            })(
                                <Select
                                    showSearch
                                    placeholder="请搜索或选择标段"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >

                                    {sectionList.map(v => (
                                        (v.id != 0 || v.id) && <Option value={v.id} key={v.id}>{v.sectionName}</Option>
                                    ))}

                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={24} sm={12} hidden={isEdit}>
                        <FormItem
                            {...formItemLayout2}
                            label="计划标题"
                        >
                            {getFieldDecorator('taskName', {
                                initialValue:data.taskName,
                                setFieldsValue:data.taskName,
                                rules: [{ required: true, message: '请输入标题!' }],
                            })(
                                <Input  placeholder="请输入标题" />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={12}>
                        <FormItem
                            {...formItemLayout2}
                            label="负责人"
                        >
                            {getFieldDecorator('taskManager', {
                                rules: [],
                                initialValue: data.taskManager
                            })(
                                <Input disabled addonAfter={<Icon type="user-add" theme="outlined" onClick={() => this.handleTaskManager(1)} />} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col sx={24} sm={24}>
                        <FormItem
                            {...formItemLayout1}
                            label="计划备注"
                        >
                            {getFieldDecorator('planContent', {
                                initialValue:data.planContent
                            })(
                                <TextArea rows={4} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={24} sm={12}>
                        <FormItem
                            {...formItemLayout2}
                            label="合同单价"
                        >
                            {getFieldDecorator('contractPrice', {
                                rules: [{ pattern: /^\d+(\.\d+)?$/, message: '单价只能为数字！' }],
                                initialValue: Number(data.contractPrice)
                            })(
                                <InputNumber style={{ width: 216 }} placeholder="请输入合同单价" />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={12}>
                        <FormItem
                            {...formItemLayout2}
                            label="工程量"
                        >
                            {getFieldDecorator('quantities', {
                                rules: [],
                                initialValue:data.quantities
                            })(
                                <Input addonAfter={prefixSelector} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={24} sm={12}>
                        <FormItem
                            {...formItemLayout2}
                            label="工人计划"
                        >
                            {getFieldDecorator('peopleNum', {
                                rules: [{ required: true, message: '请输入人数!' }, { pattern: /^\+?[1-9][0-9]*$/, message: '只能为正整数' }],
                                initialValue:data.peopleNum
                            })(
                                <InputNumber style={{ width: 216 }} placeholder="请输入计划上工人数" />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={12}>
                        <FormItem
                            {...formItemLayout2}
                            label="计划工种"
                        >
                            {getFieldDecorator('planWorkType', {
                                rules: [{ required: true, message: '请选择工种!' }],
                                initialValue: data.planWorkTypeId
                            })(
                                <Select placeholder="请选择工种">
                                    {workTypeList.length > 0 && workTypeList.map(v => (
                                        <Option value={v.categoryId} key={v.categoryId}>{v.categoryValue}</Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={24} sm={12}>
                        <FormItem
                            {...formItemLayout2}
                            label="开始时间"
                        >
                            {getFieldDecorator('planBeginTime', {
                                rules: [{ required: true, message: '请选择时间!' }],
                                initialValue: data['planBeginTime'] ? moment(data['planBeginTime']) : null
                            })(
                                <DatePicker
                                    disabledDate={this.disabledStartDate}
                                    format="YYYY-MM-DD"
                                    onChange={(v) => this.handleChange('planBeginTime', v)}
                                    onOpenChange={this.handleStartOpenChange}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={12}>
                        <FormItem
                            {...formItemLayout2}
                            label="完成时间"
                        >
                            {getFieldDecorator('planEndTime', {
                                rules: [{ required: true, message: '请选择时间!' }],
                                initialValue: data['planEndTime'] ? moment(data['planEndTime']) : null
                            })(
                                <DatePicker
                                    disabledDate={this.disabledEndDate}
                                    format="YYYY-MM-DD"
                                    onChange={(v) => this.handleChange('planEndTime', v)}
                                    open={this.state.endOpen}
                                    onOpenChange={this.handleEndOpenChange} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col sx={24} sm={24} hidden={isEdit}>
                        <FormItem
                            {...formItemLayout1}
                            label="审批人"
                        >
                            {getFieldDecorator('AuditorPerson', { initialValue: AuditorPersonIdList })(
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Select
                                        mode="multiple"
                                        placeholder="请选择审批人"
                                        open={false}
                                        value={AuditorPersonIdList}
                                        onDeselect={this.onDeselect}
                                    >
                                        {data['AuditorPerson'].length > 0 && data['AuditorPerson'].map((v,i) => (
                                            <Option key={v.id}>{v.name}</Option>
                                        ))}
                                    </Select>
                                    <Icon
                                        style={{ border: '1px solid #ddd', height: 32, lineHeight: 2, padding: '0 10px', marginLeft: -2, zIndex: 1, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
                                        type="user-add" theme="outlined" onClick={() => this.handleTaskManager(2)}
                                    />
                                </div>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                    <Button style={{ marginRight: 8, }} onClick={this.onClose}>关闭</Button>
                    <Button htmlType="submit" type="primary">提交</Button>
                </div>
            </Form>
        )
    }
}

export default ModalPlanTaskForm;