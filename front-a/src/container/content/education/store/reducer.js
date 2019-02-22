import { DEU_QUES_SUCCESS,DEU_QUES_POINT_SUCCESS,EDUCATION_LIST, EDUCATION_INFO, DEU_QUES_JUR } from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    educationList: {}, // 题库列表
    educationInfo: {},// 题目详情
    isRefresh: false,
    isRefreshPoint: false,// 考点编辑的刷新状态
    error: '',
    isJur: false,
})

export default (state = initState, action) => {
    switch (action.type) {
        case EDUCATION_LIST:
            return state.merge({ educationList: action.payload.data });
        case EDUCATION_INFO:
            return state.merge({ educationInfo: action.payload.data });
        case DEU_QUES_SUCCESS:
            return state.set('isRefresh', action.payload.status);
        case DEU_QUES_POINT_SUCCESS:
            return state.set('isRefreshPoint', action.payload.status);
        case DEU_QUES_JUR:
            return state.set('isJur', action.payload);
        default:
            return state;
    }
}