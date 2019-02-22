import { LOGIN_SUCCESS,LOGOUT } from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg:'',
    appId:'',
    authorization:'',
    userRelatedCompanyMap:''
})

export default (state=initState,action) =>{
    switch(action.type) {
        case LOGIN_SUCCESS:
            const { appId , authorization , userRelatedCompanyMap } = action.payload.data;
            return state.merge({appId , authorization , userRelatedCompanyMap});
        // case LOGOUT:
            // return {...state,...initState};
        default:
            return state;
    }

}