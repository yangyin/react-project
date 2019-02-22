import { SECURITYINFO, SECURITYINFO_ERROR, SECURITYINFO_JURISDICTION,SECURITYINFO_UPDATE_PHONE } from "./types";

const initState = {
    isJurisdiction: false,//控制权限是否显示403页面
    securityinfo: '',
    securityinfo_error: '',
    isUpdatePhone:false,//换绑手机
}

export default function( state=initState,action ){
    switch(action.type){
        case SECURITYINFO:
            return { ...state, securityinfo: action.payload.data, securityinfo_error: '' };
        case SECURITYINFO_UPDATE_PHONE:
            return {...state,isUpdatePhone:action.payload.status};
        case SECURITYINFO_ERROR:
            return { ...state, securityinfo: null, securityinfo_error: action.payload.msg }
        case SECURITYINFO_JURISDICTION:
            return { ...state, isJurisdiction: action.payload};
        default:
            return state;
    }
}