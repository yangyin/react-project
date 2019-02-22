import { USER_ERROR,TEAM_LIST,TEAM_DETAIL,team_JUR} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    teamList:{},// 班组列表
    teamDetail:{},// 班组列表
    error: '',
    isJur:false,
});

export default (state = initState, action) => {
    switch (action.type) {
        case TEAM_LIST:
            return state.merge({ 
                teamList: action.payloadList.data,
                isJur:false
             });
        case TEAM_DETAIL:
            return state.merge({ teamDetail: action.payloadDetail.data });
        case USER_ERROR:
            return state.merge({ error: action.payloadError.data });
            case team_JUR:
            return state.set('isJur',action.payload);
        default:
            return state;
    }

};