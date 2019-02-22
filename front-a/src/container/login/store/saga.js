import { call, fork, take } from 'redux-saga/effects';
import { LOGIN_ACTION } from './types';
import { CALL_API ,Service} from '@/utils/utils';

import { loginSuccess } from './actions';


//ajax
function* loginAsync(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'ais/portal/login',
            method:'POST',
            data:{isShowLoading:true,params:{...payload,loginType:'bycode',loginPortal:window.systemBaseConfig.loginPortal}},
            types:[loginSuccess],
            isnotify:true
        }
    })
}


// watch -> fork
function* watchLogin() {
    while (true) {
        const { payload } = yield take(LOGIN_ACTION);
        yield fork(loginAsync, payload);

    }
}


export const login = [
    fork(watchLogin)
];