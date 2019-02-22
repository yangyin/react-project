import { PROJECT_LIST,PROJECT_LIST_JURISDICTION, PROJECT_DETAIL_SUCCESS, COMPANY_UNIT_LIST, UNIT_EMPLOYEE_LIST, UNIT_TEAM_LIST, UNIT_WORKER_LIST } from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg:'',
    projectList: {},
    projectDetail: {},
    companyList: [],
    unitEmployeeList: [],
    unitTeamList: [],
    unitWorkerList: [],
    isJurisdiction: false,
});

export default (state=initState,action) =>{

    switch(action.type) {
        case PROJECT_LIST:
            return state.merge({projectList: action.payload.data});
        case PROJECT_DETAIL_SUCCESS:
            return state.merge({projectDetail: action.payload.data});
        case PROJECT_LIST_JURISDICTION:
            return state.set('isJurisdiction',action.payload);
        case COMPANY_UNIT_LIST:
            return state.merge({companyList: action.payload.data});
        case UNIT_EMPLOYEE_LIST:
            return state.merge({unitEmployeeList: action.payload.data});
        case UNIT_TEAM_LIST:
            return state.merge({unitTeamList: action.payload.data});
        case UNIT_WORKER_LIST:
            return state.merge({unitWorkerList: action.payload.data});
        default:
            return state;
    }

}