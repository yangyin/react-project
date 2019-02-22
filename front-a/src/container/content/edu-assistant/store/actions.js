import {
    EDU_ASSIS_EDIT_SUCCESS,
    EDU_ASSIS_LIST_ACTION,EDU_ASSIS_LIST,
    EDU_ASSIS_EDIT_ACTION,
    EDU_ASSIS_COPY_ACTION,
    EDU_ASSIS_DEL_ACTION,
    EDU_ASSIS_JUR,
} from './types.js';


/**
 * 教育助手-列表-删除
 */
export const eduAssisDelAction = (params) => {
    return {
        type: EDU_ASSIS_DEL_ACTION,
        payload: params
    }
}
/**
 * 教育助手-列表-复制
 */
export const eduAssisCopyAction = (params) => {
    return {
        type: EDU_ASSIS_COPY_ACTION,
        payload: params
    }
}

/**
 * 教育助手-列表-编辑保存
 */
export const eduAssisEditAction = (params) => {
    return {
        type: EDU_ASSIS_EDIT_ACTION,
        payload: params
    }
}
export const getEduEdit = (data) => {
    return {
        type: EDU_ASSIS_EDIT_SUCCESS,
        payload: data
    }
}

/**
 * 教育助手-列表
 */
export const eduAssisListAction = (params) => {
    return {
        type: EDU_ASSIS_LIST_ACTION,
        payload: params
    }
}
export const getEduList = (data) => {
    return {
        type: EDU_ASSIS_LIST,
        payload: data
    }
}





/**
 * 控制刷新状态
 */
export const statusControl = (bool)=>{
    return {
        type:EDU_ASSIS_EDIT_SUCCESS,
        payload:{status:bool}
    }
}

//权限
export const controlJur = (data) => {
    return {
        type:EDU_ASSIS_JUR,
        payload:data
    }
}