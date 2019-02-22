import {ATTENDANCE_INFO_SUCCESS} from './types';
const initState ={
    attendanceList:[],
}
export default function (state = initState, action) {
    switch (action.type) {
        case ATTENDANCE_INFO_SUCCESS:
            return { ...state,attendanceList:action.payload.data };
        default:
            return state;
    }
}