// import Axios from '../../../../utils/axios';
import { CALL_API } from '../../../../applyMiddleWare/request';
import { AUTHINFO, AUTHINFO_ERROR, AUTHINFO_JURISDICTION,AUTHINFO_SUCCESS }  from './types';
// import { notification } from 'antd';

// 更改权限状态
export const jurisdictionStatus = (type) => {
    return { type: AUTHINFO_JURISDICTION, payload: type}
}

//获取用户是否实名认证状态

export function getUserAuthInfo(){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/user/getUserStatus',
            method: 'POST',
            data:{ isShowLoading: true },
            types: [AUTHINFO,AUTHINFO_ERROR,AUTHINFO_JURISDICTION]
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/user/getUserStatus', data:{ isShowLoading: true }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
    //                 const { content } = res.data;
    //                 dispatch({ type: AUTHINFO, payload: content });
    //             }else{
    //                 dispatch({ type: AUTHINFO_ERROR, payload: res.data.message });
    //             }
    //         }
    //     }catch(e){
    //         // console.log('realName error: ', e);
    //         const { message } = e;
    //         if( message === 403 ){
    //             dispatch( jurisdictionStatus( true ) )
    //         }
    //     }
    // }
}

// 实名认证提交
export function submitAuthInfo(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/user/authUser',
            method: 'POST',
            types:[AUTHINFO_SUCCESS,AUTHINFO_SUCCESS],
            data: { isShowLoading: true, params: opt },
            isnotify: true
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.get({url:'/sdpbusiness/user/authUser', data: { params: opt }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if( res.data.success === true ){
    //                 notification.success({
    //                     key:'1',
    //                     message: '提示',
    //                     description: res.data.message,
    //                 });
    //             }else{
    //                 notification.error({
    //                     key:'1',
    //                     message: '提示',
    //                     description: res.data.message,
    //                 });
    //             }
    //         }
    //     }catch(e){
    //         console.log('realName error: ', e);
    //     }
    // }
}
export const authStatus = (bool) => {
    return { type:AUTHINFO_SUCCESS,payload:{status:bool}};
}