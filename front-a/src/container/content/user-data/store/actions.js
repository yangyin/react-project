
import { 
    USERDATA_ACTION, USERDATA_SUCCESS,
    USERDATA_CHARTS_ACTION, USERDATA_CHARTS_SUCCESS,
    USERDATA_SOURCE_ACTION, USERDATA_SOURCE_SUCCESS,
    USERDATA_COUNT_ACTION, USERDATA_COUNT_SUCCESS,
    USERDATA_COMMISSION_ACTION, USERDATA_COMMISSION_SUCCESS,
    USER_DATA_JURISDICTION
 } from './types';

 /**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: USER_DATA_JURISDICTION, payload:type}
}


// 获取昨日关键指标
export const userDataAction = (params) =>{
    return {
        type: USERDATA_ACTION,
        payload: params
    }
}

export const userDataSuccess = (data) =>{
    return {
        type: USERDATA_SUCCESS,
        payload: data
    }
}

// 获取用户数据
export const userDataChartsAction = (params) =>{
    return {
        type: USERDATA_CHARTS_ACTION,
        payload: params
    }
}

export const userDataChartsSuccess = (data) =>{
    return {
        type: USERDATA_CHARTS_SUCCESS,
        payload: data
    }
}

// 获取用户来源统计
export const userDataSourceAction = (params) =>{
    return {
        type: USERDATA_SOURCE_ACTION,
        payload: params
    }
}

export const userDataSourceSuccess = (data) =>{
    return {
        type: USERDATA_SOURCE_SUCCESS,
        payload: data
    }
}

// 获取用户数据统计
export const userDataCountsAction = (params) =>{
    return {
        type: USERDATA_COUNT_ACTION,
        payload: params
    }
}

export const userDataCountSuccess = (data) =>{
    return {
        type: USERDATA_COUNT_SUCCESS,
        payload: data
    }
}

// 获取用户佣金统计
export const userDataCommissionAction = (params) =>{
    return {
        type: USERDATA_COMMISSION_ACTION,
        payload: params
    }
}

export const userDataCommissionSuccess = (data) =>{
    return {
        type: USERDATA_COMMISSION_SUCCESS,
        payload: data
    }
}
