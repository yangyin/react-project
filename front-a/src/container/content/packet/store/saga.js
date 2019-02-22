import { call, fork, takeLatest } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';
import {
    PACKET_LIST_ACTION,
    PACKET_SELECT_COMISSON_ACTION,
    PACKET_SELECT_COMISSON_UPDATE,
    
} from './types';

import { 
    getPacketListSuc,
    getSelectComissonSuc,
    selectComissionUpdateSuc,
    packetJur
} from './actions';


//ajax
function* getList({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/commission/selectCommissionListByPageInfo',
            method: 'POST',
            data: { isShowLoading: true,params:payload },
            types: [getPacketListSuc,null,packetJur],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* getCommisson() {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/selectComisson',
            method: 'POST',
            data: { isShowLoading: true},
            types: [getSelectComissonSuc],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* update({ payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/updateComisson',
            method: 'POST',
            data: { isShowLoading: true,params:payload},
            types: [selectComissionUpdateSuc],
            isnotify: true,
            msgSuc:''
        }
    })
}






// watch -> fork

function* watchGetPacketList() {
    yield takeLatest(PACKET_LIST_ACTION,getList);
}
function* watchSelectCommisson() {
    yield takeLatest(PACKET_SELECT_COMISSON_ACTION,getCommisson);
}
function* watchSelectCommissonUpdate() {
    yield takeLatest(PACKET_SELECT_COMISSON_UPDATE,update);
}


export const packet = [
    fork(watchGetPacketList),
    fork(watchSelectCommisson),
    fork(watchSelectCommissonUpdate),
];