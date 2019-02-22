
import { ASSISTANT_LIST_SUCCESS,ASSISTANT_EDIT_SUCCESS,ASSISTANT_NAME_SUCCESS,ASSISTANT_ERROR ,ASSISTANT_LIST_JURISDICTION} from './types';

const initState = {
    msg: '',
    isJurisdiction:false,//控制权限是否显示403页面
    proAssistantList: {} ,//列表对象
    proAssistantName:[] // 通知方案下拉
}


export default function (state=initState,action) {
    switch(action.type) {
        case ASSISTANT_LIST_SUCCESS:
            return { ...state, msg: '', proAssistantList: action.payload.data };
        case ASSISTANT_NAME_SUCCESS:
            return { ...state, msg: '', proAssistantName: action.payload.data };
        case ASSISTANT_EDIT_SUCCESS:
            return { ...state};
        case ASSISTANT_ERROR:
            return {...state,msg:''};
        case ASSISTANT_LIST_JURISDICTION:
            return { ...state,isJurisdiction:action.payload};
        default:
        return state;
    }
}