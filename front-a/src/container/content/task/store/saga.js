import { call, fork, takeLatest } from 'redux-saga/effects';
import { CALL_API ,Service} from '@/utils/utils';

import { 
    GET_TASK_LIST_ACTION,
    GET_TASK_HANDLE_ACTION,
    GET_TASK_MODAL_ACTION,
    GET_TASK_TYPE_ACTION

} from './types';
import { 
    getListSuccess,
    taskHandleSuccess,
    taskModalSuccess,
    taskTypeListSuccess,
    getListJur
} from './actions';

//ajax
function* getList() {
    
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/taskProgramme/getTaskProgrammeList',
            method:'POST',
            data:{isShowLoading:true},
            types:[getListSuccess,null,getListJur],
            isnotify:true,
            msgSuc:false
        }
    })
}
function* handle({payload}) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/taskProgramme/'+payload.url,
            method:'POST',
            data:{isShowLoading:true,params:payload.params},
            types:[taskHandleSuccess],
            isnotify:true,
            msgSuc:''
        }
    })
}
function* typeList({payload}) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/taskProgramme/getTaskTypeList',
            method:'POST',
            data:{isShowLoading:true,params:payload},
            types:[taskTypeListSuccess],
            isnotify:true,
            msgSuc:false
        }
    })
}
function* modal({payload}) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/taskProgramme/'+payload.url,
            method:'POST',
            data:{isShowLoading:true,params:payload.params},
            types:[taskModalSuccess],
            isnotify:true,
            msgSuc:''
        }
    })
}



// watch -> fork
function* watchTaskList() {
    yield takeLatest(GET_TASK_LIST_ACTION,getList);
}
function* watchTaskHandle() {
    yield takeLatest(GET_TASK_HANDLE_ACTION,handle);
}
function* watchTaskTypeList() {
    yield takeLatest(GET_TASK_TYPE_ACTION,typeList);
}
function* watchTaskModal() {
    yield takeLatest(GET_TASK_MODAL_ACTION,modal);
}



export const task = [
    fork(watchTaskList),
    fork(watchTaskHandle),
    fork(watchTaskTypeList),
    fork(watchTaskModal),
];