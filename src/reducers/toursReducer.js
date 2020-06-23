import { FETCH_TOURS, DELETE_TOUR, UPDATE_TOUR, ADD_TOUR } from "../actions/types";
import _ from "lodash";

const ToursReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TOURS:
      return action.payload;
    case DELETE_TOUR:
    let newState = []


    _.map(state, (tour, index) => {
      if(parseInt(tour.id) !== parseInt(action.payload))
     newState.push(tour)
   
  
   });
 
    return newState
    case UPDATE_TOUR:
     newState = []


    _.map(state, (tour, index) => {
      if(parseInt(tour.id) === parseInt(action.payload.id))
          newState.push(action.payload)
          else
          newState.push(tour)
  
   });
 
    return newState
    case ADD_TOUR:
     newState = []


    _.map(state, (tour, index) => {
      
          newState.push(tour)
  
   });
   
   newState.push(action.payload)
 
    return newState
    default:
      return state;
  }
};

export default ToursReducer;
