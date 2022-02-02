import * as types from '../action-types';
import { deletes as initialState } from '../initialStates';

const deletes = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case types.DELETE_CLEANUP:
            return {
                ...state,
                isLoading: false,
                isSuccessful: false,
                error: null
            }
        case types.DELETE_FAIL: 
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case types.DELETE_START:
            return {
                ...state,
                isLoading: true
            }
        case types.DELETE_SUCCESS:
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

export default deletes;
