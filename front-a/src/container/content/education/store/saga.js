import {
    EDUQUES_DEL_ACTION,EDUQUES_SAVE_ACTION,EDUQUES_LABEL_ADD_ACTION,EDUQUES_LABEL_DEL_ACTION,
        EDUQUES_POINT_ADD_ACTION,EDUQUES_POINT_DEL_ACTION,
    EDUCATION_LIST_ACTION,EDUCATION_INFO_ACTION} from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import {getList,controlJur,getInfo,operationStatusPoint,operationStatus} from './actions.js';



/**
 * 添加考点
 * id	是	string	题目id
 * point	是	string	考点
 */
function* eduQueAddPoint (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/question/addPoint',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatusPoint],
            isnotify:true,
        }
    })
}
function* watcheduQueAddPoint () {
    while (true) {
        const { payload } = yield take(EDUQUES_POINT_ADD_ACTION);
        yield fork(eduQueAddPoint, payload);
    }
}
/**
 * 删除考点
 * id	是	string	题目id
 * pointId	是	string	考点
 */
function* eduQueDelPoint (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/question/delPoint',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatusPoint],
            isnotify:true,
        }
    })
}
function* watcheduQueDelPoint () {
    while (true) {
        const { payload } = yield take(EDUQUES_POINT_DEL_ACTION);
        yield fork(eduQueDelPoint, payload);
    }
}



/**
 * 添加标签
 * id	是	string	题目id
 * label	是	string	标签
 */
function* eduQueAddLabel (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/question/addLabels',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatusPoint],
            isnotify:true,
        }
    })
}
function* watcheduQueAddLabel () {
    while (true) {
        const { payload } = yield take(EDUQUES_LABEL_ADD_ACTION);
        yield fork(eduQueAddLabel, payload);
    }
}
/**
 * 删除标签
 * id	是	string	题目id
 * label	是	string	标签
 */
function* eduQueDelLabel (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/question/delLabel',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatusPoint],
            isnotify:true,
        }
    })
}
function* watcheduQueDelLabel () {
    while (true) {
        const { payload } = yield take(EDUQUES_LABEL_DEL_ACTION);
        yield fork(eduQueDelLabel, payload);
    }
}
/**
 * 题目编辑
 * id	否	string	不传新增 传修改
 * type	否	string	问题类型 单选多选 1单选 0多选 2阅读
 * videoUrl	否	string	视频地址
 * stem	否	string	题干
 * answer	否	string	答案 分隔字符串 #DYQ$
 * option	否	string	选项 {“A”: “BO5G0p6Acw1BIKyKO2L”,”b”:”11”,”C”: “2018-05-31 00:00:00”}
 * analysisContent	否	string	问题解析
 * difficulty	否	string	难度 
 */
function* eduQueEdit (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: '/sdpprevail/question/save',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatus],
            isnotify:true,
        }
    })
}
function* watchEduQuesEdit () {
    while (true) {
        const { payload } = yield take(EDUQUES_SAVE_ACTION);
        yield fork(eduQueEdit, payload);
    }
}
/**
 * 题目删除
 * @param {*} id 
 */
function* eduQuesDel (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/question/del',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatus],
            isnotify:true,
        }
    })
}
function* watchEduQuesDel () {
    while (true) {
        const { payload } = yield take(EDUQUES_DEL_ACTION);
        yield fork(eduQuesDel, payload);
    }
}
/**
 * 题库列表
 * @param {*} pageNum: 1 
 * @param {*} pageSize: 10
 */
function* getEducationList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/question/findByPage',
            method: 'GET',
            data: { isShowLoading: true, params: { ...payload } },
            types: [getList,null,controlJur],
            isnotify:false,
        }
    })
}
function* watchEducationList () {
    while (true) {
        const { payload } = yield take(EDUCATION_LIST_ACTION);
        yield fork(getEducationList, payload);
    }
}
/**
 * 题库题目详情
 * @param {*} id
 */
function* getEducationInfo (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/question/findInfo',
            method: 'GET',
            data: { isShowLoading: true, params: { ...payload } },
            types: [getInfo],
            isnotify:false,
        }
    })
}
function* watchEducationInfo () {
    while (true) {
        const { payload } = yield take(EDUCATION_INFO_ACTION);
        yield fork(getEducationInfo, payload);
    }
}



export const education = [
    fork(watchEduQuesDel),
    fork(watchEducationList),
    fork(watchEducationInfo),
    fork(watchEduQuesEdit),
    fork(watcheduQueAddLabel), 
    fork(watcheduQueDelLabel),
    fork(watcheduQueDelPoint),
    fork(watcheduQueAddPoint),
];