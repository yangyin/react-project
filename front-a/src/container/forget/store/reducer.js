import { FORGET_VALID_SUCCESS,FORGET_VALID_STATUS ,FORGET_NEXT_VALID_SUCCESS,FORGET_NEXT_VALID_STATUS} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    isValid:false //验证验证码
})

export default (state=initState,action) =>{
    
    switch(action.type) {
        case FORGET_NEXT_VALID_SUCCESS:
            return state.set('isValid',action.payload.status);
        case FORGET_NEXT_VALID_STATUS:
            return state.set('isValid',action.payload);
        default:
            return state;
    }

}