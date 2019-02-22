import { ASSISTANT_LIST_SUCCESS, ASSISTANT_NAME_SUCCESS, ASSISTANT_ERROR, ASSISTANT_LIST_JURISDICTION } from './types';

import { CALL_API } from '@/applyMiddleWare/request';




/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: ASSISTANT_LIST_JURISDICTION, payload:type}
}

// 页面初始化数据
export function infoAssistantAll(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/getProgranmmeProjectInfo',
            method:'POST',
            data: { isShowLoading: true, params: options },
            types:[ASSISTANT_LIST_SUCCESS,ASSISTANT_ERROR,ASSISTANT_LIST_JURISDICTION],
        }
    }
}



/**
 * 获取方案名称下拉
 * @param {*} proId: 0187 
 */
export function assistantNameList(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/getNoticeProgrammeListByCompanyId',
            method:'POST',
            data: { params: options },
            types:[ASSISTANT_NAME_SUCCESS,ASSISTANT_ERROR,ASSISTANT_LIST_JURISDICTION],
        }
    }

}
 
/**
 * 通知方案修改
 * @param {*} proId: 0187 
 * @param {*} programId: RC9BAwQJWJ6rIR08qDj 
 */
export function assistantNameEdit(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/addProgranmmeProject',
            method:'POST',
            data: { params:options},
            types:['',ASSISTANT_ERROR,ASSISTANT_LIST_JURISDICTION],
            isnotify:true,
            msgSuc:'编辑成功',
            callback:(data,dispatch)=>{
               dispatch( infoAssistantAll({proId:options.proId}));
            }
        }
    }

}