import { call, fork, take } from 'redux-saga/effects';
import { PROJECT_ACTION, PROJECT_DETAIL_ACTION, COMPANY_UNIT_ACTION, UNIT_EMPLOYEE_ACTION, UNIT_TEAM_ACTION, UNIT_WORKER_ACTION } from './types';
import { CALL_API ,Service} from '@/utils/utils';

import { projectList, projectDetailSuccess, jurisdictionStatus,
        companyList, unitEmployeeList, unitTeamList, unitWorkerList
    } from './actions';


//获取项目列表
function* getProjectList(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/project/projectListByScreening',
            method:'POST',
            data:{isShowLoading:true,params:{...payload}},
            types:[projectList, ' ', jurisdictionStatus],
            isnotify:true,
            msgSuc: false
        }
    })
}
//获取项目详情
function* getProjectDetail(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/project/projectDetailsNew',
            method:'GET',
            data:{isShowLoading:true,params:{...payload}},
            types:[projectDetailSuccess, ' '],
            isnotify:true,
            msgSuc: false
        }
    })
}

//获取参见单位列表
function* getCompanyList(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/project/selectJionCompanyByProId',
            method:'GET',
            data:{isShowLoading:true,params:{...payload}},
            types:[companyList, ' '],
            isnotify:true,
            msgSuc: false
        }
    })
}
//获取参见单位人员列表
function* getEmpolyeeList(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/project/selectOrgUsersByOrgId',
            method:'GET',
            data:{isShowLoading:false,params:{...payload}},
            types:[unitEmployeeList, ' '],
            isnotify:true,
            msgSuc: false
        }
    })
}
//获取班组成员
function* getTeamList(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/project/selectTeamsByCompanyId',
            method:'GET',
            data:{isShowLoading:false,params:{...payload}},
            types:[unitTeamList, ' '],
            isnotify:true,
            msgSuc: false
        }
    })
}
//获取工人列表
function* getWorkerList(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/project/selectTeamWorksByTeamId',
            method:'GET',
            data:{isShowLoading:false,params:{...payload}},
            types:[unitWorkerList, ' '],
            isnotify:true,
            msgSuc: false
        }
    })
}


// watch -> fork
function* watchProject() {
    while (true) {
        const { payload } = yield take(PROJECT_ACTION);
        yield fork(getProjectList, payload);
    }
}

function* watchProjectDetail() {
    while (true) {
        const { payload } = yield take(PROJECT_DETAIL_ACTION);
        yield fork(getProjectDetail, payload);
    }
}

function* watchCompay() {
    while (true) {
        const { payload } = yield take(COMPANY_UNIT_ACTION);
        yield fork(getCompanyList, payload);
    }
}

function* watchEmployee() {
    while (true) {
        const { payload } = yield take(UNIT_EMPLOYEE_ACTION);
        yield fork(getEmpolyeeList, payload);
    }
}

function* watchTeam() {
    while (true) {
        const { payload } = yield take(UNIT_TEAM_ACTION);
        yield fork(getTeamList, payload);
    }
}

function* watchWorker() {
    while (true) {
        const { payload } = yield take(UNIT_WORKER_ACTION);
        yield fork(getWorkerList, payload);
    }
}


export const project = [
    fork(watchProject),
    fork(watchProjectDetail),
    fork(watchCompay),
    fork(watchEmployee),
    fork(watchTeam),
    fork(watchWorker)
];