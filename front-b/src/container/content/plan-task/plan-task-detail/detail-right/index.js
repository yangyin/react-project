import React, { Component } from 'react';
import { Input, Icon, Button, Card, Tabs, Drawer, Progress } from 'antd';
import Utils from './../../../../../utils/utils';

import ManagerMailList from './../../plan-task-modal/mail-list';
import PlanTaskModal from './../../plan-task-modal/';
import UploadComp from './../../../../../components/upload';

const TabPane = Tabs.TabPane;


class PlanTaskDetailRight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isplanContent: true, //说明是否可编辑
            isRemark: false,//是否显示备注INPUT框
            visible: false,//通讯录
            taskManager: this.props.data.taskManager,//负责人
            //弹框数据
            visible2: false,
            //编辑时，父级传入当前点击行的ID
            editCurrentId: '',
        }
    }
    componentDidUpdate(prevProps) {
        if (!(JSON.stringify(this.props.data) == JSON.stringify(prevProps.data))) {
            this.setState(prevState => ({
                taskManager: this.props.data.taskManager
            }))

        }
    }
    //编辑表单
    handleEdit = () => {
        this.setState((prevState) => ({
            visible2: true,
            editCurrentId: this.props.data.id
        }))
    }
    handleModalChange = (data) => {
        this.setState(() => ({
            visible2: data.visible
        }));
    }
    //备注列表渲染
    remarkRender = (data) => {
        return data.map((v,i) => (
            <div className="tab-item" key={i}>
                <p>- {v.content}</p>
                <p>{v.createTime} {v.createBy}</p>
            </div>
        ))
    }
    //质量/安全渲染
    quityDetailRender = (data) => {
        return data.map(v => (
            <div className="tab-item" key={v.qualityNo}>
                <p>{v.qualityNo}</p>
                <p>{v.checkContent}</p>
                <p>{v.createBy}</p>
            </div>
        ))
    }
    //点击备注，显示input框
    handleRemark = () => {
        this.setState((prevState) => ({
            isRemark: !prevState.isRemark
        }))
    }
    //展示通讯录
    handleMail = () => {
        this.setState((prevState) => (
            { visible: true }
        ))
    }
    //关闭通讯录
    onChildrenClose = () => {
        this.setState({
            visible: false,
        });
    }
    //通讯录取值
    onChildrenDrawerClose = (id, name) => {
        this.onChildrenClose();
    };
    //上传成功回调
    uploadSuccess=(data) => {
        this.editRequest({pictures:JSON.stringify(data)});
    }
    //删除图片
    removeFileImg=() => {
        this.props.removeFileImg();
    }
    //说明点击编辑按钮
    handleClick = () => {
        this.setState(v=>({
            isplanContent:false
        }))
    }
    /**
     * 删除
     */
    handleDelect=() => {
        this.props.handleDelect();
    }
    //input失焦调用  说明和备注添加
    handleInputBlur = (e,key) => {
        this.setState(()=>({
            isplanContent:true,
            isRemark:false
        }))
        if(!e.target.value){return;}
        if(key === 'planRemarks') {
            this.editRequest({[key]:JSON.stringify([{content:e.target.value}])});
        } else {
            this.editRequest({[key]:e.target.value});
        }
        
    }
    //修改提交数据
    editRequest=(data) => {
        this.props.taskPlanEdit(data)
    }
  
    render() {
        const { data, fields } = this.props;
        const { current,total} = this.props.currentItem;
        const { isplanContent, isRemark, visible2, editCurrentId} = this.state;

        //模态框所需数据
        let modalData = { visible: visible2, proLeaderList: fields, editCurrentId };
        //耗费时间,剩余时间
        let beforeProgress = 0;
        if (data['planBeginTime']) {
            let beforeTime = Utils.getBeforeDate(data['planBeginTime']);
            beforeProgress = (((beforeTime / data['planDays']) * 100).toFixed(0));
        }
        return (
            JSON.stringify(data) !== '{}' && <div>
                <div className="top">
                    <div className="top-header">
                        <div className="top-header-left">
                            <Icon className="icon-top" type="mail" theme="filled" />
                            <div>
                                <p>{data.proName} / {data.taskNo}</p>
                                <label>{modalData.visible === true ? '是' : '否'}</label>
                            </div>
                        </div>
                        <div className="top-header-right">第{current}个计划，共{total}个计划</div>
                    </div>
                    <div className="top-bottom">
                        <Button onClick={this.handleEdit}>编辑</Button>
                        <Button onClick={this.handleDelect}>删除</Button>
                    </div>
                </div>
                <div className="content">
                    <div className="left">
                        <Card
                            title="计划"
                            className="left-card"
                        >
                            <div className="card-content">
                                <p>标段区域：<label>{data.sectionName || '暂无'}</label></p>
                                <p>工程量：<label>{data.quantities || '-'} {data.quantitieUnit || '-'}</label></p>
                                <p>任务造价：<label>{data.taskCost || '--'}万</label></p>
                                <p>计划工种：<label>{data.planWorkType || '暂无'}</label></p>
                                <p>计划人数：<label>{data.peopleNum || '--'}人</label></p>
                            </div>
                        </Card>
                        <Card
                            title="说明"
                            className="left-card"
                        >
                            <Input addonAfter={<Icon style={{cursor:'pointer'}} onClick={this.handleClick} type="edit" theme="outlined" />} defaultValue={data.planContent} disabled={isplanContent} onBlur={(e)=>this.handleInputBlur(e,'planContent')} />
                        </Card>
                        <Card
                            title="附件"
                            className="left-card"
                        >
                            <UploadComp planPic={data.planPic} maxlength={6} uploadSuccess={this.uploadSuccess} removeFileImg={this.removeFileImg} type="JH" />
                        </Card>
                        <Card
                            title="动态"
                            className="left-card"
                        >
                            <Tabs defaultActiveKey="1" >
                                <TabPane tab="备注" key="1">
                                    {data.planLog.length > 0 ? this.remarkRender(data.planLog) : <p>- 暂无数据</p>}
                                    {isRemark === true && <Input style={{ width: 300 }} onBlur={(e)=>this.handleInputBlur(e,'planRemarks')} />}
                                    <Button onClick={this.handleRemark} icon="plus">备注</Button>
                                </TabPane>
                                <TabPane tab="质量" key="2">{data.quityDetail.length > 0 ? this.quityDetailRender(data.quityDetail) : <p>- 暂无数据</p>}</TabPane>
                                <TabPane tab="安全" key="3">{data.quitySecity.length > 0 ? this.quityDetailRender(data.quitySecity) : <p>- 暂无数据</p>}</TabPane>
                            </Tabs>
                        </Card>
                    </div>
                    <div className="right">
                        <Card
                            title="参与人"
                            className="right-card"
                        >
                            <p className="taskManager">负责人：<Input style={{ width: 150 }} addonAfter={<Icon onClick={this.handleMail} type="edit" theme="outlined" />} defaultValue={this.state.taskManager} readOnly /></p>
                            <p>创建人：{data.createBy}</p>
                            <p>审批人：{data.AuditorPerson}</p>
                        </Card>
                        <Card
                            title="日期"
                            className="right-card"
                        >
                            <p>创建时间：{data.planBeginTime}</p>
                            <p>完成时间：{data.planEndTime}</p>
                            <p>更新时间：{data.updateTime}</p>
                        </Card>
                        <Card
                            title="进度"
                            className="right-card"
                        >
                            <div>计划时间：<Progress style={{ width: 300 }} percent={100} size="small" showInfo={true} format={() => (data.planDays + '天')} /></div>
                            <div>耗费时间：<Progress style={{ width: 300 }} percent={Number(beforeProgress)} size="small" status="active" /> </div>
                            <div>剩余时间：<Progress style={{ width: 300 }} percent={100 - beforeProgress} size="small" status="active" strokeColor="red" /></div>
                        </Card>
                    </div>
                </div>
                <Drawer
                    title="通讯录"
                    width={520}
                    closable={true}
                    onClose={this.onChildrenClose}
                    visible={this.state.visible}
                >
                    <ManagerMailList onChildrenDrawerClose={this.onChildrenDrawerClose} data={fields} />
                </Drawer>
                <PlanTaskModal data={modalData} handleChange={this.handleModalChange} isEdit={true}/>
            </div>
        )
    }



}

export default PlanTaskDetailRight;