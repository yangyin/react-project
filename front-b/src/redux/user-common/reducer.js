import { IS_PHONE_REGISTER ,VALID_ERROR_MSG,GET_VALID_CODE_SUCCESS,
    GET_VALID_CODE_REGISTER_SUCCESS,
    VALID_REGISTER_ERROR_MSG,
    USER_COMMON_CLEAR,
    GET_VALID_CODE_INFO_SUCCESS,
    } from './types';

const initState = {
    isPhoneRegister:false, //手机号是否注册(忘记密码)
    phoneRegMsg:'',//错误信息
    isRegister:false, //手机号发送验证码（登录，注册）
    msg:'',//错误信息(注册 登录)
    isValidCode: false //基本资料详情获取验证码
}

export default (state=initState,action) =>{
    
    switch(action.type) {
        case IS_PHONE_REGISTER:
            const { status } = action.payload;
            return {...state,isPhoneRegister:status,phoneRegMsg:status === true?'':'你输入的手机号码未注册，请注册后再登录！'};
        case GET_VALID_CODE_SUCCESS:
            return {...state,phoneRegMsg:''};
        case VALID_ERROR_MSG:
            return {...state,phoneRegMsg:action.payload.msg,isPhoneRegister:false};
        case GET_VALID_CODE_REGISTER_SUCCESS:
            return { ...state,msg:'',isRegister:true};
        case VALID_REGISTER_ERROR_MSG:
            return {...state,msg:action.payload.msg,isRegister:false};
        case USER_COMMON_CLEAR:
            return { ...state,isPhoneRegister:false,phoneRegMsg:'',isRegister:false,msg:''};
        case GET_VALID_CODE_INFO_SUCCESS:
            return { ...state, isValidCode: action.payload.status };
        // case VALID_CODE_INFO_ERROR:
        //     return {...state, isValidCode: false };
        default:
            return state;
    }

}