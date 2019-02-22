import {ASSISTANT_INFORM_JURISDICTION,INFORM_DETAIL_INFORMOBJ_LIST,INFORM_DETAIL_SELUSER,INFORM_DETAIL_SELROLE,ASSISTANT_INFORM_LIST, ASSISTANT_INFORM_ERROR,INFORM_DETAIL_LIST,INFORM_DETAIL_TITLE} from './types';

const initState = {
    isJurisdiction:false,//控制权限是否显示403页面
    informList: [],
    detailTitle:'',
    informDetailList:[],
    selRoleList:[],// 项目角色
    selUserList:[],// 用户列表
    informObjList:[],// 当前通知对象
}
export default function( state=initState, action ){
    switch(action.type){
        case ASSISTANT_INFORM_LIST:
            return { ...state, informList: action.payload.data };
        case INFORM_DETAIL_LIST:
            return { ...state, informDetailList: action.payload.data };
        case INFORM_DETAIL_TITLE:
            return { ...state, detailTitle: action.payload.data };
        case INFORM_DETAIL_SELROLE:
            return { ...state, selRoleList:action.payload.data };
        case INFORM_DETAIL_SELUSER:
            return { ...state, selUserList:action.payload.data };
        case INFORM_DETAIL_INFORMOBJ_LIST:
            return { ...state, informObjList:action.payload.data};
        case ASSISTANT_INFORM_ERROR:
            return { ...state, ...action.payload };
            case ASSISTANT_INFORM_JURISDICTION:
            return {...state,isJurisdiction:action.payload};  
        default:
            return state;
    }
}

