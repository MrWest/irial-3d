// import { TOGGLE_OPEN , ADD_TO_CART, REMOVE_FROM_CART, EMPY_CART } from "./types";

import StripePayments from "../apis/StripePayments";

//employee-orders_list
export const payCart = async info => {

  const checkout = await StripePayments.post("/checkout", info);
  console.log('xxx', checkout);
  };
