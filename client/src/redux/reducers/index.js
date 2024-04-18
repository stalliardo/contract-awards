import { combineReducers } from 'redux';
import awardsReducer from '../features/awards/awardsSlice';
import usersReducer from '../features/users/usersSlice';
import authReducer from '../features/auth/authSlice';
import locationReducer from '../features/locations/locationSlice'
import tenderReducer from '../features/tenders/tenderSlice';

const rootReducer = combineReducers({
  awards: awardsReducer,
  users: usersReducer,
  auth: authReducer,
  location: locationReducer,
  tender: tenderReducer
});

export default rootReducer;
