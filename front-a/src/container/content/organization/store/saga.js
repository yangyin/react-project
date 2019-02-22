import { ORGANIZATION_ACTION,ORGANIZATION_DELETE_ACTION,
    ORGANIZATION_DETAIL_INFO_ACTION,ORGANIZATION_AUDIT_ACTION} from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';


import { controlJur,error,userList,userDelete,userDetailInfo,companyAudit} from './actions';

/**
 * 机构审核
 * orgId	是	String	机构id
 * orgState	是	String	B 通过 C-不通过
 * adminId	是	String	管理员id 
 * withoutReason	是	String	不通过理由 
 */
function* auditCompany (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/org/auditOrganizationInfo',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [companyAudit],
            isnotify:true,
        }
    })
}
function* watchAudit () {
    while (true) {
        const { payload } = yield take(ORGANIZATION_AUDIT_ACTION);
        yield fork(auditCompany, payload);
    }
}
// 机构列表
function* getCompanyList (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/org/organizationInfoList',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [userList,null,controlJur]
        }
    })
}
function* watchUser () {
    while (true) {
        const { payload } = yield take(ORGANIZATION_ACTION);
        yield fork(getCompanyList, payload);
    }
}
/**
 * 删除用户
 * @param  orgId 
 */
function* UserDel (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/org/deleteOrganizationInfo',
            method: 'POST',
            data: { isShowLoading: true,params: { ...payload } },
            types: [userDelete,error],
            isnotify:true,
        }
    })
}
function* watchUserDel () {
    while (true) {
        const { payload } = yield take(ORGANIZATION_DELETE_ACTION);
        yield fork(UserDel, payload);
    }
}

/**
 * 机构管理详细信息
 * @params orgId 
 */
function* detailInfo (payload) {
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/org/getOrganizationInfo',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [userDetailInfo]
        }
    })
}
function* watchDetailInfo(){
    while (true){
        const {payload}=yield take(ORGANIZATION_DETAIL_INFO_ACTION);
        yield fork(detailInfo, payload);
    }
}


export const organization = [
    fork(watchUser),
    fork(watchUserDel),
    fork(watchDetailInfo),
    fork(watchAudit),
];