import { fromJS,remove,List } from 'immutable';
import { 
    GET_CITY_LIST_SUCCESS,
    GET_CITY_UPDATE_SUCCESS,
    GET_CITY_ADD_ACTION,
    GET_CITY_LIST_JUR
} from './types';

const initState = fromJS({
    proList:[], //省
    cityList:[],//市
    areaList:[],//区
    isUpdate:false ,
    isJur:false
})

export default (state = initState, action) => {

    switch (action.type) {
        case GET_CITY_LIST_SUCCESS:
            const { level } = action.payload.params.params;
            let key = '';
            switch(level) {
                case 1:
                    key='proList';
                    state.set('cityList',[]);
                    state.set('areaList',[]);
                break;
                case 2:
                    key='cityList';
                    state.set('areaList',[]);
                break;
                case 3:
                    key='areaList';
                break;
                default:
                break;
            }
            return state.merge({
                [key]:fromJS(action.payload.data),
                isJur:false
            });
        case GET_CITY_LIST_JUR:
            return state.set('isJur',action.payload);
        case GET_CITY_UPDATE_SUCCESS:
            return state.set('isUpdate',action.payload.status);
        case GET_CITY_ADD_ACTION:
            let lvl = action.payload.level;
            let keys = '';
            switch ( lvl ) {
                case 1:
                    keys='proList';
                break;
                case 2:
                    keys='cityList';
                break;
                case 3:
                    keys='areaList';
                break;
                default:
                break;
            }
            return state.merge({
                [keys]:fromJS( [...state.get(keys),action.payload])
            })
            // return state.get(keys).set(state.get(keys).size,action.payload).remove('level');
        default:
            return state;
    }

}