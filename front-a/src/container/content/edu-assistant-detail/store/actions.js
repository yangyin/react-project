import {
    EDU_ASSIS_DETAIL_SUCCESS,
    EDU_ASSIS_DETAIL_LIST_ACTION, EDU_ASSIS_DETAIL_LIST,
    EDU_ASSIS_DETAIL_DEL_ACTION, EDU_ASSIS_DETAIL_SAVE_ACTION,
    EDU_ASSIS_MODAL_TOPICS_ACTION, EDU_ASSIS_MODAL_TOPICS,
} from './types.js';


/**
 * 教育助手详情modal-题目列表
 * 1-单选 0-多选 2-阅读
 */
export const modalTopicsAction = (params) => {
    // let typeList = LIST_SINGLE;
    let answerType = 1;
    switch (params.answerType) {
        case 'listSingle':
            // typeList = LIST_SINGLE;
            answerType = 1;
            break;
        case 'listMultiple':
            // typeList = LIST_MULTIPLE;
            answerType = 0;
            break;
        case 'listReading':
            // typeList = LIST_READING;
            answerType = 2;
            break;
        default:
            break;
    }
    return {
        type: EDU_ASSIS_MODAL_TOPICS_ACTION,
        payload: { ...params, answerType }
    }
}
export const modalTopics = (data) => {
    return {
        type: EDU_ASSIS_MODAL_TOPICS,
        payload: data
    }
}
/**
 * 教育助手详情-列表
 * @params programId 
 */
export const listAction = (params) => {
    return {
        type: EDU_ASSIS_DETAIL_LIST_ACTION,
        payload: params
    }
}
export const getList = (data) => {
    return {
        type: EDU_ASSIS_DETAIL_LIST,
        payload: data
    }
}


/**
 * 教育助手详情列表-剔除
 */
export const listDelAction = (params) => {
    return {
        type: EDU_ASSIS_DETAIL_DEL_ACTION,
        payload: params
    }
}
/**
 * 教育助手详情列表-保存
 */
export const eduAssisSaveAction = (params) => {
    return {
        type: EDU_ASSIS_DETAIL_SAVE_ACTION,
        payload: params
    }
}

export const operateAbout = (data) => {
    return {
        type: EDU_ASSIS_DETAIL_SUCCESS,
        payload: data
    }
}


/**
 * 控制刷新状态
 */
export const statusControl = (bool) => {
    return {
        type: EDU_ASSIS_DETAIL_SUCCESS,
        payload: { status: bool }
    }
}

export const operationStatus = (data) => {
    return {
        type: EDU_ASSIS_DETAIL_SUCCESS,
        payload: data
    }
}
