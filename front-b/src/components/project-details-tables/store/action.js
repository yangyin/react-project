import { UNIT_LIST_ADD, UNIT_LIST_REMOVE, UNIT_EMPLOY_LIST, UNIT_TEAM_LIST, UNIT_WORKER_LIST } from './types';
import { CALL_API } from '@/applyMiddleWare/request';

//新增单位
export function addUnitList(params) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/addCompanyInfo',
            method:'POST',
            data:{params},
            isnotify:true,
            types: [UNIT_LIST_ADD]
        }
    }
}
/**
 * 更新新增状态
 * @param {boolean} bool 
 */
export const addUnitStatus = (bool) => {
    return { type: UNIT_LIST_ADD, payload:{status:bool}};
}
//移除单位
export function removeUnitList(params) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/deleteProCompany',
            method:'POST',
            data:{params},
            isnotify:true,
            types: [UNIT_LIST_REMOVE]
        }
    }
}
/**
 * 更新移除状态
 * @param {boolean} bool 
 */
export const removeUnitStatus = (bool) => {
    return { type: UNIT_LIST_REMOVE, payload:{status:bool}};
}

//获取人员列表
export function getEmpolyList(params) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/selectOrgUsersByOrgId',
            method:'GET',
            data:{params},
            isnotify:false,
            types: [UNIT_EMPLOY_LIST]
        }
    }
}

//获取班组列表
export function getTeamList(params) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/selectTeamsByCompanyId',
            method:'GET',
            data:{params},
            isnotify:false,
            types: [UNIT_TEAM_LIST]
        }
    }
}

//获取班组列表
export function getWorkerList(params) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/selectTeamWorksByTeamId',
            method:'GET',
            data:{params},
            isnotify:false,
            types: [UNIT_WORKER_LIST]
        }
    }
}