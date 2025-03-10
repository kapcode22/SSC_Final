import axios from 'axios';

export const fetchTeam = () => async (dispatch) => {
  dispatch({ type: 'FETCH_TEAM_REQUEST' });
  try {
    const res = await axios.get('http://localhost:5000/api/postHolders/spc');
    dispatch({ type: 'FETCH_TEAM_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'FETCH_TEAM_FAILURE', payload: err.message });
  }
};

export const fetchEvents = () => async (dispatch) => {
  dispatch({ type: 'FETCH_EVENTS_REQUEST' });
  try {
    const res = await axios.get('http://localhost:5000/api/events/spc');
    dispatch({ type: 'FETCH_EVENTS_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'FETCH_EVENTS_FAILURE', payload: err.message });
  }
};

const initialState = {
    team: [],
    events: [],
    loading: false,
    error: null,
  };
  
  const spcReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TEAM_REQUEST':
      case 'FETCH_EVENTS_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_TEAM_SUCCESS':
        return {
          ...state,
          loading: false,
          team: action.payload,
        };
      case 'FETCH_EVENTS_SUCCESS':
        return {
          ...state,
          loading: false,
          events: action.payload,
        };
      case 'FETCH_TEAM_FAILURE':
      case 'FETCH_EVENTS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default spcReducer;
  