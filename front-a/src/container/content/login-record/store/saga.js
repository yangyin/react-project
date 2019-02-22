import {  LOGINRECORD_ACTION } from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';


import { loginList,controlJur } from './actions';

// 用户列表
function* getLoginList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: '/sdpprevail/user/selectAutoLoginLoglist',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [loginList,null,controlJur],
            isnotify: false,
        }
    })
}
function* watchLoginList () {
    while (true) {
        const { payload } = yield take(LOGINRECORD_ACTION);
        yield fork(getLoginList, payload);
    }
}


export const loginRecord = [
    fork(watchLoginList),
];