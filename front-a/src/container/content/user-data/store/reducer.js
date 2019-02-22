import { USERDATA_SUCCESS, USERDATA_CHARTS_SUCCESS, USERDATA_SOURCE_SUCCESS, USERDATA_COUNT_SUCCESS, USERDATA_COMMISSION_SUCCESS, USER_DATA_JURISDICTION } from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg:'',
    userData: [],
    userDataCharts: [],
    userDataSource: [],
    userDataCount: [],
    userDataCommission: [],
    isJurisdiction: false
})

export default (state=initState,action) =>{

    switch(action.type) {
        case USERDATA_SUCCESS:
            return state.merge({userData: action.payload.data});
        case USERDATA_CHARTS_SUCCESS:
            return state.merge({userDataCharts: action.payload.data});
        case USERDATA_SOURCE_SUCCESS:
            return state.merge({userDataSource: action.payload.data});
        case USERDATA_COUNT_SUCCESS:
            return state.merge({userDataCount: action.payload.data});
        case USERDATA_COMMISSION_SUCCESS:
            return state.merge({userDataCommission: action.payload.data});
        case USER_DATA_JURISDICTION:
            return state.merge({isJurisdiction: action.payload});
        default:
            return state;
    }

}