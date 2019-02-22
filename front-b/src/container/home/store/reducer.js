import { MENUS_SUCCESS,USER_INFO_SUCCESS,ERROR_MSG,DASHBOARD_MY_TEAM,CHANGE_TOP_COMPANY,CALLBACK_A_SYSTEM_SUCCESS,HOME_STORE_CLEAR } from './types';

const initState = {
    msg:'',
    menusList:[],
    userInfo:{},
    teamList:[],
    callbackdata:{}
}

export default (state=initState,action) =>{
    
    switch(action.type) {
        case MENUS_SUCCESS:
            return {...state,msg:'',menusList:action.payload.data};
        case USER_INFO_SUCCESS:
            return {...state,...action.payload,msg:''};
        case ERROR_MSG:
            return {...state,msg:action.payload.msg};
        case DASHBOARD_MY_TEAM:
            return {...state,msg:'',...action.payload};
        case CHANGE_TOP_COMPANY:
            return {...state,msg:'',...action.payload};
        case CALLBACK_A_SYSTEM_SUCCESS:
            return {...state,msg:'',callbackdata:action.payload.data};
        case HOME_STORE_CLEAR:
            return initState;
        default:
            return state;
    }
}