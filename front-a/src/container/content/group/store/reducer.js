import {
    GROUP_LIST,
    GROUP_STATUS_SUCCESS,
    GROUP_MEMBER,
    GROUP_LIST_JUR,
} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    groupList: {}, // 用户组列表
    groupMemberList: {},//成员列表
    refresh: false,
    isJur: false,
})

export default (state = initState, action) => {
    switch (action.type) {
        case GROUP_LIST:
            return state.merge({
                groupList: action.payloadList.data,
                isJur: false,
            });
        case GROUP_MEMBER:
            return state.merge({ groupMemberList: action.payloadMember.data });
        case GROUP_STATUS_SUCCESS:
            return state.set('refresh', action.payload.status);
        case GROUP_LIST_JUR:
            return state.set('isJur', action.payload)
        default:
            return state;
    }
}