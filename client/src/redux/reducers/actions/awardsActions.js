// actions/awardsActions.js

import axios from 'axios';

export const FETCH_AWARDS_DATA_REQUEST = 'FETCH_AWARDS_DATA_REQUEST';
export const FETCH_AWARDS_DATA_SUCCESS = 'FETCH_AWARDS_DATA_SUCCESS';
export const FETCH_AWARDS_DATA_FAILURE = 'FETCH_AWARDS_DATA_FAILURE';

export const fetchAwardsData = () => {
  return async dispatch => {
    dispatch({ type: FETCH_AWARDS_DATA_REQUEST });

    try {
      const response = await axios.get('/api/awards'); // Example API endpoint
      dispatch({ type: FETCH_AWARDS_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_AWARDS_DATA_FAILURE, error: error.message });
    }
  };
};
