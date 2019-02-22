
import { call, fork, takeLatest,throttle } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import {
    JURISDICTION_LIST_ACTION,
    JURISDICTION_EDIT_ACTION,
    JURISDICTION_COPY_ACTION,
    JURISDICTION_DEL_ACTION,
    JURISDICTION_DETAIL_LIST_ACTION,
    JURISDICTION_DETAIL_FETCH_USER_ACTION,
    JURISDICTION_DETAIL_UPDATE_ACTION,
    JURISDICTION_DETAIL_PRO_ACTION,
    JURISDICTION_NEW_LIST_ACTION,
    JURISDICTION_NEW_LIST_SAVE_ACTION
} from './types';
import {
    getJurisdictionSuccess,
    jurUpdateSuccess,
    getJurDetailsListSuccess,
    getJurDetailFetchUserSuc,
    postJurDetailProSuc,
    getJurisdictionJur,
    getJurNewListSuc,
    jurSaveSuc
} from './actions';


//ajax
function* getJur() {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/pge/getPgeList',
            method: 'post',
            data: { isShowLoading: true },
            types: [getJurisdictionSuccess,null,getJurisdictionJur],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* edit({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/pge/updatePge',
            method: 'post',
            data: { isShowLoading: true, params: payload },
            types: [jurUpdateSuccess],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* copy({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/pge/copyPge',
            method: 'post',
            data: { isShowLoading: true, params: payload },
            types: [jurUpdateSuccess],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* del({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/pge/deletePge',
            method: 'post',
            data: { isShowLoading: true, params: payload },
            types: [jurUpdateSuccess],
            isnotify: true,
            msgSuc: false
        }
    })
}

function* gitDetailList({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/pge/getJurProRelation',
            method: 'post',
            data: { isShowLoading: true, params: payload },
            types: [getJurDetailsListSuccess],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* getFetchUser({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/pge/getRoleOrUserList',
            method: 'post',
            data: { params: payload },
            types: [getJurDetailFetchUserSuc],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* jurUpdate({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/pge/'+payload.url,
            method: 'post',
            data: { params: payload.params },
            types: [jurUpdateSuccess],
            isnotify: true,
            msgSuc: ''
        }
    })
}
function* proList({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/pge/getUserListByJurProRelation',
            method: 'post',
            data: { params: payload },
            types: [postJurDetailProSuc],
            isnotify: true,
            msgSuc: false
        }
    })
}


// watch -> fork
//提交删除
function* watchGetJurisdiction() {
    yield takeLatest(JURISDICTION_LIST_ACTION, getJur);
}
//编辑
function* watchEditJur() {
    yield takeLatest(JURISDICTION_EDIT_ACTION, edit);
}
//复制
function* watchCopyJur() {
    yield takeLatest(JURISDICTION_COPY_ACTION, copy);
}
//删除
function* watchDelJur() {
    yield takeLatest(JURISDICTION_DEL_ACTION, del);
}

/**详情 */

//列表
function* watchJurDetailList() {
    yield takeLatest(JURISDICTION_DETAIL_LIST_ACTION, gitDetailList);
}
//用户搜索
function* watchJurDetailFetchUser() {
    yield throttle(500,JURISDICTION_DETAIL_FETCH_USER_ACTION,getFetchUser)
}

//详情更新
function* watchJurDetailUpdateStatus() {
    yield takeLatest(JURISDICTION_DETAIL_UPDATE_ACTION, jurUpdate);
}

//获取删除对象列表
function* watchJurDetailProList() {
    yield takeLatest(JURISDICTION_DETAIL_PRO_ACTION, proList);
}







/**
 * 改版后，请求数据
 *  */

function* getNewList({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/permission/selectPermissionList',
            method: 'post',
            data: { isShowLoading: true ,params: {roleType:payload}},
            types: [getJurNewListSuc,null,getJurisdictionJur],
            isnotify: true,
            msgSuc: false
        }
    })
}
function* saveJur({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/permission/savePermissionTarget',
            method: 'post',
            data: { isShowLoading: true ,params: payload},
            types: [jurSaveSuc ],
            isnotify: true,
            msgSuc: '权限项更新成功'
        }
    })
}



 //请求列表
function* watchJurNewList() {
    yield takeLatest(JURISDICTION_NEW_LIST_ACTION, getNewList);
}
//保存
function* watchJurNewUpdate() {
    yield takeLatest(JURISDICTION_NEW_LIST_SAVE_ACTION, saveJur);
}





export const jurisdiction = [
    fork(watchGetJurisdiction),
    fork(watchEditJur),
    fork(watchCopyJur),
    fork(watchDelJur),
    fork(watchJurDetailList),
    fork(watchJurDetailFetchUser),
    fork(watchJurDetailUpdateStatus),
    fork(watchJurDetailProList),

    fork(watchJurNewList),
    fork(watchJurNewUpdate),

];