import { 
    APP_ACTION_SUCCESS, APP_DELETE_SUCCESS, 
    APP_MANAGE_SUCCESS, DELETE_LABEL_SUCCESS, 
    ADD_LABEL_SUCCESS, APP_MANAGE_UPDATE_SUCCESS, 
    APP_JURISDICTION, UPDATE_CHECKBOX_SUCCESS,
    AUDIT_SUCCESS
} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg:'',
    appList: {}, // 招聘列表
    appDelete: false, //删除招聘列表
    appManage: {}, //应用设置数据
    appLabelDelete: false, //招聘标签删除
    appLabelAdd: false, //招聘标签新增
    updateCheckbox: false, //更新招聘设置复选框
    appManageUpdate: false, //应用设置更新
    isJurisdiction: false,
    auditApp: false // 审核招聘
});

export default (state=initState,action) =>{

    switch(action.type) {
        case APP_ACTION_SUCCESS:
            return state.merge({appList: action.payload.data});
        case APP_DELETE_SUCCESS:
            return state.merge({appDelete: action.payload.status});
        case AUDIT_SUCCESS:
            return state.merge({auditApp: action.payload.status});
        case APP_MANAGE_SUCCESS:
            return state.merge({appManage: action.payload.data});
        case DELETE_LABEL_SUCCESS:
            return state.merge({appLabelDelete: action.payload.status});
        case ADD_LABEL_SUCCESS:
            return state.merge({appLabelAdd: action.payload.status});
        case UPDATE_CHECKBOX_SUCCESS:
            return state.merge({updateCheckbox: action.payload.status});
        case APP_MANAGE_UPDATE_SUCCESS:
            return state.merge({appManageUpdate: action.payload.status});
        case APP_JURISDICTION:
            return state.set('isJurisdiction',action.payload);
        default:
            return state;
    }

}