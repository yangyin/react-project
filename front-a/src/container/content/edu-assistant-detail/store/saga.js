import {
    EDU_ASSIS_DETAIL_LIST_ACTION,EDU_ASSIS_DETAIL_DEL_ACTION,
    EDU_ASSIS_DETAIL_SAVE_ACTION,EDU_ASSIS_MODAL_TOPICS_ACTION,
} from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import {
    getList,operateAbout,modalTopics,
} from './actions.js';

/**
 * 教育助手详情modal 题目列表
 * pageSize	是	int	每页显示个数
 * pageNum	是	int	当前页数
 * difficulty	是	int	题目难度
 * labelParam	是	string	标签
 * examinationPoint	是	string	考点
 * answerType	是	int	单选与多选 1单选 0多选 2阅读
 */
function* getModalTopicsList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/education/screeningSubjects',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [modalTopics],
            isnotify:false,
        }
    })
}
function* watchEduTopicsList () {
    while (true) {
        const { payload } = yield take(EDU_ASSIS_MODAL_TOPICS_ACTION);
        yield fork(getModalTopicsList, payload);
    }
}

/**
 * 教育助手详情列表-剔除
 * @params anserId	是	string	题目id
 * @params programId	是	string	教育方案id
 */
function* eduDetailListDel (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/education/removeRelation',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operateAbout],
            isnotify:true,
        }
    })
}
function* watchDetailListDel () {
    while (true) {
        const { payload } = yield take(EDU_ASSIS_DETAIL_DEL_ACTION);
        yield fork(eduDetailListDel, payload);
    }
}

/**
 * 教育助手详情题库编辑保存
 * programId	是	string	教育方案id
 * programName	是	string	教育方案名字
 * programContent	是	string	方案备注名字
 * scoringMethod	是	int	计分方式 (1-按对错计分 2-按合格比例记分）
 * eachSorce	是	String	合格分值
 * qualifiedProportion	是	double	合格比例
 * answerList	是	string	合格比例
 */
function* eduAssisSave (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/education/updateEducationDetail',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operateAbout],
            isnotify:true,
        }
    })
}
function* watchEduAssisSave () {
    while (true) {
        const { payload } = yield take(EDU_ASSIS_DETAIL_SAVE_ACTION);
        yield fork(eduAssisSave, payload);
    }
}

/**
 * 教育助手详情题库列表信息
 * @param {*} programId
 */
function* getEduAssisList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/education/educationProgrameDetail',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [getList],
            isnotify:false,
        }
    })
}
function* watchEducationList () {
    while (true) {
        const { payload } = yield take(EDU_ASSIS_DETAIL_LIST_ACTION);
        yield fork(getEduAssisList, payload);
    }
}


export const eduAssisDetail = [
    fork(watchDetailListDel),
    fork(watchEduAssisSave),
    fork(watchEducationList),
    fork(watchEduTopicsList),
];