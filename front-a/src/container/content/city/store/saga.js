import { call, fork, takeLatest ,throttle} from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import { 
    GET_CITY_LIST_ACTION,
    GET_CITY_UPDATE_ACTION
} from './types';


import { 
    getCityListSuccess,
    handleCitySuccess,
    getCityListJur
} from './actions';


//ajax
function* getList( { payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/provinces/getAreasByLevel',
            method: 'post',
            data: { isShowLoading: true,params:payload },
            types: [getCityListSuccess,null,getCityListJur],
            isnotify: true,
            msgSuc:false
        }
    })
}
function* handle( { payload }) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/provinces/'+ payload.url,
            method: 'post',
            data: { isShowLoading: true,params:payload.params },
            types: [handleCitySuccess],
            isnotify: true,
            msgSuc:'操作成功'
        }
    })
}








// watch -> fork
//列表
function* watchGetCityList() {
    yield takeLatest(GET_CITY_LIST_ACTION,getList);
}
function* watchHandleCity() {
    yield takeLatest(GET_CITY_UPDATE_ACTION,handle);
}



export const city = [
    fork(watchGetCityList),
    fork(watchHandleCity),
];