import {PRO_QUALITY_JURISDICTION,QUALITY_PROJECT_ERROR,QUALITY_LIST,QUALITY_MARK} from './types';

import { CALL_API } from '@/applyMiddleWare/request';


/**
 * 获取质量列表
 * @param {*} proId 
 * 
 */
export const getQualityList = option => {
    return {
        [CALL_API]: {
            // method:'POST',
            url:'/sdpbusiness/task/selectQualityList',
            data: {isShowLoading: false, params: option},
            types:[QUALITY_LIST,QUALITY_PROJECT_ERROR,PRO_QUALITY_JURISDICTION],
        }
    }
};

/**
 * 新增质量管理
 * @param {*} proId: 0068//项目id
 * @param checkTime: 2018-08-12 //检查时间
 * @param planId: //关联的计划或者标段 有计划就计划的id 没有就传空
 * @param qualityPerson: 质检人员2
 * @param {*} checkSituation: 检查情况2
 * @param pictures:[{url:'a.png'}]
 * @param {*} isCheck:n //是否整改 需要整改再传整改信息
 * @param {*} checkContent:整改要求2
 * @param {*} RectificationTime: 2018-08-12 整改时间
 * @param {*} ExecutorPerson:执行人
 * @param AuditorPerson: GotnksnDoGSkmsHjBTo审核人
 */

export const qualitAdd = (option,params) => {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/task/addQuality',
            method:'POST',
            data: {isShowLoading: true, params:option},
            types:['',QUALITY_PROJECT_ERROR],
            msgSuc:'新增成功',
            isnotify:true,
            callback:(data,dispatch)=>{
               dispatch( updateMark(false));
               dispatch(getQualityList(params))
            }
        }
    }

};
// 更改isMark 状态
export const updateMark = (bol) => {
    return {type:QUALITY_MARK,payload:bol};
}
  /**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: PRO_QUALITY_JURISDICTION, payload:type}
}


