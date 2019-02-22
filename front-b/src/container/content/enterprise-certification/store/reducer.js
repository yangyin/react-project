import { COMPANYINFO, COMPANYINFO_ERROR, COMPANYTYPE, COMPANYTYPE_ERROR, COMPANYTYPE_JURISDICTION ,AUTH_COMPANY_INFO_SUCCESS } from './types';

const initState = {
    isJurisdiction: false,//控制权限是否显示403页面
    companyinfo: null,
    companyinfoError: null,
    companytype: null,
    companytypeError: null,
    isCompanyAuth:false //是否企业认证
}

export default function( state=initState,action ){
    switch(action.type){
        case COMPANYINFO:
            return { ...state, companyinfo: action.payload.data, companyinfoError: '' };
        case COMPANYINFO_ERROR:
            return { ...state, companyinfo: null, companyinfoError: action.payload.msg };
        case COMPANYTYPE:
            return { ...state, companytype: action.payload.data, companytypeError: '' };
        case COMPANYTYPE_ERROR:
            return { ...state, companytype: null, companytypeError: action.payload.msg };
        case COMPANYTYPE_JURISDICTION:
            return { ...state, isJurisdiction: action.payload };
        case AUTH_COMPANY_INFO_SUCCESS:
            return {...state,isCompanyAuth:action.payload.status};
        default:
            return state;
    }
}