import {TEAM_LIST_ACTION,TEAM_DETAIL_ACTION} from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import {teamList,detail,controlJur} from './actions';

/**
 * 班组列表
 * @param teamType
 * @param pageNum
 * @param pageSize
 * @param param
 */
function* getTeamList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/selectTeamList',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [teamList,null,controlJur]
        }
    })
}
function* watchTeam () {
    while (true) {
        const { payload } = yield take(TEAM_LIST_ACTION);
        yield fork(getTeamList, payload);
    }
}

/**
 * 班组详情
 * @param userId
 * @param teamId
 */
function* getTeamDetail (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/findPersonInfo',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [detail]
        }
    })
}
function* watchTeamDetail () {
    while (true) {
        const { payload } = yield take(TEAM_DETAIL_ACTION);
        yield fork(getTeamDetail, payload);
    }
}

export const team = [
    fork(watchTeam),
    fork(watchTeamDetail),
]
