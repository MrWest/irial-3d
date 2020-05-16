import { TOGGLE_OPEN , ADD_TO_CART, REMOVE_FROM_CART, EMPY_CART } from "./types";

//employee-orders_list
export const toggleCartOpen = open => async dispatch => {

    dispatch({
      type: TOGGLE_OPEN,
      payload: open
    });

    return open;
  };

  //employee-orders_list
export const addToCart = (item, openCart) => async dispatch => {
      

      dispatch({
        type: ADD_TO_CART,
        payload: { item, openCart }
      });


    return item;
  };

  export const removeFromCart = item => async dispatch => {
      

      dispatch({
        type: REMOVE_FROM_CART,
        payload: item
      });


    return item;
  };

  
  export const emptyCart = () => async dispatch => {
      

    dispatch({
      type: EMPY_CART
    });


};

  