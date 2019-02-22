
import { call, fork, takeLatest } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import {
    DASHBOARD_LIST_ACTION,
    DASHBOARD_USER_INFO_ACTION,
    DASHBOARD_BULLETEDLIST_ACTION
} from './types';
import {
    getLoginUserInfoSuc,
    getListSuc,
    dashboardJur,
    getbulletedListSuc
} from './actions';


//ajax
function* getUserInfo() {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/project/getLoginUserInfo',
            method: 'get',
            data: { isShowLoading: false },
            types: [getLoginUserInfoSuc],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* dashList({payload}) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/project/projectList',
            method: 'POST',
            data: { isShowLoading: true,params:payload },
            types: [getListSuc,null,dashboardJur],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* dashBulletedList() {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/project/bulletedList',
            method: 'POST',
            data: { isShowLoading: true },
            types: [getbulletedListSuc,null,dashboardJur],
            isnotify: true,
            msgSuc: false
        }
    })
}



// watch -> fork
//获取登录信息
function* watchGetLoginUserInfo() {
    yield takeLatest(DASHBOARD_USER_INFO_ACTION, getUserInfo);
}
function* watchdashList() {
    yield takeLatest(DASHBOARD_LIST_ACTION, dashList);
}
//改版后列表
function* watchdashBulletedList() {
    yield takeLatest(DASHBOARD_BULLETEDLIST_ACTION, dashBulletedList);
}





export const dashboard = [
    fork(watchGetLoginUserInfo),
    fork(watchdashList),
    fork(watchdashBulletedList),
];