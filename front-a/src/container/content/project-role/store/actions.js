import { PROJECT_ROLE_LIST_ACTION ,PROJECT_ROLE_LIST_SUCCESS,PROJECT_ROLE_SAVE_ACTION,PROJECT_ROLE_SAVE_SUCCESS,PROJECT_ROLE_EDIT_ACTION,PROJECT_ROLE_DEL_ACTION,PROJECT_ROLE_LIST_JUR} from './types';

//获取项目角色列表
export const getProjectRoleListAction = () => {
    return {
        type:PROJECT_ROLE_LIST_ACTION
    }
}
export const getProjectRoleListSuccess = (data) => {
    return {
        type:PROJECT_ROLE_LIST_SUCCESS,
        payload:data
    }
}
export const getProjectRoleListJur = (data) => {
    return {
        type:PROJECT_ROLE_LIST_JUR,
        payload:data
    }
}


//保存
export const saveRoleAction = (params) => {
    return {
        type:PROJECT_ROLE_SAVE_ACTION,
        payload:params
    }
}
export const saveRoleSucess = (params) => {
    return {
        type:PROJECT_ROLE_SAVE_SUCCESS,
        payload:params
    }
}


export const saveRoleStatus = (bool) => {
    return {
        type:PROJECT_ROLE_SAVE_SUCCESS,
        payload:{status:bool}
    }
}

//编辑
export const editRoleAction = (params) => {
    return {
        type:PROJECT_ROLE_EDIT_ACTION,
        payload:params
    }
}
//删除
export const delRoleAction = (params) => {
    return {
        type:PROJECT_ROLE_DEL_ACTION,
        payload:params
    }
}
