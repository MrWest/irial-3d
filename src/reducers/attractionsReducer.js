import {
  FETCH_ATTRACTIONS,
  DELETE_ATTRACTION,
  UPDATE_ATTRACTION,
  ADD_ATTRACTION,
} from "../actions/types";
import _ from "lodash";

const AttractionsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ATTRACTIONS:
      return action.payload;
    case DELETE_ATTRACTION:
      let newState = [];

      _.map(state, (attraction, index) => {
        if (parseInt(attraction.id) !== parseInt(action.payload))
          newState.push(attraction);
      });

      return newState;
    case UPDATE_ATTRACTION:
      newState = [];

      _.map(state, (attraction, index) => {
        if (parseInt(attraction.id) === parseInt(action.payload.id))
          newState.push(action.payload);
        else newState.push(attraction);
      });

      return newState;
    case ADD_ATTRACTION:
      newState = [];

      _.map(state, (attraction, index) => {
        newState.push(attraction);
      });

      newState.push(action.payload);

      return newState;
    default:
      return state;
  }
};

export default AttractionsReducer;
