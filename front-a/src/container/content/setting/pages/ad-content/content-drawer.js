import React, { Component } from 'react';
import { Input, Form, Button, Drawer, Select, Radio ,DatePicker, Avatar, Popover } from 'antd';
import Utils from '@/utils/utils';

import UploadComp from '@/components/update';
import moment from 'moment';
import 'moment/locale/zh-cn';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
moment.locale('zh-cn');  //设置日期中文格式

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
class ContentDrawer extends Component {
    state = {
        picList:[],//图片数组
        currentPosData:{},//当前选中的位置名称，数据，
        isShowUrl: true, // 是否显示图片url链接
    }
    componentWillReceiveProps(nextProps) {
        const { visible, drawerData, type, adPosList } = nextProps;
        if (!visible) {
            this.props.form.resetFields();
        }
        if (JSON.stringify(drawerData) !== JSON.stringify(this.props.drawerData)) {
            this.setState({
                picList: drawerData.pictureAddr ? [{ url: drawerData.pictureAddr ? drawerData.pictureAddr : '' }] : []
            })
        }
        if (visible && type === 3 && drawerData.jumpAddr && drawerData.jumpAddr !== 'null' && drawerData.jumpType === 1 ) {
            this.setState({
                isShowUrl: false
            })
        }
        if ( type === 3 ) {
            this.setState(() => ({
                currentPosData:{
                    pictureNumber: drawerData.pictureNumber,
                    liveTime: drawerData.liveTime,
                    jumpTime: drawerData.jumpTime
                }
            }))
        }
    }
    onClose = () => {
        const { picList } = this.state;
        this.props.close();
        this.setState({
            isShowUrl: true,
            picList: this.props.type !== 3 ? [] : picList
        })
        this.props.form.setFieldsValue({
            pictureAddr: []
        });
        
    }
    shouldComponentUpdate(nextProps) {
        if (!nextProps.adPosList && nextProps.type !== 3) { return false; }
        if (!nextProps.settingList && nextProps.type !== 3) { return false; }

        return true;
    }

    render() {
        const { visible, type, settingList, drawerData, adPosList } = this.props;
        const { currentPosData, picList, isShowUrl } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Drawer
                className="setting-drawer"
                title={type === 1 ? '新增广告内容' : type === 2 ? '编辑广告内容' : '广告内容详情'}
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
                            // initialValue: (settingList.length > 0 && settingList[settingList.length - 1]['platformNo']) || ''
                            rules: [
                                { required: true, message: '所属平台必选'}
                            ]
                        })(
                            type !== 3 ? <Select placeholder="请选择平台" style={{ width: '100%' }}  onChange={this.handlePlatformAddChange}>
                                {
                                    (settingList || []).map(v => (

                                        <Option key={v.platformNo} value={v.platformNo}>{v.platformName}</Option>
                                    ))
                                }
                            </Select> : <p>{drawerData['platformName']}</p>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="位置名称"
                    >
                        {getFieldDecorator('positionNo', {
                            rules: [
                                { required: true, message: '位置名称必选'}
                            ]
                        })(
                            type !== 3 ? <Select placeholder="请选择位置名称" style={{ width: '100%' }} onSelect={this.handlePosSelect}>
                                {
                                    (adPosList || []).map(v => (
                                        <Option key={v.positionNo} value={v.positionNo}>{v.positionName}</Option>
                                    ))
                                }
                            </Select> : <p>{drawerData['positionName']}</p>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="位置介绍"
                    >
                        <p>图片类广告，该位置支持{currentPosData.pictureNumber}张图片，轮播间隔{currentPosData.liveTime ? currentPosData.liveTime : 0 }s，自动跳转{currentPosData.jumpTime ? currentPosData.jumpTime : 0 }s</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="广告名称"
                    >
                        {getFieldDecorator('bannerName', {
                            rules: [
                                { required: true, message: '广告名称不能为空' },
                                { validator: Utils.validSpace, message: '请输入有效名称'},
                                { max: 20, message: '最多设置20字' }
                            ]
                        })(
                            type !== 3 ? <Input /> : <p>{drawerData['bannerName']}</p>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="图片信息"
                    >
                        {getFieldDecorator('pictureAddr', {
                            initialValue: picList,
                            rules: [
                                { required: true, message: '图片信息不能为空'}
                            ]
                        })(
                            type !== 3 
                            ? <UploadComp
                                planPic={picList}
                                maxlength={1}
                                uploadSuccess={this.uploadSuccess}
                                removeFileImg={this.removeFileImg}
                                type='bannerPic'
                                ids={this.state.dictionariesId}
                            />
                            : <p><Popover content={<Avatar shape="square" size={240} src={picList.length > 0 ? picList[0].url : ''} />} title=""><Avatar shape="square" size={84} src={picList.length > 0 ? picList[0].url : ''} /></Popover></p>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label=" "
                        colon = {false}
                    >
                        {getFieldDecorator('jumpType', {
                            initialValue: drawerData.jumpType ? drawerData.jumpType : 0
                        })(
                            <RadioGroup onChange={this.onRadioChange} disabled={type === 3 ? true : false}>
                                <Radio value={0}>无链接</Radio>
                                <Radio value={1}>URL</Radio>
                                <Radio value={2} disabled={true}>产品内链</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {
                        isShowUrl 
                        ? 
                        null 
                        : 
                        <FormItem
                            {...formItemLayout}
                            label=" "
                            colon = {false}
                        >
                            {getFieldDecorator('jumpAddr', {
                                initialValue: drawerData.jumpAddr ? drawerData.jumpAddr : '',
                                rules: [
                                    { required: true, message: 'URL地址必填' },
                                    { validator: Utils.validSpace, message: '请输入有效地址'},
                                    { max: 1000, message: '最大长度1000字符' }
                                ]
                            })(
                                <Input placeholder='URL地址' disabled={ type === 3 ? true : false} />
                            )}
                        </FormItem>
                    }
                    <FormItem
                        {...formItemLayout}
                        label="有效期"
                    >
                        {getFieldDecorator('jumpDate', {
                            initialValue: drawerData.beginTime && drawerData.endTime && [moment(drawerData.beginTime), moment(drawerData.endTime)],
                            rules: [
                                { required: true, message: '有效期必选'}
                            ]
                        })(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={type === 3 ? true : false} />
                        )}
                    </FormItem>
                </Form>
                {type !== 3 && <div className="footer">
                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={this.handleSubmit} type="primary">提交</Button>
                </div>}
            </Drawer>
        )
    }
    //更改
    handlePosSelect = (value) => {
        const { adPosList } = this.props;
        adPosList.forEach(element => {
            if (element.positionNo === value) {
                this.setState(() => ({
                    currentPosData:{
                        pictureNumber: element.pictureNumber,
                        liveTime: element.liveTime,
                        jumpTime: element.jumpTime
                    }
                }))
            }
        });
            
    }
    //图片上传成功
    uploadSuccess = (data) => {
        this.props.form.setFieldsValue({
            pictureAddr: [{url: data[0].url}]
        });
        this.setState((prevState) =>({
            picList:[{url:data[0].url}]
        }));
    }
    //图片删除成功 TODO
    removeFileImg = (data) => {
        this.setState({
            picList:[]
        })
        //this.param.url = '';
    }
    // 弹窗搜索所属位置
    handlePlatformAddChange = (value) => {
        this.props.form.resetFields('positionNo', []);
        this.props.handleAddPlatformChange(value);
    }
    // 切换单选是否有链接
    onRadioChange = (e) => {
        const value = e.target.value;
        this.setState({
            isShowUrl: value === 1 ? false : true
        })
    }
    //新增
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    bannerName: values.bannerName,
                    positionNo: values.positionNo,
                    pictureAddr: values.pictureAddr[0].url,
                    jumpType: values.jumpType,
                    jumpAddr: values.jumpAddr,
                    beginTime: values.jumpDate && values.jumpDate.length > 0 ? moment(values.jumpDate[0]).format('YYYY-MM-DD HH:mm:ss') : '',
                    endTime: values.jumpDate && values.jumpDate.length > 0 ? moment(values.jumpDate[1]).format('YYYY-MM-DD HH:mm:ss') : '',
                }
                this.props.submit(params);
                // this.props.close();
                this.onClose();
                this.setState((prevState) =>({
                    picList:[]
                }));
            }
        })
    }
}

export default ContentDrawer;