import { CAMERA_LIST_SUCCESS ,CAMERA_DELETE_SUCCESS,CAMERA_LIST_JURISDICTION,VIDEO_LIST_SUCCESS} from './types';

const initState = {
    cameraList:[],
    videoList:[],
    isCameraDelete:false, //控制删除
    isJurisdiction:false,//控制权限是否显示403页面
}


export default function (state=initState,action) {
    switch(action.type) {
        case CAMERA_LIST_SUCCESS:
            const {data} = action.payload;
            return {...state,cameraList:data===null ? []:data};
        case CAMERA_DELETE_SUCCESS:
            return {...state,isCameraDelete:action.payload.status};
        case VIDEO_LIST_SUCCESS:
            const { payload } = action;
            return { ...state,videoList:payload.data};
        case CAMERA_LIST_JURISDICTION:
            return {...state,isJurisdiction:action.payload}
        default:
            return state;
    }
}