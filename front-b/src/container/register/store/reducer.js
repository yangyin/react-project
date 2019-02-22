import { REGISTER_SUCCESS ,REGISTER_FAIL,REGISTER_STATUS} from './types';

const initState = {
    isRegister:false,
    msg:''
}

export default (state=initState,action) => {
    switch(action.type) {
        case REGISTER_SUCCESS:
            return { ...state,msg:'',isRegister:true};
        case REGISTER_FAIL:
            return { ...state,msg:action.payload.msg,isRegister:false};
        case REGISTER_STATUS:
            return { ...state,msg:'',isRegister:action.payload.status};
        default:
            return state;
    }
}