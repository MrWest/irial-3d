import {LOAD_PROFILE, SAVE_PROFILE} from "./types";
import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage} from "../apis/tools";


export const loadProfile = pId => async dispatch => {
 
  //  const profileAPI = await DashBoard.get("/profiles/"+pId+"/");
  
    const profile = {
        id: pId,
        first_name: "John",
        last_name: "Doe",
        email: "user@example.com",
        phone_number: "78895666"
        }
    dispatch({
      type: LOAD_PROFILE,
      payload: profile
    });
  };

  export const saveProfile = profile => async dispatch => {
 
    const profileAPI = await DashBoard.put("/user/update_user.php" + generatePHPParameters(profile));
 
    
    dispatch({
      type: SAVE_PROFILE,
      payload: profileAPI.data
    });
  };
  
  