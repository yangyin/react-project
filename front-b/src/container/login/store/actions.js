
import { CALL_API } from '../../../applyMiddleWare/request';

import { LOGIN_SUCCESS,ERROR_MSG,LOGOUT } from './types';




// 登录
export function login({name,password,loginType}) {
    return {
        [CALL_API]: {
            url:'bis/portal/login',
            method:'POST',
            data:{isShowLoading:true,params:{name,password,loginType: loginType || 'bycode',loginPortal: window.systemBaseConfig.loginPortal}},
            types:[LOGIN_SUCCESS,ERROR_MSG]
        }
    }
}

//登出
export function logout() {
    return {type:LOGOUT};
}

//重置错误信息
export const resetErrorMsg = (msg) => {
    return { type:ERROR_MSG,payload:msg};
}