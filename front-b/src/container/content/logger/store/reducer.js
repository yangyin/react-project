import { LOGGER_INIT, LOGGER_JURISDICTION } from './type';

const initState = {
    listInfo: {},// 日志table
    isJurisdiction: false,// 控制权限是否显示403页面
}
export default function (state = initState, action) {
    switch (action.type) {
        case LOGGER_INIT:
            return { ...state, listInfo: action.payload.data };
        case LOGGER_JURISDICTION:
            return { ...state, isJurisdiction: action.payload };
        default:
            return state;
    }
}