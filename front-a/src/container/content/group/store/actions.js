import {
    GROUP_STATUS_SUCCESS,
    GROUP_LIST_ACTION, GROUP_LIST,
    GROUP_EDIT_ACTION, 
    GROUP_COPY_ACTION,
    GROUP_DEL_ACTION,
    GROUP_LIST_JUR,
    GROUP_MEMBER_ACTION,GROUP_MEMBER,
    GROUP_MEMBER_DEL_ACTION,
} from './types';


/**
 * 用户组列表
 */
export const groupAction = (params) => {
    return {
        type: GROUP_LIST_ACTION,
        payload: params
    }
}
export const groupList = (params) => {
    return {
        type: GROUP_LIST,
        payloadList: params
    }
}

/**
 * 编辑
 */
export const groupEditAction=(params)=>{
    return {
        type:GROUP_EDIT_ACTION,
        payload:params,
    }
}


/**
 * 复制
 */
export const groupCopyAction=(params)=>{
    return {
        type:GROUP_COPY_ACTION,
        payload:params,
    }
}

/**
 * 删除
 */
export const groupDelAction=(params)=>{
    return {
        type:GROUP_DEL_ACTION,
        payload:params,
    }
}


/**
 * 成员管理
 */
export const groupMemberAction = (params) => {
    return {
        type: GROUP_MEMBER_ACTION,
        payload: params
    }
}
export const groupMemberList = (params) => {
    return {
        type: GROUP_MEMBER,
        payloadMember: params
    }
}

/**
 * 成员管理_删除
 */
export const memberDelAction = (params) => {
    return {
        type: GROUP_MEMBER_DEL_ACTION,
        payload: params
    }
}


//权限
export const controlJur = (data) => {
    return {
        type:GROUP_LIST_JUR,
        payload:data
    }
}
// 控制刷新
 
export const statusControl= (bool)=>{
    return {
        type:GROUP_STATUS_SUCCESS,
        payload:{status:bool}
    }
}
export const operationStatus = (data) => {
    return {
        type: GROUP_STATUS_SUCCESS,
        payload: data
    }
}