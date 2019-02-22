import {
    LOGINRECORD_LIST, LOGINRECORD_JUR,
} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    recordData: {}, // 登录记录数据
    isRefresh: false,
    isJur: false,
});

export default (state = initState, action) => {
    switch (action.type) {
        case LOGINRECORD_LIST:
            return state.merge({
                recordData: action.payload.data,
                isJur: false
            });
        case LOGINRECORD_JUR:
            return state.set('isJur', action.payload);
        default:
            return state;
    }
};