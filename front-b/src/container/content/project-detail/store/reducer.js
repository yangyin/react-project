
import { 
    PRO_DETAIL_JURISDICTION,
    DEL_PRO_SUCCESS,
    DETAIL_PRO_SUCCESS,
    PRO_DETAIL_ERROR,
    UNIT_LIST_SUCCESS
} from './types';

const initState = {
    isJurisdiction:false,//控制权限是否显示403页面
    msg:'',
    proDelInfo:null,// 删除
    proDetail:{},// 详情
    projectUnitList: [],//单位列表
}
export default function (state=initState,action)  {
    switch(action.type) {
        case UNIT_LIST_SUCCESS:
            return { ...state, projectUnitList: action.payload.data };
        case DEL_PRO_SUCCESS:
            return {...state,msg:'',proDelInfo:action.payload};
        case DETAIL_PRO_SUCCESS:
            return {...state,proDetail:action.payload.data};  
        case PRO_DETAIL_JURISDICTION:
            return {...state,isJurisdiction:action.payload};  
        case PRO_DETAIL_ERROR:
            return {...state,msg:''}
        default:
            return state;
    }
}
