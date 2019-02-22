import {
    PLAN_TASK_LIST_SUCCESS,
    PLAN_TASK_ADD_SUCCESS,
    PLAN_TASK_MARK,
    PLAN_DETAIL_SUCCESS,
    PLAN_DETAIL_DELETE,
    PLAN_DETAIL_UPDATE_SUCCESS,
    PLAN_TASK_LIST_JURISDICTION,
    PLAN_TASK_DELETE,
    PLAN_TASK_RATE_UPDATE
} from './types';
import { CALL_API } from '@/applyMiddleWare/request';


/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: PLAN_TASK_LIST_JURISDICTION, payload: type }
}

//获取计划任务列表
export const getTaskList = (option) => {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/task/selectPlanList',
            method: 'POST',
            data: { isShowLoading: true, params: option },
            types: [PLAN_TASK_LIST_SUCCESS, , PLAN_TASK_LIST_JURISDICTION]
        }
    }
}

//新增计划 / 编辑计划
export const TaskPlanAdd = ({ url, params }) => {
    return {
        [CALL_API]: {
            url: url,
            method: 'POST',
            data: { isShowLoading: true, params },
            types: [PLAN_TASK_ADD_SUCCESS],
            isnotify: true
        }
    }

}
//删除计划
export const planDelete = (id, proId) => {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/task/deletePlan',
            method: 'POST',
            data: { isShowLoading: true, params: { id, proId } },
            types: [PLAN_TASK_DELETE],
            isnotify: true
        }
    }
}

/**
 * 更新删除状态
 * @param {boolean} bool 
 */
export const planDeleteStatus = (bool) => {
    return { type: PLAN_TASK_DELETE, payload: { status: bool } };
}

//更改isMark 状态
export const updateMark = (bol) => {
    return { type: PLAN_TASK_MARK, payload: bol };
}
//请求当前数据详情
export const findPlanDetail = (id) => {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/task/findPlanDetail',
            method: 'POST',
            data: { isShowLoading: true, params: { id } },
            types: [PLAN_DETAIL_SUCCESS],
            isnotify: true,
            msgSuc: false
        }
    }
    /*     return async dispatch => {
            try {
                const res = await Axios.post({url:'sdpbusiness/task/findPlanDetail',data:{isShowLoading:true,params:{id}}});
                if(res.data && typeof res.data.success === 'boolean') {
                    // console.log(res.data)
                    if( res.data.success === false ) { 
                        // dispatch( {type:REGION_ERROR,payload:res.data.message } );
                        notification.error({
                            key:'1',
                            message: '提示',
                            description: res.data.message,
                        });
                    } else { 
                        const { content } = res.data;
                        dispatch({type:PLAN_DETAIL_SUCCESS,payload:content});
                    }
                }
            } catch(e) {
                // console.log('login error: ',e);
                notification.error({
                    key:'1',
                    message: '提示',
                    description: '请求详情失败',
                });
            }
        } */
}

//清除详情数据
export const deleteDetail = () => {
    return { type: PLAN_DETAIL_DELETE }
}

/**
 * 详情式 编辑计划
 * @param {*} params 
 * id proId AuditorPerson option
 */
export const planUpdateDetail = (params) => {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/task/updatePlan',
            method: 'POST',
            data: { isShowLoading: true, params },
            types: [PLAN_DETAIL_UPDATE_SUCCESS],
            isnotify: true
        }
    }
    /*     return async dispatch => {
            try {
                const res = await Axios.post({url:'sdpbusiness/task/updatePlan',data:{isShowLoading:true,params}});
                if(res.data && typeof res.data.success === 'boolean') {
                    // console.log(res.data)
                    const { message } = res.data;
                    if( res.data.success === false ) { 
                        notification.error({
                            key:'1',
                            message: '提示',
                            description: message,
                        });
                    } else { 
                        
                        notification.success({
                            key:'1',
                            message: '提示',
                            description: message,
                        });
                        dispatch({type:PLAN_DETAIL_UPDATE_SUCCESS,payload:true});
                    }
                }
            } catch(e) {
                // console.log('login error: ',e);
                notification.error({
                    key:'1',
                    message: '提示',
                    description: '失败',
                });
            }
        } */
}
//更改状态 
export const planUpdateDetailStatus = (bool) => {
    return { type: PLAN_DETAIL_UPDATE_SUCCESS, payload: { status: bool } };
}

//修改任务进度
export const updatePlanRateAction = (params) => {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/task/updatePlanRate',
            method: 'POST',
            data: { isShowLoading: true, params },
            types: [PLAN_TASK_RATE_UPDATE],
            isnotify: true,
            msgSuc: ''
        }
    }
}

export const updatePlanRateStatus = (bool) => {
    return { type:PLAN_TASK_RATE_UPDATE,payload:{status:bool}}
}


