import {
    DASHBOARD_USER_INFO_ACTION,
    DASHBOARD_USER_INFO_SUC,
    DASHBOARD_LIST_ACTION,
    DASHBOARD_LIST_SUC,
    DASHBOARD_BULLETEDLIST_ACTION,DASHBOARD_BULLETEDLIST_SUC,
    DASHBOARD_JUR
} from './types';

//获取登录用户信息
export const getLoginUserInfoAction = () => {
    return {
        type:DASHBOARD_USER_INFO_ACTION
    }
}
export const getLoginUserInfoSuc = (data) => {
    return {
        type:DASHBOARD_USER_INFO_SUC,
        payload:data
    }
}

//获取列表
export const getListActon = (params) => {
    return {
        type:DASHBOARD_LIST_ACTION
    }
}
export const getListSuc = (data) => {
    return {
        type:DASHBOARD_LIST_SUC,
        payload:data
    }
}

//改版后列表
export const getbulletedListAction = () => {
    return {
        type:DASHBOARD_BULLETEDLIST_ACTION
    }
}
export const getbulletedListSuc = (data) => {
    return {
        type:DASHBOARD_BULLETEDLIST_SUC,
        payload:data
    }
}

//权限
export const dashboardJur = (data) => {
    return {
        type:DASHBOARD_JUR,
        payload:data
    }
}