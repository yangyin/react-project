import { call, fork, take } from 'redux-saga/effects';
import { PROJECT_TYPE_ACTION,PROVINCE_ACTION,GET_VALID_CODE_ACTION} from './types';
import { CALL_API ,Service} from '@/utils/utils';

import { projectTypeList,getProvince,getValidCode} from './actions';



/**
 * 获取验证码
 * @param {*} userPhone
 */
function* getCodeValid(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/sms/getMessageCodeAB',
            method:'POST',
            data:{isShowLoading:false,params:{...payload}},
            types:[getValidCode],
            isnotify:true,
        }
    })
}
// watch -> fork
function* watchGetCode() {
    while (true) {
        const { payload } = yield take(GET_VALID_CODE_ACTION);
        yield fork(getCodeValid, payload);

    }
}

/**
 * 获取项目类型、类别
 * @param {*} dicType 'worktype':认证班组工种(擅长工种),'companytype':认证企业类型
 */
function* getProjectType(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/dictionaries/findDictionaryList',
            method:'GET',
            data:{isShowLoading:false,params:{...payload}},
            types:[projectTypeList],
            isnotify:false
        }
    })
}
// watch -> fork
function* watchProjectType() {
    while (true) {
        const { payload } = yield take(PROJECT_TYPE_ACTION);
        yield fork(getProjectType, payload);

    }
}


/**
 * 获取省份
 * @param {*} type=1
 * @param {*} id=1
 */
function* getProvinceSaga(payload) {
    yield call(Service,{
        [CALL_API]: {
            url:'sdpprevail/dictionaries/getRegionList',
            method:'GET',
            data:{isShowLoading:false,params:{...payload}},
            types:[getProvince],
            isnotify:false
        }
    })
}
// watch -> fork
function* watchProvince() {
    while (true) {
        const { payload } = yield take(PROVINCE_ACTION);
        // let payloadParam = {payload,parentsId:}
        yield fork(getProvinceSaga, payload);
    }
}

export const common = [
    fork(watchProjectType),
    fork(watchProvince),
    fork(watchGetCode),
];