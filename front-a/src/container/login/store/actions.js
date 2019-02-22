
import { LOGIN_ACTION,LOGIN_SUCCESS } from './types';


export const loginAction = (user) =>{
    return {
        type:LOGIN_ACTION,
        payload:user
    }
}

export const loginSuccess = (data) =>{
    return {
        type:LOGIN_SUCCESS,
        payload:data
    }
}
