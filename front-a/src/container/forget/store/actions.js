import { FORGET_VALID_ACTION,FORGET_NEXT_VALID_ACTION ,FORGET_NEXT_VALID_SUCCESS,FORGET_NEXT_VALID_STATUS,RESET_ACTION,RESET_SUCCESS} from './types';

export const getValidAction = (data) => {
    return {
        type:FORGET_VALID_ACTION,
        payload:data
    }
}

export const nextValidAction = (data) => {
    return {
        type:FORGET_NEXT_VALID_ACTION,
        payload:data
    }
}
export const nextValidSuccess = (data) => {
    return {
        type:FORGET_NEXT_VALID_SUCCESS,
        payload:data
    }
}
export const updateNextValidStatus = (bool) => {
    return {
        type:FORGET_NEXT_VALID_STATUS,
        payload:bool
    }
}

export const resetAction = (data) => {
    return {
        type:RESET_ACTION,
        payload:data
    }
}
export const resetSuccess = (data) => {
    return {
        type:RESET_SUCCESS,
        payload:data
    }
}