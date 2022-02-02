import * as types from '../action-types';
import AxiosCall from '../../helper/axios';
import ErrorHandler from '../../helper/errorHandler';

const listStart = () => ({
    type: types.LIST_START
})

const listFail = payload => ({
    payload, type: types.LIST_FAIL
})

export const listCleanup = () => ({
    type: types.LIST_CLEANUP
})

const listSuccess = payload => ({
    payload, type: types.LIST_SUCCESS
})

export const list = payload => async dispatch => {
    dispatch(listStart());

    try {
        const requestObj = {
            data: payload,
            path: 'user',
            method: 'GET'
        }

        const res = await AxiosCall(requestObj);
        dispatch(listSuccess(res.data))
    } catch (err) {
        const error = ErrorHandler(err)
        dispatch(listFail(error));
    }
}
