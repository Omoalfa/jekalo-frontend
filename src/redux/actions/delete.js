import * as types from '../action-types';
import AxiosCall from '../../helper/axios';
import ErrorHandler from '../../helper/errorHandler';

const deletesStart = () => ({
    type: types.DELETE_START
})

const deletesFail = payload => ({
    payload, type: types.DELETE_FAIL
})

export const deletesCleanup = () => ({
    type: types.DELETE_CLEANUP
})

const deletesSuccess = payload => ({
    payload, type: types.DELETE_SUCCESS
})

export const deletes = payload => async dispatch => {
    dispatch(deletesStart());

    try {
        const requestObj = {
            path: 'user/' + payload,
            method: 'DELETE'
        }

        const res = await AxiosCall(requestObj);
        dispatch(deletesSuccess(res.data))
    } catch (err) {
        const error = ErrorHandler(err)
        dispatch(deletesFail(error));
    }
}
