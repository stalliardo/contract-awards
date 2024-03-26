// reducers/index.js

import { combineReducers } from 'redux';
import awardsReducer from './awardsReducer';

const rootReducer = combineReducers({
  awards: awardsReducer
  // Add more reducers here if needed
});

export default rootReducer;
