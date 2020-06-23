import {ADD_PRODUCT_COMMENTS, FETCH_PRODUCT_COMMENTS } from "./types";
import DashBoard from "../apis/DashBoard";
import { __await } from "tslib";


export const sendComment = (pId, message) => async dispatch => {
 
    const commentAPI = await DashBoard.post("/proofs/"+pId+"/comments/",
    {user: {
         username: "jacob",
          first_name: "Jacob",
          last_name: "Forever"
    },
    account_product: pId,
    description: message
        });   

 

    dispatch({
      type: ADD_PRODUCT_COMMENTS,
      payload: commentAPI.data
    });
  };
  
  
  export const fetchComments = product_id => async dispatch => {
   
    // alert("/proofs/"+product_id+"/comments/");    
    const commentsAPI = await DashBoard.get("/proofs/"+product_id+"/comments/");   
    //alert("/proofs/"+product_id+"/comments/")  
    const current_comments = commentsAPI.data.results;
   // alert(current_comments.length)
    dispatch({
      type: FETCH_PRODUCT_COMMENTS,
      payload: current_comments
    });
  };