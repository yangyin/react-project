import { EDUCATION_LIST, EDUCATION_LIST_ERROR, EDIT_EDU_LIST, COPY_LIST, DELETE_LIST, EDUCATION_LIST_JURISDICTION } from './types';
import { CALL_API } from '../../../../applyMiddleWare/request';


/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: EDUCATION_LIST_JURISDICTION, payload:type}
}

// 页面初始化数据
export function educationAssistantAll() {
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/getPgeListByCompanyId',
            method:'POST',
            data:{isShowLoading:true },
            types:[EDUCATION_LIST, EDUCATION_LIST_ERROR, EDUCATION_LIST_JURISDICTION]
        }
    }
}

//编辑教育方案
export function editEducation(ars) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/updatePge',
            method:'POST',
            data:{ isShowLoading:true, params: {'programId': ars.id, 'programName': ars.name, 'programContent': ars.content} },
            isnotify: true,
            msgErr: '编辑失败!',
            msgSuc: '编辑成功！',
            types:[EDIT_EDU_LIST]
        }
    }
}
/**
 * 更新编辑状态
 * @param {boolean} bool 
 */
export const editEducationStatus = (bool) => {
    return { type: EDIT_EDU_LIST, payload:{status:bool}};
}

//复制教育方案
export function copyEducation(ars) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/copyAnswerProgrameByCompanyId',
            method:'POST',
            data:{ isShowLoading:true, params: {'copyPgeId': ars.id, 'programName': ars.name} },
            isnotify: true,
            msgErr: '复制失败!',
            msgSuc: '复制成功！',
            types:[COPY_LIST]
        }
    }
}
/**
 * 更新复制状态
 * @param {boolean} bool 
 */
export const copyEducationStatus = (bool) => {
    return { type: COPY_LIST, payload:{status:bool}};
}

//删除教育方案
export function deleteEducation(id) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/deletePge',
            method:'POST',
            data:{ isShowLoading:true, params: {'programId': id} },
            isnotify: true,
            msgErr: '删除失败!',
            msgSuc: '删除成功！',
            types:[DELETE_LIST]
        }
    }
}
/**
 * 更新删除状态
 * @param {boolean} bool 
 */
export const deleteEducationStatus = (bool) => {
    return { type: DELETE_LIST, payload:{status:bool}};
}
