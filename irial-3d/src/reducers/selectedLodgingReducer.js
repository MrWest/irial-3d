import { SELECT_LODGING, CHANGE_LODGING_PROGRAM,
  ADD_LODGING_COMMENT, DELETE_LODGING_COMMENT, CHANGE_LODGING_COMMENT } from "../actions/types";
import _ from "lodash";

const SelectedLodgingsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_LODGING:
      return action.payload;
    case CHANGE_LODGING_PROGRAM:
     
      let lodging  = Object.assign({}, state);

      lodging.program.map(prog => {

        if(parseInt(action.payload.id) === parseInt(prog.id)){
          prog.content = action.payload.content

        
        }
           
      })
      lodging.newProgramText  = action.payload.content
      // console.log("here:", lodging.program)
      return lodging;
      case CHANGE_LODGING_COMMENT:
     
      lodging  = Object.assign({}, state);

      let newComments = []

     lodging.comments.map(comment => {        

       if(parseInt(action.payload.id) === parseInt(comment.id))
         comment.comment = action.payload.comment
     
         newComments.push(comment)
       
          
     })
     lodging.comments  = newComments
     // console.log("here:", lodging.program)
     return lodging;
     case ADD_LODGING_COMMENT:
    
      lodging  = Object.assign({}, state);
       newComments = []
      
      newComments.push(action.payload)

   lodging.comments.map(comment => {

         newComments.push(comment)

       
       })

     lodging.comments  = newComments
     // console.log("here:", lodging.program)
     return lodging;

     case DELETE_LODGING_COMMENT:
    
      lodging  = Object.assign({}, state);
       newComments = []
      
     

   lodging.comments.map(comment => {

         if(parseInt(comment.id)!==parseInt(action.payload))
         newComments.push(comment)

       
       })

     lodging.comments  = newComments
     // console.log("here:", lodging.program)
     return lodging;

    default:
      return state;
  }
};

export default SelectedLodgingsReducer;