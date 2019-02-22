import {
    SYSTEM_POWER_SEARCH_USER_SUCCESS,
    SYSTEM_POWER_CLEAR_USER,
    SYSTEM_POWER_UPDATE_STATE,
    SYSTEM_POWER_AUTH_LIST_SUCCESS,
    SYSTEM_POWER_JUR
} from './types';
import { fromJS ,Map} from 'immutable';

const initState = fromJS({
    user:{},//查询的user信息
    auth:{},
    isUpdate:false,
    isJur:false
})

export default (state = initState, action) => {

    switch (action.type) {
        case SYSTEM_POWER_SEARCH_USER_SUCCESS:
            return state.merge({ user: fromJS(action.payload.data || {}) ,isJur:false});
        case SYSTEM_POWER_JUR:
            return state.set('isJur',true);
        case SYSTEM_POWER_CLEAR_USER:
            return state.set('user',Map());
        case SYSTEM_POWER_UPDATE_STATE:
            return state.set('isUpdate',action.payload.status);
        case SYSTEM_POWER_AUTH_LIST_SUCCESS:
            return state.set('auth',fromJS(action.payload.data));
        default:
            return state;
    }


}