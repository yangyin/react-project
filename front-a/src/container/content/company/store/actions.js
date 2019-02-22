
import {
    COMPANY_ERROR,COMPANY_JUR,
    COMPANY_AUDIT,
    COMPANY_ACTION, COMPANY_LIST, 
    COMPANY_DELETE_ACTION, COMPANY_DELETE,
    COMPANY_BSYSTEM_ACTION, COMPANY_BSYSTEM,
    COMPANY_DETAIL_INFO_ACTION,COMPANY_DETAIL_INFO,
    COMPANY_DETAIL_EDIT_ACTION,COMPANY_DETAIL_EDIT_SUCCESS,
} from './types';

/**
 * 企业用户审核
 * 
 */
export const companyAuditAction = (params) => {
    return {
        type: COMPANY_AUDIT,
        payload: params
    }
}

/**
 * 企业用户列表
 */
export const companyAction = (params) => {
    return {
        type: COMPANY_ACTION,
        payload: params
    }
}
export const userList = (data) => {
    return {
        type: COMPANY_LIST,
        payload: data
    }
}



/**
 * 用户删除
 */
export const userDeleteAction = (params) => {
    return {
        type: COMPANY_DELETE_ACTION,
        payload: params
    }
}
export const userDelete = (data) => {
    return {
        type: COMPANY_DELETE,
        payloadDelete: data
    }
}
export const error = (data) => {
    return {
        type: COMPANY_ERROR,
        payloadError: data
    }
}


/**
 * 获取详情
 */
export const userDetailInfoAction =(params)=>{
    return {
        type:COMPANY_DETAIL_INFO_ACTION,
        payload:params
    }
}
export const userDetailInfo =(data)=>{
    return {
        type:COMPANY_DETAIL_INFO,
        payloadInfo:data
    }
}
/**
 * 编辑详情
 */
export const companyEditAction =(params)=>{
    return {
        type:COMPANY_DETAIL_EDIT_ACTION,
        payload:params
    }
}

/**
 * 代管
 */
export const companySystemAction =(params)=>{
    return {
        type:COMPANY_BSYSTEM_ACTION,
        payload:params
    }
}
export const systemCompany =(data)=>{
    return {
        type:COMPANY_BSYSTEM,
        payloadSystem:data
    }
}

/**
 * 控制刷新状态
 */
export const companyEdit =(data)=>{
    return {
        type:COMPANY_DETAIL_EDIT_SUCCESS,
        payload:data
    }
}
 export const statusControl = (bool)=>{
     return {
         type:COMPANY_DETAIL_EDIT_SUCCESS,
         payload:{status:bool}
     }
 }
 //权限
export const controlJur = (data) => {
    return {
        type:COMPANY_JUR,
        payload:data
    }
}