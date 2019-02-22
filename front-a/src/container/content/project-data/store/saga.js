
import { call, fork, takeLatest } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import { PROJECT_DATA_TYPE_ACTION ,PROJECT_DATA_DICTION_ACTION ,PROJECT_DATA_DELETE_ACTION,PROJECT_DATA_EDIT_ACTION} from './types';
import { getProjectDataTypeSuccess,getDictionSuccess,proDataUpdateSuc,getProjectDataTypeJur } from './actions';


//ajax
function* getType() {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/dictionaries/getDictionariesTypeList',
            method: 'post',
            data: { isShowLoading: true },
            types: [getProjectDataTypeSuccess,null,getProjectDataTypeJur],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* getDiction({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/dictionaries/getDictionariesList',
            method: 'post',
            data: { isShowLoading: true,params:payload },
            types: [getDictionSuccess],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* getdel({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/dictionaries/deleteDictionaries',
            method: 'post',
            data: { isShowLoading: true,params:payload },
            types: [proDataUpdateSuc],
            isnotify: true,
            msgSuc:''
        }
    })
}
function* getDdit({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: payload.url,
            method: 'post',
            data: { isShowLoading: true,params:payload.params },
            types: [proDataUpdateSuc],
            isnotify: true,
            msgSuc:''
        }
    })
}




// watch -> fork
//获取类型列表
function* watchProDataType() {
    yield takeLatest(PROJECT_DATA_TYPE_ACTION,getType);
}
//值列表
function* watchproDataDiction() {
    yield takeLatest(PROJECT_DATA_DICTION_ACTION,getDiction);
}
//删除
function* watchproDataDel() {
    yield takeLatest(PROJECT_DATA_DELETE_ACTION,getdel);
}
//新增，编辑
function* watchproDataEdit() {
    yield takeLatest(PROJECT_DATA_EDIT_ACTION,getDdit);
}

export const projectData = [
    fork(watchProDataType),
    fork(watchproDataDiction),
    fork(watchproDataDel),
    fork(watchproDataEdit),
];