import {
    SYSTEM_POWER_SEARCH_USER_ACTION,SYSTEM_POWER_SEARCH_USER_SUCCESS,
    SYSTEM_POWER_CLEAR_USER,
    SYSTEM_POWER_ADD_AUTH_ACTION,SYSTEM_POWER_UPDATE_STATE,
    SYSTEM_POWER_AUTH_LIST_ACTION,SYSTEM_POWER_AUTH_LIST_SUCCESS,
    SYSTEM_POWER_UPDATE_STATE_ACTION,
    SYSTEM_POWER_JUR
} from './types';

//查询列表
export const sysPowerSelectAuthList = (params) => {
    return {
        type:SYSTEM_POWER_AUTH_LIST_ACTION,
        payload:params
    }
}
export const sysPowerSelectAuthListSuc = (data) => {
    return {
        type:SYSTEM_POWER_AUTH_LIST_SUCCESS,
        payload:data
    }
}
export const sysPowerJurAction = () => {
    return {
        type:SYSTEM_POWER_JUR
    }
}
//停用 /启用
export const sysPowerUpdateAuthStateAction = (params) => {
    return { 
        type:SYSTEM_POWER_UPDATE_STATE_ACTION,
        payload:params
    }
}
//查询user信息
export const getSysPowerSearchUserAction = (params) => {
    return {
        type:SYSTEM_POWER_SEARCH_USER_ACTION,
        payload:params
    }
}
export const getSysPowerSearchUserSuc = (data) => {
    return {
        type:SYSTEM_POWER_SEARCH_USER_SUCCESS,
        payload:data
    }
}

//清空user数据
export const sysPowerClearUser = () => {
    return {
        type:SYSTEM_POWER_CLEAR_USER
    }
}

//添加数据
export const sysPowerAddAuth = (params) => {
    return {
        type:SYSTEM_POWER_ADD_AUTH_ACTION,
        payload:params
    }
}
export const sysPowerAddAuthSuc = (data) => {
    return {
        type:SYSTEM_POWER_UPDATE_STATE,
        payload:data
    }
}