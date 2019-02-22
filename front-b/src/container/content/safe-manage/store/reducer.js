import {
    PRO_SAFE_JURISDICTION,
    SAFE_LIST,
    SAFE_ERROR,
    SAFE_MARK,
    SAFE_QUA_DETAIL,
    SAFE_QUA_UPDATE,
} from './types';

const initState = {
    isJurisdiction: false, //控制权限是否显示403页面
    safeList: {}, //任务计划列表
    detailInfo: {},// 安全和质量的详情
    isUpdate: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case SAFE_LIST:
            return { ...state, safeList: action.payload.data };
        case SAFE_MARK:
            return { ...state, isMark: action.payload };
        case SAFE_QUA_UPDATE:
            return { ...state, isUpdate: action.payload.status };
        case SAFE_ERROR:
            return { ...state, ...action.payload };
        case PRO_SAFE_JURISDICTION:
            return { ...state, isJurisdiction: action.payload };
        case SAFE_QUA_DETAIL:
            return { ...state, detailInfo: action.payload.data };
        default:
            return state;
    }
};
