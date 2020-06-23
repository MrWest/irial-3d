import {  FETCH_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY  } from "../actions/types";
import _ from "lodash";

const CategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;
      case DELETE_CATEGORY:
      let newState = []
  
  
      _.map(state, (category, index) => {
        if(parseInt(category.id) !== parseInt(action.payload))
       newState.push(category)
     
    
     });
   
      return newState
      case UPDATE_CATEGORY:
       newState = []
 
 
     _.map(state, (category, index) => {
       if(parseInt(category.id) === parseInt(action.payload.id))
           newState.push(action.payload)
           else
           newState.push(category)
   
    });
  
     return newState
    default:
      return state;
  }
};

export default CategoriesReducer;
