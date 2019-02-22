
import {
    USER_ERROR,
    USERMANAGE_JUR,
    USER_SUCCESS,
    USER_LIST, USER_ACTION, 
    USER_GROUP_LIST, USER_GROUP_ACTION,
    USER_DELETE_ACTION,
    USER_DETAIL_BLACK_ACTION, 
    USER_DETAIL_INFO_ACTION,USER_DETAIL_INFO,
} from './types';

/**
 * 用户列表
 */
export const userAction = (params) => {
    return {
        type: USER_ACTION,
        payload: params
    }
}
export const userList = (data) => {
    return {
        type: USER_LIST,
        payload: data
    }
}

/**
 * 用户分组
 */
export const usergroupAction = () => {
    return {
        type: USER_GROUP_ACTION,
        payload: ''
    }
}
export const userGroupList = (data) => {
    return {
        type: USER_GROUP_LIST,
        payloadGroup: data
    }
}

/**
 * 用户删除
 */
export const userDeleteAction = (params) => {
    return {
        type: USER_DELETE_ACTION,
        payload: params
    }
}

export const error = (data) => {
    return {
        type: USER_ERROR,
        payloadError: data
    }
}
/**
 * 详情-加入黑名单
 */
export const userDetailJoinAction = (params)=>{
    return {
        type:USER_DETAIL_BLACK_ACTION,
        payload:params
    }
}


/**
 * 获取详情
 */
export const userDetailInfoAction =(params)=>{
    return {
        type:USER_DETAIL_INFO_ACTION,
        payload:params
    }
}
export const userDetailInfo =(data)=>{
    return {
        type:USER_DETAIL_INFO,
        payloadInfo:data
    }
}

/**
 * 控制刷新状态
 */
export const statusControl = (bool) => {
    return {
        type: USER_SUCCESS,
        payload: { status: bool }
    }
}

export const operationStatus = (data) => {
    return {
        type: USER_SUCCESS,
        payload: data
    }
}

//权限
export const controlJur = (data) => {
    return {
        type:USERMANAGE_JUR,
        payload:data
    }
}