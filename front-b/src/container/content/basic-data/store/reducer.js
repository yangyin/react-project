
import { PERSONINFO,PERSONINFO_ERROR,PERSONINFO_JURISDICTION } from './types';

const initState = {
    isJurisdiction:false,//控制权限是否显示403页面
    personinfo:null,
    personinfoError:null 
}


export default function (state=initState,action) {
    switch(action.type) {
        case PERSONINFO:
            return {...state,personinfo:action.payload.data,personinfoError:'',isUpdateUserInfo:false};
        case PERSONINFO_ERROR:
            return {...state,personinfo:null,personinfoError:action.payload.msg,isUpdateUserInfo:false};
        case PERSONINFO_JURISDICTION:
            return {...state,isJurisdiction:action.payload};
        default:
            return state;
    }
}