import {
    EDU_ASSIS_DETAIL_SUCCESS,
    EDU_ASSIS_DETAIL_LIST,
    EDU_ASSIS_MODAL_TOPICS,
} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    educationInfo: {}, // 详情题库信息列表
    listSingle: [],// modal筛选题目单选列表
    listMultiple: [],// modal筛选题目多选列表
    listReading: [],// modal筛选题目阅读列表
    isRefresh: false,
})

export default (state = initState, action) => {
    switch (action.type) {
        case EDU_ASSIS_DETAIL_LIST:
            return state.merge({ educationInfo: action.payload.data });
        case EDU_ASSIS_MODAL_TOPICS:
            const { answerType } = action.payload.params.params; //1-单选 0-多选 2-阅读
            if (answerType === 1) {
                return state.merge({ listSingle: action.payload.data.rows });
            } else if (answerType === 0) {
                return state.merge({ listMultiple: action.payload.data.rows });
            } else if (answerType === 2) {
                return state.merge({ listReading: action.payload.data.rows });
            }

        case EDU_ASSIS_DETAIL_SUCCESS:
            return state.set('isRefresh', action.payload.status);
        default:
            return state;
    }
}