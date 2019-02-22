
import { call, fork, takeLatest } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import {GET_LOG_ACTION,GET_LOG_TYPE_ACTION} from './types';
import { getLogSuccess,getLogTypeSuc,getLogJur } from './actions';


//ajax
function* getLog({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/findPlatformLogForNew',
            method: 'post',
            data: { isShowLoading: true ,params:payload },
            types: [getLogSuccess,null,getLogJur],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* getType() {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/dictionaries/findDictionaryList',
            data: { isShowLoading: false ,params:{dicType:'PTRZ'} },
            types: [getLogTypeSuc],
            isnotify: true,
            msgSuc:false
        }
    })
}


// watch -> fork
//
function* watchGetLog() {
    yield takeLatest(GET_LOG_ACTION,getLog);
}
//类别
function* watchGetLogType() {
    yield takeLatest(GET_LOG_TYPE_ACTION,getType);
}

export const logger = [
    fork(watchGetLog),
    fork(watchGetLogType),
];