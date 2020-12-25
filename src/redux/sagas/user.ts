import {put, call, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/core';
import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from '../constants';
import {getUsersAPI} from '../api';

function* getAllUsers({payload}: any): SagaIterator {
  try {
    const response = yield call(getUsersAPI, payload.page);
    yield put({type: GET_ALL_USERS_SUCCESS, payload: response.data.data});
  } catch (err) {
    yield put({type: GET_ALL_USERS_FAILURE});
  }
}

export function* userSaga(): SagaIterator {
  yield takeEvery(GET_ALL_USERS_REQUEST, getAllUsers);
}
