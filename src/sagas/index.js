import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_IMAGE_REQUEST,
  FETCH_IMAGE_SUCCESS,
  FETCH_IMAGE_FAILURE,
} from '../actions/types';

// -----------------------------------------------------------

const apiUrl = 'https://pixabay.com/api';
const apiKey = '8783992-06499d83b0b376f06affd8505';

function fetchImage(searchText, amount) {
  return axios({
    method: 'get',
    url: `${apiUrl}/?key=${apiKey}&q=${searchText}&$image_type=photo&per_page=${amount}&safesearch=true`,
  });
}

// -----------------------------------------------------------
// Worker Saga
function* fetchImageRequest(action) {
  const searchText = action.payload.searchText;
  const amount = action.payload.amount;

  try {
    const res = yield call(fetchImage, searchText, amount);
    // dispatch a success action
    yield put({ type: FETCH_IMAGE_SUCCESS, payload: res.data.hits });
  } catch (error) {
    // dispatch a failure action
    yield put({ type: FETCH_IMAGE_FAILURE, payload: error });
  }
}

// -----------------------------------------------------------
// Watcher Saga
//
// watch FETCH_IMAGE_REQUEST action
function* watchFetchImage() {
  yield takeLatest(FETCH_IMAGE_REQUEST, fetchImageRequest);
}

// -----------------------------------------------------------
// Root Saga
export default function* rootSaga() {
  yield all([watchFetchImage()]);
}
