import { TOGGLE_OPEN , ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";
import _ from "lodash";

const CartReducer = (state = { open: false, items: [] }, action) => {
  switch (action.type) {
    case TOGGLE_OPEN:
      return {... state, open: action.payload }
    case ADD_TO_CART:
      return {... state, open: true, items: [... state.items, action.payload]  }
    case REMOVE_FROM_CART:
      return {... state, items: state.items.filter(i => i.id !== action.payload) }  
    default:
      return state;
  }
};

export default CartReducer;