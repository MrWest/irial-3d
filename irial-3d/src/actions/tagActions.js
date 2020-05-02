import { FETCH_TAGS, UPDATE_MODEL_TAGS } from "./types";
import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage} from "../apis/tools";
import { __await } from "tslib";


//employee-orders_list
export const fetchTags = () => async dispatch => {
    const lang = getLanguage();

    const tagsDb =  await DashBoard.get("/tags/get_tags.php"+ generatePHPParameters({lang}));
      var tags = tagsDb.data.slice();

    dispatch({
      type: FETCH_TAGS,
      payload: tags
    });

    return tags;
  };

  //employee-orders_list
export const toggleModelTags = (model, tag, toogle ) => async dispatch => {
    const lang = getLanguage();
   
   
      var tags = model.tags;
        
      if(toogle && model.tags.length < 4) {
        const tagsDb =  await DashBoard.get("/tags/add_model_tag.php"+ generatePHPParameters({lang, idModel: model.id, idTag: tag}));
        var tags = tagsDb.data.slice();
      }
      
      if(!toogle && model.tags.length > 0)  {
        const tagsDb =  await DashBoard.get("/tags/delete_model_tag.php"+ generatePHPParameters({lang, idModel: model.id, idTag: tag}));
        var tags = tagsDb.data.slice();
      }
      

      

      dispatch({
        type: UPDATE_MODEL_TAGS,
        payload: tags
      });


    
  };

