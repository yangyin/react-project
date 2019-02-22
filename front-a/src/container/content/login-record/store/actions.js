
import {
    LOGINRECORD_ACTION, 
    LOGINRECORD_LIST,
    LOGINRECORD_JUR,
} from './types';

/**
 * 用户列表
 */
export const loginListAction = (params) => {
    return {
        type: LOGINRECORD_ACTION,
        payload: params
    }
}
export const loginList = (data) => {
    return {
        type: LOGINRECORD_LIST,
        payload: data
    }
}

//权限
export const controlJur = (data) => {
    return {
        type:LOGINRECORD_JUR,
        payload:data
    }
}