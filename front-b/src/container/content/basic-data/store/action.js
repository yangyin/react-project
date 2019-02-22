import { PERSONINFO,PERSONINFO_ERROR,PERSONINFO_JURISDICTION } from './types';
import { CALL_API } from '@/applyMiddleWare/request';


/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: PERSONINFO_JURISDICTION, payload:type}
}


//用户基本信息
export function getPersonInfo() {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/findPersonInfo',
            method:'POST',
            data:{isShowLoading:true},
            types:[PERSONINFO,PERSONINFO_ERROR,PERSONINFO_JURISDICTION],
            isnotify:true,
            msgSuc:false
        }
    }
}

//更新用户信息
export function updateUserInfo(option) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/updateUserInfo',
            method:'POST',
            data:{params:option},
            isnotify:true
        }
    }
}