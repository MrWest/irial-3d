import {
  FETCH_MODELS,
  DELETE_MODEL,
  UPDATE_MODEL,
  ADD_MODEL,
} from "../actions/types";
import _ from "lodash";

const ModelsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MODELS:
      return action.payload;
    case DELETE_MODEL:
      let newState = [];

      _.map(state, (model, index) => {
        if (parseInt(model.id) !== parseInt(action.payload))
          newState.push(model);
      });

      return newState;
    case UPDATE_MODEL:
      newState = [];

      _.map(state, (model, index) => {
        if (parseInt(model.id) === parseInt(action.payload.id))
          newState.push(action.payload);
        else newState.push(model);
      });

      return newState;
    case ADD_MODEL:
      newState = [];

      _.map(state, (model, index) => {
        newState.push(model);
      });

      newState.push(action.payload);

      return newState;
    default:
      return state;
  }
};

export default ModelsReducer;
