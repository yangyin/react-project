import { GET_LOG_SUCCESS ,GET_LOG_TYPE_SUCCESS,GET_LOG_JUR} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    logList:[],
    typeList:[],
    isJur:false
})

export default (state = initState, action) => {

    switch (action.type) {
        case GET_LOG_SUCCESS:
            return state.merge({
                logList:fromJS(action.payload.data),
                isJur:false
            });
        case GET_LOG_JUR:
            return state.set('isJur',true);
        case GET_LOG_TYPE_SUCCESS:
            return state.merge({
                typeList:fromJS(action.payload.data)
            });
        default:
            return state;
    }

}