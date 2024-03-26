import { combineReducers } from 'redux';
import awardsReducer from '../features/awards/awardsSlice';

const rootReducer = combineReducers({
  awards: awardsReducer
});

export default rootReducer;
