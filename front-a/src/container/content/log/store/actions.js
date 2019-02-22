import { GET_LOG_ACTION,GET_LOG_SUCCESS ,GET_LOG_TYPE_ACTION,GET_LOG_TYPE_SUCCESS,GET_LOG_JUR} from './types';



//获取日志
export const getLogAction = (params) => {
    return {
        type:GET_LOG_ACTION,
        payload:params
    }
}
export const getLogSuccess = (data) => {
    return {
        type:GET_LOG_SUCCESS,
        payload:data
    }
}
export const getLogJur = () => {
    return {
        type:GET_LOG_JUR
    }
}

//类别
export const getLogTypeAction = () => {
    return {
        type:GET_LOG_TYPE_ACTION
    }
}
export const getLogTypeSuc = (data) => {
    return {
        type:GET_LOG_TYPE_SUCCESS,
        payload:data
    }
}