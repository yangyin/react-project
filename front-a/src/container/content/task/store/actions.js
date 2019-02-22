import { 
    GET_TASK_LIST_ACTION,
    GET_TASK_LIST_SUCCESS,
    GET_TASK_HANDLE_ACTION,
    GET_TASK_HANDLE_SUCCESS,
    GET_TASK_MODAL_ACTION,
    GET_TASK_MODAL_SUCCESS,
    GET_TASK_TYPE_ACTION,
    GET_TASK_TYPE_SUCCESS,
    GET_TASK_MODAL_ADD_ACTION,
    GET_TASK_LIST_JUR
} from './types';

export const getListAction = () => {
    return {
        type:GET_TASK_LIST_ACTION
    }
}
export const getListSuccess = (data) => {
    return {
        type:GET_TASK_LIST_SUCCESS,
        payload:data
    }
}
export const getListJur = (data) => {
    return {
        type:GET_TASK_LIST_JUR,
        payload:data
    }
}

//操作
export const taskHandleAction = (params) => {
    return {
        type:GET_TASK_HANDLE_ACTION,
        payload:params
    }
}
export const taskHandleSuccess = (data) => {
    return {
        type:GET_TASK_HANDLE_SUCCESS,
        payload:data
    }
}

//获取任务类型列表接口
export const taskTypeListAction = (params) => {
    return {
        type:GET_TASK_TYPE_ACTION,
        payload:params
    }
}
export const taskTypeListSuccess = (data) => {
    return {
        type:GET_TASK_TYPE_SUCCESS,
        payload:data
    }
}

//modal操作
export const taskModalAction = (params) => {
    return {
        type:GET_TASK_MODAL_ACTION,
        payload:params
    }
}
export const taskModalSuccess = (data) => {
    return {
        type:GET_TASK_MODAL_SUCCESS,
        payload:data
    }
}


//新增模态框空数据
export const taskModalAddAction = () => {
    return {
        type:GET_TASK_MODAL_ADD_ACTION
    }
}