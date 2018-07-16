import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
// import rootSaga from './sagas';

// import 'typeface-roboto';

import App from './components/App';

// const sagaMiddleware = createSagaMiddleware();
// 2nd parameter can be the pre-loaded state
// const store = createStore(reducer, applyMiddleware(sagaMiddleware));
//const store = createStore(reducer, applyMiddleware());
//
// redux devtool for basic store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
