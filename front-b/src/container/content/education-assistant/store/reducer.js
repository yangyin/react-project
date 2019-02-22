
import { EDUCATION_LIST, EDUCATION_LIST_ERROR, EDIT_EDU_LIST, COPY_LIST, DELETE_LIST, EDUCATION_LIST_JURISDICTION } from './types';

const initState = {
    msg: '',
    isJurisdiction:false,//控制权限是否显示403页面
    educationList: [], //列表
    educationError: [],
    editList: false, //编辑
    copyList: false, //复制
    delList: false, //复制
}


export default function (state=initState,action) {
    switch(action.type) {
        case EDUCATION_LIST:
            return { ...state, msg: '', educationList: action.payload.data };
        case EDUCATION_LIST_ERROR:
            return { ...state,educationList:null, educationError:action.payload };
        case EDIT_EDU_LIST:
            return { ...state, msg: '', editList: action.payload.status };
        case COPY_LIST:
            return { ...state, msg: '', copyList: action.payload.status };
        case DELETE_LIST:
            return { ...state, msg: '', delList: action.payload.status };
        case EDUCATION_LIST_JURISDICTION:
            return { ...state,isJurisdiction:action.payload};
        default:
            return state;
    }
}