import { DEPT_LIST, DEPT_DELETE, DEPT_ADD, DEPT_EDIT } from './types';
import { CALL_API } from '../../../../applyMiddleWare/request';

// 页面初始化数据
export function initDeptList() {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/findDeptListByCompanyId',
            method:'POST',
            data:{ isShowLoading:true },
            types:[ DEPT_LIST ]
        }
    }
}

// 删除
export function deleteDept(id) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/DeteleDeptInfo',
            method:'POST',
            data:{ params: {'deptId': id} },
            isnotify: true,
            msgErr: '删除失败!',
            msgSuc: '删除成功！',
            types:[DEPT_DELETE]
        }
    }
}
/**
 * 更新删除状态
 * @param {boolean} bool 
 */
export const deleteDeptStatus = (bool) => {
    return { type: DEPT_DELETE, payload:{status:bool}};
}
// 编辑部门
export function editDept(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/editDeptInfo',
            method:'POST',
            data:{ params: options },
            isnotify: true,
            msgErr: '部门编辑失败!',
            msgSuc: '部门编辑成功！',
            types:[ DEPT_EDIT ]
        }
    }
}
/**
 * 更新编辑状态
 * @param {boolean} bool 
 */
export const editDeptStatus = (bool) => {
    return { type: DEPT_EDIT, payload:{status:bool}};
}
// 添加部门
export function addDept(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/addDeptInfo',
            method:'POST',
            data:{ isShowLoading:true, params: options },
            isnotify: true,
            msgErr: '新增部门失败!',
            msgSuc: '新增部门成功！',
            types:[ DEPT_ADD ]
        }
    }
}
/**
 * 更新添加状态
 * @param {boolean} bool 
 */
export const addDeptStatus = (bool) => {
    return { type: DEPT_ADD, payload:{status:bool}};
}