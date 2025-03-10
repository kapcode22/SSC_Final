
import axios from "axios";
// Purpose of getUpdates
//  getUpdates is an asynchronous action creator function that handles fetching data from an API.
// Initiates an asynchronous data-fetching process when called.
// Manages different stages of the API call (loading, success, or failure) by dispatching corresponding actions to the reducer.
// Updates the Redux store with the fetched data or an error state, depending on the outcome.
export const getUpdates=()=>{
   return async(dispatch)=>{
      dispatch({type:'GET_UPDATES'})
      const response= await axios.get('http://localhost:5000/api/services')
      if(response){
         dispatch({type:'GET_UPDATES_COMPLETED',payload:response.data.data})
      }
      if(!response){
         dispatch({type:'GET_UPDATES_FAILED'})
      }
   }

}
// two state which will chaange on action by getupdates
const initialState = {
   isLoading: false,
   updatesData: []
 };
 // reducers function:-
 // Actions such as 'GET_UPDATES', 'GET_UPDATES_COMPLETED', and 'GET_UPDATES_FAILED'
 // represent different stages in the data-fetching process.
 const updateReducer = (state = initialState, action) => {
   switch (action.type) {
     case 'GET_UPDATES':
       return {
         ...state,
         isLoading: true,
       };
     case 'GET_UPDATES_COMPLETED':
       return {
         ...state,
         isLoading: false,
         updatesData: action.payload,
       };
     case 'GET_UPDATES_FAILED':
       return {
         ...state,
         isLoading: false,
         updatesData: [],
       };
     default:
       return state;
   }
 };
 
 export default updateReducer;
 
//  GET_UPDATES: When this action is dispatched, it signals the beginning of the data-fetching process. The reducer sets isLoading to true to indicate loading has started.
// GET_UPDATES_COMPLETED: This action is dispatched when the API call is successful. It carries the fetched data in payload. The reducer updates updatesData with this data and sets isLoading to false to indicate loading is finished.
// GET_UPDATES_FAILED: This action is dispatched if the API call fails. It clears any data from updatesData, sets isLoading to false, and could potentially hold error information to display an error message.