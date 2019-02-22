
import {
    EDUCATION_INFO_SUCCESS,
    EDUCATION_INFO_DETAIL_RES,
    EDUCATION_ECHART_JURISDICTION,
} from './types';

const initState = {
    isJurisdiction: false,//控制权限是否显示403页面
    eduInfo:{},//信息页数据
    eduInfoRes:{},// 三级教育信息详情
}


export default function (state = initState, action) {
    switch (action.type) {
        case EDUCATION_INFO_SUCCESS:
            return { ...state,eduInfo:action.payload.data };
        case EDUCATION_INFO_DETAIL_RES:
            return { ...state,eduInfoRes:action.payload.data };
        case EDUCATION_ECHART_JURISDICTION:
            return { ...state,isJurisdiction:action.payload };
        default:
            return state;
    }
}