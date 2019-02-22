import { INFO_LIST, UPADTE_INFORMATION } from './types';
import { CALL_API } from '@/applyMiddleWare/request';

// 页面初始化数据
export function initUserInfo() {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/findPersonInfo',
            method:'POST',
            data:{isShowLoading:true,params: {}},
            types:[INFO_LIST]
        }
    }
}


// 修改账户信息
export function updateInformation(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/updateUserInfo',
            method:'POST',
            data:{isShowLoading:true,params: options},
            types:[UPADTE_INFORMATION],
            isnotify:true
        }
    }
}


/**
 * 更新修改账户信息状态
 * @param {boolean} bool 
 */
export const updateInfoStatus = (bool) => {
    return { type: UPADTE_INFORMATION, payload:{status:bool}};
}
