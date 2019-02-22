import {
    JURISDICTION_LIST_SUCCESS,
    JURISDICTION_ASSISTANT_UPDATE,
    JURISDICTION_DETAIL_LIST_SUCCESS,
    JURISDICTION_DETAIL_FETCH_USER_SUCCESS,
    JURISDICTION_DETAIL_CLEAR_USERLIST,
    JURISDICTION_DETAIL_PRO_SUCCESS,
    JURISDICTION_LIST_JUR,
    JURISDICTION_NEW_LIST_UPDATE_CHECKED,
    JURISDICTION_NEW_LIST_SUCCESS,
    JURISDICTION_NEW_LIST_SAVE_SUCCESS
} from './types';
import { fromJS, Map } from 'immutable';

const initState = fromJS({
    pgeList: [],
    jurList: [],//改版后，权限列表
    detailList: {},
    userList: [],
    proList: [],//已被授权对象列表
    jurMap: {},
    isUpdate: false,
    isJur: false
})

export default (state = initState, action) => {

    switch (action.type) {
        case JURISDICTION_NEW_LIST_SUCCESS:
            return state.set('jurList', fromJS(action.payload.data));
        case JURISDICTION_NEW_LIST_UPDATE_CHECKED:
            const { parentId, permissionId } = action.payload;
            // let currentParentItem = state.get('jurList').find((v,index)=>{
            //     if(v.get('parentId') === parentId){
            //         console.log(index)
            //         return {index};
            //     }
            // });
            // console.log(state.get('jurList').toJS())
            let currentParentItem = state.toJS().jurList.map((v, index) => {
                if(parentId === 'all') {
                    v.childList.map(item => {
                        item.isSelected = permissionId ? '1' : '0';
                    })
                } else if (v['parentId'] === parentId) {
                    v.childList.map(item => {
                        if (item.permissionId === permissionId) {
                            item.isSelected = item.isSelected === '0' ? '1' : '0'
                        }
                    })
                }
                return v;
            })
            // console.log(currentParentItem)
            
            // let currentItem = currentParentItem.filter
            return state.set('jurList',fromJS(currentParentItem));
        case JURISDICTION_NEW_LIST_SAVE_SUCCESS:
            return state.set('isUpdate', action.payload.status);
        case JURISDICTION_LIST_SUCCESS:
            return state.merge({
                pgeList: fromJS(action.payload.data.pgeList),
                isJur: false
            });
        case JURISDICTION_LIST_JUR:
            return state.set('isJur', action.payload);
        case JURISDICTION_ASSISTANT_UPDATE:
            return state.set('isUpdate', action.payload.status);
        case JURISDICTION_DETAIL_LIST_SUCCESS:
            return state.merge({
                detailList: fromJS(action.payload.data)
            })
        case JURISDICTION_DETAIL_FETCH_USER_SUCCESS:
            return state.merge({
                userList: fromJS(action.payload.data)
            })
        case JURISDICTION_DETAIL_CLEAR_USERLIST:
            return state.set('userList', []);
        case JURISDICTION_DETAIL_PRO_SUCCESS:
            const { jrrRelationList, jurMap } = action.payload.data;
            return state.merge({
                proList: fromJS(jrrRelationList),
                jurMap: jurMap ? fromJS(jurMap) : Map()
            });
        default:
            return state;
    }

}