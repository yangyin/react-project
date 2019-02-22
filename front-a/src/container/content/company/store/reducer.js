import {
    COMPANY_JUR, COMPANY_ERROR, COMPANY_LIST, COMPANY_DELETE, COMPANY_BSYSTEM,
    COMPANY_DETAIL_INFO, COMPANY_DETAIL_EDIT_SUCCESS
} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    userData: {}, // 用户数据
    userGroupList: [],// 用户组
    userInfo: {},// 用户详情
    isRefresh: false,
    toBsystemRes: {},
    error: '',
    isRefresh: false,
})

export default (state = initState, action) => {

    switch (action.type) {
        case COMPANY_LIST:
            return state.merge({ 
                userData: action.payload.data,
                isJur:false
            });
        case COMPANY_DELETE:
            return state.merge(action.payloadDelete.data);
        case COMPANY_DETAIL_INFO:
            return state.merge({ userInfo: action.payloadInfo.data });
        case COMPANY_ERROR:
            return state.merge({ error: action.payloadError.data });
        case COMPANY_DETAIL_EDIT_SUCCESS:
            return state.set('isRefresh', action.payload.status);
        case COMPANY_BSYSTEM:
            return state.set('toBsystemRes', action.payloadSystem);
        case COMPANY_JUR:
            return state.set('isJur', action.payload)
        default:
            return state;
    }
}