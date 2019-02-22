import { USER_INFO_SUCCESS,MENU_SUCCESS} from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    userInfo:{},
    menu:[]
})

export default (state=initState,action) =>{
    
    switch(action.type) {
        case USER_INFO_SUCCESS:
            const data = JSON.parse(action.payload.data);
            return state.merge({
                userInfo:fromJS(data)
            });
        case MENU_SUCCESS:
            return state.merge({
                menu: fromJS(action.payload.data)
            })

        default:
            return state;
    }

}