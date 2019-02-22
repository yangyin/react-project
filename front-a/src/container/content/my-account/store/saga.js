import { ACCOUNT_DETAIL_INFO_ACTION,ACCOUNT_DETAIL_EDIT_ACTION} from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';


import { accountInfo,accountEdit,controlJur } from './actions';


/**
 * 账户详细信息
 */
function* myAccountInfo (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/findByOwerDetailJson',
            method: 'GET',
            data: { isShowLoading: true, params: { ...payload } },
            types: [accountInfo,null,controlJur]
        }
    })
}
function* watchAccountInfo(){
    while (true){
        const {payload}=yield take(ACCOUNT_DETAIL_INFO_ACTION);
        yield fork(myAccountInfo, payload);
    }
}
/**
 * 账户修改
 * @params 
 */
function* myAccountEdit (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/updateUserInfoByIdA',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [accountEdit],
            isnotify:true,
        }
    })
}
function* watchAccountEdit(){
    while (true){
        const {payload}=yield take(ACCOUNT_DETAIL_EDIT_ACTION);
        yield fork(myAccountEdit, payload);
    }
}


export const myAccount = [
    fork(watchAccountInfo),
    fork(watchAccountEdit),
];