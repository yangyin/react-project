import {
    USER_ERROR, USERMANAGE_JUR, USER_SUCCESS, USER_LIST, USER_GROUP_LIST, USER_DETAIL_INFO
} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    userData: {}, // 用户数据
    userGroupList: [],// 用户组
    userInfo: {},// 用户详情
    error: '',
    isRefresh: false,
    isJur: false,
})

export default (state = initState, action) => {
    switch (action.type) {
        case USER_LIST:
            return state.merge({
                userData: action.payload.data,
                isJur: false
            });
        case USER_GROUP_LIST:
            return state.merge({ userGroupList: action.payloadGroup.data });
        case USER_DETAIL_INFO:
            return state.merge({ userInfo: action.payloadInfo.data });
        case USER_ERROR:
            return state.merge({ error: action.payloadError.data });
        case USER_SUCCESS:
            return state.set('isRefresh', action.payload.status);
        case USERMANAGE_JUR:
            return state.set('isJur', action.payload);
        default:
            return state;
    }

}