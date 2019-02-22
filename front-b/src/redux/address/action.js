import { REGION_SUCCESS,REGION_ERROR ,CITY_SUCCESS,COUNTY_SUCCESS,REGION_OLD_SUCCESS,CITY_OLD_SUCCESS,COUNTY_OLD_SUCCESS} from './type';
import Axios from '../../utils/axios';

//省市区(项目下的)
export function getRegion(option) {
    
    return async dispatch => {
        try {
            const res = await Axios.get({url:'sdpbusiness/project/getRegionList',data:{isShowLoading:false,params:option}});
            if(res.data && typeof res.data.success === 'boolean') {
                if( res.data.success === false ) { 
                    dispatch( {type:REGION_ERROR,payload:res.data.message } );
                } else { 
                    const { content } = res.data;
                    dispatch(success(option.type,content,option.id));
                }
            }
        } catch(e) {
            console.log('region: ',e);
        }
    }
}

function success (type,data,id) {
    switch(type) {
        case 1:
            return {type:REGION_SUCCESS,payload:data};
        case 2:
            return {type:CITY_SUCCESS,payload:data,parentId:id};
        case 3: 
            return {type:COUNTY_SUCCESS,payload:data,parentId:id};
        default:
           break;
    }
}

//省市区(老接口，包含所有)
export function getOldRegion(option) {
    
    return async dispatch => {
        try {
            const res = await Axios.get({url:'sdpbusiness/dictionaries/getRegionList',data:{isShowLoading:false,params:option}});
            if(res.data && typeof res.data.success === 'boolean') {
                if( res.data.success === false ) { 
                    dispatch( {type:REGION_ERROR,payload:res.data.message } );
                } else { 
                    const { content } = res.data;
                    dispatch(oldSuccess(option.type,content,option.id));
                }
            }
        } catch(e) {
            console.log('old region: ',e);
        }
    }
}
function oldSuccess (type,data,id) {
    switch(type) {
        case 1:
            return {type:REGION_OLD_SUCCESS,payload:data};
        case 2:
            return {type:CITY_OLD_SUCCESS,payload:data,parentId:id};
        case 3: 
            return {type:COUNTY_OLD_SUCCESS,payload:data,parentId:id};
        default:
           break;
    }
}