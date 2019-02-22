import Axios from './../../../utils/axios';
import { notification } from 'antd';
import { write ,read } from './../../../utils/localStorage';
import { VALID_CODE_SUCCESS,VALID_ERROR_MSG ,CLEAR_MSG,FORGET_RESET_SUCCESS } from './types';

/**
 * 重置时，验证 手机号与验证码是否成功
 * @param {*} value 
 */
export const validCodeAsync = (value) => {
    return async dispatch => {
        try {
            const res = await Axios.post({url:'bis/portal/login',data:{params:{ ...value,loginType:'bymobile',loginPortal:window.systemBaseConfig.loginPortal }}});
            if(res.data && typeof res.data.success === 'boolean') {
                if( res.data.success === false ) { 
                    dispatch( {type:VALID_ERROR_MSG,payload:res.data.message} );
                } else { 
                    const { content } = res.data;
                    write('authorization',content.authorization);
                    write('phone',value.name);
                    dispatch( { type:VALID_CODE_SUCCESS,payload:content } );
                }
            }
        } catch(e) {
            console.log('获取验证码err：',e);
        }
    }
}

export const clearMsg = () => {
    return { type: CLEAR_MSG};
}

export const forgetPwdSubmit = (value) => {
    return async dispatch => {
        try {
            let params = {userPhone:read('phone'),authorization:read('authorization'),userPwd:value.password};
            // let params = {userPhone:13550292480,authorization:read('authorization'),userPwd:value.password};
            console.log(params)
            const res = await Axios.post({url:'bis/portal/forgetPwd',data:{params,isShowLoading:true}});
            if(res.data && typeof res.data.success === 'boolean') {
                console.log(res.data)
                if( res.data.success === false ) { 
                    // dispatch( {type:VALID_ERROR_MSG,payload:res.data.message} );
                    notification.error({
                        message: '提示',
                        key:1,
                        description: res.data.message,
                    });
                } else { 
                    notification.success({
                        message: '提示',
                        key:1,
                        description: res.data.message,
                    });
                    dispatch( { type:FORGET_RESET_SUCCESS,payload:true} );
                }
            }
        } catch(e) {
            console.log('获取验证码err：',e);
        }
    }
}

/**
 * 还原重置状态
 */
export const resetPwdStatus = (type) => {
    return { type: FORGET_RESET_SUCCESS,payload:type};
}