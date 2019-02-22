import { LIST_SINGLE,LIST_MULTIPLE,LIST_READING,EDU_DETAILS, TOPIC_LIST, EDU_DETAILS_DELETE, EDU_DETAILS_EDIT } from './types';
import { CALL_API } from '../../../../applyMiddleWare/request';


// 页面初始化数据
export function getEduDatas(id) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/getEducationHomePage',
            method:'POST',
            data:{isShowLoading:true, params: {programId: id} },
            types:[EDU_DETAILS]
        }
    }
}

// 剔除题目
export function deleteTopic(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/deleteEducationAnswer',
            method:'POST',
            data:{ params: options },
            isnotify: true,
            msgErr: '删除失败!',
            msgSuc: '删除成功！',
            types:[EDU_DETAILS_DELETE]
        }
    }
}
/**
 * 更新剔除题目状态
 * @param {boolean} bool 
 */
export const deleteTopicStatus = (bool) => {
    return { type: EDU_DETAILS_DELETE, payload:{status:bool}};
}
// 筛选需添加的题目
export function getEduTopics(options) {
    let typeList = LIST_SINGLE;
    let answerType='1';
    switch(options.answerType){
        case 'listSingle':
        typeList=LIST_SINGLE;
        answerType='1';
        break;
        case 'listMultiple':
        typeList=LIST_MULTIPLE;
        answerType='0';
        break;
        case 'listReading':
        typeList=LIST_READING;
        answerType='2';
        break;
        default:
        break;
    }
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/getEducationAnswerByParams',
            method:'POST',
            data:{isShowLoading:true, params: {...options,answerType} },
            types:[typeList]
        }
    }
}
// 编辑方案
export function editScheme(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/answer/insertEducationAnswerByParams',
            method:'POST',
            data:{ isShowLoading: true, params: options },
            isnotify: true,
            msgErr: '编辑方案失败!',
            msgSuc: '编辑方案成功！',
            types:[EDU_DETAILS_EDIT]
        }
    }
}
/**
 * 更新编辑方案状态
 * @param {boolean} bool 
 */
export const editSchemeStatus = (bool) => {
    return { type: EDU_DETAILS_EDIT, payload:{status:bool}};
}