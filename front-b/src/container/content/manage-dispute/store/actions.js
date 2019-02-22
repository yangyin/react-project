import { DISPUTE_JURISDICTION,DISPUTE_LIST,DISPUTE_INFO,DISPUTE_AUDIT} from './types';

import { CALL_API } from '@/applyMiddleWare/request';


/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = type => {
    return {type: DISPUTE_JURISDICTION, payload: type};
  };
/**
 * 纠纷管理列表
 * @param {*isUpload} 下载传true 不下载false 
 * @param {*type} 0代表最近30天 传1选择时间段 
 * @param {*startTime} 
 * @param {*endTime} 
 * @param {*proId} 
 * @param {*approveState} 5-全部 1-待处理 2-已处理 3-拒绝处理
 * @param {*pageSize} 每页数量
 * @param {*pageNum} 当前页
 */
export const getDisputeList = option => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/task/selectDisputesList',
            data:{isShowLoading: false, params: option},
            types:[DISPUTE_LIST,'',DISPUTE_JURISDICTION],
        }
    }
};
/**
 * 纠纷管理详情
 * @param {*id}
 */
export const getDisputeDetail = option => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/task/findDisputesDetailBy',
            method:'POST',
            data:{isShowLoading: true, params: option},
            types:[DISPUTE_INFO],
        }
    }
};
/**
 * 纠纷审核
 * @param {*id}
 * @param {*type} 3-拒绝  1-同意
 * @param {*handleNote} 审核备注
 */
export const getDisputeAudit = option => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/sign/updateDisputes',
            type:'post',
            data:{isShowLoading: true, params: option},
            types:[DISPUTE_AUDIT],
        }
    }
};
// 整改和审核触发更新
export const updateAction=(boolean)=>{
    return {type:DISPUTE_AUDIT,payload:{status:boolean}};
}