import * as types from '../action-types';
import AxiosCall from '../../helper/axios';
import ErrorHandler from '../../helper/errorHandler';

const createStart = () => ({
    type: types.CREATE_START
})

const createFail = payload => ({
    payload, type: types.CREATE_FAIL
})

export const createCleanup = () => ({
    type: types.CREATE_CLEANUP
})

const createSuccess = payload => ({
    payload, type: types.CREATE_SUCCESS
})

export const create = payload => async dispatch => {
    dispatch(createStart());

    try {
        const requestObj = {
            data: payload,
            path: 'user',
            method: 'POST'
        }

        const res = await AxiosCall(requestObj);
        dispatch(createSuccess(res.data))
    } catch (err) {
        const error = ErrorHandler(err)
        dispatch(createFail(error));
    }
}
