import { 
    INFO_ASSIS_MANAGE_LIST_ACTION,
    INFO_ASSIS_MANAGE_LIST_SUCCESS, 
    INFO_ASSIS_MANAGE_EDIT_ACTION,
    INFO_ASSIS_MANAGE_UPDATE,
    INFO_ASSIS_MANAGE_FETCH_USER_ACTION,
    INFO_ASSIS_MANAGE_FETCH_USER_SUCCESS,
    INFO_ASSIS_MANAGE_TARTGET_LIST_ACTION,
    INFO_ASSIS_MANAGE_TARTGET_LIST_SUCCESS,
    INFO_ASSIS_MANAGE_CLEAR
} from './types';


//获取列表
export const getInfoAssisManageListAcion = (params) => {
    return {
        type:INFO_ASSIS_MANAGE_LIST_ACTION,
        payload:params
    }
}
export const getInfoAssisManageListSuccess = (data) => {
    return {
        type:INFO_ASSIS_MANAGE_LIST_SUCCESS,
        payload:data
    }
}

//编辑，添加
export const getInfoAssisManageEditAcion = (params) => {
    return {
        type:INFO_ASSIS_MANAGE_EDIT_ACTION,
        payload:params
    }
}


//更新成功
export const getInfoAssisManageUpdate = (data) => {
    return {
        type:INFO_ASSIS_MANAGE_UPDATE,
        payload:data
    }
}

//用户搜索
export const getInfoAssisManageFetchUser = (params) => {
    return {
        type:INFO_ASSIS_MANAGE_FETCH_USER_ACTION,
        payload:params
    }
}
export const getInfoAssisManageUserSuc = (data) => {
    return {
        type:INFO_ASSIS_MANAGE_FETCH_USER_SUCCESS,
        payload:data
    }
}

//获取通知对象
export const getInfoAssisManageTargetListAction = (params) => {
    return {
        type:INFO_ASSIS_MANAGE_TARTGET_LIST_ACTION,
        payload:params
    }
}
export const getInfoAssisManageTargetListSuccess = (data) => {
    return {
        type:INFO_ASSIS_MANAGE_TARTGET_LIST_SUCCESS,
        payload:data
    }
}

//清数据
export const clearUserListAction = () => {
    return {
        type:INFO_ASSIS_MANAGE_CLEAR
    }
}

