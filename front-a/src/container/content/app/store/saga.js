import { call, fork, take} from 'redux-saga/effects';
import { 
    APP_ACTION, APP_DELETE_ACTION, 
    APP_MANAGE_ACTION, DELETE_LABEL_ACTION, 
    ADD_LABEL_ACTION, APP_MANAGE_UPDATE_ACTION, 
    UPDATE_CHECKBOX_ACTION, AUDIT_ACTION
} from './types';
import { CALL_API ,Service} from '@/utils/utils';

import { 
    appList, appDeleteSuccess, 
    appManageSuccess, deleteLabelSuccess, 
    addLabelSuccess, appManageUpdateSuccess, 
    jurisdictionStatus, updateCheckboxSuccess, 
    auditSuccess 
} from './actions';


//获取招聘列表
function* getAppList(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/recruit/listAuditEmployeeInfo',
            method:'POST',
            data:{isShowLoading:true,params:{...payload}},
            types:[appList, ' ', jurisdictionStatus],
            isnotify:true,
            msgSuc: false
        }
    })
}
//删除招聘列表
function* deleteApp(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/recruit/delEmployeeInfo',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[appDeleteSuccess],
            isnotify:true
        }
    })
}
//审核招聘
function* auditApp(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/recruit/auditEmployeeInfo',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[auditSuccess],
            isnotify:true
        }
    })
}
//删除招聘标签
function* deleteLabelApp(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/dictionaries/deleteDictionaries',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[deleteLabelSuccess],
            isnotify:true
        }
    })
}

//新增招聘标签
function* addLabelApp(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/dictionaries/insertRecruitLabel',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[addLabelSuccess],
            isnotify:true
        }
    })
}

//更新招聘设置复选框
function* updateCheckbox(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/recruit/excuteUpdate',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[updateCheckboxSuccess],
            isnotify:true
        }
    })
}


//获取应用设置
function* getAppManage() {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/appMenu/selectMenuList',
            method:'POST',
            data:{isShowLoading:false,params:{}},
            types:[appManageSuccess, ' ', jurisdictionStatus],
            isnotify:true,
            msgSuc: false
        }
    })
}

//更新应用设置
function* getAppManageUpdate(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/appMenu/updateMenuInfo',
            method:'POST',
            data:{isShowLoading:false,params: {list: JSON.stringify(payload)}},
            types:[appManageUpdateSuccess],
            isnotify:true
        }
    })
}




// watch -> fork
// 监听招聘列表
function* watchApp() {
    while (true) {
        const { payload } = yield take(APP_ACTION);
        yield fork(getAppList, payload);     
    }
}
// 监听删除招聘数据
function* watchDeleteApp() {
    while (true) {
        const { payload } = yield take(APP_DELETE_ACTION);
        yield fork(deleteApp, payload);     
    }
}
// 监听审核招聘
function* watchAudit() {
    while (true) {
        const { payload } = yield take(AUDIT_ACTION);
        yield fork(auditApp, payload);     
    }
}

// 监听删除招聘标签
function* watchDeleteLabel() {
    while (true) {
        const { payload } = yield take(DELETE_LABEL_ACTION);
        yield fork(deleteLabelApp, payload);     
    }
}

// 监听新增招聘标签
function* watchAddLabel() {
    while (true) {
        const { payload } = yield take(ADD_LABEL_ACTION);
        yield fork(addLabelApp, payload);     
    }
}

// 监听更新招聘设置复选框
function* watchUpdateCheckbox() {
    while (true) {
        const { payload } = yield take(UPDATE_CHECKBOX_ACTION);
        yield fork(updateCheckbox, payload);     
    }
}

// 监听获取应用设置数据
function* watchAppManage() {
    while (true) {
        yield take(APP_MANAGE_ACTION);
        yield fork(getAppManage);     
    }
}

// 监听更新应用设置数据
function* watchAppManageUpdate() {
    while (true) {
        const { payload } = yield take(APP_MANAGE_UPDATE_ACTION);
        yield fork(getAppManageUpdate, payload);     
    }
}

export const app = [
    fork(watchApp),
    fork(watchDeleteApp),
    fork(watchAudit),
    fork(watchDeleteLabel),
    fork(watchAddLabel),
    fork(watchUpdateCheckbox),
    fork(watchAppManage),
    fork(watchAppManageUpdate)
];