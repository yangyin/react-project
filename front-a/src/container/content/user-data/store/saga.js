import { call, fork, take} from 'redux-saga/effects';
import { USERDATA_ACTION, USERDATA_CHARTS_ACTION, USERDATA_SOURCE_ACTION, USERDATA_COUNT_ACTION, USERDATA_COMMISSION_ACTION } from './types';
import { CALL_API ,Service} from '@/utils/utils';

import { userDataSuccess, userDataChartsSuccess, userDataSourceSuccess, userDataCountSuccess, userDataCommissionSuccess, jurisdictionStatus } from './actions';


//获取昨日关键指标
function* getUserData() {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/user/findUserCount',
            method:'POST',
            data:{isShowLoading:false,params:{}},
            types:[userDataSuccess],
            isnotify:false
        }
    })
}

//获取用户数据统计
function* getUserDataCharts(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/user/findUserCountByParam',
            method:'POST',
            data:{isShowLoading:true,params:{...payload}},
            types:[userDataChartsSuccess, ' ', jurisdictionStatus],
            isnotify:false
        }
    })
}

//获取用户来源统计
function* getUserDataSource(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/user/findOccupationByUserSource',
            method:'GET',
            data:{isShowLoading:true,params:{...payload}},
            types:[userDataSourceSuccess],
            isnotify:false
        }
    })
}

//获取用户数据统计
function* getUserDataCount(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/user/findAllNestMonth',
            method:'GET',
            data:{isShowLoading:true,params:{...payload}},
            types:[userDataCountSuccess],
            isnotify:false
        }
    })
}

//获取用户佣金统计
function* getUserDataCommission(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/user/findAllNestMonthComissonList',
            method:'GET',
            data:{isShowLoading:true,params:{...payload}},
            types:[userDataCommissionSuccess],
            isnotify:false
        }
    })
}



// watch -> fork
// 监听昨日关键指标
function* watchUserData() {
    while (true) {
        yield take(USERDATA_ACTION);
        yield fork(getUserData);     
    }
}
// 监听用户数据统计
function* watchUserDataCharts() {
    while (true) {
        const { payload } = yield take(USERDATA_CHARTS_ACTION);
        yield fork(getUserDataCharts, payload);     
    }
}

// 监听用户来源统计
function* watchUserDataSource() {
    while (true) {
        const { payload } = yield take(USERDATA_SOURCE_ACTION);
        yield fork(getUserDataSource, payload);     
    }
}

// 监听用户数据统计
function* watchUserDataCount() {
    while (true) {
        const { payload } = yield take(USERDATA_COUNT_ACTION);
        yield fork(getUserDataCount, payload);     
    }
}

// 监听用户佣金统计
function* watchUserDataCommission() {
    while (true) {
        const { payload } = yield take(USERDATA_COMMISSION_ACTION);
        yield fork(getUserDataCommission, payload);     
    }
}


export const userData = [
    fork(watchUserData),
    fork(watchUserDataCharts),
    fork(watchUserDataSource),
    fork(watchUserDataCount),
    fork(watchUserDataCommission)
];