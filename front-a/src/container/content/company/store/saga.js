import {COMPANY_AUDIT,COMPANY_BSYSTEM_ACTION, COMPANY_ACTION,COMPANY_DELETE_ACTION,
    COMPANY_DETAIL_INFO_ACTION,COMPANY_DETAIL_EDIT_ACTION} from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';


import { controlJur,userList,userDetailInfo,companyEdit,systemCompany } from './actions';

/**
 * 审核
 * isflag	是	string	审核通过 B 不通过C
businessId	是	string	企业id
userId	否	string	用户id
 */
function* auditCompanySaga (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/addAuthCompangGroup',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [companyEdit],
            isnotify:true,
        }
    })
}
function* watchAuditCompany () {
    while (true) {
        const { payload } = yield take(COMPANY_AUDIT);
        yield fork(auditCompanySaga, payload);
    }
}
/**
 * 代管
 * proxyBusinessAdminUserCode	是	string	代理管理员编号
 * proxyBusinessAdminUserId	是	string	代理管理员id
 * proxyBusinessId	否	string	代理企业的id
 * proxyCompanyName	否	string	代理企业名字
 * proxyBusinessAdminUserName	否	string	代理管理员名字
 */
function* systemCompanySaga (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/enterBSystem',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [systemCompany]
        }
    })
}
function* watchBsystem () {
    while (true) {
        const { payload } = yield take(COMPANY_BSYSTEM_ACTION);
        yield fork(systemCompanySaga, payload);
    }
}

// 用户列表
function* getCompanyList (payload) {
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
        const { payload } = yield take(COMPANY_ACTION);
        yield fork(getCompanyList, payload);
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
            url: 'sdpprevail/user/deleteCompanyUserId',
            method: 'POST',
            data: { isShowLoading: true,params: { ...payload } },
            types: [companyEdit],
            isnotify:true,
        }
    })
}
function* watchUserDel () {
    while (true) {
        const { payload } = yield take(COMPANY_DELETE_ACTION);
        yield fork(UserDel, payload);
    }
}

/**
 * 企业详细信息
 * @params userId 
 * @params type 'B'
 */
function* detailInfo (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/findCompanyInfoByIdNew',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [userDetailInfo]
        }
    })
}
function* watchDetailInfo(){
    while (true){
        const {payload}=yield take(COMPANY_DETAIL_INFO_ACTION);
        yield fork(detailInfo, payload);
    }
}
/**
 * 企业编辑
 * @params userId 
 * @params legalPerson 法定代表人
 */
function* companyDetailEdit (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/updateComInfoById',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [companyEdit],
            isnotify:true,
        }
    })
}
function* watchCompanyEdit(){
    while (true){
        const {payload}=yield take(COMPANY_DETAIL_EDIT_ACTION);
        yield fork(companyDetailEdit, payload);
    }
}


export const company = [
    fork(watchUser),
    fork(watchBsystem),
    fork(watchUserDel),
    fork(watchDetailInfo),
    fork(watchCompanyEdit),
    fork(watchAuditCompany),
];