import {
  SELECT_ATTRACTION,
  CHANGE_ATTRACTION_PROGRAM,
  ADD_ATTRACTION_COMMENT,
  DELETE_ATTRACTION_COMMENT,
  CHANGE_ATTRACTION_COMMENT,
} from "../actions/types";
import _ from "lodash";

const SelectedAttractionsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_ATTRACTION:
      return action.payload;
    case CHANGE_ATTRACTION_PROGRAM:
      let attraction = Object.assign({}, state);

      attraction.program.map((prog) => {
        if (parseInt(action.payload.id) === parseInt(prog.id))
          prog.content = action.payload.content;
      });
      attraction.newProgramText = action.payload.content;
      // console.log("here:", lodging.program)
      return attraction;
    case CHANGE_ATTRACTION_COMMENT:
      attraction = Object.assign({}, state);

      let newComments = [];

      attraction.comments.map((comment) => {
        if (parseInt(action.payload.id) === parseInt(comment.id))
          comment.comment = action.payload.comment;

        newComments.push(comment);
      });
      attraction.comments = newComments;
      // console.log("here:", lodging.program)
      return attraction;
    case ADD_ATTRACTION_COMMENT:
      attraction = Object.assign({}, state);
      newComments = [];

      newComments.push(action.payload);

      attraction.comments.map((comment) => {
        newComments.push(comment);
      });

      attraction.comments = newComments;
      // console.log("here:", lodging.program)
      return attraction;

    case DELETE_ATTRACTION_COMMENT:
      attraction = Object.assign({}, state);
      newComments = [];

      attraction.comments.map((comment) => {
        if (parseInt(comment.id) !== parseInt(action.payload))
          newComments.push(comment);
      });

      attraction.comments = newComments;
      // console.log("here:", lodging.program)
      return attraction;

    default:
      return state;
  }
};

export default SelectedAttractionsReducer;
