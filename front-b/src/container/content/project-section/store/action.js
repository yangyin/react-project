import {
  PROJECT_SECTION_LIST,
  PROJECT_COMPANY_ERROR,
  PRO_SECTION_JURISDICTION,
} from './types';
import { CALL_API } from '@/applyMiddleWare/request';

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = type => {
  return {type: PRO_SECTION_JURISDICTION, payload: type};
};
/**
 * 获取标段列表
 * @param {*} proId: 0152 
 */
export function getSectionList (options) {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/project/findProSection',
            data:{isShowLoading: true, params: options},
            types:[PROJECT_SECTION_LIST,PROJECT_COMPANY_ERROR,PRO_SECTION_JURISDICTION]
        }
    }
}
/**
 * 编辑标段管理
 * @param id
 * @param sectionName
 * @param sectionMnagerId
 * @param sectionMnagerPhone
 * @param proId
 */
export function editSectionInfo (options) {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/project/updateSentionObj',
            method:'POST',
            data:{isShowLoading: true, params: options},
            types:['',PROJECT_COMPANY_ERROR],
            isnotify:true,
            msgSuc:'保存成功',
            callback:(data,dispatch)=>{
                dispatch (getSectionList ({proId: options.proId}));
            }
        }
    }
}

/**
 * 删除标段管理
 * @param {*} id 
 */
export function deleteProSection (options, listOpt) {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/project/deleteProSention',
            method:'POST',
            data:{isShowLoading:true,params: options},
            types:['',PROJECT_COMPANY_ERROR],
            isnotify:true,
            msgSuc:'删除成功',
            callback:(data,dispatch)=>{
                dispatch (getSectionList (listOpt));
            }
        }
    }
}

/**
 * 新建标段管理
 * teamId: ehOd8hjSOSg2UGOF4XZ teamId返回得
 * sectionMnagerId: pgGrYF2e5Kk3PG1Gixc teamManager返回得
 * sectionMnagerPhone: userPhone：18682851338
 * proId: 0152
 * sectionName: 彭测试标段
 */
export function addSectionForm (options) {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/project/addSentionObj',
            method:'POST',
            data:{isShowLoading: true, params: options},
            types:['',PROJECT_COMPANY_ERROR],
            msgSuc:'新增成功',
            isnotify:true,
            callback:(data,dispatch)=>{
                dispatch (getSectionList ({proId: options.proId}));
            }
        }
    }
}
