import { LOGIN_SUCCESS,ERROR_MSG,LOGOUT } from './types';

const initState = {
    msg:'',
    appId:'',
    authorization:'',
    userRelatedCompanyMap:''
}

export default (state=initState,action) =>{
    
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {...state,msg:'',...action.payload.data};
        case ERROR_MSG:
            return {...state,msg:action.payload.msg,appId:'',authorization:'',userRelatedCompanyMap:''};
        case LOGOUT:
            return {...state,...initState};
        default:
            return state;
    }

}