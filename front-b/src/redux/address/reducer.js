
import { REGION_SUCCESS,REGION_ERROR,CITY_SUCCESS,COUNTY_SUCCESS,REGION_OLD_SUCCESS,CITY_OLD_SUCCESS,COUNTY_OLD_SUCCESS } from './type';

const initState = {
    regionList:[],//省
    cityList:[],//市
    countyList:[],//区

    regionOldList:[],//省
    cityOldList:[],//市
    countyOldList:[],//区

    addressError:''
}


export default function (state=initState,action) {
    switch(action.type) {
        case REGION_SUCCESS:
            return {...state,regionList:action.payload,addressError:''};
        case CITY_SUCCESS:
            return {...state,cityList:action.payload,regionId:action.parentId,addressError:''};
        case COUNTY_SUCCESS:
            return {...state,countyList:action.payload,cityId:action.parentId,addressError:''};

        case REGION_OLD_SUCCESS:
            return {...state,regionOldList:action.payload,addressError:''};
        case CITY_OLD_SUCCESS:
            return {...state,cityOldList:action.payload,regionOldId:action.parentId,addressError:''};
        case COUNTY_OLD_SUCCESS:
            return {...state,countyOldList:action.payload,cityOldId:action.parentId,addressError:''};
            
        case REGION_ERROR:
            return {...state,addressError:action.payload};
        default:
            return state;
    }
}
