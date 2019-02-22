import { 
    PROJECT_DATA_TYPE_ACTION,
    PROJECT_DATA_TYPE_SUCCESS,
    PROJECT_DATA_DICTION_ACTION,
    PROJECT_DATA_DICTION_SUCCESS,
    PROJECT_DATA_DELETE_ACTION,
    PROJECT_DATA_EDIT_ACTION,
    PROJECT_DATA_UPDATE,
    PROJECT_DATA_TYPE_JUR,
    PROJECT_DATA_CLEAR_STORE
} from './types';

//请求类型列表
export const getProjectDataTypeAction = () => {
    return {
        type:PROJECT_DATA_TYPE_ACTION
    }
}
export const getProjectDataTypeSuccess = (data) => {
    return {
        type:PROJECT_DATA_TYPE_SUCCESS,
        payload:data
    }
}
export const getProjectDataTypeJur = (data) => {
    return {
        type:PROJECT_DATA_TYPE_JUR,
        payload:data
    }
}

//值列表
export const getDictionAction = (params) => {
    return {
        type:PROJECT_DATA_DICTION_ACTION,
        payload:params
    }
}
export const getDictionSuccess = (data) => {
    return {
        type:PROJECT_DATA_DICTION_SUCCESS,
        payload:data
    }
}

//删除
export const proDataDelAction = (params) => {
    return {
        type:PROJECT_DATA_DELETE_ACTION,
        payload:params
    }
}


//更新完成
export const proDataUpdateSuc = (data) => {
    return {
        type:PROJECT_DATA_UPDATE,
        payload:data
    }
}

//编辑
export const proDataEditAction = (params) => {
    return {
        type:PROJECT_DATA_EDIT_ACTION,
        payload:params
    }
}

//清空数据，还原为初始值
export const projectDataClearStore = () => {
    return {
        type:PROJECT_DATA_CLEAR_STORE
    }
}