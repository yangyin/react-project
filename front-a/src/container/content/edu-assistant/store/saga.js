import {
    EDU_ASSIS_LIST_ACTION, EDU_ASSIS_EDIT_ACTION, EDU_ASSIS_COPY_ACTION, EDU_ASSIS_DEL_ACTION,
} from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import {
    getEduList, getEduEdit, controlJur,
} from './actions.js';

/**
 * 教育助手列表删除
 * @params programId
 */
function* delEducationList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/education/deleteEducationPrograme',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [getEduEdit],
            isnotify: true,
        }
    })
}
function* watchEduAssisDelList () {
    while (true) {
        const { payload } = yield take(EDU_ASSIS_DEL_ACTION);
        yield fork(delEducationList, payload);
    }
}
/**
 * 教育助手列表复制
 * @params programId
 */
function* copyEducationList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/education/copyEducationPrograme',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [getEduEdit],
            isnotify: true,
        }
    })
}
function* watchEduAssisCopyList () {
    while (true) {
        const { payload } = yield take(EDU_ASSIS_COPY_ACTION);
        yield fork(copyEducationList, payload);
    }
}


/**
 * 教育助手列表编辑
 * @params programId
 * @params programName
 * @params programContent
 */
function* editEducationList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/education/updateEducationPrograme',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [getEduEdit],
            isnotify: true,
        }
    })
}
function* watchEduAssisEditList () {
    while (true) {
        const { payload } = yield take(EDU_ASSIS_EDIT_ACTION);
        yield fork(editEducationList, payload);
    }
}


/**
 * 教育助手列表(无分页)
 */
function* getEducationList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/education/educationProgrameList',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [getEduList, null, controlJur],
            isnotify: false,
        }
    })
}
function* watchEduAssisList () {
    while (true) {
        const { payload } = yield take(EDU_ASSIS_LIST_ACTION);
        yield fork(getEducationList, payload);
    }
}





export const eduAssistant = [
    fork(watchEduAssisList),
    fork(watchEduAssisEditList),
    fork(watchEduAssisCopyList),
    fork(watchEduAssisDelList),

];