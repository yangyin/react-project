
import { LIST_SINGLE,LIST_MULTIPLE,LIST_READING,EDU_DETAILS, TOPIC_LIST, EDU_DETAILS_DELETE, EDU_DETAILS_EDIT } from './types';

const initState = {
    msg: '',
    educationDetails: {}, //列表
    listSingle:[],// 单选列表
    listMultiple:[],// 多选列表
    listReading:[],// 阅读列表
    topicLists: [], //列表
    educationDetailsDelete: false,
    educationDetailsEdit: false
}


export default function (state=initState,action) {
    switch(action.type) {
        case EDU_DETAILS:
            return { ...state, msg: '', educationDetails: action.payload.data };
        case TOPIC_LIST:
            return { ...state, msg: '', topicLists: action.payload.data };
        case LIST_SINGLE:
            return { ...state, msg: '', listSingle: action.payload.data };
        case LIST_MULTIPLE:
            return { ...state, msg: '', listMultiple: action.payload.data };
        case LIST_READING:
            return { ...state, msg: '', listReading: action.payload.data };
        case EDU_DETAILS_DELETE:
            return { ...state, educationDetailsDelete: action.payload.status };
        case EDU_DETAILS_EDIT:
            return { ...state, educationDetailsEdit: action.payload.status }; 
        default:
            return state;
    }
}