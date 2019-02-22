import {
    EMPLOY_LIST,
    DEPARTMENT_LIST,
    PERSON_LIST,
    PERSON_ERROR,
    EMPLOY_LIST_JURISDICTION,
    ADD_EMPLOY, DELETE_EMPLOY,
    RELATED_PROJECT,
    EMPLOY_JUR_LIST,
    EMPLOY_JUR_LIST_ITEM_CHECKED_STATUS,
    EMPLOY_JUR_SAVE,
    EMPLOY_RELATE_PROJECT_LIST,
    RELATED_REMOVE, 
    RELATED_PROJECT_LIST, 
    PROJECT_ROLE,
    RELATED_ADD
} from './types';


import { CALL_API } from '../../../../applyMiddleWare/request';





/**
 *获取员工的权限 通用接口
 * type:1-通用权限，2 - 项目自定义权限 ,3 - 设置自定义权限,4 - 修改自定义权限
 * @export
 * @param {*userId,type,proId} params
 * @returns
 */
export function getEmployCommonJurList(params) {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/permission/selectPermissionList',
            method: 'POST',
            data: { isShowLoading: true, params },
            types: [EMPLOY_JUR_LIST]
        }
    }
}

/*
* 更改权限列表，每个item的选中状态
*/
export const updateListChecked = (params) => {
    return { type:EMPLOY_JUR_LIST_ITEM_CHECKED_STATUS,payload:params};
}

/**
 *
 *修改权限后，保存
 * @export
 * @returns
 * 必填：userId,type
 * 选填：list，proId
 */
export function saveJurList(params) {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/permission/savePermissionTarget',
            method: 'POST',
            data: { isShowLoading: true, params },
            types: [EMPLOY_JUR_SAVE],
            isnotify: true,
            msgSuc:'权限更新成功'
        }
    }
} 

/*
* 更改isUpdate的状态
*/
export const updateStatus = (bool) => {
    return {type:EMPLOY_JUR_SAVE,payload:{ status : bool}};
}

/**
 *项目自定义表格权限列表，接口与 “获取员工的权限 通用接口”一样的
 *
 * @export
 * @param {*userId,type,proId} params
 * @returns
 */
export function getCustomList(params) {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/permission/selectPermissionList',
            method: 'POST',
            data: { isShowLoading: true, params },
            types: [EMPLOY_RELATE_PROJECT_LIST]
        }
    }
}













export function initStaffManagement(args) {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/user/getEmployLists',
            method: 'POST',
            data: { isShowLoading: true, params: { 'deptId': args.deptId, 'paramName': args.paramName, 'pageSize': args.pageSize, 'pageNum': args.pageNum } },
            types: [EMPLOY_LIST, '', EMPLOY_LIST_JURISDICTION]
        }
    }
}










/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: EMPLOY_LIST_JURISDICTION, payload: type }
}

// 部门初始化数据
export function initDepartment() {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/user/findDeptListC',
            method: 'POST',
            data: {},
            types: [DEPARTMENT_LIST]
        }
    }
}

// 删除
export function deleteStaff(id, args) {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/user/deleteDeptEmploy',
            method: 'POST',
            data: { isShowLoading: true, params: { 'userId': id } },
            isnotify: true,
            msgErr: '移除失败!',
            msgSuc: '移除成功！',
            types: [DELETE_EMPLOY]
        }
    }
}
/**
 * 更新删除状态
 * @param {boolean} bool 
 */
export const deleteStaffStatus = (bool) => {
    return { type: DELETE_EMPLOY, payload: { status: bool } };
}


// 搜索手机号或姓名
export function searchLink(phone) {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/user/findUserListByPhoneMan',
            method: 'POST',
            data: { isShowLoading: false, params: { 'phone': phone } },
            types: [PERSON_LIST, PERSON_ERROR]
        }
    }
}

// 新增员工
export function addStaff(options) {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/user/addDeptEmploy',
            method: 'POST',
            data: { isShowLoading: true, params: options },
            isnotify: true,
            msgSuc: '新增员工成功!',
            types: [ADD_EMPLOY]
        }
    }
}

/**
 * 更新删除状态
 * @param {boolean} bool 
 */
export const addStaffStatus = (bool) => {
    return { type: ADD_EMPLOY, payload: { status: bool } };
}

// 关联项目列表
export function relatedProList(url, options) {
    return {
        [CALL_API]: {
            url: url,
            method: 'POST',
            data: { isShowLoading: true, params: options },
            isnotify: false,
            types: [RELATED_PROJECT]
        }
    }
}

// 解除关联
export function removeRelated(url, params) {
    return {
        [CALL_API]: {
            url: url,
            method:'POST',
            data:{isShowLoading:false, params: params},
            isnotify: true,
            msgErr: '解除失败!',
            msgSuc: '解除成功！',
            types: [RELATED_REMOVE]
        }
    }
}
/**
 * 更新解除关联状态
 * @param {boolean} bool 
 */
export const removeRelatedStatus = (bool) => {
    return { type: RELATED_REMOVE, payload: { status: bool } };
}
// 项目列表
export function getRelatedProject(url, options) {
    return {
        [CALL_API]: {
            url: url,
            method:'POST',
            data:{isShowLoading:true, params: options},
            isnotify: false,
            types: [RELATED_PROJECT_LIST]
        }
    }
}
// 项目角色
export function getProjectRole(options) {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/user/selectRoleList',
            method:'POST',
            data:{isShowLoading:true, params: options},
            isnotify: false,
            types: [PROJECT_ROLE]
        }
    }
}
// 添加关联
export function addRelated(url, params) {
    return {
        [CALL_API]: {
            url: url,
            method:'POST',
            data:{isShowLoading:false, params: params},
            isnotify: true,
            msgErr: '关联失败!',
            msgSuc: '关联成功！',
            types: [RELATED_ADD]
        }
    }
}
/**
 * 更新添加关联状态
 * @param {boolean} bool 
 */
export const addRelatedStatus = (bool) => {
    return { type: RELATED_ADD, payload: { status: bool } };
}