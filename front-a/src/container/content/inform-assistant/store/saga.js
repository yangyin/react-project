import { call, fork, takeLatest } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import { 
    INFO_ASSISTANT_LIST_ACTION,
    INFO_ASSISTANT_EDIT_ACTION,
} from './types';


import { getInfoAssListSuccess,infoAssistantUpdate,infoAssistantJur } from './actions';


//ajax
function* getList() {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/noticeProgramme/getNoticeProgrammeList',
            method: 'post',
            data: { isShowLoading: true },
            types: [getInfoAssListSuccess,null,infoAssistantJur],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* edit({payload}) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/noticeProgramme/' + payload.url,
            method: 'post',
            data: { isShowLoading: true,params:payload.params },
            types: [infoAssistantUpdate],
            isnotify: true,
            msgSuc:''
        }
    })
}





// watch -> fork
//提交删除
function* watchinfoAssisList() {
    yield takeLatest(INFO_ASSISTANT_LIST_ACTION,getList);
}
//编辑，复制
function* watchinfoAssisEdit() {
    yield takeLatest(INFO_ASSISTANT_EDIT_ACTION,edit);
}


export const informAssistant = [
    fork(watchinfoAssisList),
    fork(watchinfoAssisEdit),

];