
import { COMPANY_BASIC_INFO ,UPDATE_ADMIN_PHONE} from './types';

const initState = {
    companyBaseInfo:{},
    isUpdate:false
}


export default function (state=initState,action) {
    switch(action.type) {
        case COMPANY_BASIC_INFO:
            return { ...state,companyBaseInfo:action.payload.data};
        case UPDATE_ADMIN_PHONE:
            return {...state,isUpdate:action.payload.status};
        default:
            return state;
    }
}