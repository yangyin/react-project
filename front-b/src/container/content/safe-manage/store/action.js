
import {
  PRO_SAFE_JURISDICTION,
  SAFE_LIST,
  SAFE_ERROR,
  SAFE_MARK,
  SAFE_QUA_DETAIL,
  SAFE_QUA_AUDIT,
  SAFE_QUA_UPDATE,
} from './types';
import { CALL_API } from '@/applyMiddleWare/request';


/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = type => {
  return {type: PRO_SAFE_JURISDICTION, payload: type};
};
//获取安全管理列表
export const getSafeList = option => {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/task/selectSecurityList',
            data:{isShowLoading: false, params: option},
            types:[SAFE_LIST,SAFE_ERROR,PRO_SAFE_JURISDICTION],
        }
    }
};

/**
 * 新增质量管理
 * @param {*} proId: 0068//项目id
 * @param checkTime: 2018-08-12 //检查时间
 * @param planId: //关联的计划或者标段 有计划就计划的id 没有就传空
 * @param qualityPerson: 质检人员2
 * @param {*} checkSituation: 检查情况2
 * @param pictures:[{url:'a.png'}]
 * @param {*} isCheck:1整改  0不整改 //是否整改 需要整改再传整改信息
 * @param {*} checkContent:整改要求2
 * @param {*} RectificationTime: 2018-08-12 整改时间
 * @param {*} ExecutorPerson:执行人
 * @param AuditorPerson: GotnksnDoGSkmsHjBTo审核人
 */

export const qualitAdd = (option,params)=> {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/task/addSecurity',
            method:'POST',
            data:{isShowLoading: true, params: option},
            types:['',SAFE_ERROR,PRO_SAFE_JURISDICTION],
            isnotify:true,
            callback:(data,dispatch)=>{
                dispatch ( updateMark (false));
                dispatch ( getSafeList (params));
            }
        }
    }
};
// 更改isMark 状态
export const updateMark = bol => {
  return {type: SAFE_MARK, payload: bol};
};

/**
 * 获取质量和安全管理详情
 * @param {*id} params 
 */
export const getDetailInfo=(params)=>{
    return {
        [CALL_API]: {
            url:'sdpbusiness/task/findQualityDetailByType',
            method:'POST',
            data:{isShowLoading: true, params: params},
            types:[SAFE_QUA_DETAIL]
        }
    }
}
/**
 * 获取质量和安全管理审批
 * @param {*type} 	安全传 AQ 质量传其他 
 * @param {*wifd} 	流程id 
 * @param {*agree} 	1 同意 0拒绝 
 * @param {*handleNote} 备注
 */
export const auditAction=(params)=>{
    return {
        [CALL_API]: {
            url:'sdpbusiness/task/sectityAuditButton',
            method:'POST',
            data:{isShowLoading: true, params: params},
            types:[SAFE_QUA_AUDIT],
            isnotify:true,
        }
    }
}
/**
 * 安全、质量整改
 * @param {id} params 
 */
export const updateSafeAndQua=(params)=>{
    return {
        [CALL_API]: {
            url:'sdpbusiness/task/updateSectityState',
            method:'POST',
            data:{isShowLoading: true, params: params},
            types:[SAFE_QUA_UPDATE],
            isnotify:true,
        }
    }
}

// 整改和审核触发更新
export const updateAction=(boolean)=>{
    return {type:SAFE_QUA_UPDATE,payload:{status:boolean}};
}
