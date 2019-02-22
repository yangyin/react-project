// import Axios from '../../../../utils/axios';
import { CALL_API } from '../../../../applyMiddleWare/request';
import { PERMISSLIST, PERMISSLIST_ERROR, USERLIST, USERLIST_ERROR, ROLELIST, ROLELIST_ERROR, PERMISSLIST_JURISDICTION } from './types';
// import { notification } from 'antd';

// 更改权限状态
export const jurisdictionStatus = (type) => {
    return { type: PERMISSLIST_JURISDICTION, payload:type}
}

// 获取系统权限
export function initSystemPermissList(){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/getPermissBList',
            method: 'POST',
            data:{ isShowLoading: true },
            types: [PERMISSLIST,PERMISSLIST_ERROR,PERMISSLIST_JURISDICTION]
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/systemPermissB/getPermissBList', data:{ isShowLoading: true }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
    //                 const { content } = res.data;
    //                 dispatch({ type: PERMISSLIST, payload: content });
    //             }else{
    //                 dispatch({ type: PERMISSLIST_ERROR, payload: res.data.message });
    //             }
    //         }
    //     }catch(e){
    //         // console.log('permisst error: ', e);
    //         const { message } = e;
    //         if( message === 403 ){
    //             dispatch( jurisdictionStatus(true) ); 
    //         }
    //     }
    // }
}

//获取已授权的用户
export function getUserListByJurRelation(jurId){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/getUserListByJurRelation',
            method: 'POST',
            data: { params: {'jurId': jurId} },
            types: [USERLIST,USERLIST_ERROR]
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/systemPermissB/getUserListByJurRelation',data: { params: {'jurId': jurId} } })
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if( res.data.success === true ){
    //                 const { content } = res.data;
    //                 dispatch({ type: USERLIST, payload: content })
    //             }else{
    //                 dispatch({ type: USERLIST_ERROR, payload: res.data.message })
    //             }
    //         }
    //     }catch(e){
    //         console.log('permisst error: ', e);
    //     }
    // }
}

// 查询待授权对象
export function getRoleList(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/getRoleList',
            method: 'POST',
            data: { params: opt },
            types: [ROLELIST,ROLELIST_ERROR]
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/systemPermissB/getRoleList',data: { params: opt } })
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if( res.data.success === true ){
    //                 const { content } = res.data;
    //                 dispatch({ type: ROLELIST, payload: content })
    //             }else{
    //                 dispatch({ type: ROLELIST_ERROR, payload: res.data.message })
    //             }
    //         }
    //     }catch(e){
    //         console.log('permisst error: ', e);
    //     }
    // }
}

export function saveJurRelation(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/addJurRelation',
            method: 'POST',
            data: { params: opt },
            isnotify: true
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/systemPermissB/addJurRelation',data: { params: opt } })
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
    //         console.log('permisst error: ', e);
    //     }
    // }
}

export function deleteJurRelation(optStr){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/deletePurRelation',
            method: 'POST',
            data: { params: {'deleteList': optStr} },
            isnotify: true
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/systemPermissB/deletePurRelation',data: { params: {'deleteList': optStr} } })
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
    //         console.log('permisst error: ', e);
    //     }
    // }
}