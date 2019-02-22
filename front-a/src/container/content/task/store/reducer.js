import { GET_TASK_LIST_SUCCESS ,GET_TASK_HANDLE_SUCCESS,GET_TASK_MODAL_SUCCESS,GET_TASK_TYPE_SUCCESS,GET_TASK_MODAL_ADD_ACTION,GET_TASK_LIST_JUR} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    taskList:[],
    typeList:[],
    isUpdate:false,
    isModal:false,
    isJur:false
})

export default (state=initState,action) =>{
    
    switch(action.type) {
        case GET_TASK_LIST_SUCCESS:
            return state.merge({
                taskList:fromJS(action.payload.data),
                isJur:false
            });
        case GET_TASK_LIST_JUR:
            return state.set('isJur',action.payload);
        case GET_TASK_HANDLE_SUCCESS:
            return state.set('isUpdate',action.payload.status);
        case GET_TASK_TYPE_SUCCESS:
            return state.merge({
                typeList:fromJS(action.payload.data)
            });
        case GET_TASK_MODAL_SUCCESS:
            return state.set('isModal',action.payload.status);
        case GET_TASK_MODAL_ADD_ACTION:
        return state.merge({
            typeList:fromJS([...state.get('typeList'),{"taskType": "",
                                                "taskTypeId": "",
                                                "taskTypeName": "",
                                                "taskTypeSort": ""}
            ])
        });
        default:
            return state;
    }

}