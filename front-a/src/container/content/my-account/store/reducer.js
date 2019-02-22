import { MYCOUNT_JUR, ACCOUNT_DETAIL_INFO, ACCOUNT_DETAIL_STATUS_SUCCESS } from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    userData: {}, // 账户数据
    isRefresh: false,
    error: '',
    isJur: false,
});

export default (state = initState, action) => {

    switch (action.type) {
        case ACCOUNT_DETAIL_INFO:
            return state.merge({ 
                userData: action.payloadInfo.data,
                isJur: false
             });
        case ACCOUNT_DETAIL_STATUS_SUCCESS:
            return state.set('isRefresh', action.payload.status);
        case MYCOUNT_JUR:
            return state.set('isJur', action.payload);
        default:
            return state;
    }
};