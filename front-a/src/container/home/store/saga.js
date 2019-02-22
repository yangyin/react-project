import { USER_INFO,MENUS_ACTION } from './types';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API ,Service} from '@/utils/utils';

import { userInfoSuccess,menuSuccess } from './actions';

function* homeAsync() {
    yield call(Service,{
        [CALL_API]: {
            url:'ais/portal/userInfo',
            method:'POST',
            data:{isShowLoading:true},
            types:[userInfoSuccess],
            isnotify:false,
            msgSuc:false
        }
    })
}

function* menuAsync(appId) {
    yield call(Service,{
        [CALL_API]: {
            url:'ais/portal/menus',
            method:'POST',
            data:{isShowLoading:true,params:{appId}},
            types:[menuSuccess],
            isnotify:true,
            msgSuc:false
        }
    })
}


function* watchhome() {
    while(true) {
        yield take(USER_INFO);
        yield fork(homeAsync);
    }
}

function* watchmenus() {
    while(true) {
        const {payload} = yield take(MENUS_ACTION);
        yield fork(menuAsync,payload);
    }
}


export const home = [
    fork(watchhome),
    fork(watchmenus)
];