import { PLATFORM_JURISDICTION_LIST_SUCCESS,
    PLATFORM_SEARCH_USER_SUCCESS,
    PLATFORM_USER_GROUP_CLEAR,
    PLATFORM_JURISDICTION_GET_DEL_SUCCESS,
    PLATFORM_JURISDICTION_DEL_SUCCESS,
    PLATFORM_JUST_DEL_CLEAR,
    PLATFORM_JURISDICTION_LIST_JUR,
    PLATFORM_JURISDICTION_SAVE_SUCCESS } from './types';
import { fromJS ,List,Map} from 'immutable';

const initState = fromJS({
    platform:{},
    user:[],
    userGroupList:[],
    isSave:false,
    delList:[],
    jurMap:{},
    isDel:false,
    isJur:false
})

export default (state = initState, action) => {

    switch (action.type) {
        case PLATFORM_JURISDICTION_LIST_SUCCESS:
            return state.merge({
                platform: fromJS(action.payload.data),
                isJur:false
            });
        case PLATFORM_JURISDICTION_LIST_JUR:
            return state.set('isJur',action.payload);
        case PLATFORM_SEARCH_USER_SUCCESS:
            const { data,params } = action.payload ;
            const { type } = params.params;
            return type === 'U' ?state.merge({user:fromJS(data)}) : state.merge({userGroupList:fromJS(data)});
        case PLATFORM_USER_GROUP_CLEAR:
            return state.set('userGroupList',List());
        case PLATFORM_JURISDICTION_SAVE_SUCCESS:
            return state.set('isSave',action.payload.status);
        case PLATFORM_JURISDICTION_GET_DEL_SUCCESS:
            const { jurList,jurMap } = action.payload.data;

            return state.merge({
                delList:fromJS(jurList),
                jurMap:jurMap ? fromJS(jurMap) : Map()
            })
            
            // if(jurMap) {
            //     return state.merge({
            //         delList:fromJS(jurList),
            //         jurMap:fromJS(jurMap)
            //     })
            // } else {
            //     return state.merge({
            //         delList:fromJS(jurList),
            //         jurMap:Map()
            //     })
            // }
            // return state.set('delList',fromJS(jurList))
        case PLATFORM_JURISDICTION_DEL_SUCCESS:
            return state.set('isDel',action.payload.status);
        case PLATFORM_JUST_DEL_CLEAR:
            return state.set('delList',List());
        default:
            return state;
    }

}