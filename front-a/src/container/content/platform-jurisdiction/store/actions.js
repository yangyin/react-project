import {
    PLATFORM_JURISDICTION_LIST_ACTION,
    PLATFORM_JURISDICTION_LIST_SUCCESS,
    PLATFORM_SEARCH_USER_ACTION,
    PLATFORM_SEARCH_USER_SUCCESS,
    PLATFORM_USER_GROUP_CLEAR,
    PLATFORM_JURISDICTION_SAVE_SUCCESS,
    PLATFORM_JURISDICTION_GET_DEL_ACTION,
    PLATFORM_JURISDICTION_GET_DEL_SUCCESS,
    PLATFORM_JURISDICTION_DEL_ACTION,
    PLATFORM_JURISDICTION_SAVE_ACTION,
    PLATFORM_JURISDICTION_DEL_SUCCESS,
    PLATFORM_JUST_DEL_CLEAR,
    PLATFORM_JURISDICTION_LIST_JUR
} from './types';

export const getJurisdictionListAction = () => {
    return {
        type: PLATFORM_JURISDICTION_LIST_ACTION
    }
}

export const getListSuccess = (data) => {
    return {
        type: PLATFORM_JURISDICTION_LIST_SUCCESS,
        payload: data
    }
}
export const getListJur = (data) => {
    return {
        type: PLATFORM_JURISDICTION_LIST_JUR,
        payload: data
    }
}

//搜索用户
export const platformSearchUser = (data) => {
    return {
        type: PLATFORM_SEARCH_USER_ACTION,
        payload: data
    }
}
export const platformSearchUserSuccess = (data) => {
    return {
        type: PLATFORM_SEARCH_USER_SUCCESS,
        payload: data
    }
}

//清除用户组的数据
export const platformUserGroupClear = () => {
    return {
        type: PLATFORM_USER_GROUP_CLEAR
    }
}

//保存授权对象
export const platJurisdictionSave = (params) => {

    return {
        type: PLATFORM_JURISDICTION_SAVE_ACTION,
        payload: params
    }
}
export const platJurisdictionSaveSuccess = (data) => {
    return {
        type: PLATFORM_JURISDICTION_SAVE_SUCCESS,
        payload: data
    }
}
export const platJurisdictionSaveStatus = (bool) => {
    return {
        type: PLATFORM_JURISDICTION_SAVE_SUCCESS,
        payload: { status: bool }
    }
}

//删除,请求列表
export const platformJurisdictionGetDelAction = (params) => {
    return {
        type: PLATFORM_JURISDICTION_GET_DEL_ACTION,
        payload: params
    }
}
export const platformJurisdictionGetDelSuccess = (data) => {
    return {
        type: PLATFORM_JURISDICTION_GET_DEL_SUCCESS,
        payload: data
    }
}

//删除
export const platformJurisdictionDelAction = (params) => {
    return {
        type: PLATFORM_JURISDICTION_DEL_ACTION,
        payload: params
    }
}
export const platformJurisdictionDelSuccess = (data) => {
    return {
        type: PLATFORM_JURISDICTION_DEL_SUCCESS,
        payload: data
    }
}

export const platformJurisdictionDelStatus = (bool) => {
    return {
        type: PLATFORM_JURISDICTION_DEL_SUCCESS,
        payload: { status: bool }
    }
}

//清除删除授权数据
export const platformDelClear = () => {
    return {
        type: PLATFORM_JUST_DEL_CLEAR
    }
}