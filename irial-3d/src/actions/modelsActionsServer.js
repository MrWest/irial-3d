import { FETCH_MODELS, SELECT_MODEL , DELETE_MODEL, UPDATE_MODEL, ADD_MODEL, ADD_MODEL_COMMENT, DELETE_MODEL_COMMENT, CHANGE_MODEL_COMMENT, SET_USER_SERVICE_RATE} from "./types";

import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage, generateAppendParameters} from "../apis/tools";


export const fetchModelsServer = async reduxStore => {
 const modelsDb = await DashBoard.get("/models/get_models.php")
  var modelsRslt = modelsDb.data.slice()
  reduxStore.dispatch({
      type: FETCH_MODELS,
      payload: modelsRslt
    });
    return modelsRslt;
  };

  export const sortModelsServer = async (category, reduxStore) => {

    const lang = getLanguage(reduxStore);

   
    let results = undefined;
    
    let completeUrl = category === "all"?  generatePHPParameters({lang}) : generatePHPParameters({category, lang});
    // if(category === "all")
    // modelsDb = await DashBoard.get("/models/get_models.php"+ generatePHPParameters({lang}))
    //  else
     await DashBoard.get("/models/get_models.php"+ completeUrl).then( async modelsDb => {

      var modelsRslt = modelsDb.data.slice()
      
     const promises = modelsRslt.map( async model => {   
         
       const modelImagesDb = await DashBoard.get("/models/get_model_images.php"+ generatePHPParameters({idModel: model.id}))
       model.images = modelImagesDb.data

       const modelsRateDb = await DashBoard.get("/models/get_model_rate.php"+ generatePHPParameters({idModel: model.id}))
       model.rate = modelsRateDb.data

       return model
       
     })

      results = await Promise.all(promises)

     })

     

     reduxStore.dispatch({
      type: FETCH_MODELS,
      payload: results//fromDB
    });

    return results;
  };


  export const selectModelServer = async (id, reduxStore) => {
  
    const lang = getLanguage();

    const modelsDb = await DashBoard.post("/models/get_model.php"+ generatePHPParameters({id, lang}))
  
    var modelsRslt = modelsDb.data
   
        
    const modelsImagesDb = await DashBoard.get("/models/get_model_images.php"+ generatePHPParameters({idModel: modelsRslt.id}))
    modelsRslt.images = modelsImagesDb.data

    const modelscommentsDb = await DashBoard.get("/models/get_model_comments.php"+ generatePHPParameters({idModel: modelsRslt.id}))
    modelsRslt.comments = modelscommentsDb.data
   
    const modelsvideosDb = await DashBoard.get("/models/get_model_videos.php"+ generatePHPParameters({idModel: modelsRslt.id}))
    modelsRslt.videos = modelsvideosDb.data

    const modelsRateDb = await DashBoard.get("/models/get_model_rate.php"+ generatePHPParameters({idModel: modelsRslt.id}))
    modelsRslt.rate = modelsRateDb.data

 
 
  
    reduxStore.dispatch({
      type: SELECT_MODEL,
      payload: modelsRslt
    });

   return modelsRslt;
  };

