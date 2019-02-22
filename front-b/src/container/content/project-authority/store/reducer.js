import { DEFAULTAUTHLIST, DEFAULTAUTHLIST_ERROR, AUTHLIST, AUTHLIST_ERROR, DEFAULTAUTHLIST_JURISDICTION } from './types';

const initState = {
    isJurisdiction: false,//控制权限是否显示403页面
    defaultAuthList: null,
    defaultAuthList_error: '',
    authList: null,
    authList_error: ''
}

export default function( state=initState,action ){
    switch(action.type){
        case DEFAULTAUTHLIST:
            return { ...state, defaultAuthList: action.payload.data, defaultAuthList_error: '' };
        case DEFAULTAUTHLIST_ERROR:
            return { ...state, defaultAuthList: null, defaultAuthList_error: action.payload.msg };
        case AUTHLIST:
            return { ...state, authList: action.payload.data, authList_error: '' };
        case AUTHLIST_ERROR:
            return { ...state, authList: null, authList_error: action.payload.msg };
        case DEFAULTAUTHLIST_JURISDICTION:
            return { ...state, isJurisdiction: action.payload };
        default:
            return state;
    }
}