import { COMPANY_BASIC_INFO, UPDATE_ADMIN_PHONE } from './types';
import { CALL_API } from '@/applyMiddleWare/request';




//获取公司基本信息
export const getAppUserBusinessInfoNew = () => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/getAppUserBusinessInfoNew',
            method:'POST',
            data:{isShowLoading:true},
            types:[COMPANY_BASIC_INFO],
            isnotify:true,
            msgSuc:false
        }
    }
}
/**
 * 修改管理员电话
 * @param {adminPhone} params 电话
 */
export const updateAdminPhone = (params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/updateAdminPhone',
            method:'POST',
            data:{params,isShowLoading:true},
            types:[UPDATE_ADMIN_PHONE],
            isnotify:true,
            msgSuc:false
        }
    }
}

export const updateStatusPhone = (bool) => {
    return { type: UPDATE_ADMIN_PHONE, payload: {status: bool} }
}
