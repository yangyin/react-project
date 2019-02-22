import { call, fork, take, cancel, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
    PLATFORM_JURISDICTION_LIST_ACTION,
    PLATFORM_SEARCH_USER_ACTION,
    PLATFORM_JURISDICTION_SAVE_ACTION,
    PLATFORM_JURISDICTION_GET_DEL_ACTION,
    PLATFORM_JURISDICTION_DEL_ACTION
} from './types';
import { CALL_API, Service } from '@/utils/utils';

import { getListSuccess, 
    platformSearchUserSuccess,
     platJurisdictionSaveSuccess, 
     platformJurisdictionGetDelSuccess,
     getListJur,
     platformJurisdictionDelSuccess } from './actions';


//ajax
function* getListAsync(payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/jurisdiction/getJurisdictionList',
            method: 'POST',
            data: { isShowLoading: true },
            types: [getListSuccess,null,getListJur],
            isnotify: true,
            msgSuc:false
        }
    })
}
//搜索用户
function* searchUser(payload) {
    yield delay(500);
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/jurisdiction/grantUserList',
            method: 'POST',
            data: { params: payload },
            types: [platformSearchUserSuccess],
            isnotify: true,
            msgSuc: false
        }
    })
}
// 保存
function* saveJurisdiction(payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/jurisdiction/grantJurisdictionUser',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [platJurisdictionSaveSuccess],
            isnotify: true,
            msgSuc: ''
        }
    })
}

//删除 请求列表
function* getDelJurisdiction(payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/jurisdiction/findJurForDel',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [platformJurisdictionGetDelSuccess],
            isnotify: true,
            msgSuc: false
        }
    })
}

//提交删除
function* platformJustDel( {payload} ) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/jurisdiction/removeJurisdiction',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [platformJurisdictionDelSuccess],
            isnotify: true
        }
    })
}




// watch -> fork
function* watchPlatformJurisdiction() {
    while (true) {
        yield take(PLATFORM_JURISDICTION_LIST_ACTION);
        yield fork(getListAsync);

    }
}

//搜索用户  /  用户组
function* watchSearchUser() {

    let task;
    while (true) {
        const { payload } = yield take(PLATFORM_SEARCH_USER_ACTION);
        if (task) {
            yield cancel(task);
        }
        task = yield fork(searchUser, payload);
    }
}

//保存用户 /用户组 授权对象
function* watchPlatformSave() {
    while (true) {
        const { payload } = yield take(PLATFORM_JURISDICTION_SAVE_ACTION);
        yield fork(saveJurisdiction, payload);

    }
}

//删除 请求列表
function* watchPlatformJurisdictionDel() {

    while (true) {
        const { payload } = yield take(PLATFORM_JURISDICTION_GET_DEL_ACTION);
        yield fork(getDelJurisdiction, payload);

    }
}

//提交删除
function* watchPlatformJustDel() {
    yield takeLatest(PLATFORM_JURISDICTION_DEL_ACTION,platformJustDel)
}

export const platformJurisdiction = [
    fork(watchPlatformJurisdiction),
    fork(watchSearchUser),
    fork(watchPlatformSave),
    fork(watchPlatformJurisdictionDel),
    fork(watchPlatformJustDel)
];