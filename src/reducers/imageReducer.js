import {
  FETCH_IMAGE_REQUEST,
  FETCH_IMAGE_SUCCESS,
  FETCH_IMAGE_FAILURE,
} from '../actions/types';

// this reducer manages this piece of state
const initialSate = {
  fetching: false,
  error: null,
  response: null,
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case FETCH_IMAGE_REQUEST:
      return { ...state, fetching: true, error: null };
    case FETCH_IMAGE_SUCCESS:
      return { ...state, fetching: false, response: action.payload };
    case FETCH_IMAGE_FAILURE:
      return {
        ...state,
        fetching: false,
        response: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
