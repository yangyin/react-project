import {
    EDU_ASSIS_EDIT_SUCCESS, EDU_ASSIS_JUR,
    EDU_ASSIS_LIST,
} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    eduAssisData: {},// 教育助手列表
    educationList: {}, // 详情题库列表
    educationInfo: {},// 详情题目详情
    isRefresh: false,
    isJur: false,
})

export default (state = initState, action) => {
    switch (action.type) {
        case EDU_ASSIS_LIST:
            return state.merge({ eduAssisData: action.payload.data });
        case EDU_ASSIS_EDIT_SUCCESS:
            return state.set('isRefresh', action.payload.status);
        case EDU_ASSIS_JUR:
            return state.set('isJur', action.payload);
        default:
            return state;
    }
}