
import { 
    SETTING_PLATFORM_ACTION, SETTING_ACTION_SUCCESS,
    SETTING_CLAUSE_ACTION, SETTING_CLAUSE_SUCCESS,
    CLAUSE_EDIT_ACTION, CLAUSE_EDIT_SUCCESS,
    PLATFORM_ADD_OR_UPDATE_ACTION,PLATFORM_ADD_OR_UPDATE_STATE,
    SETTING_AD_POS_LIST_ACTION,SETTING_AD_POS_LIST_SUCCESS,
    SETTING_AD_POS_UPDATE_ACTION,
    SETTING_AD_CONTNET_LIST_ACTION,SETTING_AD_CONTNET_LIST_SUCCESS,
    SETTING_AD_CONTNET_STATE_ACTION, SETTING_AD_CONTNET_STATE_SUCCESS,
    SETTING_AD_CONTNET_ADD_ACTION, SETTING_AD_CONTNET_ADD_SUCCESS,
    SETTING_AD_CLEAR,SETTING_POS_AND_PLATFORM_CLEAR,
    SETTING_JURISDICTION
} from './types';

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: SETTING_JURISDICTION, payload:type}
}

// 获取平台维护列表
export const settingAction = (params) =>{
    return {
        type:SETTING_PLATFORM_ACTION,
        payload:params
    }
}
export const settingList = (data) =>{
    return {
        type:SETTING_ACTION_SUCCESS,
        payload:data
    }
}

//平台维护新增或修改
export const platformUpdateAction = (params) =>{
    return {
        type:PLATFORM_ADD_OR_UPDATE_ACTION,
        payload:params
    }
}
export const platformUpdateState = (data) =>{
    return {
        type:PLATFORM_ADD_OR_UPDATE_STATE,
        payload:data
    }
}

//广告位置
//列表
export const getSettingAdPosListAction = (params) => {
    return {
        type:SETTING_AD_POS_LIST_ACTION,
        payload:params
    }
}
export const getSettingAdPosListSuc = (data) => {
    return {
        type:SETTING_AD_POS_LIST_SUCCESS,
        payload:data
    }
}
//编辑 / 新增
export const settingAdPosUpdate = (params) => {
    return {
        type:SETTING_AD_POS_UPDATE_ACTION,
        payload:params
    }
}
export const settingAdPosUpdateState = (data) => {
    return {
        type:PLATFORM_ADD_OR_UPDATE_STATE,
        payload:data
    }
}

//广告内容
//列表
export const getSettingAdContentListAction = (params) => {
    return {
        type:SETTING_AD_CONTNET_LIST_ACTION,
        payload:params
    }
}
export const getSettingAdContentListSuc = (data) => {
    return {
        type:SETTING_AD_CONTNET_LIST_SUCCESS,
        payload:data
    }
}
// 启用、 停用
export const getSettingAdContentStateAction = (params) => {
    return {
        type:SETTING_AD_CONTNET_STATE_ACTION,
        payload:params
    }
}
export const getSettingAdContentStateSuc = (data) => {
    return {
        type:SETTING_AD_CONTNET_STATE_SUCCESS,
        payload:data
    }
}
// 新增
export const getSettingAdContentAddAction = (params) => {
    return {
        type:SETTING_AD_CONTNET_ADD_ACTION,
        payload:params
    }
}
export const getSettingAdContentAddSuc = (data) => {
    return {
        type:SETTING_AD_CONTNET_ADD_SUCCESS,
        payload:data
    }
}


//广告板块，数据清空
export const settingAdClear = () => {
    return {
        type:SETTING_AD_CLEAR
    }
}

//平台列表，平台位置清空，主要解决，广告内容默认下拉数据
export const settingPosAndPlatformClear = () => {
    return {
        type:SETTING_POS_AND_PLATFORM_CLEAR
    }
}










// 获取条款管理列表
export const settingClauseAction = (params) =>{
    return {
        type:SETTING_CLAUSE_ACTION,
        payload:params
    }
}

export const settingClause = (data) =>{
    return {
        type:SETTING_CLAUSE_SUCCESS,
        payload:data
    }
}

// 编辑条款管理
export const editClauseAction = (params) =>{
    return {
        type:CLAUSE_EDIT_ACTION,
        payload:params
    }
}

export const editClause = (data) =>{
    return {
        type:CLAUSE_EDIT_SUCCESS,
        payload:data
    }
}