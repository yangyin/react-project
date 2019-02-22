import { call, fork, takeLatest } from 'redux-saga/effects';
import {
    PROJECT_ROLE_LIST_ACTION,
    PROJECT_ROLE_SAVE_ACTION,
    PROJECT_ROLE_EDIT_ACTION,
    PROJECT_ROLE_DEL_ACTION
} from './types';
import { CALL_API, Service } from '@/utils/utils';

import { getProjectRoleListSuccess,saveRoleSucess,getProjectRoleListJur } from './actions';


//ajax
function* getProRole() {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/role/getRoleLists',
            method: 'POST',
            data: { isShowLoading: true },
            types: [getProjectRoleListSuccess,null,getProjectRoleListJur],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* addProRole({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/role/addRole',
            method: 'POST',
            data: { isShowLoading: true ,params:payload},
            types: [saveRoleSucess],
            isnotify: true,
            msgSuc:''
        }
    })
}

function* editProRole ({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/role/updateRole',
            method: 'POST',
            data: { isShowLoading: true ,params:payload},
            types: [saveRoleSucess],
            isnotify: true,
            msgSuc:''
        }
    })
}

function* delProRole ({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/role/deleteRole',
            method: 'POST',
            data: { isShowLoading: true ,params:payload},
            types: [saveRoleSucess],
            isnotify: true,
            msgSuc:''
        }
    })
}





// watch -> fork
//提交删除
function* watchGetProRoleList() {
    yield takeLatest(PROJECT_ROLE_LIST_ACTION,getProRole);
}

//新增
function* watchAddProRole() {
    yield takeLatest(PROJECT_ROLE_SAVE_ACTION,addProRole);
}

//编辑
function* watchEditProRole() {
    yield takeLatest(PROJECT_ROLE_EDIT_ACTION,editProRole);
}

//删除
function* watchDelProRole() {
    yield takeLatest(PROJECT_ROLE_DEL_ACTION,delProRole);
}

export const projectRole = [
    fork(watchGetProRoleList),
    fork(watchAddProRole),
    fork(watchEditProRole),
    fork(watchDelProRole)
];