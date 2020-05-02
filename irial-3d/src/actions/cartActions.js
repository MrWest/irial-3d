import { TOGGLE_OPEN , ADD_TO_CART, REMOVE_FROM_CART } from "./types";
import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage} from "../apis/tools";
import { __await } from "tslib";


//employee-orders_list
export const openCart = open => async dispatch => {

    dispatch({
      type: TOGGLE_OPEN,
      payload: open
    });

    return open;
  };

  //employee-orders_list
export const addToCart = item => async dispatch => {
      

      dispatch({
        type: ADD_TO_CART,
        payload: item
      });


    return item;
  };

  export const RemoveFromCart = item => async dispatch => {
      

      dispatch({
        type: REMOVE_FROM_CART,
        payload: item
      });


    return item;
  };

