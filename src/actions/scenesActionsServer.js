import { FETCH_SCENES, SELECT_SCENE } from "./types";

import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage} from "../apis/tools";


export const fetchScenesServer = async reduxStore => {
 const scenesDb = await DashBoard.get("/scenes/get_scenes.php")
  var scenesRslt = scenesDb.data.slice()
  reduxStore.dispatch({
      type: FETCH_SCENES,
      payload: scenesRslt
    });
    return scenesRslt;
  };

  export const sortScenesServer = async (category, sort='all', offset=0, reduxStore) => {

    const lang = getLanguage(reduxStore);

   
    let results = undefined;
    
    let completeUrl = generatePHPParameters({category, sort, offset, lang});
    // if(category === "all")
    // scenesDb = await DashBoard.get("/scenes/get_scenes.php"+ generatePHPParameters({lang}))
    //  else
     await DashBoard.get("/scenes/get_scenes.php"+ completeUrl).then( async scenesDb => {

      var scenesRslt = scenesDb.data.slice()
      
     const promises = scenesRslt.map( async scene => {   
         
       const sceneImagesDb = await DashBoard.get("/scenes/get_scene_images.php"+ generatePHPParameters({idScene: scene.id}))
       scene.images = sceneImagesDb.data

       const scenesRateDb = await DashBoard.get("/scenes/get_scene_rate.php"+ generatePHPParameters({idScene: scene.id}))
       scene.rate = scenesRateDb.data;

       
       const sceneOwnerInfo = await DashBoard.get("/scenes/get_scene_owner_info.php"+ generatePHPParameters({user: scene.id_user}))
       scene = {...scene, ownerInfo: {...sceneOwnerInfo.data} };

       return scene
       
     })

      results = await Promise.all(promises)

     })

     

     reduxStore.dispatch({
      type: FETCH_SCENES,
      payload: results//fromDB
    });

    return results;
  };


  export const selectSceneServer = async (id, reduxStore) => {
  
    const lang = getLanguage();

    const scenesDb = await DashBoard.post("/scenes/get_scene.php"+ generatePHPParameters({id, lang}))
  
    var scenesRslt = scenesDb.data
        
    const scenesImagesDb = await DashBoard.get("/scenes/get_scene_images.php"+ generatePHPParameters({idScene: scenesRslt.id}))
    scenesRslt.images = scenesImagesDb.data

    const scenescommentsDb = await DashBoard.get("/scenes/get_scene_comments.php"+ generatePHPParameters({idScene: scenesRslt.id}))
    scenesRslt.comments = scenescommentsDb.data
   
    const scenesvideosDb = await DashBoard.get("/scenes/get_scene_videos.php"+ generatePHPParameters({idScene: scenesRslt.id}))
    scenesRslt.videos = scenesvideosDb.data

    const scenesRateDb = await DashBoard.get("/scenes/get_scene_rate.php"+ generatePHPParameters({idScene: scenesRslt.id}))
    scenesRslt.rate = scenesRateDb.data

 
 
  
    reduxStore.dispatch({
      type: SELECT_SCENE,
      payload: scenesRslt
    });

   return scenesRslt;
  };

