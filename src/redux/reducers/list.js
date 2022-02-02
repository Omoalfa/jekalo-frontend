import * as types from '../action-types';
import { list as initialState } from '../initialStates';

const list = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case types.LIST_CLEANUP:
            return {
                ...state,
                isLoading: false,
                isSuccessful: false,
                error: null
            }
        case types.LIST_FAIL: 
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case types.LIST_START:
            return {
                ...state,
                isLoading: true
            }
        case types.LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
                isSuccessful: true
            }
        default:
            return state;
    }
};

export default list;
