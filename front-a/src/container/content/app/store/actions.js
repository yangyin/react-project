
import { 
    APP_ACTION, APP_ACTION_SUCCESS, 
    APP_DELETE_ACTION, APP_DELETE_SUCCESS, 
    APP_MANAGE_ACTION, APP_MANAGE_SUCCESS,
    DELETE_LABEL_ACTION, DELETE_LABEL_SUCCESS,
    ADD_LABEL_ACTION, ADD_LABEL_SUCCESS,
    UPDATE_CHECKBOX_ACTION, UPDATE_CHECKBOX_SUCCESS,
    APP_MANAGE_UPDATE_ACTION, APP_MANAGE_UPDATE_SUCCESS,
    AUDIT_ACTION, AUDIT_SUCCESS,
    APP_JURISDICTION
} from './types';

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: APP_JURISDICTION, payload:type}
}


// 获取招聘列表
export const appAction = (params) =>{
    return {
        type:APP_ACTION,
        payload:params
    }
}

export const appList = (data) =>{
    return {
        type:APP_ACTION_SUCCESS,
        payload:data
    }
}

// 获取删除招聘列表
export const appDeleteAction = (params) =>{
    return {
        type:APP_DELETE_ACTION,
        payload: params
    }
}

export const appDeleteSuccess = (data) =>{
    return {
        type:APP_DELETE_SUCCESS,
        payload:data
    }
}

// 审核招聘
export const auditAction = (params) =>{
    return {
        type:AUDIT_ACTION,
        payload: params
    }
}

export const auditSuccess = (data) =>{
    return {
        type:AUDIT_SUCCESS,
        payload:data
    }
}
// 删除招聘标签
export const deleteLabelAction = (params) =>{
    return {
        type:DELETE_LABEL_ACTION,
        payload: params
    }
}
export const deleteLabelSuccess = (params) =>{
    return {
        type:DELETE_LABEL_SUCCESS,
        payload: params
    }
}
// 新增招聘标签
export const addLabelAction = (params) =>{
    return {
        type:ADD_LABEL_ACTION,
        payload: params
    }
}

export const addLabelSuccess = (params) =>{
    return {
        type:ADD_LABEL_SUCCESS,
        payload: params
    }
}
// 更新复选框标签
export const updateCheckboxAction = (params) =>{
    return {
        type:UPDATE_CHECKBOX_ACTION,
        payload: params
    }
}

export const updateCheckboxSuccess = (params) =>{
    return {
        type:UPDATE_CHECKBOX_SUCCESS,
        payload: params
    }
}

// 获取应用设置
export const appManageAction = (params) =>{
    return {
        type:APP_MANAGE_ACTION,
        payload: params
    }
}

export const appManageSuccess = (data) =>{
    return {
        type:APP_MANAGE_SUCCESS,
        payload:data
    }
}

// 更新应用设置
export const appManageUpdateAction = (params) =>{
    return {
        type:APP_MANAGE_UPDATE_ACTION,
        payload: params
    }
}

export const appManageUpdateSuccess = (data) =>{
    return {
        type:APP_MANAGE_UPDATE_SUCCESS,
        payload:data
    }
}