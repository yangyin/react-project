
import { MESSAGE_UNREAD_LIST,MESSAGE_READ_LIST,CLEAR_MSG_DATA} from './types';
import { CALL_API } from '@/applyMiddleWare/request';

// 未读消息 / 已读消息列表
export function unreadMessageRequest(params) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/user/selectMsgContentList',
            method:'POST',
            data: { params },
            callback:(data,dispatch,params)=> {
                const { queryType ,pageNum} =params;
                dispatch( {type:queryType ==0?MESSAGE_UNREAD_LIST:MESSAGE_READ_LIST,payload:{data,pageNum}} );
            }
        }
    }
    // return async dispatch => {
    //     try {
    //         const res = await Axios.post({url:'sdpbusiness/user/selectMsgContentList',data:{params} });
    //         if(res.data && typeof res.data.success === 'boolean') {
    //             if( res.data.success === false ) { 
    //                 notification.error({
    //                     message:'提示',
    //                     key:'1',
    //                     description:res.data.message
    //                 })
    //             } else { 
    //                 // console.log('message: ', res.data);
    //                 const { content } = res.data;
    //                 const { queryType } =params;
    //                 dispatch( {type:queryType ==0?MESSAGE_UNREAD_LIST:MESSAGE_READ_LIST,payload:content} );
    //             }
    //         }
    //     } catch(e) {
    //         console.log('login error: ',e);
    //     }
        
    // }
}

export const clearMsgData = (type) => {
    return { type:CLEAR_MSG_DATA,payload:type};
}