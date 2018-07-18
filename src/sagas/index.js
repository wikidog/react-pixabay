import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_IMAGE_REQUEST,
  FETCH_IMAGE_SUCCESS,
  FETCH_IMAGE_FAILURE,
} from '../actions/types';

// -----------------------------------------------------------
// Worker Saga
function* fetchImage(action) {
  console.log('Worker Sage');
  console.log(action);
  // yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

// -----------------------------------------------------------
// Watcher Saga
//
// watch FETCH_IMAGE_REQUEST action
function* watchFetchImage() {
  yield takeLatest(FETCH_IMAGE_REQUEST, fetchImage);
}

// -----------------------------------------------------------
// Root Saga
export default function* rootSaga() {
  yield all([watchFetchImage()]);
}
