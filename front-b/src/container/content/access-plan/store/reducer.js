import { AUTHORITYLIST, AUTHORITYLIST_ERROR, USERLIST, USERLIST_ERROR, ROLELIST, ROLELIST_ERROR, AUTHORITYLIST_JURISDICTION,ACCESS_PLAN_UPDATE } from './types';

const initState = {
    isJurisdiction: false,//控制权限是否显示403页面
    authoritylist: null,
    authoritylistError: null,
    userlist: null,
    userlistError: null,
    rolelist: null,
    rolelistError: null,
    isUpdate:false
}

export default function( state=initState, action ){
    switch(action.type){
        case AUTHORITYLIST:
            return { ...state, authoritylist: action.payload.data, authoritylistError: '' };
        case AUTHORITYLIST_ERROR:
            return { ...state, authoritylist: null, authoritylistError: action.payload.msg };
        case USERLIST:
            return { ...state, userlist: action.payload.data, userlistError: '' };
        case USERLIST_ERROR:
            return { ...state, userlist: null, userlistError: action.payload.msg };
        case ROLELIST:
            return { ...state, rolelist: action.payload.data, rolelistError: '' };
        case ROLELIST_ERROR:
            return { ...state, rolelist: null, rolelistError: action.payload.msg };
        case AUTHORITYLIST_JURISDICTION:
            return { ...state, isJurisdiction: action.payload };
        case ACCESS_PLAN_UPDATE:
            return {...state,isUpdate:action.payload.status};
        default:
            return state;
    }
}