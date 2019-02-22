// import Axios from '../../../../utils/axios';
import { CALL_API } from '../../../../applyMiddleWare/request';
import { SECURITYINFO, SECURITYINFO_ERROR, SECURITYINFO_JURISDICTION ,SECURITYINFO_UPDATE_PHONE} from './types';
// import { notification } from 'antd';


// 更改权限状态
export const jurisdictionStatus = (type) => {
    return { type: SECURITYINFO_JURISDICTION, payload:type}
}

// 获取安全设置详情
export function getSecurityInfo(){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/user/selectUserInfoForDetail',
            method: 'POST',
            data:{ isShowLoading: true },
            types: [SECURITYINFO,SECURITYINFO_ERROR,SECURITYINFO_JURISDICTION]
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/user/selectUserInfoForDetail' })
    //         if( res.data && typeof res.data.success === 'boolean' ){
    //             if( res.data.success === true ){
    //                 const { content } = res.data;
    //                 dispatch({ type: SECURITYINFO, payload: content })
    //             }else{
    //                 dispatch({ type: SECURITYINFO_ERROR, payload: res.data.message })
    //             }
    //         }
    //     }catch(e){
    //         const { message } = e;
    //         console.log('security error: ',e)
            
    //         if (message == 403) {
    //             dispatch(jurisdictionStatus(true));
    //         }
            
    //     }
    // }
}

//资料修改
export function updateSecurityInfo(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/user/updateUserInfoForDetail',
            method: 'POST',
            types:[SECURITYINFO_UPDATE_PHONE,SECURITYINFO_UPDATE_PHONE],
            data: { params: opt },
            isnotify: true
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/user/updateUserInfoForDetail', data: { params: opt }})
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
    //         console.log('security error: ', e);
    //     }
    // }
}
export const updateSecurityStatus = (bool) => {
    return {type:SECURITYINFO_UPDATE_PHONE,payload:{status:bool}};
}