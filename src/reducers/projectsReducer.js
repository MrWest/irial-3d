import {
  FETCH_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  ADD_PROJECT,
} from "../actions/types";
import _ from "lodash";

const ProjectsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.payload;
    case DELETE_PROJECT:
      let newState = [];

      _.map(state, (project, index) => {
        if (parseInt(project.id) !== parseInt(action.payload))
          newState.push(project);
      });

      return newState;
    case UPDATE_PROJECT:
      newState = [];

      _.map(state, (project, index) => {
        if (parseInt(project.id) === parseInt(action.payload.id))
          newState.push(action.payload);
        else newState.push(project);
      });

      return newState;
    case ADD_PROJECT:
      newState = [];

      _.map(state, (project, index) => {
        newState.push(project);
      });

      newState.push(action.payload);

      return newState;
    default:
      return state;
  }
};

export default ProjectsReducer;
