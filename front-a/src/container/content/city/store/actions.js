import {
    GET_CITY_LIST_ACTION,
    GET_CITY_LIST_SUCCESS,
    GET_CITY_UPDATE_ACTION,
    GET_CITY_UPDATE_SUCCESS,
    GET_CITY_ADD_ACTION,
    GET_CITY_LIST_JUR
} from './types';

//获取列表
export const getCityListAction = (params) => {
    return {
        type:GET_CITY_LIST_ACTION,
        payload:params
    }
}
export const getCityListSuccess = (data) => {
    return {
        type:GET_CITY_LIST_SUCCESS,
        payload:data
    }
}
export const getCityListJur = (data) => {
    return {
        type:GET_CITY_LIST_JUR,
        payload:data
    }
}

//操作
export const handleCityAction = (params) => {
    return {
        type:GET_CITY_UPDATE_ACTION,
        payload:params
    }
}
export const handleCitySuccess = (data) => {
    return {
        type:GET_CITY_UPDATE_SUCCESS,
        payload:data
    }
}

//新增
export const cityAddAction = (params) => {
    return {
        type:GET_CITY_ADD_ACTION,
        payload:params
    }
}