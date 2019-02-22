
import { PLAN_LIST, PLAN_LIST_JURISDICTION, USE_PLAN } from './types';
import { CALL_API } from '../../../../applyMiddleWare/request';


/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: PLAN_LIST_JURISDICTION, payload:type}
}
/**
 * 更新使用方案状态
 * @param {boolean} bool 
 */
export const usePlanStatus = (bool) => {
    return { type: USE_PLAN, payload:{status:bool}};
}
// 页面初始化数据
export function initEducationPlan(id) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/getProAnswerProgrameByCompanyId',
            method:'POST',
            data:{isShowLoading:true, params: {'proId': id}},
            types:[PLAN_LIST,'', PLAN_LIST_JURISDICTION]
        }
    }
}

// 方案是否使用
export function useEducationPlan(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/userPrograme',
            method:'POST',
            data:{isShowLoading:true, params: options},
            isnotify: true,
            msgErr: '更新失败!',
            msgSuc: '更新成功！',
            types:[USE_PLAN]
        }
    }
}
