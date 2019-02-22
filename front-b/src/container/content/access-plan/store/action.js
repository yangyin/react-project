// import Axios from '../../../../utils/axios';
import { CALL_API } from '../../../../applyMiddleWare/request';
import { AUTHORITYLIST, AUTHORITYLIST_ERROR, USERLIST, USERLIST_ERROR, ROLELIST, ROLELIST_ERROR, AUTHORITYLIST_JURISDICTION ,ACCESS_PLAN_UPDATE} from './types';
// import { notification } from 'antd';

// 更改权限状态
export const jurisdictionStatus = (type) => {
    return { type: AUTHORITYLIST_JURISDICTION, payload:type}
}

//获取方案列表
export function getAuthorityList(){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/getPgeListByCompanyId',
            method: 'POST',
            data:{ isShowLoading: true },
            types: [AUTHORITYLIST,AUTHORITYLIST_ERROR,AUTHORITYLIST_JURISDICTION]
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/businessPge/getPgeListByCompanyId', data:{ isShowLoading: true }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
    //                 const { content } = res.data;
    //                 dispatch({ type: AUTHORITYLIST, payload: content });
    //             }else{
    //                 dispatch({ type: AUTHORITYLIST_ERROR, payload: res.data.message });
    //             }
    //         }
    //     }catch(e){
    //         // console.log('auth error: ', e);
    //         const { message } = e;
    //         if( message === 403 ){
    //             dispatch( jurisdictionStatus(true) );
    //         }
    //     }
    // }
}

export function copyAuthority(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/copyPge',
            method: 'POST',
            data: { params: opt },
            isnotify: true
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/businessPge/copyPge', data:{ params: opt }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
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
    //         console.log('auth error: ', e);
    //     }
    // }
}

export const accessPlanUpdate = (bool) => {
    return {
        type:ACCESS_PLAN_UPDATE,
        payload:bool
    }
}

export function deleteAuthority(id){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/deletePge',
            method: 'POST',
            data:{ params: { pgeId: id} },
            types:[ACCESS_PLAN_UPDATE],
            isnotify: true
        }
    } 
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/businessPge/deletePge', data:{ params: { pgeId: id} }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
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
    //         console.log('auth error: ', e);
    //     }
    // }
}

export function updateAuthority(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/updatePge',
            method: 'POST',
            data:{ isShowLoading: true, params: opt },
            isnotify: true
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/businessPge/updatePge', data:{ isShowLoading: true, params: opt }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
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
    //         console.log('auth error: ', e);
    //     }
    // }
}

//获取某方案详情列表
export function getAuthDetailList(id){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/getJurProRelation',
            method: 'POST',
            data:{ isShowLoading: true, params:{ 'pgeId': id } },
            types: [AUTHORITYLIST,AUTHORITYLIST_ERROR]
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/businessPge/getJurProRelation', data:{ isShowLoading: true, params:{ 'pgeId': id } }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
    //                 const { content } = res.data;
    //                 dispatch({ type: AUTHORITYLIST, payload: content });
    //             }else{
    //                 dispatch({ type: AUTHORITYLIST_ERROR, payload: res.data.message });
    //             }
    //         }
    //     }catch(e){
    //         console.log('auth error: ', e);
    //     }
    // }
}

//获取用户
export function getUserListByJurRelation(id){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/getUserListByJurProRelation',
            method: 'POST',
            data:{ params:{ 'jurProRelationId': id } },
            types: [USERLIST,USERLIST_ERROR]
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({url:'/sdpbusiness/businessPge/getUserListByJurProRelation', data:{ params:{ 'jurProRelationId': id } }})
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if(res.data.success === true){
    //                 const { content } = res.data;
    //                 dispatch({ type: USERLIST, payload: content });
    //             }else{
    //                 dispatch({ type: USERLIST_ERROR, payload: res.data.message });
    //             }
    //         }
    //     }catch(e){
    //         console.log('auth error: ', e);
    //     }
    // }
}

// 查询待授权对象
export function getRoleList(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/getRoleOrUserList',
            method: 'POST',
            data: { params: opt },
            types: [ROLELIST,ROLELIST_ERROR]
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/businessPge/getRoleOrUserList',data: { params: opt } })
    //         if(res.data && typeof res.data.success === 'boolean'){
    //             if( res.data.success === true ){
    //                 const { content } = res.data;
    //                 dispatch({ type: ROLELIST, payload: content })
    //             }else{
    //                 dispatch({ type: ROLELIST_ERROR, payload: res.data.message })
    //             }
    //         }
    //     }catch(e){
    //         console.log('login error: ', e);
    //     }
    // }
}

export function deleteJurRelation(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/deletePurRelation',
            method: 'POST',
            data: { params: opt },
            isnotify: true
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/businessPge/deletePurRelation',data: { params: opt } })
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
    //         console.log('auth error: ', e);
    //     }
    // }
}

export function saveJurRelation(opt){
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/addJurProRelation',
            method: 'POST',
            data: { params: opt },
            isnotify: true
        }
    }
    // return async dispatch => {
    //     try{
    //         const res = await Axios.post({ url: '/sdpbusiness/businessPge/addJurProRelation',data: { params: opt } })
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
    //         console.log('auth error: ', e);
    //     }
    // }
}
