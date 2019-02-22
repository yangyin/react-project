
import { INFO_LIST, UPADTE_INFORMATION } from './types';

const initState = {
    msg: '',
    infoList: [], //列表
    updateInfo: false
}


export default function (state=initState,action) {
    switch(action.type) {
        case INFO_LIST:
            return { ...state, msg: '', infoList: action.payload.data };
        case UPADTE_INFORMATION:
            return { ...state, updateInfo: action.payload.status };
        default:
            return state;
    }
}
