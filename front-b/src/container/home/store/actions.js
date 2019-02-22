import { MENUS_SUCCESS,USER_INFO_SUCCESS,ERROR_MSG,CHANGE_TOP_COMPANY,CALLBACK_A_SYSTEM_SUCCESS ,HOME_STORE_CLEAR} from './types';
import { CALL_API } from '@/applyMiddleWare/request';



//成功处理

function userInfoSuccess(obj) {
    return { type:USER_INFO_SUCCESS,payload:{userInfo:obj.content} };
}

// menus
export function menus({appId}) {
    return {
        [CALL_API]: {
            url:'bis/portal/menus',
            method:'POST',
            data:{appId},
            types:[MENUS_SUCCESS,ERROR_MSG],
            isnotify:false
        }
    }
}

// user info
export function userInfo() {
    return {
        [CALL_API]: {
            url:'bis/portal/userInfo',
            method:'POST',
            types:[USER_INFO_SUCCESS,ERROR_MSG],
            isnotify:false,
            callback:(data,dispatch) => {
                dispatch( userInfoSuccess({content:JSON.parse(data)}) );
            }
        }
    }
}

// 顶部切换公司
export function changeCompany({businessId}) {
    return {
        [CALL_API]: {
            url:'bis/portal/changeBusiness',
            method:'POST',
            data:{isShowLoading:true,params:{businessId}},
            types:[CHANGE_TOP_COMPANY,ERROR_MSG],
            isnotify:false,
            callback:(data,dispatch) => {
                window.location.reload();
            }
        }
    }
}

//代管，A端
export const callbackAsystem = () => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/enterASystem',
            method:'POST',
            data:{isShowLoading:true},
            types:[CALLBACK_A_SYSTEM_SUCCESS],
            isnotify:true
        }
    }
}

//清空home store
export const homeStoreClear = () => {
    return {
        type:HOME_STORE_CLEAR,
    }
}
