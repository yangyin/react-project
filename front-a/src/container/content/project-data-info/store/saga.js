
import { call, fork, takeLatest } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import {PROJECT_DATA_INFO_ACTION } from './types';
import { dataSuccess } from './actions';

/**
 * 项目echart数据 
 * @param {} proId 
 */
function* getProDataInfo({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/project/projectDataInfo',
            method: 'get',
            data: { isShowLoading: true,params:payload },
            types: [dataSuccess],
            isnotify: true,
            msgSuc:false
        }
    })
}

// watch -> fork

function* watchproData() {
    yield takeLatest(PROJECT_DATA_INFO_ACTION,getProDataInfo);
}
export const proDataInfo = [
    fork(watchproData),
];