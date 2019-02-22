import React, { PureComponent } from 'react';
import { Modal, Radio, Select, Spin,Checkbox,notification } from 'antd';

const RadioGroup = Radio.Group;
const Option = Select.Option;

class InfoAssisModal extends PureComponent {
    state = {
        targetType: 'U',//添加时，单选按钮值
        value: [], //select选中的值
        fetching: false,
    }
    params = { 
        selectKey:'', // 下拉key 项目角色
        checkboxList:[],//详情时，选中的checkbox
    }
    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        //离开页面 默认值
        if(!visible && this.state.targetType !== 'U') {
            this.setState({
                targetType: 'U',//添加时，单选按钮值
                value: [], //select选中的值
                fetching: false,
            })
            this.params = {
                selectKey:'',
                checkboxList:[]
            }
        }
    }
    render() {
        const { title, visible, type } = this.props;
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                {type === 1 ? this.addRender() : this.detailRender()}

            </Modal>
        );
    }

    //添加时，渲染
    addRender = () => {
        const { eventName, eventTitle } = this.props.addField;
        const { value, fetching, targetType } = this.state;
        const { userList } = this.props;
        return (
            <div className="add-info-assis-render">
                <div className="add-header">
                    <div><label>通知方案：</label><span>{eventTitle}通知方案</span></div>
                    <div><label>通知事件：</label><span>{eventName}</span></div>
                </div>
                <div className="add-content">
                    <p className="add-content-header">请选择要关联的通知对象设置</p>
                    <div className="content-choose">
                        <RadioGroup onChange={this.onRadioChange} value={targetType} className="content-left">
                            <Radio className="radio-style" value="D">项目负责人</Radio>
                            <Radio className="radio-style" value="E">标段负责人</Radio>
                            <Radio className="radio-style" value="F">班组负责人</Radio>
                            <Radio className="radio-style" value="U">某一用户</Radio>
                            <Radio className="radio-style" value="G">项目创建人</Radio>
                            <Radio className="radio-style" value="R">项目角色</Radio>
                        </RadioGroup>
                        <div className="content-right">
                            {
                                targetType === 'U' &&
                                <Select
                                    mode="multiple"
                                    labelInValue
                                    value={value}
                                    placeholder="请选择搜索"
                                    notFoundContent={fetching ? <Spin size="small" /> : null}
                                    filterOption={false}
                                    onSearch={this.fetchUser}
                                    onChange={this.handleSelect}
                                    style={{ width: '100%' }}
                                    maxTagCount={1}
                                >
                                    {
                                        userList.map(d =>d.name &&<Option key={d.id}>{d.name}</Option>)
                                    }
                                </Select>
                            }
                            {
                                targetType === 'R' &&
                                <Select placeholder="请选择" style={{ width: 200 }} onChange={this.handleChange}>
                                    {
                                        userList.map(d =>d.name &&<Option key={d.id}>{d.name}</Option>)
                                    }
                                </Select>
                            }
                        </div>
                    </div>
                </div>
                <div className="add-footer">注：授权对象负责人包含项目负责人、标段负责人和班组负责人</div>
            </div>
        )
    }
    //删除时，渲染
    detailRender = () => {
        const { userList } = this.props;
        return (
            <div >
                <div className="add-info-assis-details">
                    <label className="details-left">权限</label>
                    <label className="details-right">项目通知对象</label>
                </div>
                <div className="add-info-assis-details">
                    <label className="details-left">从中删除</label>
                    <div className="details-right">
                        {userList.map(d => <span key={d.id}><Checkbox id={d.id} key={d.id} onChange={this.handleCheckChange}>{d.targetTypeName}--{d.targetdName}</Checkbox> <br/></span>)}
                    </div>
                </div>
            </div>
        )
    }
    //某一用户，搜索时
    fetchUser = (value) => {
        this.props.fetchUser({param:value,paramType:this.state.targetType});
    }
    //选择select U
    handleSelect = (values) => {
        this.setState(() => ({
            value:values[values.length -1]
        }))
    }
    //下拉change R
    handleChange = (value) => {
        this.params.selectKey = value;
    }
    //单选按钮更改时，
    onRadioChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({
            targetType: value,
            value:[]
        }))
        if(value === 'R') {
            this.props.fetchUser({paramType:value});
        }
        if(value === 'U') {
            this.props.clearUserList();
        }
    }
    //点击checkbox,改变
    handleCheckChange = (e) => {
        const { id ,checked } = e.target;
        if(checked) { //当前选中
            this.params.checkboxList.push(id);
        } else { //取消选中
            const num = this.params.checkboxList.indexOf(id);
            this.params.checkboxList.splice(num,1);
        }
    }
    handleOk = () => {
        const { type } = this.props;
        if(type === 1) {
            let params = {};
            const { targetType,value } = this.state;
            if(targetType === 'U') {
                params.targetd = value.key
            } else {
                const { selectKey } = this.params;
                params.targetd = selectKey;
            }
            params.targetType = targetType;
            this.props.handleSubmit(params);
        } else {
            const { checkboxList } = this.params;
            if(checkboxList.length === 0) {
                return notification.warning({
                    message:'提示',
                    description:'请先选择要删除的对象！',
                    key:'1'
                });
            }
            this.props.handleSubmit({idList:checkboxList.join(',')});
        }

    }
    //关闭弹窗
    handleCancel = () => {
        this.props.changeVisible('visible',false);
    }
}

export default InfoAssisModal;