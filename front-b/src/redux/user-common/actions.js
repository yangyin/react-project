import { IS_PHONE_REGISTER ,
    VALID_ERROR_MSG,
    GET_VALID_CODE_SUCCESS,
    GET_VALID_CODE_REGISTER_SUCCESS,
    VALID_REGISTER_ERROR_MSG,
    USER_COMMON_CLEAR,
    GET_VALID_CODE_INFO_SUCCESS,
    VALID_CODE_INFO_ERROR
    } from './types';
import { CALL_API } from '@/applyMiddleWare/request';
/**
 * 验证手机号是否注册
 * @param {*phone} params 
 */
export function validPhoneRegister(params) {
    return {
        [CALL_API] : {
            url:'bis/portal/checkPhone',
            data:{isShowLoading:true,params},
            types:[IS_PHONE_REGISTER,IS_PHONE_REGISTER]
        }
    }
}
/**
 * 更改验证手机号状态
 * type:true or false
 */
export function validPhoneRegisterStatus(type) {
    return { type:IS_PHONE_REGISTER,payload:{status:type} };
}
/**
 * 获取验证码
 * @param {*} value 
 */
export const getValidCodeAsync = (params,url) => {
    return {
        [CALL_API]: {
            url:url || 'bis/portal/sendMessageCode',
            method:'post',
            data:{params,isShowLoading:true},
            types:[GET_VALID_CODE_SUCCESS,VALID_ERROR_MSG],
            isnotify:true
        }
    }
    // return async dispatch => {
    //     try {
    //         const res = await Axios.post({url:'bis/portal/sendMessageCode',data:{params} } );
    //         if(res.data && typeof res.data.success === 'boolean') {
    //             if( res.data.success === false ) { 
    //                 dispatch({type:VALID_ERROR_MSG,payload:res.data.message});
    //             } else { 
    //                 dispatch( { type:GET_VALID_CODE_SUCCESS });
    //             }
    //         }
    //     } catch(e) {
    //         console.log('获取验证码err：',e);
    //     }
    // }
}

//注册，登录获取验证码
export const getValidCodeRegister = (params) => {
    
    return {
        [CALL_API]: {
            url:'bis/portal/registerSendMessageCode',
            data:{params},
            types:[GET_VALID_CODE_REGISTER_SUCCESS,VALID_REGISTER_ERROR_MSG],
            isnotify: true,
        }
    }
    // return async dispatch => {
    //     try {
    //         const res = await Axios.get({url:'bis/portal/registerSendMessageCode',data:{params} } );
    //         if(res.data && typeof res.data.success === 'boolean') {
    //             if( res.data.success === false ) { 
    //                 dispatch({type:VALID_REGISTER_ERROR_MSG,payload:res.data.message});
    //             } else { 
    //                 dispatch( { type:GET_VALID_CODE_REGISTER_SUCCESS });
    //             }
    //         }
    //     } catch(e) {
    //         console.log('获取验证码err：',e);
    //     }
    // }
}

//还原状态
export const userCommonStatusInit = () => {
    return { type: USER_COMMON_CLEAR};
}

/**
 * 获取验证码
 * @param {*} value 
 */
export const getValidCodeInfomation = (params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/getMessageCode',
            method:'post',
            data:{params, isShowLoading:false},
            isnotify: true,
            types:[GET_VALID_CODE_INFO_SUCCESS, VALID_CODE_INFO_ERROR]
        }
    }
}    
