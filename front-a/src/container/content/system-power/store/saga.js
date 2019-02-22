import { call, fork,takeLatest } from 'redux-saga/effects';
import {
    SYSTEM_POWER_SEARCH_USER_ACTION,
    SYSTEM_POWER_ADD_AUTH_ACTION,
    SYSTEM_POWER_AUTH_LIST_ACTION,
    SYSTEM_POWER_UPDATE_STATE_ACTION
} from './types';
import { CALL_API, Service } from '@/utils/utils';

import {
    getSysPowerSearchUserSuc,
    sysPowerAddAuthSuc,
    sysPowerSelectAuthListSuc,
    sysPowerJurAction
} from './action';


//获取招聘列表
function* getUserList({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/selectUserInfoByPhoneAndCode',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [getSysPowerSearchUserSuc],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* addAuth({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/addAuthPermiss',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [sysPowerAddAuthSuc],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* authList({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/selectAuthList',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [sysPowerSelectAuthListSuc,null,sysPowerJurAction],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* updateState({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/updateAuthPermissState',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [sysPowerAddAuthSuc],
            isnotify: true,
            msgSuc: false
        }
    })
}


// watch -> fork
// 监听平台维护列表
function* watchSysPowerSearchUser() {
    yield takeLatest(SYSTEM_POWER_SEARCH_USER_ACTION, getUserList);
}
function* watchSysPowerAddAuth() {
    yield takeLatest(SYSTEM_POWER_ADD_AUTH_ACTION, addAuth);
}
function* watchSysPowerAuthList() {
    yield takeLatest(SYSTEM_POWER_AUTH_LIST_ACTION, authList);
}
function* watchSysPowerUpdateState() {
    yield takeLatest(SYSTEM_POWER_UPDATE_STATE_ACTION, updateState);
}

export const systemPower = [
    fork(watchSysPowerAuthList),
    fork(watchSysPowerSearchUser),
    fork(watchSysPowerAddAuth),
    fork(watchSysPowerUpdateState)
];