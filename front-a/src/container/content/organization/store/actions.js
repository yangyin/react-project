
import {
    ORGANIZATION_ERROR,
    ORGANIZATION_JUR,
    ORGANIZATION_STATUS_SUCCESS,
    ORGANIZATION_ACTION, ORGANIZATION_LIST, 
    ORGANIZATION_AUDIT_ACTION,
    ORGANIZATION_DELETE_ACTION, ORGANIZATION_DELETE,
    ORGANIZATION_DETAIL_INFO_ACTION,ORGANIZATION_DETAIL_INFO,
} from './types';

/**
 * 审核
 */
export const companyAuditAction = (params) => {
    return {
        type: ORGANIZATION_AUDIT_ACTION,
        payload: params
    }
}
export const companyAudit = (data) => {
    return {
        type: ORGANIZATION_STATUS_SUCCESS,
        payload: data
    }
}
/**
 * 操作成功状态
 */
export const statusControl = (bool)=>{
    return {
        type:ORGANIZATION_STATUS_SUCCESS,
        payload:{status:bool}
    }
}

/**
 * 企业用户列表
 */
export const companyAction = (params) => {
    return {
        type: ORGANIZATION_ACTION,
        payload: params
    }
}
export const userList = (data) => {
    return {
        type: ORGANIZATION_LIST,
        payload: data
    }
}



/**
 * 用户删除
 */
export const userDeleteAction = (params) => {
    return {
        type: ORGANIZATION_DELETE_ACTION,
        payload: params
    }
}
export const userDelete = (data) => {
    return {
        type: ORGANIZATION_DELETE,
        payloadDelete: data
    }
}
export const error = (data) => {
    return {
        type: ORGANIZATION_ERROR,
        payloadError: data
    }
}


/**
 * 获取详情
 */
export const userDetailInfoAction =(params)=>{
    return {
        type:ORGANIZATION_DETAIL_INFO_ACTION,
        payload:params
    }
}
export const userDetailInfo =(data)=>{
    return {
        type:ORGANIZATION_DETAIL_INFO,
        payloadInfo:data
    }
}
//权限
export const controlJur = (data) => {
    return {
        type:ORGANIZATION_JUR,
        payload:data
    }
}