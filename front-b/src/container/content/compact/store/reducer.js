import {COMPACT_LIST,COMPACT_DETAIL,COMPACT_JURISDICTION} from './types.js';

const initState = {
    isJurisdiction:false,// 控制权限是否显示403
    compactInfo:{},// 合同管理
    compactDetail:{},// 合同详情
};
export default function(state=initState,action){
    switch(action.type){
        case COMPACT_LIST:
        const compactList = action.payload.data?action.payload.data:{};
        return {...state,compactInfo:compactList};
        case COMPACT_DETAIL:
        return {...state,compactDetail:action.payload.data};
        case COMPACT_JURISDICTION:
        return {...state,isJurisdiction:action.payload};
        default:
        return state;
    }
}