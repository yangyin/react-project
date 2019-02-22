import { USER_ACTION,USER_GROUP_ACTION,USER_DELETE_ACTION,
    USER_DETAIL_BLACK_ACTION,USER_DETAIL_INFO_ACTION} from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';


import { controlJur,statusControl,userList,userGroupList,userDetailInfo } from './actions';

// 用户列表
function* getUserList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/getUserLists',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [userList,null,controlJur]
        }
    })
}
function* watchUser () {
    while (true) {
        const { payload } = yield take(USER_ACTION);
        yield fork(getUserList, payload);
    }
}

// 用户分组列表
function* getUserGroupList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/findAllGroupIdByTwo',
            method: 'POST',
            data: { isShowLoading: true,params: { ...payload } },
            types: [userGroupList]
        }
    })
}
function* watchUserGroup () {
    while (true) {
        const { payload } = yield take(USER_GROUP_ACTION);
        yield fork(getUserGroupList, payload);
    }
}

/**
 * 删除用户
 * @param  userid 
 * @param  type record.groupName==='administrator'?'B':'A'
 */
function* UserDel (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/deleteByUserId',
            method: 'POST',
            data: { isShowLoading: true,params: { ...payload } },
            types: [statusControl],
            isnotify:true,
        }
    })
}
function* watchUserDel () {
    while (true) {
        const { payload } = yield take(USER_DELETE_ACTION);
        yield fork(UserDel, payload);
    }
}
/**
 * 加入黑名单
 * @params userId 
 * @params type 1加入黑名单 2移出黑名单
 */
function* detailJoinBlack (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/joinblacklist',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [statusControl]
        }
    })
}
function* watchDetailJoinBlack(){
    while (true){
        const {payload}=yield take(USER_DETAIL_BLACK_ACTION);
        yield fork(detailJoinBlack, payload);
    }
}
/**
 * 详细信息
 * @params userId 
 */
function* detailInfo (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/findPersonInfo',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [userDetailInfo]
        }
    })
}
function* watchDetailInfo(){
    while (true){
        const {payload}=yield take(USER_DETAIL_INFO_ACTION);
        yield fork(detailInfo, payload);
    }
}


export const user = [
    fork(watchUser),
    fork(watchUserGroup),
    fork(watchUserDel),
    fork(watchDetailJoinBlack),
    fork(watchDetailInfo),
];