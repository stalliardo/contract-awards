import { combineReducers } from 'redux';
import awardsReducer from '../features/awards/awardsSlice';
import usersReducer from '../features/users/usersSlice';

const rootReducer = combineReducers({
  awards: awardsReducer,
  users: usersReducer
});

export default rootReducer;
