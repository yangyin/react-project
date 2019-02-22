import {DEU_QUES_SUCCESS,DEU_QUES_JUR,DEU_QUES_POINT_SUCCESS,
    EDUQUES_DEL_ACTION,EDUQUES_SAVE_ACTION,
    EDUCATION_LIST_ACTION,EDUCATION_LIST,
    EDUCATION_INFO_ACTION,EDUCATION_INFO,
    EDUQUES_LABEL_ADD_ACTION,EDUQUES_LABEL_DEL_ACTION,
    EDUQUES_POINT_ADD_ACTION,EDUQUES_POINT_DEL_ACTION,
} from './types.js';



/**
 * 教育题库考点新增
 */
export const editEduPointAddAction = (params) => {
    return {
        type: EDUQUES_POINT_ADD_ACTION,
        payload: params
    }
}
/**
 * 教育题库考点删除
 */
export const editEduPointDelAction = (params) => {
    return {
        type: EDUQUES_POINT_DEL_ACTION,
        payload: params
    }
}

/**
 * 教育题库标签新增
 */
export const editEduLabelAddAction = (params) => {
    return {
        type: EDUQUES_LABEL_ADD_ACTION,
        payload: params
    }
}
/**
 * 教育题库标签删除
 */
export const editEduLabelDelAction = (params) => {
    return {
        type: EDUQUES_LABEL_DEL_ACTION,
        payload: params
    }
}
/**
 * 教育题库编辑
 */
export const editEduAction = (params) => {
    return {
        type: EDUQUES_SAVE_ACTION,
        payload: params
    }
}
/**
 * 教育题库删除题目
 */
export const listDelAction = (params) => {
    return {
        type: EDUQUES_DEL_ACTION,
        payload: params
    }
}

/**
 * 教育题库列表
 */
export const listAction = (params) => {
    return {
        type: EDUCATION_LIST_ACTION,
        payload: params
    }
}
export const getList = (data) => {
    return {
        type: EDUCATION_LIST,
        payload: data
    }
}
/**
 * 教育题库 题目详情
 */
export const InfoAction = (params) => {
    return {
        type: EDUCATION_INFO_ACTION,
        payload: params
    }
}
export const getInfo = (data) => {
    return {
        type: EDUCATION_INFO,
        payload: data
    }
}

/**
 * 控制刷新状态
 */
export const statusControl = (bool) => {
    return {
        type: DEU_QUES_SUCCESS,
        payload: { status: bool }
    }
}

export const operationStatus = (data) => {
    return {
        type: DEU_QUES_SUCCESS,
        payload: data
    }
}
/**
 * 控制考点和标签的刷新状态
 */
export const statusControlPoint = (bool) => {
    return {
        type: DEU_QUES_POINT_SUCCESS,
        payload: { status: bool }
    }
}

export const operationStatusPoint= (data) => {
    return {
        type: DEU_QUES_POINT_SUCCESS,
        payload: data
    }
}

// 权限
export const controlJur = (data) => {
    return {
        type:DEU_QUES_JUR,
        payload:data
    }
}
