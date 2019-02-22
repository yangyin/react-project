import { fromJS,List } from 'immutable';
import { 
    INFO_ASSIS_MANAGE_LIST_SUCCESS,
    INFO_ASSIS_MANAGE_UPDATE,
    INFO_ASSIS_MANAGE_FETCH_USER_SUCCESS,
    INFO_ASSIS_MANAGE_TARTGET_LIST_SUCCESS,
    INFO_ASSIS_MANAGE_CLEAR
} from './types';

const initState = fromJS({
    eventList:[],
    userList:[],
    targetList:[],
    isUpdate:false 
})

export default (state = initState, action) => {

    switch (action.type) {
        case INFO_ASSIS_MANAGE_LIST_SUCCESS:
            return state.merge({
                eventList:fromJS(action.payload.data.eventList)
            });
        case INFO_ASSIS_MANAGE_UPDATE:
            return state.set('isUpdate',action.payload.status);
        case INFO_ASSIS_MANAGE_FETCH_USER_SUCCESS:
            return state.merge({
                userList:fromJS(action.payload.data)
            })
        case INFO_ASSIS_MANAGE_TARTGET_LIST_SUCCESS:
            return state.merge({
                targetList:fromJS(action.payload.data)
            })
        case INFO_ASSIS_MANAGE_CLEAR:
            return state.set('userList',List());
        default:
            return state;
    }

}