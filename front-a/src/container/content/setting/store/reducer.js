import {
    SETTING_ACTION_SUCCESS,
    SETTING_CLAUSE_SUCCESS,
    CLAUSE_EDIT_SUCCESS,
    PLATFORM_ADD_OR_UPDATE_STATE,
    SETTING_AD_POS_LIST_SUCCESS,
    SETTING_AD_CONTNET_LIST_SUCCESS,
    SETTING_AD_CLEAR,
    SETTING_POS_AND_PLATFORM_CLEAR,
    SETTING_AD_CONTNET_STATE_SUCCESS,
    SETTING_AD_CONTNET_ADD_SUCCESS,
    SETTING_JURISDICTION
} from './types';
import { fromJS,Map } from 'immutable';

const initState = fromJS({
    msg: '',
    settingList: {}, // 信息设置列表
    adPosList:{},//广告位置列表
    adContentList:{},//广告内容列表
    settingClause: [],
    updateClause: false,
    isUpdate:false,
    adState: false, // 广告内容启用、停用
    adContentAdd: false,
    isJurisdiction: false
})

export default (state = initState, action) => {

    switch (action.type) {
        case SETTING_ACTION_SUCCESS:
            let settingData = action.payload.data ? action.payload.data : {};
            return state.merge({ settingList: fromJS(settingData) });
        case PLATFORM_ADD_OR_UPDATE_STATE:
            return state.set('isUpdate',action.payload.status);
        case SETTING_CLAUSE_SUCCESS:
            return state.merge({ settingClause: action.payload.data });
        case CLAUSE_EDIT_SUCCESS:
            return state.merge({ updateClause: action.payload.status });
        case SETTING_AD_POS_LIST_SUCCESS:
            let posData = action.payload.data ? action.payload.data : {};
            return state.merge({adPosList:fromJS(posData)});
        case SETTING_AD_CONTNET_LIST_SUCCESS:
            return state.merge({
                adContentList:fromJS(action.payload.data)
            })
        case SETTING_AD_CLEAR:
            return initState;
        case SETTING_POS_AND_PLATFORM_CLEAR:
            return state.merge({
                settingList: Map(),
                adPosList:Map()
            })
        case SETTING_AD_CONTNET_STATE_SUCCESS:
            return state.set('adState', action.payload.status);
        case SETTING_AD_CONTNET_ADD_SUCCESS:
            return state.set('adContentAdd', action.payload.status);
        case SETTING_JURISDICTION:
            return state.set('isJurisdiction',action.payload);
        default:
            return state;
    }


}