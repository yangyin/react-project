import React, { PureComponent } from 'react';
import { Input, Form, Button, Drawer, InputNumber, Select, Radio } from 'antd';
import { Utils } from 'handlebars';
import CommonUtils from '@/utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};


@Form.create()
class PosDrawer extends PureComponent {
    state = {}

    //新增 / 编辑
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submit(values);
            }
        })
    }
    componentWillReceiveProps (nextProps) {
        const { visible } = nextProps;
        if (!visible) {
            this.props.form.resetFields();
        }
    }
    onClose = () => {
        this.props.close();
    }

    render () {
        const { visible, type, settingList, drawerData } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Drawer
                className="setting-drawer"
                title={type === 1 ? '新增广告位置' : type === 2 ? '编辑广告位置' : '广告位置详情'}
                width={600}
                onClose={this.onClose}
                visible={visible}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="所属平台"
                    >
                        {getFieldDecorator('platformNo', {
                            initialValue: drawerData['platformNo'],
                            rules: [
                                { required: true, message: '所属平台不能为空' }
                            ]
                        })(
                            type !== 3 ? <Select disabled={type === 1 ?false:true} placeholder="请选择平台" style={{ width: '100%' }}>
                                {
                                    (settingList || []).map(v => (
                                        <Option key={v.platformNo} value={v.platformNo}>{v.platformName}</Option>
                                    ))
                                }
                            </Select> : <p>{drawerData['platformName']}</p>
                        )}
                    </FormItem>
                    {type !== 1 && <FormItem
                        {...formItemLayout}
                        label="位置编号"
                    >
                        {getFieldDecorator('positionNo', {
                            initialValue: drawerData['positionNo'] < 10 ? `00${drawerData['positionNo']}` : drawerData['positionNo'] < 100 ? `0${drawerData['positionNo']}` : drawerData['positionNo'],
                            rule: [{ validator: CommonUtils.validSpace }]
                        })(
                            <Input disabled />
                        )}
                    </FormItem>}
                    <FormItem
                        {...formItemLayout}
                        label="位置名称"
                    >
                        {getFieldDecorator('positionName', {
                            initialValue: drawerData['positionName'],
                            rules: [
                                { required: true, message: '名称不能为空' },
                                { max: 20, message: '最多不能超过20个字' },
                                { validator: CommonUtils.validSpace }
                            ]
                        })(
                            type !== 3 ? <Input maxLength={20} placeholder='请输入位置名称' /> : <p>{drawerData['positionName']}</p>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="位置描述"
                    >
                        {getFieldDecorator('positionDescribe', {
                            initialValue: drawerData['positionDescribe'] || '',
                            rules: [
                                { max: 50, message: '最多设置50字' },
                                { validator: CommonUtils.validSpace }
                            ]
                        })(
                            <TextArea maxLength={50} autosize={{ minRows: 3, maxRows: 6 }} disabled={type === 3 ? true : false} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="位置类型"
                    >
                        {getFieldDecorator('positionType', {
                            initialValue: 0
                        })(
                            <RadioGroup>
                                <Radio value={0}>图片</Radio>
                                <Radio value={1} disabled>文字</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="图片数量"
                    >
                        {getFieldDecorator('pictureNumber', {
                            initialValue: drawerData['pictureNumber'] || 1,
                            rules: [
                                { required: true, message: '支持大于0小于10的整数' },
                                { validator: CommonUtils.validSpace }
                                // {validator: Utils.isIntegerNumber, message: '大于等于1小于等于99的正整数'}
                            ]
                        })(
                            type !== 3 ? <InputNumber min={1} maxLength={2} max={10} precision={0} style={{ width: '100%' }} /> : <p>{drawerData['pictureNumber']}</p>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="轮播间隔"
                    >
                        {getFieldDecorator('liveTime', {
                            initialValue: drawerData['liveTime'] || null,
                            rules: [
                                { required: true, message: '支持大于0小于30的整数' },
                            ]
                        })(
                            type !== 3 ? <InputNumber max={30} maxLength={2} min={1} precision={0} style={{ width: '100%' }} /> : <p>{drawerData['liveTime']}</p>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="自动跳转"
                    >
                        {getFieldDecorator('jumpTime', {
                            initialValue: drawerData['jumpTime'] || null,
                            rule:[
                                { required: true, message: '支持大于0小于30的整数' },
                            ]
                        })(
                            type !== 3 ? <InputNumber min={1}  maxLength={2} max={30} precision={0} style={{ width: '100%' }} /> : <p>{drawerData['jumpTime']}</p>
                        )}
                    </FormItem>
                </Form>
                {type !== 3 && <div className="footer">
                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={this.handleSubmit} type="primary">提交</Button>
                </div>}
            </Drawer>
        );
    }
}

export default PosDrawer;