import { AUTHINFO, AUTHINFO_ERROR, AUTHINFO_JURISDICTION,AUTHINFO_SUCCESS} from './types';

const initState = {
    isJurisdiction: false,//控制权限是否显示403页面
    authinfo: null,
    authinfoError: null,
    isAuth:false
}

export default function( state=initState,action ){
    switch(action.type){
        case AUTHINFO:
            return { ...state, authinfo: action.payload.data, authinfoError: '' };
        case AUTHINFO_SUCCESS:
            return {...state,isAuth:action.payload.status};
        case AUTHINFO_ERROR:
            return { ...state, authinfo: null, authinfoError: action.payload.msg };
        case AUTHINFO_JURISDICTION:
            return { ...state, isJurisdiction: false };
        default:
            return state;
    }
}