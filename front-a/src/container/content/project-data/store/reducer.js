import { PROJECT_DATA_TYPE_SUCCESS ,PROJECT_DATA_DICTION_SUCCESS,PROJECT_DATA_UPDATE,PROJECT_DATA_TYPE_JUR,PROJECT_DATA_CLEAR_STORE} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    typeList:[],
    diction:{},
    isUpdate:false,
    isJur:false
})

export default (state = initState, action) => {

    switch (action.type) {
        case PROJECT_DATA_TYPE_SUCCESS:
            return state.merge({
                typeList:fromJS(action.payload.data),
                isJur:false
            });
        case PROJECT_DATA_TYPE_JUR:
            return state.set('isJur',action.payload);
        case PROJECT_DATA_DICTION_SUCCESS:
            return state.merge({
                diction:fromJS(action.payload.data)
            });
        case PROJECT_DATA_UPDATE:
            return state.set('isUpdate',action.payload.status);
        case PROJECT_DATA_CLEAR_STORE:
            return initState;
        default:
            return state;
    }

}