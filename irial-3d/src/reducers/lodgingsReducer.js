import { FETCH_LODGINGS , DELETE_LODGING, UPDATE_LODGING, ADD_LODGING} from "../actions/types";
import _ from "lodash";

const LodgingsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_LODGINGS:
      return action.payload;
  case DELETE_LODGING:
    let newState = []


    _.map(state, (lodging, index) => {
      if(parseInt(lodging.id) !== parseInt(action.payload))
        newState.push(lodging)
   
  
   });
 
    return newState
    case UPDATE_LODGING:
     newState = []


    _.map(state, (lodging, index) => {
      if(parseInt(lodging.id) === parseInt(action.payload.id))
          newState.push(action.payload)
          else
          newState.push(lodging)
  
   });
 
    return newState
    case ADD_LODGING:
     newState = []


    _.map(state, (lodging, index) => {
      
          newState.push(lodging)
  
   });
   
   newState.push(action.payload)
 
    return newState
    default:
      return state;
  }
};

export default LodgingsReducer;
