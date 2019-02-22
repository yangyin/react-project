import {
    EDUCATION_INFO_SUCCESS,
    EDUCATION_INFO_DETAIL_RES,
    EDUCATION_ECHART_JURISDICTION,
} from './types';
import { CALL_API } from '../../../../applyMiddleWare/request';

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = type => {
    return { type: EDUCATION_ECHART_JURISDICTION, payload: type };
};
/**
 *三级教育信息
 * @export
 * @param {*proId:项目ID} params
 * @returns
 */
export function getEducationInfoAction(params) {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/answer/threeEducionInfoByProId',
            method:'POST',
            data:{isShowLoading:true,params},
            types:[EDUCATION_INFO_SUCCESS,'',EDUCATION_ECHART_JURISDICTION]
        }
    }
}
/**
 *三级教育信息明细
 * @export
 * @param {*proId:项目ID *pageNum *pageSize *teamId *userNameOrPhone} params
 * @returns
 */
export function getEducationDetailRes(params) {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/answer/findTeamThreeEducationDetail',
            method:'POST',
            data:{isShowLoading:true,params},
            types:[EDUCATION_INFO_DETAIL_RES]
        }
    }
}