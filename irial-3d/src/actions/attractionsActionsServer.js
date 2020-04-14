import { FETCH_ATTRACTIONS, SELECT_ATTRACTION , DELETE_ATTRACTION, UPDATE_ATTRACTION, ADD_ATTRACTION,
   CHANGE_ATTRACTION_PROGRAM, ADD_ATTRACTION_COMMENT, DELETE_ATTRACTION_COMMENT, CHANGE_ATTRACTION_COMMENT, SET_USER_SERVICE_RATE} from "./types";

import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage, generateAppendParameters} from "../apis/tools";


export const fetchAttractionsServer = async reduxStore => {
 const attractionsDb = await DashBoard.get("/attractions/get_attractions.php")
  var attractionsRslt = attractionsDb.data.slice()
  reduxStore.dispatch({
      type: FETCH_ATTRACTIONS,
      payload: attractionsRslt
    });
    return attractionsRslt;
  };

  export const sortAttractionsServer = async (category, reduxStore) => {

    const lang = getLanguage(reduxStore);

   
    let results = undefined;
    
    let completeUrl = category === "all"?  generatePHPParameters({lang}) : generatePHPParameters({category, lang});
    // if(category === "all")
    // attractionsDb = await DashBoard.get("/attractions/get_attractions.php"+ generatePHPParameters({lang}))
    //  else
     await DashBoard.get("/attractions/get_attractions.php"+ completeUrl).then( async attractionsDb => {

      var attractionsRslt = attractionsDb.data.slice()
      
     const promises = attractionsRslt.map( async attraction => {   
         
       const attractionImagesDb = await DashBoard.get("/attractions/get_attraction_images.php"+ generatePHPParameters({idAttraction: attraction.id}))
       attraction.images = attractionImagesDb.data
       
      //  const attractionsprogramDb = await DashBoard.get("/attractions/get_attraction_program.php"+ generatePHPParameters({idAttraction: attraction.id, lang}))
      //  attraction.program = attractionsprogramDb.data

      //  const attractionscommentsDb = await DashBoard.get("/attractions/get_attraction_comments.php"+ generatePHPParameters({idAttraction: attraction.id}))
      //  attraction.comments = attractionscommentsDb.data
      
      //  const attractionsvideosDb = await DashBoard.get("/attractions/get_attraction_videos.php"+ generatePHPParameters({idAttraction: attraction.id}))
      //  attraction.videos = attractionsvideosDb.data

       const attractionsRateDb = await DashBoard.get("/attractions/get_attraction_rate.php"+ generatePHPParameters({idAttraction: attraction.id}))
       attraction.rate = attractionsRateDb.data

       return attraction
       
     })

      results = await Promise.all(promises)

     })

     

     reduxStore.dispatch({
      type: FETCH_ATTRACTIONS,
      payload: results//fromDB
    });

    return results;
  };


  export const selectAttractionServer = async (id, reduxStore) => {
  
    const lang = getLanguage();

    const attractionsDb = await DashBoard.post("/attractions/get_attraction.php"+ generatePHPParameters({id, lang}))
  
    var attractionsRslt = attractionsDb.data
   
        
    const attractionsImagesDb = await DashBoard.get("/attractions/get_attraction_images.php"+ generatePHPParameters({idAttraction: attractionsRslt.id}))
    attractionsRslt.images = attractionsImagesDb.data

    const attractionsprogramDb = await DashBoard.get("/attractions/get_attraction_program.php"+ generatePHPParameters({idAttraction: attractionsRslt.id, lang}))
    attractionsRslt.program = attractionsprogramDb.data

    const attractionscommentsDb = await DashBoard.get("/attractions/get_attraction_comments.php"+ generatePHPParameters({idAttraction: attractionsRslt.id}))
    attractionsRslt.comments = attractionscommentsDb.data
   
    const attractionsvideosDb = await DashBoard.get("/attractions/get_attraction_videos.php"+ generatePHPParameters({idAttraction: attractionsRslt.id}))
    attractionsRslt.videos = attractionsvideosDb.data

    const attractionsRateDb = await DashBoard.get("/attractions/get_attraction_rate.php"+ generatePHPParameters({idAttraction: attractionsRslt.id}))
    attractionsRslt.rate = attractionsRateDb.data

 
 
  
    reduxStore.dispatch({
      type: SELECT_ATTRACTION,
      payload: attractionsRslt
    });

   return attractionsRslt;
  };

