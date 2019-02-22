// import Axios from '../../../../utils/axios';
import { CALL_API } from '../../../../applyMiddleWare/request';
import { DEFAULTAUTHLIST, DEFAULTAUTHLIST_ERROR, AUTHLIST, AUTHLIST_ERROR, DEFAULTAUTHLIST_JURISDICTION } from './types';
// import { notification } from 'antd';

// 更改权限状态
export const jurisdictionStatus = (type) => {
    return { type: DEFAULTAUTHLIST_JURISDICTION, payload:type}
}

export function getDefaultAuth(id){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/project/getProProjectRelationInfo',
            method: 'POST',
            data: { isShowLoading: true, params: { 'proId': id } },
            types: [DEFAULTAUTHLIST,DEFAULTAUTHLIST_ERROR,DEFAULTAUTHLIST_JURISDICTION]
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/project/getProProjectRelationInfo', data: { params: { 'proId': id } } })
    //         if( res.data && typeof res.data.success === 'boolean' ){
    //             if( res.data.success === true ){
    //                 const { content } = res.data;
    //                 dispatch({ type: DEFAULTAUTHLIST, payload: content })
    //             }else{
    //                 dispatch({ type: DEFAULTAUTHLIST_ERROR, payload: res.data.message })
    //             }
    //         }
    //     }catch(e){
    //         const { message } = e;
    //         if( message === 403 ){
    //             dispatch( jurisdictionStatus(true) );
    //         }
    //         // console.log( 'project auth ', e );
    //     }
    // }
}

export function getOtherAuthList(id){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/project/getPgeListByCompanyId',
            method: 'POST',
            data: { isShowLoading: true, params: { 'proId': id } },
            types: [AUTHLIST,AUTHLIST_ERROR,DEFAULTAUTHLIST_JURISDICTION]
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/project/getPgeListByCompanyId', data: { params: { 'proId': id } } })
    //         if( res.data && typeof res.data.success === 'boolean' ){
    //             if( res.data.success === true ){
    //                 const { content } = res.data;
    //                 dispatch({ type: AUTHLIST, payload: content })
    //             }else{
    //                 dispatch({ type: AUTHLIST_ERROR, payload: res.data.message })
    //             }
    //         }
    //     }catch(e){
    //         // console.log( 'project auth ', e );
    //         const { message } = e;
    //         if( message === 403 ){
    //             dispatch( jurisdictionStatus(true) );
    //         }
    //     }
    // }
}

export function saveDefaultAuth(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/project/addProProjectRelation',
            method: 'POST',
            data: { isShowLoading: true, params: opt },
            isnotify: true
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/project/addProProjectRelation', data: { isShowLoading: true, params: opt } })
    //         if( res.data && typeof res.data.success === 'boolean' ){
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
    //         console.log( 'project auth ', e );
    //     }
    // }
}
