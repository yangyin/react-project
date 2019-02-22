import { TEAM_MANAGEMENT_LIST, MEMBER_MANAGEMENT_LIST, TEAM_MANAGEMENT_LIST_JURISDICTION, GROUP_DELETE,TEAM_MANAGEMENT_SEARCH_LIST,TEAM_MANAGEMENT_SEARCH_FAIL,TEAM_MANAGEMENT_SEARCH_ADD} from './types';
import { CALL_API } from '../../../../applyMiddleWare/request';

// 获取班组管理列表
export function getTeamManagement(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/team/getTeamList',
            method:'POST',
            data:{ isShowLoading:true, params: options },
            types:[ TEAM_MANAGEMENT_LIST,'', TEAM_MANAGEMENT_LIST_JURISDICTION ]
        }
    }
}

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: TEAM_MANAGEMENT_LIST_JURISDICTION, payload:type}
}

// 删除班组
export function deleteTeam(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/team/deleteTeam',
            method:'POST',
            data:{ params: options },
            isnotify: true,
            msgSuc: '删除成功！',
            types:[GROUP_DELETE]
        }
    }
}
/**
 * 更新删除状态
 * @param {boolean} bool 
 */
export const deleteTeamStatus = (bool) => {
    return { type: GROUP_DELETE, payload:{status:bool}};
}
// 成员管理
export function getMemberManagement(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/team/members/getMembers',
            method:'POST',
            data:{isShowLoading:true, params: options },
            types:[MEMBER_MANAGEMENT_LIST]
        }
    }
}

/**
 * 根据负责人电话 查询班组
 * @param {*proId} params 
 * @param {*query} params 
 */
export const getProTeamByPhone = (params)=> {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/getProTeamByPhone',
            method:'POST',
            data:{params},
            isnotify:true,
            msgSuc:false,
            types:[TEAM_MANAGEMENT_SEARCH_LIST,TEAM_MANAGEMENT_SEARCH_FAIL]
        }
    }
}

/**
 * 添加班组
 * @param {*proId} params 
 * @param {*proTeam}  添加班组列表 
 */
export const addProTeam = (params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/addProTeamB',
            method:'POST',
            data:{params,isShowLoading:true},
            isnotify:true,
            types:[TEAM_MANAGEMENT_SEARCH_ADD]
        }
    }
}
export const addProTeamStatus = (bool) => {
    return {type:TEAM_MANAGEMENT_SEARCH_ADD,payload:{ status:bool}};
}