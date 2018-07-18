import { FETCH_IMAGE_REQUEST } from './types';

export const fetchImage = values => ({
  //
  // this type is watched by a Watcher Saga
  //
  type: FETCH_IMAGE_REQUEST,
  payload: values,
});
