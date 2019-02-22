import { call, fork, take} from 'redux-saga/effects';
import { 
    SAAS_MANAGEMENT_ACTION, HARDWARE_CODE_ACTION,
    HARDWARE_REGISTER_ACTION, HARDWARE_MONITORING_ACTION, 
    SAAS_OPERATION_ACTION, JOB_CARD_ACTION,
    SEARCH_PRO_ACTION, RELATED_PRO_ACTION

} from './types';
import { CALL_API ,Service} from '@/utils/utils';

import { saasManagementList, hardwareCodeList, 
    addHardwareRegister, saasMonitoringList, 
    saasOpreationSuccess, jobCardList, jurisdictionStatus,
    searchProList, addRelatedSuccess
} from './actions';


//获取已注册设备列表
function* getSaasList(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/saas/screening',
            method:'GET',
            data:{isShowLoading:true,params:{...payload}},
            types:[saasManagementList, ' ', jurisdictionStatus],
            isnotify:true,
            msgSuc: false
        }
    })
}
//获取设备code
function* getHardwareCodeList(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/saas/getHardwareCode',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[hardwareCodeList],
            isnotify:false
        }
    })
}
//新增设备
function* setHardwareRegister(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/saas/addHardware',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[addHardwareRegister],
            isnotify:true
        }
    })
}
//操作设备
function* saasOperation(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/saas/operation',
            method:'GET',
            data:{isShowLoading:false,params:{...payload}},
            types:[saasOpreationSuccess],
            isnotify:true
        }
    });
}
//获取硬件监控列表
function* getHardwareMonitoring(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/saas/getMonitorListByFuzzyQuery',
            method:'GET',
            data:{isShowLoading:true,params:{...payload}},
            types:[saasMonitoringList, ' ', jurisdictionStatus],
            isnotify:true,
            msgSuc: false
        }
    })
}

//获取工卡管理列表
function* getJobCard(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/cards/getCardsByCardNumberOrCardState',
            method:'GET',
            data:{isShowLoading:true,params:{...payload}},
            types:[jobCardList, ' ', jurisdictionStatus],
            isnotify:true,
            msgSuc: false
        }
    });
}

//注册管理关联项目查询项目列表
function* getSearchList(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/saas/searchPro',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[searchProList],
            isnotify:true,
            msgSuc: false
        }
    });
}

//关联项目
function* relatedProject(payload) {
    console.log(payload)
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/saas/bindingPro',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[addRelatedSuccess],
            isnotify:true
        }
    });
}



// watch -> fork
// 监听设备列表
function* watchSaas() {
    while (true) {
        const { payload } = yield take(SAAS_MANAGEMENT_ACTION);
        yield fork(getSaasList, payload);     
    }
}
// 监听新增设备
function* watchSaasAdd() {
    while (true) {
        const { params } = yield take(HARDWARE_REGISTER_ACTION);
        yield fork(setHardwareRegister, params);    
    }
}
// 监听设备编码
function* watchSaasCode() {
    while (true) {
        const { payload } = yield take(HARDWARE_CODE_ACTION);
        yield fork(getHardwareCodeList, payload);
    }
}
// 监听操作设备
function* watchSaasOpreation() {
    while (true) {
        const { params } = yield take(SAAS_OPERATION_ACTION);
        yield fork(saasOperation, params);    
    }
}

// 监听硬件监控列表
function* watchMonitor() {
    while (true) {
        const { options } = yield take(HARDWARE_MONITORING_ACTION);
        yield fork(getHardwareMonitoring, options); 
        
    }
}

// 监听工卡管理列表
function* watchJobCard() {
    while (true) {
        const { options } = yield take(JOB_CARD_ACTION);
        yield fork(getJobCard, options); 
        
    }
}

// 监听工卡管理列表
function* watchSearchList() {
    while (true) {
        const { options } = yield take(SEARCH_PRO_ACTION);
        yield fork(getSearchList, options); 
        
    }
}

// 监听工卡管理列表
function* watchRelatedProject() {
    while (true) {
        const { params } = yield take(RELATED_PRO_ACTION);
        console.log('////')
        console.log(params)
        yield fork(relatedProject, params); 
        
    }
}


export const saas = [
    fork(watchSaas),
    fork(watchSaasCode),
    fork(watchSaasAdd),
    fork(watchSaasOpreation),
    fork(watchJobCard),
    fork(watchMonitor),
    fork(watchSearchList),
    fork(watchRelatedProject)
];