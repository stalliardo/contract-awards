import { combineReducers } from 'redux';
import awardsReducer from '../features/awards/awardsSlice';
import usersReducer from '../features/users/usersSlice';
import authReducer from '../features/auth/authSlice';
import locationReducer from '../features/locations/locationSlice'

const rootReducer = combineReducers({
  awards: awardsReducer,
  users: usersReducer,
  auth: authReducer,
  location: locationReducer
});

export default rootReducer;
