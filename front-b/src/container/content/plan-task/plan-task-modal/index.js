import React, { PureComponent } from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';

import ModalPlanTaskForm from './modal-form/modal-form';
import ManagerMailList from './mail-list';
import { TaskPlanAdd } from './../store/action';

@connect(
    state=> ({
        planTask:state.planTask,
        topbar:state.topbar
    }),
    {TaskPlanAdd}
)
class PlanTaskModal extends PureComponent {

    state = { 
        childrenDrawer: false,
        managerType:1,//1:代表只能选一个人，2：可以多选负责人
        sectionId:'',//标段ID
        sectionName:'',//标段名称
        taskManagerId:'', //负责人
        taskManager:'',
        contractPrice:null,//合同单价
        AuditorPerson:[],//审核人
        planBeginTime:'',//开始时间
        planEndTime:'',//结束时间
        
    };

    componentWillReceiveProps(nextProps) {
        const { data, planTask } = nextProps;
        if(data.editCurrentId&& JSON.stringify(planTask.planDetail) !== "{}") {
            // console.log('*******',nextProps);
            const { planDetail } = planTask;
            let audtiArr = [];
            if(planDetail['AuditorPerson']) {
                planDetail['AuditorPerson'].split(',').map((v,i) => {
                    audtiArr.push({id:planDetail['AuditorPersonId'].split(',')[i],name:v})
                })
            }
            const { sectionId ,sectionName,taskName,taskManagerId,taskManager,planContent,contractPrice,quantities,quantitieUnitId,peopleNum,planWorkTypeId,planBeginTime,planEndTime} = planDetail;
            this.setState(() => ({
                sectionId,
                sectionName,
                taskName,
                taskManagerId,
                taskManager,
                planContent,
                contractPrice,
                quantities,
                quantitieUnitId,
                peopleNum,
                planWorkTypeId,
                planBeginTime,
                planEndTime,
                AuditorPerson:audtiArr,
            }))
        } else {
            this.setState(() => ({
                sectionId:'',
                sectionName:'',
                taskName:'',
                taskManagerId:'',
                taskManager:'',
                planContent:'',
                contractPrice:'',
                quantities:'',
                quantitieUnitId:'',
                peopleNum:'',
                planWorkTypeId:'',
                planBeginTime:'',
                planEndTime:'',
                AuditorPerson:[],
            }))
        }
    }

    //关闭新增
    onClose = () => {
        this.props.handleChange({visible: false});
    };
    //展开通讯录
    showChildrenDrawer = (type) => {
        this.setState(()=>({
            childrenDrawer: true,
            managerType:type
        }));
    };
    //关闭通讯录
    onChildrenClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    }
    //取值
    onChildrenDrawerClose = (id,name) => {
        if(id) {
            const {managerType} = this.state;
            if(managerType == 1) {
                this.setState((prevState) => ({
                    taskManagerId:id,
                    taskManager:name
                }))
            } else {
                // console.log(id,name)
                if( !JSON.stringify(this.state.AuditorPerson).includes(id) ) {
                    this.setState((prevState) => ({
                        AuditorPerson:[...prevState.AuditorPerson,{id,name}]
                    }))
                }
            }
            
        } 
        this.onChildrenClose();
    };
    //删除审批人值
    onDeselect = (value) => {

        this.setState((prevState) => ({
            AuditorPerson:prevState.AuditorPerson.filter(v => v.id != value)
        }))
    }
    //提交表单
    onSubmit = (options) => {
        const { editCurrentId } = this.props.data;
        let option = {};
        if(editCurrentId) { //编辑
           const { id } = this.props.planTask.planDetail;
           option = {url:'sdpbusiness/task/updatePlan',params:{...options,id,proId:this.props.topbar.proId}};
        } else { //新增
            option = {url:'sdpbusiness/task/addPlan',params:{...options,proId:this.props.topbar.proId}};
        }
        this.props.TaskPlanAdd(option);
    }


    render() {
        const { visible ,proLeaderList} = this.props.data;
        const { isMark } = this.props.planTask;
        const { isEdit } = this.props;
        // console.log(visible ,title,proLeaderList)
        return (
            <Drawer
                title={!isEdit ? '创建计划':'编辑计划'}
                width={720}
                closable={true}
                onClose={this.onClose}
                visible={visible}
            >
                <ModalPlanTaskForm 
                    data = {this.state} 
                    onClose={this.onClose}
                    isMark={isMark}
                    isEdit={isEdit}
                    handleTaskManager = {this.showChildrenDrawer}
                    onDeselect={this.onDeselect}
                    onSubmit={this.onSubmit}
                />
                <Drawer
                    title="通讯录"
                    width={520}
                    closable={true}
                    onClose={this.onChildrenClose}
                    visible={this.state.childrenDrawer}
                >
                    <ManagerMailList onChildrenDrawerClose={this.onChildrenDrawerClose} data={proLeaderList} />
                </Drawer>
            </Drawer>
        )
    }
}

export default PlanTaskModal;