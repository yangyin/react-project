import { fromJS } from 'immutable';
import { 
    INFO_ASSISTANT_LIST_SUCCESS,
    INFO_ASSISTANT_UPDATE,
    INFO_ASSISTANT_JUR
} from './types';

const initState = fromJS({
    infoList:[],
    isUpdate:false,
    isJur:false
})

export default (state = initState, action) => {

    switch (action.type) {
        case INFO_ASSISTANT_LIST_SUCCESS:
            return state.merge({
                infoList:fromJS(action.payload.data.noticeProgrammeList),
                isJur:false
            });
        case INFO_ASSISTANT_UPDATE:
            return state.set('isUpdate',action.payload.status);
        case INFO_ASSISTANT_JUR:
            return state.set('isJur',action.payload)
        default:
            return state;
    }

}