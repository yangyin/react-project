import { call, fork, takeLatest ,throttle} from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import { 
    INFO_ASSIS_MANAGE_LIST_ACTION,
    INFO_ASSIS_MANAGE_EDIT_ACTION,
    INFO_ASSIS_MANAGE_FETCH_USER_ACTION,
    INFO_ASSIS_MANAGE_TARTGET_LIST_ACTION
} from './types';


import { getInfoAssisManageListSuccess,getInfoAssisManageUpdate,getInfoAssisManageUserSuc ,getInfoAssisManageTargetListSuccess} from './actions';


//ajax
function* getList( { payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/noticeProgramme/selectNoticeProgrammeDetail',
            method: 'post',
            data: { isShowLoading: true,params:payload },
            types: [getInfoAssisManageListSuccess],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* update( { payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/noticeProgramme/' + payload.url,
            method: 'post',
            data: { isShowLoading: true,params:payload.params },
            types: [getInfoAssisManageUpdate],
            isnotify: true,
            msgSuc:'更新成功'
        }
    })
}
function* searchUser( { payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/noticeProgramme/selectRoleOrGroup',
            method: 'post',
            data: { isShowLoading: false,params:payload },
            types: [getInfoAssisManageUserSuc],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* getTargetList( { payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/noticeProgramme/deletetargetdNameList',
            method: 'post',
            data: { isShowLoading: false,params:payload },
            types: [getInfoAssisManageTargetListSuccess],
            isnotify: true,
            msgSuc:false
        }
    })
}






// watch -> fork
//列表
function* watchinfoAssisManageList() {
    yield takeLatest(INFO_ASSIS_MANAGE_LIST_ACTION,getList);
}
//更改时，
function* watchinfoAssisManageUpdate() {
    yield takeLatest(INFO_ASSIS_MANAGE_EDIT_ACTION,update);
}
//用户搜索
function* watchIfoAssisFetchUser() {
    yield throttle(500,INFO_ASSIS_MANAGE_FETCH_USER_ACTION,searchUser);
}
//获取通知对象列表 
function* watchIfoAssisTargetList() {
    yield throttle(500,INFO_ASSIS_MANAGE_TARTGET_LIST_ACTION,getTargetList);
}


export const informAssistantManage = [
    fork(watchinfoAssisManageList),
    fork(watchinfoAssisManageUpdate),
    fork(watchIfoAssisFetchUser),
    fork(watchIfoAssisTargetList),
];