import {
    PLATFROM_MANAGE_JUR_LIST,
    PLATFROM_MANAGE_JURISDICTION,
    PLATFROM_MANAGE_JUR_DEPT,
    PLATFROM_MANAGE_JUR_SEARCH,
    PLATFROM_MANAGE_JUR_SEARCH_CLEAR,
    PLATFROM_MANAGE_JUR_STATUS,
    PLATFROM_MANAGE_JUR_INIT_LIST,
    PLATFROM_MANAGE_DELLIST_INIT,
} from './types';
import { CALL_API } from '../../../../applyMiddleWare/request';


/**
 *获取权限列表
 *
 * @export
 * @returns
 */
export function getPermissListAction() {
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/getPermissBList',
            method: 'POST',
            data: { isShowLoading: true },
            types: [PLATFROM_MANAGE_JUR_LIST, null, PLATFROM_MANAGE_JURISDICTION]
        }
    }
}

/**
 * 获取部门数据
 */
export function getRoleListAction(params) {
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/getRoleList',
            method: 'POST',
            data: { isShowLoading: true, params },
            types: params['type'] === 'D' ? [PLATFROM_MANAGE_JUR_DEPT] : [PLATFROM_MANAGE_JUR_SEARCH]
        }
    }
}
/*
*   情空 账户 或者 员工的数据
*/
export const clearRoleSearchList = () => {
    return { type: PLATFROM_MANAGE_JUR_SEARCH_CLEAR }
}

export function updateStatus(bool) {
    return { type: PLATFROM_MANAGE_JUR_STATUS, payload: { status: bool } }
}

/**
 *保存授权
 * @export
 * @param {*targetType,jurId,targetd} params
 * @returns
 */
export function saveAction(params) {
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/addJurRelation',
            method: 'POST',
            data: { isShowLoading: true, params },
            types: [PLATFROM_MANAGE_JUR_STATUS],
            isnotify: true,
            msgSuc: ''
        }
    }
}

/**
 *获取删除授权列表，初始化
 * @export
 */
export function getJurRelationListAction(params) {
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/getUserListByJurRelation',
            method: 'POST',
            data: { isShowLoading: true ,params},
            types: [PLATFROM_MANAGE_JUR_INIT_LIST]
        }
    }
}

/**
 * 系统权限删除对象
 * @param {*} params deleteList: { userList:[]}
 */
export function deleteRelationAction(params) {
    return {
        [CALL_API]: {
            url: '/sdpbusiness/systemPermissB/deletePurRelation',
            method: 'POST',
            data: { isShowLoading: true ,params},
            types: [PLATFROM_MANAGE_JUR_STATUS],
            isnotify: true,
            msgSuc: ''
        }
    }
}

/**还原 delList的数据 */
export function initDelList() {
    return { type: PLATFROM_MANAGE_DELLIST_INIT}
}
