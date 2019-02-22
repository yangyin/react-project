import { USER_INFO,USER_INFO_SUCCESS,MENU_SUCCESS,MENUS_ACTION } from './types';

export const userInfoAction = () =>{
    return {
        type:USER_INFO
    }
}
export const menuAction = (appId) =>{
    return {
        type:MENUS_ACTION,
        payload:appId
    }
}

export const userInfoSuccess = (data) =>{
    return {
        type:USER_INFO_SUCCESS,
        payload:data
    }
}

export const menuSuccess = (data) =>{
    return {
        type:MENU_SUCCESS,
        payload:data
    }
}