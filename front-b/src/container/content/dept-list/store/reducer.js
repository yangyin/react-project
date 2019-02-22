
import { DEPT_LIST, DEPT_DELETE, DEPT_ADD, DEPT_EDIT } from './types';

const initState = {
    msg: '',
    deptDelete: false,
    deptAdd: false,
    deptEdit: false,
    deptList: [], //列表
}


export default function (state=initState,action) {
    switch(action.type) {
        case DEPT_LIST:
            return { ...state, msg: '', deptList: action.payload.data };
        case DEPT_DELETE:
            return { ...state, deptDelete: action.payload.status };
        case DEPT_ADD:
            return { ...state, deptAdd: action.payload.status };
        case DEPT_EDIT:
            return { ...state, deptEdit: action.payload.status };
        default:
            return state;
    }
}