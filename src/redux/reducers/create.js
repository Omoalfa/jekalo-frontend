import * as types from '../action-types';
import { create as initialState } from '../initialStates';

const create = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case types.CREATE_CLEANUP:
            return {
                ...state,
                isLoading: false,
                isSuccessful: false,
                error: null
            }
        case types.CREATE_FAIL: 
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case types.CREATE_START:
            return {
                ...state,
                isLoading: true
            }
        case types.CREATE_SUCCESS:
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

export default create;
