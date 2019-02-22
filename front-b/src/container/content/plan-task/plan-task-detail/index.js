import React,{ Component } from 'react';
// import {} from 'antd';
import { connect } from 'react-redux';
// import Utils from './../../../../utils/utils';

import './plan-task-detail.less';

import Panel from './../../../../components/panel/panel';
import Header from '../plan-task-header';
import DetailLeft from './detail-left';
import DetailRight from './detail-right';
import { getTaskList ,findPlanDetail,planUpdateDetail,planUpdateDetailStatus,planDelete,planDeleteStatus} from '../store/action';
import { getProAddressBook } from './../../../../redux/findField/actions';


const panelData = { title: '任务计划2' };


@connect(
    state=>({
        topbar:state.topbar,
        planTask:state.planTask,
        field:state.findField
    }),
    {getTaskList,findPlanDetail,getProAddressBook,planUpdateDetail,planUpdateDetailStatus,planDelete,planDeleteStatus}
)
class PlanTaskDetailPage extends Component {

    constructor(props) {
        super(props);

        //列表数据
        this.params = {
            pageNum:1,
            pageSize:10,
            sectionId:'',taskState:'',taskManagerId:'',paramName:'',myPlanTask:''
        }
        //左侧列表选中的ID
        this.activeId='';
        this.state = {
            proId:'',
        }
        this.currentItem = {
            total:1,
            current:1
        }
    }
    //点击编辑
    handleEdit = (data) => {
        this.child.parentChangeHandle(data.id);
    }
    //modal 返回数据
    handleModalChange = (data) => {
        console.log('****',data);
    }
    //编辑提交
    taskPlanEdit = (options) => {
        const { planDetail } = this.props.planTask;
        let option = {...options,id:planDetail.id,proId:this.props.topbar.proId,AuditorPerson:planDetail.AuditorPerson};
        // console.log(option);
        this.props.planUpdateDetail(option);
    }
    //删除图片成功，刷新列表
    removeFileImg = () => {
        this.props.findPlanDetail(this.activeId);
        // let option = { fileUrl:url};
        // this.props.planRemoveFile(option);
    }
    componentDidMount() {
        const { proId } = this.props.topbar;
        if(proId) {
            this.request();
            this.props.getProAddressBook(proId);
        }

    }
    componentDidUpdate(prevProps) {
        const prevId = prevProps.topbar.proId;
        const prevTaskList = prevProps.planTask.taskList;
        const { proId } = this.props.topbar;
        const { isMark,planDetail,taskList,isDetailStatus ,isPlanDelete} = this.props.planTask;

        if(prevId !== proId || !!isMark) {
            this.params.pageNum =1;
            this.request();
        } 

        if(prevId && proId && prevId != proId) {
            this.props.getProAddressBook(proId);
        }
        const str1 = JSON.stringify(prevTaskList),str2=JSON.stringify(taskList);
        if( (JSON.stringify(planDetail) === '{}'&& taskList && taskList.total >0)
            || (str1 !== str2 && str1 !== '{}' && str2 !== '{}' && taskList.total>0)
        ) {
            const { pageNum } = this.params;
            this.props.findPlanDetail(taskList.rows[0].id);
            this.activeId = taskList.rows[0].id;
            this.currentItem = {
                total:taskList.total,
                current:pageNum>1 ? ( (pageNum-1) *10)+1:1
            }
        } 
        if(isDetailStatus === true) {
            this.props.planUpdateDetailStatus(false);
            this.props.findPlanDetail(this.activeId);
        }
        /**
         * 判断删除任务，成功时，更改isPlanDelete状态，并且刷新界面
         */
        if(isPlanDelete === true) {
            this.props.planDeleteStatus(false);
            if(taskList.rows.length===1 && this.params.pageNum >1) {
                this.params.pageNum = this.params.pageNum -1;
            } 
            this.request();
        }
    }

    //请求列表
    request = () => {
        let {sectionId,taskState,taskManagerId,paramName,myPlanTask,pageSize,pageNum} = this.params;
        const { proId } = this.props.topbar;
        this.props.getTaskList({proId,sectionId,taskState,taskManagerId,paramName,myPlanTask,pageSize,pageNum});
    }
    //请求详情
    requestDetail = (id) => {
        this.props.findPlanDetail(id);
    }

    //头部Form表单变化时，触发
    handleFormChange =(params) => {
        this.params = {...this.params,...params};
        this.request();
    }
    //点击左侧列表时，请求详情
    handleItem = ({id},index) => {
        this.activeId = id;
        const { pageNum } = this.params;
        this.currentItem.current = pageNum>1 ? ( (pageNum-1) *10)+(index+1):(index+1);
        this.requestDetail(id);
    }
    /**
     * 点击分页，请求列表
     */
    handleCurrent = (current) => {
        this.params.pageNum = current;
        this.request();
    }
    /**
     * 删除计划
     */
    handleDelect = () => {
        const { proId } = this.props.topbar;
        const { id }    = this.props.planTask.planDetail;
        if(proId && id) {
            this.props.planDelete(id,proId);
        }
    }
    render() {
        const { taskList,planDetail } = this.props.planTask;
        // const { proId } = this.props.topbar;
        const { proLeaderList } = this.props.field;
        return (
            <div id="plan-task-detail">
                <Panel panelData={panelData} />
                <Header handleFormChange={this.handleFormChange} onRef={(el)=>this.child = el} />
                <div className="content">
                    <div className="cont-left">
                        <DetailLeft 
                            data={ {...taskList,pageNum:this.params.pageNum,showQuickJumper:false,showSizeChanger:false}}
                            activeItem = {this.handleItem}
                            handleCurrent = {this.handleCurrent}
                        />
                    </div>
                    <div className="cont-right">
                        {taskList.rows&&taskList.rows.length>0?<DetailRight 
                                                    data= {planDetail}
                                                    currentItem={this.currentItem}
                                                    fields= {proLeaderList||[]}
                                                    taskPlanEdit={this.taskPlanEdit}
                                                    handleDelect = {this.handleDelect}
                                                    removeFileImg={this.removeFileImg}
                                                />:null}
                    </div>
                </div>
            </div>
        )
    }
}

export default PlanTaskDetailPage;