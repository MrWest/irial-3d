import { EMPY_CART } from "./types";

// import StripePayments from "../apis/StripePayments";
import DashBoard from "../apis/DashBoard";
import {
  generatePHPParameters,
  getLanguage,
  generateAppendParameters,
  headers,
} from "../apis/tools";

//employee-orders_list
export const createConnectedAccount = async (info) => {
  const paymentInfo = generateAppendParameters(info);
  console.log("xxx1: ", paymentInfo);
  const checkout = await DashBoard.post(
    "/stripe/create_connected_account.php",
    paymentInfo,
    { headers }
  );
  console.log("xxx2: ", checkout);

  return checkout.data;
};

export const createExternalBankAccount = async (info) => {
  const paymentInfo = generateAppendParameters(info);
  console.log("xxx1: ", paymentInfo);
  const checkout = await DashBoard.post(
    "/stripe/create_external_account.php",
    paymentInfo,
    { headers }
  );
  console.log("xxx2: ", checkout);

  return checkout.data;
};

export const tosAcceptanceStripe = async (info) => {
  const paymentInfo = generateAppendParameters(info);
  console.log("xxx1: ", paymentInfo);
  const checkout = await DashBoard.post(
    "/stripe/stripe_agreement_acceptance.php",
    paymentInfo,
    { headers }
  );
  console.log("xxx2: ", checkout);

  return checkout.data;
};

export const deleteStripeAccount = async (info) => {
  const paymentInfo = generateAppendParameters(info);
  console.log("xxx1: ", paymentInfo);
  const checkout = await DashBoard.post(
    "/stripe/delete_connected_account.php",
    paymentInfo,
    { headers }
  );
  console.log("xxx2: ", checkout);

  return checkout.data;
};

export const getAllStripeConnectedAccounts = async () => {
  const checkout = await DashBoard.get(
    "/stripe/stripe_get_all_connected_accounts.php"
  );
  console.log("xxx2: ", checkout);

  return checkout.data;
};

export const getStripeToken = async (info) => {
  const paymentInfo = generatePHPParameters(info);
  console.log("getStripeToken: ", paymentInfo);
  const checkout = await DashBoard.get(
    `/stripe/stripe_get_token.php${paymentInfo}`
  );
  console.log("getStripeToken: ", checkout.data);

  return checkout.data;
};

export const getStripeAccount = async (info) => {
  const paymentInfo = generatePHPParameters(info);
  console.log("getStripeAccount: ", paymentInfo);
  const checkout = await DashBoard.get(
    `/stripe/get_stripe_account.php${paymentInfo}`
  );
  console.log("getStripeAccount: ", checkout.data);

  return checkout.data;
};

export const getStripeAccountLoginLink = async (info) => {
  const paymentInfo = generatePHPParameters(info);
  console.log("getStripeAccountLoginLink: ", paymentInfo);
  const checkout = await DashBoard.get(
    `/stripe/stripe_get_login_token.php${paymentInfo}`
  );
  console.log("getStripeAccountLoginLink: ", checkout.data);

  return checkout.data;
};
