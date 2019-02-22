import {
    PRO_DETAIL_JURISDICTION,
    DETAIL_PRO_SUCCESS, 
    PRO_DETAIL_ERROR,
    UNIT_LIST_SUCCESS
} from './types';
import {getProjectList,updateProId} from '../../../../components/topbar/store/action';

import { CALL_API } from '@/applyMiddleWare/request';

/**
 * 删除项目
 * @param {*} proId 项目id 
 */
export function delProject (value,proListParams) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/deletePro',
            method:'POST',
            data: {isShowLoading: true, params: value},
            types:['',PRO_DETAIL_ERROR,],
            msgSuc:'删除成功',
            isnotify:true,
            callback:(data,dispatch)=>{
                dispatch(projectDetail(value))
                dispatch (getProjectList (proListParams));
            }
        }
    }
}

/**
 * 获取项目详情
 * @param {*} proId 项目id 
 * @returns belongCompanyId 所属单位等同于修改时的belongCompany
 */
export function projectDetail (value) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/projectDetails',
            method:'POST',
            data: {isShowLoading: true, params: value},
            types:[DETAIL_PRO_SUCCESS,PRO_DETAIL_ERROR,PRO_DETAIL_JURISDICTION],
        }
    }
}
/**
 * 更新项目信息
 * @param proId	是	string	项目id
 * @param proName	是	string	项目名字
 * @param proShortName	是	string	项目简称
 * @param proNo	否	string	项目编号 未修改传null
 * @param proPrice	是	double	项目造价
 * @param proResponsible	是	string	项目负责人
 * @param proType	是	string	项目类型
 * @param proCategory	否	string	项目类别 未修改传null
 * @param proProvince	是	string	省份
 * @param proCity	是	string	市
 * @param proArea	否	string	区 未修改传null
 * @param proAddr	是	string	详细地址
 * @param proBeginTime	是	string	计划开工时间
 * @param proEndTime	是	string	计划竣工时间
 * @param proLable	否	string	项目标签 多个用逗号隔开
 * @param proPic	否	string	项目图片 未修改传null
 * @param belongCompany	是	string	所属单位
 * @param isApproval	否	int	是否审核
 * @param proPriceUp	是	string	项目造价大写
 * @param longitude	是	string	经度
 * @param latitude	是	string	纬度
 */
export function updateProjectInfo (option,proListParams) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/updateProject',
            method:'POST',
            data: {isShowLoading:true,params: option},
            types:['',PRO_DETAIL_ERROR,PRO_DETAIL_JURISDICTION],
            isnotify:true,
            msgSuc:'项目更新成功',
            callback:(data,dispatch)=>{
                dispatch(projectDetail({proId:option.proId}))
                dispatch(updateProId(option.proId,option.proShortName))
                dispatch (getProjectList (proListParams));
            }
        }
    }
}


  /**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: PRO_DETAIL_JURISDICTION, payload:type}
}

//获取单位列表
export function getUnitList(params) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/selectJionCompanyByProId',
            method:'GET',
            data:{params},
            isnotify:false,
            types: [UNIT_LIST_SUCCESS]
        }
    }
}
