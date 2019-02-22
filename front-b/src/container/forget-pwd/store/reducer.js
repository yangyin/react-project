import { VALID_CODE_SUCCESS,VALID_ERROR_MSG ,CLEAR_MSG,FORGET_RESET_SUCCESS} from './types';

const initState = {
    forgetMsg:'',
    validCodeSuccess:false, // 验证码与手机号 是否 匹配
    isreset:false, //是否重置成功
}

export default (state=initState,action) => {
    switch(action.type) {
        case VALID_CODE_SUCCESS:
            return {...state,forgetMsg:'',validCodeSuccess:true};
        case VALID_ERROR_MSG:
            return {...state,forgetMsg:action.payload.msg,validCodeSuccess:false};
        case CLEAR_MSG:
            return { ...state,forgetMsg:'',authorization:''};
        case FORGET_RESET_SUCCESS:
            return {...state,isreset:action.payload};
        default:
            return state;
    }
}