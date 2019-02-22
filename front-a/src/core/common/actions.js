
import { PROJECT_TYPE_ACTION, PROJECT_TYPE_LIST,
    PROVINCE_ACTION,PROVINCE_SUCCESS,
    GET_VALID_CODE_ACTION,GET_VALID_CODE_SUCCESS,

} from './types';

export const projectTypeAction = (params) =>{
    return {
        type:PROJECT_TYPE_ACTION,
        payload:params
    }
}
export const projectTypeList = (data) =>{
    return {
        type:PROJECT_TYPE_LIST,
        payload:data
    }
}

// 省
export const getProvinceAction=(params)=>{
    return {
        type:PROVINCE_ACTION,
        payload:params,
    }
}
export const getProvince=(data)=>{
    return {
        type:PROVINCE_SUCCESS,
        payload:data,
    }
}

// 获取验证码

export const getValidCodeAction=(params)=>{
    return {
        type:GET_VALID_CODE_ACTION,
        payload:params,
    }
}
export const getValidCode=(data)=>{
    return {
        type:GET_VALID_CODE_SUCCESS,
        payload:data,
    }
}
