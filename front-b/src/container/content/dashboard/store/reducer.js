
import { DASHBOARD_MY_TEAM, DASHBOARD_LIST_JURISDICTION, CREATE_PROJECT ,DASHOBADR_LIST_INIT} from './types';

const initState = {
    msg: '',
    isJurisdiction:false,//控制权限是否显示403页面
    teamList: [], //列表
    teamListError: [],
    createProject: false,
    dashInit:{},
    addProInfo:{}
}


export default function (state=initState,action) {
    switch(action.type) {
        case DASHBOARD_MY_TEAM:
            return { ...state, msg: '', teamList: action.payload.data };
        case DASHBOARD_LIST_JURISDICTION:
            return { ...state, isJurisdiction:action.payload};
        case CREATE_PROJECT:
            const { data } = action.payload;
            if( data ) {
                return { ...state,createProject: action.payload.status,addProInfo:data};
            }
            return { ...state, createProject: action.payload.status};
        case DASHOBADR_LIST_INIT:
            return { ...state,dashInit:action.payload.data}
        default:
            return state;
    }
}