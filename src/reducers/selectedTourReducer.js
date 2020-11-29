import {
  SELECT_TOUR,
  CHANGE_TOUR_PROGRAM,
  CHANGE_TOUR_COMMENT,
  ADD_TOUR_COMMENT,
  DELETE_TOUR_COMMENT,
} from "../actions/types";

const SelectedTourReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_TOUR:
      return action.payload;
    case CHANGE_TOUR_PROGRAM:
      let tour = Object.assign({}, state);

      tour.program.map((prog) => {
        if (parseInt(action.payload.id) === parseInt(prog.id)) {
          prog.content = action.payload.content;
        }
      });
      tour.newProgramText = action.payload.content;
      return tour;
    case CHANGE_TOUR_COMMENT:
      tour = Object.assign({}, state);

      let newComments = [];

      tour.comments.map((comment) => {
        if (parseInt(action.payload.id) === parseInt(comment.id))
          comment.comment = action.payload.comment;

        newComments.push(comment);
      });
      tour.comments = newComments;
      return tour;
    case ADD_TOUR_COMMENT:
      tour = Object.assign({}, state);
      newComments = [];

      newComments.push(action.payload);

      tour.comments.map((comment) => {
        newComments.push(comment);
      });

      tour.comments = newComments;
      return tour;

    case DELETE_TOUR_COMMENT:
      tour = Object.assign({}, state);
      newComments = [];

      tour.comments.map((comment) => {
        if (parseInt(comment.id) !== parseInt(action.payload))
          newComments.push(comment);
      });

      tour.comments = newComments;
      return tour;

    default:
      return state;
  }
};

export default SelectedTourReducer;
