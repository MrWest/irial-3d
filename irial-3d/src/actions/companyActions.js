import {LOAD_COMPANY, SAVE_COMPANY} from "./types";
import DashBoard from "../apis/DashBoard";


export const loadCompany = cId => async dispatch => {
  
   
   const companyAPI = await DashBoard.get("/accounts/");
   
    dispatch({
      type: LOAD_COMPANY,
      payload: companyAPI.data.results[0]
    });
  };

  export const saveCompany = company => async dispatch => {

    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    if (company !== undefined ) {
      let sendCompany = new FormData();

      sendCompany.append("name", company.name);
      sendCompany.append("phone", company.phone);

      sendCompany.append("billing_address1", company.billing_address1);
      sendCompany.append("billing_address2", company.billing_address2);     
      sendCompany.append("billing_city", company.billing_city);
      sendCompany.append("billing_state", company.billing_state);
      sendCompany.append("billing_zip", company.billing_zip);

      sendCompany.append("shipping_address1", company.shipping_address1);
      sendCompany.append("shipping_address2", company.shipping_address2);     
      sendCompany.append("shipping_city", company.shipping_city);
      sendCompany.append("state", company.state);
      sendCompany.append("shipping_zip", company.shipping_zip);
     
      if(company.logo !== null)
      sendCompany.append("logo", company.logo);
      if(company.secondary_logo !== null)
      sendCompany.append("secondary_logo", company.secondary_logo);




      const companyAPI = await DashBoard.patch("/accounts/"+ company.id+ "/", sendCompany,  {headers});
    
      // console.log("company2Save: ",  companyAPI.data)
      // alert("shit")
      dispatch({
        type: SAVE_COMPANY,
        payload: companyAPI.data
      });
    }



   
  };
  
  