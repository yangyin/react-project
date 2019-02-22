import { PERMISSLIST, PERMISSLIST_ERROR, USERLIST, USERLIST_ERROR, ROLELIST, ROLELIST_ERROR, PERMISSLIST_JURISDICTION } from './types';

const initState = {
    isJurisdiction: false,//控制权限是否显示403页面
    permisslist: null,
    permisslistError: null,
    userlist: null,
    userlistError: null,
    rolelist: null,
    rolelistError: null
}

export default function( state=initState,action ){
    switch(action.type){
        case PERMISSLIST:
            return { ...state, permisslist: action.payload.data, permisslistError: '' };
        case PERMISSLIST_ERROR:
            return { ...state, permisslist: null, permisslistError: action.payload.msg };
        case USERLIST:
            return { ...state, userlist: action.payload.data, userlistError: '' };
        case USERLIST_ERROR:
            return { ...state, userlist: null, userlistError: action.payload.msg };
        case ROLELIST:
            return { ...state, rolelist: action.payload.data, rolelistError: '' };
        case ROLELIST_ERROR:
            return { ...state, rolelist: null, rolelistError: action.payload.msg };
        case PERMISSLIST_JURISDICTION:
            return { ...state, isJurisdiction: action.payload};
        default:
            return state;
    }
}