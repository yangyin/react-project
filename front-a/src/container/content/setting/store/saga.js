import { call, fork, take, takeLatest } from 'redux-saga/effects';
import {
    SETTING_PLATFORM_ACTION,
    SETTING_CLAUSE_ACTION,
    CLAUSE_EDIT_ACTION,
    PLATFORM_ADD_OR_UPDATE_ACTION,
    SETTING_AD_POS_LIST_ACTION,
    SETTING_AD_POS_UPDATE_ACTION,
    SETTING_AD_CONTNET_LIST_ACTION,
    SETTING_AD_CONTNET_STATE_ACTION,
    SETTING_AD_CONTNET_ADD_ACTION,
} from './types';
import { CALL_API, Service } from '@/utils/utils';

import {
    settingList,
    settingClause,
    editClause,
    platformUpdateState,
    getSettingAdPosListSuc,
    settingAdPosUpdateState,
    getSettingAdContentListSuc,
    getSettingAdContentStateSuc,
    getSettingAdContentAddSuc,
    jurisdictionStatus
} from './actions';


//获取平台维护列表
function* getSettingList({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/banner/selectAllPlatForm',
            method: 'POST',
            data: { isShowLoading: false, params: payload },
            types: [settingList, null, jurisdictionStatus],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* settingUpdate({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/banner/insertOrUpdatePlatForm',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [platformUpdateState],
            isnotify: true,
            msgSuc: ''
        }
    })
}
function* getAdPosList({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/banner/selectAllPosition',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [getSettingAdPosListSuc, null, jurisdictionStatus],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* adPosUpdate({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/banner/insertOrUpdatePosition',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [settingAdPosUpdateState],
            isnotify: true,
            msgSuc: ''
        }
    })
}
// 获取广告内容
function* getAdContentList({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/banner/selectAllContent',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [getSettingAdContentListSuc, null, jurisdictionStatus],
            isnotify: true,
            msgSuc: false
        }
    })
}



//获取条款管理列表
function* getSettingClause(payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/clause/selectClauseList',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [settingClause, null, jurisdictionStatus],
            isnotify: true,
            msgSuc: false
        }
    })
}

//编辑条款管理列表
function* updateClause(payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/clause/updateClause',
            method: 'POST',
            data: { isShowLoading: false, params: { ...payload } },
            types: [editClause],
            isnotify: true,
            msgSuc: '操作成功'
        }
    })
}

// 启用停用广告内容
function* getAdContenState({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/banner/updateBannerContentStateById',
            method: 'POST',
            data: { isShowLoading: true, params: payload },
            types: [getSettingAdContentStateSuc],
            isnotify: true
        }
    })
}

// 新增广告内容
function* getAdContenAdd({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/banner/insertBannerContent',
            method: 'POST',
            data: { isShowLoading: false, params: payload },
            types: [getSettingAdContentAddSuc],
            isnotify: true
        }
    })
}


// watch -> fork
// 监听平台维护列表
function* watchPlatformList() {
    yield takeLatest(SETTING_PLATFORM_ACTION, getSettingList);
}
//添加/修改平台维护
function* watchSettingPlatformUpdate() {
    yield takeLatest(PLATFORM_ADD_OR_UPDATE_ACTION, settingUpdate);
}

//广告位置
//列表
function* watchSettingAdPosList() {
    yield takeLatest(SETTING_AD_POS_LIST_ACTION, getAdPosList);
}
//新增/编辑
function* watchSettingAdPosUpdate() {
    yield takeLatest(SETTING_AD_POS_UPDATE_ACTION, adPosUpdate);
}

//广告内容
//列表
function* watchSettingAdContentList() {
    yield takeLatest(SETTING_AD_CONTNET_LIST_ACTION, getAdContentList);
}

//启用、停用
function* watchSettingAdContentState() {
    yield takeLatest(SETTING_AD_CONTNET_STATE_ACTION, getAdContenState);
}
//新增
function* watchSettingAdContentAdd() {
    yield takeLatest(SETTING_AD_CONTNET_ADD_ACTION, getAdContenAdd);
}








// 监听条款管理列表
function* watchSettingClause() {
    while (true) {
        const { payload } = yield take(SETTING_CLAUSE_ACTION);
        yield fork(getSettingClause, payload);
    }
}

// 监听编辑条款管理列表
function* watchEditClause() {
    while (true) {
        const { payload } = yield take(CLAUSE_EDIT_ACTION);
        yield fork(updateClause, payload);
    }
}

export const setting = [
    fork(watchPlatformList),
    fork(watchSettingPlatformUpdate),
    fork(watchSettingAdPosList),
    fork(watchSettingAdPosUpdate),
    fork(watchSettingAdContentList),
    fork(watchSettingClause),
    fork(watchEditClause),
    fork(watchSettingAdContentState),
    fork(watchSettingAdContentAdd)
];