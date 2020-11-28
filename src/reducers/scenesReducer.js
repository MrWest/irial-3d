import {
  FETCH_SCENES,
  DELETE_SCENE,
  UPDATE_SCENE,
  ADD_SCENE,
} from "../actions/types";
import _ from "lodash";

const ScenesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SCENES:
      return action.payload;
    case DELETE_SCENE:
      let newState = [];

      _.map(state, (scene, index) => {
        if (parseInt(scene.id) !== parseInt(action.payload))
          newState.push(scene);
      });

      return newState;
    case UPDATE_SCENE:
      newState = [];

      _.map(state, (scene, index) => {
        if (parseInt(scene.id) === parseInt(action.payload.id))
          newState.push(action.payload);
        else newState.push(scene);
      });

      return newState;
    case ADD_SCENE:
      newState = [];

      _.map(state, (scene, index) => {
        newState.push(scene);
      });

      newState.push(action.payload);

      return newState;
    default:
      return state;
  }
};

export default ScenesReducer;
