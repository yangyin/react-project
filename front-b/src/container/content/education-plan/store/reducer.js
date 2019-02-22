
import { PLAN_LIST, PLAN_LIST_JURISDICTION, USE_PLAN } from './types';

const initState = {
    msg: '',
    isJurisdiction:false,//控制权限是否显示403页面
    planList: [], //列表
    usePlan: false
}


export default function (state=initState,action) {
    switch(action.type) {
        case PLAN_LIST:
            return { ...state, msg: '', planList: action.payload.data };
        case PLAN_LIST_JURISDICTION:
            return { ...state, isJurisdiction:action.payload};
        case USE_PLAN:
            return { ...state, usePlan: action.payload.status};
        default:
            return state;
    }
}