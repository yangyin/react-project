import {
    PACKET_LIST_SUCCESS,
    PACKET_SELECT_COMISSON_SUCCESS,
    PACKET_SELECT_COMISSON_DELETE,
    PACKET_SELECT_COMISSON_ADD,
    PACKET_SELECT_COMISSON_UPDATE_SUC,
    PACKET_JUR
} from './types';
import { fromJS ,setIn,List} from 'immutable';

const initState = fromJS({
    commissionList: {},//佣金报表
    grant:{}, //发放报表
    setting:{},//佣金设置展示
    delList:List(),//删除的数据
    isUpdate:false,
    isJur:false
})

export default (state = initState, action) => {

    switch (action.type) {
        case PACKET_LIST_SUCCESS:
        const { reportType } = action.payload.params.params;
            let key = 'commissionList';
            if(reportType === 1) {
                key = 'commissionList';
            } else {
                key = 'grant';
            }

            return state.merge({
                [key]: fromJS(action.payload.data),
                isJur:false
            })
        case PACKET_SELECT_COMISSON_SUCCESS:
            return state.merge({
                setting:fromJS(action.payload.data)
            });
        case PACKET_SELECT_COMISSON_DELETE:
            const id = action.payload;
            const arr = state.getIn(['setting','commissionSectionList']).filter(v => v.get('commissionSectionId') !== id);
            if(!Number(id)) {
                let obj = Object.assign({},state.getIn(['setting','commissionSectionList']).find(v => v.get('commissionSectionId') === id).toJS(),{commission:'',promotionNumber:''});

                return fromJS({
                    ...state.toJS(),
                    delList: state.get('delList').push(obj),
                    setting: fromJS(Object.assign({},state.get('setting').toJS(),{commissionSectionList:arr}))
                })
            }
            
            return setIn(state,['setting','commissionSectionList'],arr);
        case PACKET_SELECT_COMISSON_ADD:
            let arrAdd = state.getIn(['setting','commissionSectionList']).push(fromJS(action.payload));
            return state.setIn(['setting','commissionSectionList'],arrAdd)
            
        case PACKET_SELECT_COMISSON_UPDATE_SUC:   
            return fromJS({
                ...state.toJS(),
                isUpdate:action.payload.status,
                delList:List()
            })

        case PACKET_JUR:
            return state.set('isJur',action.payload);
        default:
            return state;
    }

}