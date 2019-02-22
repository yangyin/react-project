import { 
    EMPLOY_GROUP_LIST, EMPOLY_MEMBER_LIST, 
    EMPLOY_GROUP_JURISDICTION, 
    EMPOLY_GROUP_DELETE,GROUP_SEARCH_LIST,
    GROUP_SEARCH_FAIL, GROUP_SEARCH_ADD
} from './types';
import { CALL_API } from '../../../../applyMiddleWare/request';

// 获取班组管理列表
export function getEmployGroup(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/team/selectTeamListByCompanyId',
            method:'POST',
            data:{ isShowLoading:true, params: options },
            types:[ EMPLOY_GROUP_LIST,'', EMPLOY_GROUP_JURISDICTION ]
        }
    }
}

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: EMPLOY_GROUP_JURISDICTION, payload:type}
}

// 删除班组
export function deleteEmpolyGroup(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/team/deleteTeamById',
            method:'POST',
            data:{ params: options },
            isnotify: true,
            msgSuc: '删除成功！',
            types:[EMPOLY_GROUP_DELETE]
        }
    }
}
/**
 * 更新删除状态
 * @param {boolean} bool 
 */
export const deleteEmpolyGroupStatus = (bool) => {
    return { type: EMPOLY_GROUP_DELETE, payload:{status:bool}};
}
// 成员管理
export function getEmployMember(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/team/selectTeamWorkerList',
            method:'POST',
            data:{isShowLoading:true, params: options },
            types:[EMPOLY_MEMBER_LIST]
        }
    }
}

/**
 * 根据负责人电话 查询班组
 * @param {*proId} params 
 * @param {*query} params 
 */
export const getTeamByPhone = (params)=> {
    return {
        [CALL_API]: {
            url:'sdpbusiness/team/selectSaveTeamByParam',
            method:'POST',
            data:{params},
            isnotify:true,
            msgSuc:false,
            types:[GROUP_SEARCH_LIST,GROUP_SEARCH_FAIL]
        }
    }
}

/**
 * 添加班组
 * @param {*addGroup}  添加班组列表 
 */
export const addGroup = (params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/team/saveTeam',
            method:'POST',
            data:{params,isShowLoading:true},
            isnotify:true,
            types:[GROUP_SEARCH_ADD]
        }
    }
}
export const addGroupStatus = (bool) => {
    return {type:GROUP_SEARCH_ADD,payload:{ status:bool}};
}