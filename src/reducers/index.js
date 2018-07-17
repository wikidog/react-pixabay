import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import imageReducer from './imageReducer';

export default combineReducers({
  image: imageReducer,
  // Redux-Form: the key must be 'form'
  form: reduxForm,
});
