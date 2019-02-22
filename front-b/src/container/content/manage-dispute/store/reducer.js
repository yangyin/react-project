import { DISPUTE_JURISDICTION,DISPUTE_LIST, DISPUTE_INFO, DISPUTE_AUDIT } from './types';

const initState = {
    disputeListInfo: {},
    disputeDetail: {},
    isUpdate: false,
    isJurisdiction: false, //控制权限是否显示403页面
}
export default (state = initState, action) => {
    switch (action.type) {
        case DISPUTE_LIST:
            return { ...state, disputeListInfo: action.payload.data }
        case DISPUTE_INFO:
            return { ...state, disputeDetail: action.payload.data };
        case DISPUTE_JURISDICTION:
            return { ...state, isJurisdiction: action.payload };
        case DISPUTE_AUDIT:
            return { ...state, isUpdate: action.payload.status }
        default:
            return { ...state };

    }
}