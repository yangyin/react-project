import { ATTENDANCE_JURISDICTION, ATTENDANCE_LIST, ATTENDANCE_DETAIL } from './types';

const initState = {
    isJurisdiction: false,// 控制权限是否显示403页面
    attendListObj: {},// 考勤信息对象
    attendDetailList: {},// 考勤班组详情列表
}

export default function (state = initState, action) {
    switch (action.type) {
        case ATTENDANCE_LIST:
            return { ...state, attendListObj: action.payload.data };
        case ATTENDANCE_DETAIL:
            return { ...state, attendDetailList: action.payload.data };
        case ATTENDANCE_JURISDICTION:
            return { ...state, isJurisdiction: action.payload };
        default:
            return state;
    }
}