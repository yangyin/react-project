import { PLAN_TASK_LIST_SUCCESS,PLAN_TASK_ADD_SUCCESS ,PLAN_TASK_MARK,PLAN_DETAIL_SUCCESS,PLAN_DETAIL_DELETE,PLAN_DETAIL_UPDATE_SUCCESS,PLAN_TASK_LIST_JURISDICTION,PLAN_TASK_DELETE,PLAN_TASK_RATE_UPDATE} from './types';

const initState = {
    taskList:{}, //任务计划列表
    isMark:false, //控制是否关闭新增或者编辑 弹窗,
    planDetail:{},//当前数据详情
    isDetailStatus:false,//详情式编辑是否成功状态
    isJurisdiction:false,//控制权限是否显示403页面
    isPlanDelete:false, //控制页面删除任务 是否成功
    isUpdate:false
}

export default (state=initState,action) => {
    switch(action.type) {
        case PLAN_TASK_LIST_SUCCESS:
            return { ...state,taskList:action.payload.data };
        case PLAN_TASK_ADD_SUCCESS:
            return {...state,isMark:true};
        case PLAN_TASK_MARK:
            return { ...state,isMark:action.payload};
        case PLAN_DETAIL_SUCCESS:
            return { ...state,planDetail:action.payload.data};
        case PLAN_DETAIL_DELETE:
            return { ...state,planDetail:{}};
        case PLAN_DETAIL_UPDATE_SUCCESS:
            return {...state,isDetailStatus:action.payload.status};
        case PLAN_TASK_LIST_JURISDICTION:
            return {...state,isJurisdiction:action.payload};
        case PLAN_TASK_DELETE:
            return {...state,isPlanDelete:action.payload.status};
        case PLAN_TASK_RATE_UPDATE:
            return {...state,isUpdate:action.payload.status};
        default:
            return state;
    }
}