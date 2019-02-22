
import {
    ACCOUNT_DETAIL_INFO_ACTION,ACCOUNT_DETAIL_INFO,ACCOUNT_DETAIL_EDIT_ACTION,
    ACCOUNT_DETAIL_STATUS_SUCCESS,MYCOUNT_JUR,
} from './types';






/**
 * 获取账户详情
 */
export const accountInfoAction =(params)=>{
    return {
        type:ACCOUNT_DETAIL_INFO_ACTION,
        payload:params
    }
}
export const accountInfo =(data)=>{
    return {
        type:ACCOUNT_DETAIL_INFO,
        payloadInfo:data
    }
}
/**
 * 编辑详情
 */
export const accountEditAction =(params)=>{
    return {
        type:ACCOUNT_DETAIL_EDIT_ACTION,
        payload:params
    }
}
export const accountEdit =(data)=>{
    return {
        type:ACCOUNT_DETAIL_STATUS_SUCCESS,
        payload:data
    }
}

/**
 * 控制刷新状态
 */
 export const statusControl = (bool)=>{
     return {
         type:ACCOUNT_DETAIL_STATUS_SUCCESS,
         payload:{status:bool}
     }
 }

 //权限
export const controlJur = (data) => {
    return {
        type:MYCOUNT_JUR,
        payload:data
    }
}