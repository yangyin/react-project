import { call, fork, take } from 'redux-saga/effects';
import { CALL_API ,Service} from '@/utils/utils';

import { FORGET_VALID_ACTION,FORGET_NEXT_VALID_ACTION,RESET_ACTION } from './types';
import { nextValidSuccess} from './actions';




//ajax 验证码
function* forgetValidAsync(payload) {
    
    yield call(Service,{
        [CALL_API]: {
            url:'ais/portal/sendMessageCode',
            method:'POST',
            data:{isShowLoading:true,params:payload},
            types:[],
            isnotify:true,
            msgSuc:''
        }
    })
}

//下一步
function* nextValidAsync({ payload }) {
    yield call(Service,{
        [CALL_API]: {
            url:'ais/portal/login',
            method:'POST',
            data:{isShowLoading:true,params:{...payload,loginType:'bymobile',loginPortal:window.systemBaseConfig.loginPortal}},
            types:[nextValidSuccess],
            isnotify:true,
            msgSuc:false
        }
    })
}
//重置密码 TODO
function* resetAsync(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'ais/portal/forgetPwd',
            method:'POST',
            data:{isShowLoading:true,params:payload},
            types:[nextValidSuccess],
            isnotify:true,
            msgSuc:''
        }
    })
}


// watch -> fork
function* watchforget() {
    while (true) {
        const { payload } = yield take(FORGET_VALID_ACTION);
        yield fork(forgetValidAsync, payload);
    }
}

function* watchNextValid() {
    while(true) {
        const data = yield take(FORGET_NEXT_VALID_ACTION);
        yield fork(nextValidAsync,data);
    }
}

function* watchReset() {
    while(true) {
        const { payload } = yield take(RESET_ACTION);
        yield fork(resetAsync,payload)
    }
}


export const forget = [
    fork(watchforget),
    fork(watchNextValid),
    fork(watchReset)
];