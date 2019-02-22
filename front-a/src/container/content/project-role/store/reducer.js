import { PROJECT_ROLE_LIST_SUCCESS,PROJECT_ROLE_SAVE_SUCCESS,PROJECT_ROLE_LIST_JUR } from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    roleList:[],
    isAdd:false, //编辑，新增，删除 控制页面刷新
    isJur:false
})

export default (state = initState, action) => {

    switch (action.type) {
        case PROJECT_ROLE_LIST_SUCCESS:
            return state.merge({
                roleList:fromJS(action.payload.data),
                isJur:false
            });
        case PROJECT_ROLE_LIST_JUR:
            return state.set('isJur',action.payload);
        case PROJECT_ROLE_SAVE_SUCCESS:
            return state.set('isAdd',action.payload.status);
        default:
            return state;
    }

}