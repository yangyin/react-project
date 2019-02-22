import { 
    JURISDICTION_LIST_ACTION,
    JURISDICTION_LIST_SUCCESS,
    JURISDICTION_EDIT_ACTION,
    JURISDICTION_ASSISTANT_UPDATE,
    JURISDICTION_DEL_ACTION,
    JURISDICTION_DETAIL_LIST_ACTION,
    JURISDICTION_DETAIL_LIST_SUCCESS,
    JURISDICTION_DETAIL_FETCH_USER_SUCCESS,
    JURISDICTION_DETAIL_FETCH_USER_ACTION,
    JURISDICTION_DETAIL_CLEAR_USERLIST,
    JURISDICTION_DETAIL_UPDATE_ACTION,
    JURISDICTION_DETAIL_PRO_ACTION,
    JURISDICTION_DETAIL_PRO_SUCCESS,
    JURISDICTION_LIST_JUR,
    JURISDICTION_NEW_LIST_ACTION,JURISDICTION_NEW_LIST_SUCCESS,
    JURISDICTION_NEW_LIST_UPDATE_CHECKED,
    JURISDICTION_NEW_LIST_SAVE_ACTION,JURISDICTION_NEW_LIST_SAVE_SUCCESS,
    JURISDICTION_COPY_ACTION} from './types';



//新权限列表
//参数：角色类型
export const getJurNewListAction = (roleType) => {
    return {
        type:JURISDICTION_NEW_LIST_ACTION,
        payload:roleType
    }
}
export const getJurNewListSuc = (data) => {
    return {
        type:JURISDICTION_NEW_LIST_SUCCESS,
        payload:data
    }
}

//更新权限项是否选中
export const updateListChecked = (payload) => {
    return {
        type:JURISDICTION_NEW_LIST_UPDATE_CHECKED,
        payload:payload
    }
}

//更新保存权限项
export const jurSaveAction = (payload) => {
    return {
        type:JURISDICTION_NEW_LIST_SAVE_ACTION,
        payload:payload
    }
}
export const jurSaveSuc = (data) => {
    return {
        type:JURISDICTION_NEW_LIST_SAVE_SUCCESS,
        payload:data
    }
}


/***************************** */




//权限助手列表
export const getJurisdictionAction = () => {
    return {
        type:JURISDICTION_LIST_ACTION
    }
}
export const getJurisdictionSuccess = (data) => {
    return {
        type:JURISDICTION_LIST_SUCCESS,
        payload:data
    }
}
export const getJurisdictionJur = (data) => {
    return {
        type:JURISDICTION_LIST_JUR,
        payload:data
    }
}
//编辑
export const editJurAction = (params) => {
    return {
        type:JURISDICTION_EDIT_ACTION,
        payload:params
    }
}

//复制
export const copyJurAction = (params) => {
    return {
        type:JURISDICTION_COPY_ACTION,
        payload:params
    }
}

//删除
export const delJurAction = (params) => {
    return {
        type:JURISDICTION_DEL_ACTION,
        payload:params
    }
}



//更新成功
export const jurUpdateSuccess = (data) => {
    return {
        type:JURISDICTION_ASSISTANT_UPDATE,
        payload:data
    }
}
/**  详情 */
//列表
export const getJurDetailsListAction = (params) => {
    return {
        type:JURISDICTION_DETAIL_LIST_ACTION,
        payload:params
    }
}
export const getJurDetailsListSuccess = (data) => {
    return {
        type:JURISDICTION_DETAIL_LIST_SUCCESS,
        payload:data
    }
}

//授权，用户搜索
export const getJurDetailFetchUserAction = (params) => {
    return {
        type:JURISDICTION_DETAIL_FETCH_USER_ACTION,
        payload:params
    }
}
export const getJurDetailFetchUserSuc = (data) => {
    return {
        type:JURISDICTION_DETAIL_FETCH_USER_SUCCESS,
        payload:data
    }
}
//详情 更新
export const postJurDetailUpdateAction = (params) => {
    return {
        type:JURISDICTION_DETAIL_UPDATE_ACTION,
        payload:params
    }
}
//获取授权列表
export const postJurDetailProAction = (params) => {
    return {
        type:JURISDICTION_DETAIL_PRO_ACTION,
        payload:params
    }
}
export const postJurDetailProSuc = (data) => {
    return {
        type:JURISDICTION_DETAIL_PRO_SUCCESS,
        payload:data
    }
}

//清空userlist 数据
export const jurDetailUserListClear = () => {
    return {
        type:JURISDICTION_DETAIL_CLEAR_USERLIST
    }
}