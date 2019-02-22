import { CALL_API } from '@/applyMiddleWare/request';
import { CAMERA_LIST_SUCCESS,CAMERA_DELETE_SUCCESS ,VIDEO_LIST_SUCCESS,CAMERA_LIST_JURISDICTION} from './types';

/**
 * 摄像头管理列表
 * @param {*项目ID} projectId 
 * @param {*设备编码} videoCode 
 */
export const getCameraList = (params,videoCode)=> {
    return {
        [CALL_API]: {
            url:'sdpbusiness/veido/selectVideoByProId',
            data:{isShowLoading:true,params:{ ...params,videoCode}},
            types:[CAMERA_LIST_SUCCESS,,CAMERA_LIST_JURISDICTION],
            isnotify:true,
            msgSuc:false
        }
    }
}
/**
 * 删除摄像头
 * @param {*摄像头ID} videoId 
 */
export const cameraDelete = (videoId) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/veido/deleteVideo',
            method:'post',
            data:{isShowLoading:true,params:{videoId}},
            types:[CAMERA_DELETE_SUCCESS],
            isnotify:true
        }
    }  
}
export const cameraDeleteStatus = (bool) => {
    return { type:CAMERA_DELETE_SUCCESS,payload:{status:bool}};
}

export const getVedioList = (proId) => {
    return {
        [CALL_API]: {
            url:'sdpbusiness/veido/selectVideosByProId',
            data:{isShowLoading:true,params:{proId}},
            types:[VIDEO_LIST_SUCCESS],
            isnotify:true,
            msgSuc:false
        }
    } 
}