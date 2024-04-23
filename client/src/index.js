import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { configureStore } from '@reduxjs/toolkit';
import combinedReducers from './redux/reducers/';
import { Provider } from 'react-redux';

const rootReducer = (state, action) => {
  if(action.type === "users/logout") {
    console.log('LOG out called');
    return combinedReducers(undefined, action)
  }

  return combinedReducers(state, action)
}

const store = configureStore({
  reducer: rootReducer
})

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

reportWebVitals();
