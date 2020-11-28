import {
  TOGGLE_OPEN,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPY_CART,
} from "../actions/types";
import _ from "lodash";

const CartReducer = (state = { open: false, items: [] }, action) => {
  switch (action.type) {
    case TOGGLE_OPEN:
      return { ...state, open: action.payload };
    case ADD_TO_CART:
      return {
        ...state,
        open: action.payload.openCart,
        items: [
          ...state.items,
          {
            ...action.payload.item,
            id: state.items.length
              ? state.items[state.items.length - 1].id + 1
              : 1,
          },
        ],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case EMPY_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};

export default CartReducer;
