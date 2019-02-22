import {COMPACT_LIST,COMPACT_DETAIL,COMPACT_JURISDICTION} from './types.js';
import { CALL_API } from '@/applyMiddleWare/request';
/**
 * 合同管理
 * @param {*beginDate *endDate  *typeCode *pageNum *pageSize} opt
 * @returns
 */
export function getCompactInfo(opt){
    return {
        [CALL_API]:{
            url:'/sdpbusiness/contract/getContractLists',
            method:'POST',
            data:{isShowLoading:true,params:opt},
            types:[COMPACT_LIST]
        }
    }
}
/**
 *
 *
 * @export
 * @param {*contractId} 合同id
 * @returns
 */
export function compactDetail(opt){
    return{
        [CALL_API]:{
            url:'/sdpbusiness/contract/getContract',
            method:'post',
            data:{isShowLoading:true,params:opt},
            types:[COMPACT_DETAIL]
        }
    }
}

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = type => {
    return { type: COMPACT_JURISDICTION, payload: type };
};