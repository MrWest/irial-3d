import { FETCH_LODGINGS, SELECT_LODGING } from "./types";

import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage, generateAppendParameters} from "../apis/tools";


export const fetchLodgingsServer = () => async dispatch => {
 const lodgingsDb = await DashBoard.post("/lodgings/get_lodgings.php")
  var lodgingsRslt = lodgingsDb.data.slice()
  reduxStore.dispatch({
      type: FETCH_LODGINGS,
      payload: lodgingsRslt
    });
  };

  export const sortLodgingsServer = async (sort, offset=0, reduxStore) => {

    const lang = getLanguage(reduxStore);
    let results;
    
    let completeUrl = sort === "all"?  generatePHPParameters({lang, offset}) : generatePHPParameters({sort, lang, offset});
    await DashBoard.post("/lodgings/sort_lodgings.php"+ completeUrl).then(async lodgingsDb => {

      var lodgingsRslt = lodgingsDb.data.slice();
      
      const promises = lodgingsRslt.map( async lodging => {   
          
        const lodgingImagesDb = await DashBoard.get("/lodgings/get_lodging_images.php"+ generatePHPParameters({idLodging: lodging.id}))
        lodging.images = lodgingImagesDb.data
        
        // const lodgingsprogramDb = await DashBoard.get("/lodgings/get_lodging_program.php"+ generatePHPParameters({idLodging: lodging.id, lang}))
        // lodging.program = lodgingsprogramDb.data
 
        // const lodgingscommentsDb = await DashBoard.get("/lodgings/get_lodging_comments.php"+ generatePHPParameters({idLodging: lodging.id}))
        // lodging.comments = lodgingscommentsDb.data
       
        // const lodgingsvideosDb = await DashBoard.get("/lodgings/get_lodging_videos.php"+ generatePHPParameters({idLodging: lodging.id}))
        // lodging.videos = lodgingsvideosDb.data
 
        const lodgingsRateDb = await DashBoard.get("/lodgings/get_lodging_rate.php"+ generatePHPParameters({idLodging: lodging.id}))
        lodging.rate = lodgingsRateDb.data
 
        return lodging
        
      })
 
      
 
      results = await Promise.all(promises);

    })

    

    reduxStore.dispatch({
      type: FETCH_LODGINGS,
      payload: results//fromDB
    });

    //const queryAPI = await DashBoard.post("/lodgings/get_lodgings_count.php"+ generatePHPParameters({lang}));
    return results
  };

  export const selectLodgingServer = async (id, reduxStore) => {
  
    const lang = getLanguage(reduxStore)

    const lodgingsDb = await DashBoard.post("/lodgings/get_lodging.php"+ generatePHPParameters({id, lang}))
  
    var lodgingsRslt = lodgingsDb.data
   
        
    const lodgingsImagesDb = await DashBoard.get("/lodgings/get_lodging_images.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.images = lodgingsImagesDb.data

    const lodgingsprogramDb = await DashBoard.get("/lodgings/get_lodging_program.php"+ generatePHPParameters({idLodging: lodgingsRslt.id, lang}))
    lodgingsRslt.program = lodgingsprogramDb.data

    const lodgingscommentsDb = await DashBoard.get("/lodgings/get_lodging_comments.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.comments = lodgingscommentsDb.data
   
    const lodgingsvideosDb = await DashBoard.get("/lodgings/get_lodging_videos.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.videos = lodgingsvideosDb.data

    const lodgingsRateDb = await DashBoard.get("/lodgings/get_lodging_rate.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.rate = lodgingsRateDb.data
  
    reduxStore.dispatch({
      type: SELECT_LODGING,
      payload: lodgingsRslt
    });

   return lodgingsRslt;
  };