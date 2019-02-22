import { DASHBOARD_USER_INFO_SUC,DASHBOARD_LIST_SUC ,DASHBOARD_JUR,DASHBOARD_BULLETEDLIST_SUC} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    userInfo:{},
    list:[],
    bulleted:{},//改版后数据
    isJur:false
})

export default (state = initState, action) => {

    switch (action.type) {
        case DASHBOARD_USER_INFO_SUC:
            return state.merge({
                userInfo:fromJS(action.payload.data)
            });
        case DASHBOARD_LIST_SUC:
            return state.merge({
                list:fromJS(action.payload.data.rows),
                isJur:false
            });
        case DASHBOARD_JUR:
            return state.set('isJur',action.payload);
        case DASHBOARD_BULLETEDLIST_SUC:
            return state.set('bulleted',fromJS(action.payload.data));
        default:
            return state;
    }

}