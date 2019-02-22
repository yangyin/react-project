import { MESSAGE_UNREAD_LIST,MESSAGE_READ_LIST,CLEAR_MSG_DATA} from './types';
const initState = {
    unreadList:{},
    readList:{},
}
function render(state,data) {
    return {...state,total:data.total,rows:[...state.rows,...data.rows]};
}

export default (state=initState,action) =>{
    
    switch(action.type) {
        case MESSAGE_UNREAD_LIST:
            let { pageNum,data } = action.payload;
            return {...state,unreadList:pageNum === 1 ? data : render(state.unreadList,data)};
        case MESSAGE_READ_LIST:
            let num = action.payload.pageNum;
            let datas = action.payload.data;
            return {...state,readList:num === 1 ? datas : render(state.readList,datas)};
        case CLEAR_MSG_DATA:
            let datass = action.payload === '0'?'readList':'unreadList';
            return {...state,[datass]:{}};
        default:
            return state;
    }
}