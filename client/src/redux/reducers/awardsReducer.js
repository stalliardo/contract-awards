// reducers/awardsReducer.js

import { FETCH_AWARDS_DATA_REQUEST, FETCH_AWARDS_DATA_SUCCESS, FETCH_AWARDS_DATA_FAILURE } from './actions/awardsActions';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const awardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AWARDS_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_AWARDS_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_AWARDS_DATA_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default awardsReducer;
