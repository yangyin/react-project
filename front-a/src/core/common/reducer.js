import { PROJECT_TYPE_LIST, PROVINCE_SUCCESS,GET_VALID_CODE_SUCCESS } from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    msg: '',
    projectType: [],
    projectCategory: {},
    jobLabel: {},
    companyType: [],// 认证企业类型
    teamType: [],// 认证班组工种
    provinceList: [], // 省
    cityList:[],// 市
    countyList:[], //区
    isRegister:false,//验证码
})

export default (state = initState, action) => {
    switch (action.type) {
        case PROJECT_TYPE_LIST:
            const dicType = action.payload.params ? action.payload.params.params.dicType : '';
            if (dicType && dicType === 'XMLB') { // 返回项目类别列表
                return state.merge({ projectCategory: action.payload.data });
            } else if (dicType && dicType === 'ZPBQ') { // 返回招聘标签列表
                return state.merge({ jobLabel: action.payload.data });
            } else if (dicType && dicType === 'companytype') {
                return state.merge({ companyType: action.payload.data });
            } else if (dicType && dicType === 'worktype') {
                return state.merge({ teamType: action.payload.data });
            } else {
                return state.merge({ projectType: action.payload.data });
            }
        case PROVINCE_SUCCESS:
        const addrType = action.payload.params.params.type;
        const addrId=action.payload.params.params.id;
        if(addrType===1){
            return state.merge({ provinceList: action.payload.data });
        }else if(addrType===2){
            return state.merge({ cityList: action.payload.data,provinceId:addrId });
        }else if(addrType===3){
            return state.merge({ countyList: action.payload.data,cityId:addrId });
        }   
        case GET_VALID_CODE_SUCCESS:
            return state.set('isRegister', action.payload.status);
        default:
            return state;
    }

}