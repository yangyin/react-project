import { 
        SAAS_MANAGEMENT_LIST, 
        HARDWARE_CODE_LIST, 
        ADD_HARDWARE_REGISTER, 
        HARDWARE_MONITORING_LIST, 
        SAAS_OPERATION_SUCCESS, 
        JOB_CARD_LIST, 
        SAAS_JURISDICTION,
        SEARCH_PRO_LIST,
        RELATED_PRO_SUCCESS
    } from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg:'',
    AppList: {},
    hardwareCode: '',
    addHardware: false,
    saasOpreation: false,
    hardwareMonitorList: {},
    jobCardList: {},
    searchProList: [],
    isJurisdiction: false,
    addRelated: false
});

export default (state=initState,action) =>{

    switch(action.type) {
        case SAAS_MANAGEMENT_LIST:
            return state.merge({AppList: action.payload.data});
        case HARDWARE_CODE_LIST:
            return state.merge({hardwareCode: action.payload.data});
        case ADD_HARDWARE_REGISTER:
            return state.merge({addHardware: action.payload.status});
        case HARDWARE_MONITORING_LIST:
            return state.merge({ hardwareMonitorList: action.payload.data});
        case SAAS_OPERATION_SUCCESS:
            return state.merge({ saasOpreation: action.payload.status});
        case SAAS_JURISDICTION:
            return state.set('isJurisdiction',action.payload);
        case JOB_CARD_LIST:
            return state.merge({ jobCardList: action.payload.data});
        case SEARCH_PRO_LIST:
            return state.merge({ searchProList: action.payload.data});
        case RELATED_PRO_SUCCESS:
            return state.merge({ addRelated: action.payload.status});
        default:
            return state;
    }

}