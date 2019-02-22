import { ORGANIZATION_ERROR, ORGANIZATION_LIST, ORGANIZATION_DELETE,
     ORGANIZATION_DETAIL_INFO,ORGANIZATION_STATUS_SUCCESS ,ORGANIZATION_JUR} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    orgData: {}, // 机构列表
    userGroupList: [],// 用户组
    orgInfo: {},// 用户详情
    error: '',
    isRefresh:false,
    isJur: false,
})

export default (state = initState, action) => {
    switch (action.type) {
        case ORGANIZATION_LIST:
            return state.merge({ 
                orgData: action.payload.data,
                isJur: false
             });
        case ORGANIZATION_DELETE:
            return state.merge(action.payloadDelete.data);
        case ORGANIZATION_DETAIL_INFO:
            return state.merge({ orgInfo: action.payloadInfo.data });
        case ORGANIZATION_ERROR:
            return state.merge({ error: action.payloadError.data });
        case ORGANIZATION_STATUS_SUCCESS:
        return state.set('isRefresh',action.payload.status);
        case ORGANIZATION_JUR:
        return state.set('isJur',action.payload)
        default:
            return state;
    }

}