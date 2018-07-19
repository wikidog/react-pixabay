import { FETCH_IMAGE_REQUEST, CLOSE_SNACKBAR } from './types';

export const fetchImage = values => ({
  //
  // this type is watched by a Watcher Saga
  //
  type: FETCH_IMAGE_REQUEST,
  payload: values,
});

export const closeSnackbar = values => ({
  type: CLOSE_SNACKBAR,
});
