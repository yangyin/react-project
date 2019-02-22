// import Axios from '../../../../utils/axios';
import { CALL_API } from '../../../../applyMiddleWare/request';
import { COMPANYINFO, COMPANYINFO_ERROR, COMPANYTYPE, COMPANYTYPE_ERROR, COMPANYTYPE_JURISDICTION ,AUTH_COMPANY_INFO_SUCCESS}  from './types';
// import { notification } from 'antd';

// 更改权限状态
export const jurisdictionStatus = ( type ) => {
    return { type: COMPANYTYPE_JURISDICTION, payload: true }
}

//获取用户是否实名认证状态

export function getCompanyAuth(){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/user/getCompanyStatus',
            method: 'POST',
            data:{ isShowLoading: true },
            types: [COMPANYINFO,COMPANYINFO_ERROR,COMPANYTYPE_JURISDICTION]
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/user/getCompanyStatus', data:{ isShowLoading: true }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
    //                 const { content } = res.data;
    //                 dispatch({ type: COMPANYINFO, payload: content });
    //             }else{
    //                 dispatch({ type: COMPANYINFO_ERROR, payload: res.data.message });
    //             }
    //         }
    //     }catch(e){
    //         // console.log('realName error: ', e);
    //         const { message } = e;
    //         if( message === 403 ){
    //             dispatch(jurisdictionStatus(true));
    //         }
    //     }
    // }
}

// 查询企业类型
export function selectCompanyType(){
    return {
        [CALL_API]: {
            // url: '/sdpbusiness/dictionaries/findDictionaryList?dicType=companytype',
            url: '/sdpbusiness/user/findCompanyTypeList',
            method: 'POST',
            data:{ },
            types: [COMPANYTYPE,COMPANYTYPE_ERROR]
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.get({url:'/sdpbusiness/dictionaries/findDictionaryList?dicType=companytype' })
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
    //                 const { content } = res.data;
    //                 dispatch({ type: COMPANYTYPE, payload: content });
    //             }else{
    //                 dispatch({ type: COMPANYTYPE_ERROR, payload: res.data.message });
    //             }
    //         }
    //     }catch(e){
    //         console.log('realName error: ', e);
    //     }
    // }
}

export function submitAuthInfo(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/user/authBusinessInfo',
            method: 'POST',
            data: { isShowLoading: true, params: opt },
            types:[AUTH_COMPANY_INFO_SUCCESS],
            isnotify: true
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.get({url:'/sdpbusiness/user/authBusinessInfo', data: { params: opt }})
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

export const authInfoStatus =(bool) => {
    return {type:AUTH_COMPANY_INFO_SUCCESS,payload:{status:bool}};
}