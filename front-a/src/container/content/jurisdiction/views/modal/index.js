import React, { PureComponent } from 'react';
import { Modal, Radio, Select, Spin, notification ,Checkbox} from 'antd';

import './../../jurisdiction.less';

const RadioGroup = Radio.Group;
const Option = Select.Option;


class JurDetailModal extends PureComponent {
    state = {
        radioValue: 'U', // 授权时，单选值
        addValue: [],//授权，某一用户选中的值
        selectValue: '',//授权，项目角色选中值
        fetching: false,
        checkList:[],//删除时，checkobx选中的值
    }
    componentWillReceiveProps(nextProps) {
        const { isUpdate } = nextProps;
        if(isUpdate) {
            // 弹窗关闭，数据还原
            this.setState({
                radioValue: 'U', // 授权时，单选值
                addValue: [],//授权，某一用户选中的值
                selectValue: '',//授权，项目角色选中值
                fetching: false,
                checkList:[]
            })
        }
    }

    handleOk = (e) => {
        const { radioValue, addValue, selectValue } = this.state;
        const { type } = this.props.params;

        let params = {};
        if( type === 1) { //添加授权
            if (radioValue === 'U') {
                if (addValue.length === 0) {
                    return notification.warning({
                        key: 1,
                        message: '提示',
                        description: '请选择用户'
                    });
                }
                params.targetd = addValue[0].key;
            } else if (radioValue === 'R') {
                if (!selectValue) {
                    return notification.warning({
                        key: 1,
                        message: '提示',
                        description: '请选择项目角色'
                    });
                }
                params.targetd = selectValue;
            }
            this.props.modalSubmit({ ...params, targetType: radioValue });
        } else {
            const { checkList } = this.state;
            params = {
                jsonJrrRelationList:JSON.stringify({
                    jrrRelationList:checkList
                })
            }
            this.props.modalSubmit(params);
        }
       
    }

    handleCancel = (e) => {
        this.props.onClose();
        this.setState({
            radioValue: 'U', // 授权时，单选值
            addValue: [],//授权，某一用户选中的值
            selectValue: '',//授权，项目角色选中值
            fetching: false,
            checkList:[]
        })
    }

    //授权，单选改变时
    onRadioChange = (e) => {
        const { value } = e.target;
        this.setState({
            radioValue: value,
            addValue: [],
            selectValue:''
        });
        if (value === 'R') { //项目角色,请求数据
            this.props.fetchUser({ type: value });
        }
        if (value === 'U') { //清空下拉数据
            this.props.clearUserList();
        }
    }
    //授权，用户 搜索
    fetchUser = (value) => {
        this.props.fetchUser({ parameter: value, type: this.state.radioValue });
    }
    //授权，用户选中
    handleRadioChange = (value) => {
        let len = value.length;
        this.setState({
            addValue: len > 0 ? [value[len - 1]] : []
        })
    }
    //项目角色，更改时
    handleSelectChange = (value) => {
        this.setState({
            selectValue: value
        })
    }

    render() {
        const { visible, type} = this.props.params;
        return (
            <Modal
                title={type === 1 ? '授权对象设置' : '移除授权对象'}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                {type === 1 ? this.addRender() : this.removeRender()}
            </Modal>
        );
    }
    //授权渲染
    addRender = () => {
        const { jurName, name } = this.props.params;
        const { userList } = this.props;
        const { radioValue, addValue, fetching } = this.state;
        return (
            <div className="jur-details-add">
                <div className="details-title">
                    <p>授权方案：<label>{name}</label></p>
                    <p>授权项：<label>{jurName}</label></p>
                </div>
                <div className="details-content">
                    <label>选择需要关联的授权对象设置</label>
                    <div className="details-display">
                        <div className="left">
                            <RadioGroup onChange={this.onRadioChange} value={radioValue}>
                                <Radio className="radio-style" value="D">项目创建人</Radio>
                                <Radio className="radio-style" value="B">项目负责人</Radio>
                                <Radio className="radio-style" value="SCB">标段负责人</Radio>
                                <Radio className="radio-style" value="TB">班组负责人</Radio>
                                <Radio className="radio-style" value="U">某一账户</Radio>
                                <Radio className="radio-style" value="R">项目角色</Radio>
                            </RadioGroup>
                        </div>
                        <div className="right">
                            {
                                radioValue === 'U' &&
                                <Select
                                    mode="multiple"
                                    labelInValue
                                    value={addValue}
                                    placeholder="请搜索选择"
                                    notFoundContent={fetching ? <Spin size="small" /> : null}
                                    filterOption={false}
                                    onSearch={this.fetchUser}
                                    onChange={this.handleRadioChange}
                                    style={{ width: '100%' }}
                                >
                                    {
                                        userList.map(d => <Option key={d.get('id')}>{d.get('userPhone')} {d.get('name')}</Option>)
                                    }
                                </Select>
                            }
                            {
                                radioValue === 'R' &&
                                <Select placeholder="请选择" style={{ width: 200 }} onChange={this.handleSelectChange}>
                                    {
                                        userList.map(d => <Option key={d.get('id')}>{d.get('userPhone')} {d.get('name')}</Option>)
                                    }
                                </Select>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //详情渲染
    removeRender = () => {
        const { jurName } = this.props.params;
        const { userList,jurMap } = this.props;
        return (
            <div className="jur-details-remove">
                <div className="remove-item">
                    <label className="left">权限</label>
                    <div className="right">{jurName}</div>
                </div>
                <div className="remove-item">
                    <label className="left">从中删除</label>
                    <div className="right">
                        {jurMap.size >0 && <Checkbox disabled>{jurMap.get('type')} {jurMap.get('name') && `--${jurMap.get('name')}`}</Checkbox>}
                        { userList.map(d => <Checkbox id={d.get('relationId')} onChange={this.onCheckChange} key={d.get('relationId')}>{d.get('type')} {d.get('name') && `--${d.get('name')}`}</Checkbox>)}
                    </div>
                </div>
            </div>
        )
    }
    onCheckChange = (e) => {
        const { checked,id } = e.target;
        const { checkList } = this.state;
        
        if(checked) { //选中时
            checkList.push(id);
        } else {
            checkList.remove(id);
        }
    }

}

export default JurDetailModal;