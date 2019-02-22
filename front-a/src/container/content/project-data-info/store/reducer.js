import { PROJECT_DATA_INFO } from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    infoData: {}, // charts饼图
})

export default (state = initState, action) => {

    switch (action.type) {
        case PROJECT_DATA_INFO:
            return state.merge({
                infoData: fromJS(action.payload.data)
            });
        default:
            return state;
    }

}