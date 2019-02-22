import { ROLE_LIST_SCCUESS ,ROLE_DETAIL_LIST,IS_ADD_BISS_USER_ROLE,UPDATE_BISS_USER_ROLE,ROLE_LIST_JURISDICTION,ROLE_UPDATE_SCCUESS} from './types';
import { CALL_API } from '@/applyMiddleWare/request';



/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: ROLE_LIST_JURISDICTION, payload:type}
}

//获取项目角色列表
export const getBissRoleList = () => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/roleRelation/getBissRoleListAjax',
            method:'POST',
            data:{isShowLoading:true},
            types:[ROLE_LIST_SCCUESS,,ROLE_LIST_JURISDICTION],
            isnotify:true,
            msgSuc:false
        }
    }
}
/**
 * 获取详情
 * pageNum: 1,pageSize: 10,order: 'asc',roleId
 */
export const getBissUserRoleRelationData=(params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/roleRelation/getBissUserRoleRelationData',
            method:'POST',
            data:{params,isShowLoading:true},
            types:[ROLE_DETAIL_LIST],
            isnotify:true,
            msgSuc:false
        }
    }
}
export const updateRoleStatus = (bool) => {
    return {type:ROLE_UPDATE_SCCUESS,payload:{status:bool}};
}
//编辑项目角色
export const updateRole = (params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/roleRelation/updateRole',
            method:'POST',
            data:{params,isShowLoading:true},
            types:[ROLE_UPDATE_SCCUESS],
            isnotify:true
        }
    }
}

//删除角色
export const deleteRole = (params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/roleRelation/deleteRole',
            method:'POST',
            data:{params,isShowLoading:true},
            types:[ROLE_UPDATE_SCCUESS],
            isnotify:true
        }
    }
}

//新增角色
export const addRole = (params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/roleRelation/addRoleBiss',
            method:'POST',
            data:{params,isShowLoading:true},
            types:[ROLE_UPDATE_SCCUESS],
            isnotify:true
        }
    }
}

/**
 * 添加成员
 * {roleId,userId,relationState:'y'}
 */
export const addBissUserRole = (params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/roleRelation/addBissUserRoleRelation',
            method:'POST',
            data:{params,isShowLoading:true},
            types:[IS_ADD_BISS_USER_ROLE],
            isnotify:true
        }
    }
}
/**
 * 修改isAddBissUserRole
 * params:-> true or false
 */
export const updateAddBissUserRole = (params) => {
    return {type:IS_ADD_BISS_USER_ROLE,payload:{status:params}};
}
/**
 * 冻结、解冻按钮、移除角色成员
 * roleRelationId:id 多个用，隔开
 * relationState:y 解除除冻结 h 冻结 n移除
 */
export const updateBissUserRole = (params) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/roleRelation/updateBissUserRoleRelation',
            method:'POST',
            data:{params,isShowLoading:true},
            types:[UPDATE_BISS_USER_ROLE],
            isnotify:true,
            msgSuc:'移除成功'
        }
    }
}
/**
 * 更新状态
 * @param {*boolean} params 
 */
export const updateBissUserRoleStatus = (params) => {
    return {type:UPDATE_BISS_USER_ROLE,payload:{status:params}};
}