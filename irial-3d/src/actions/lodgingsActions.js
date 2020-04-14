import { FETCH_LODGINGS, SELECT_LODGING , DELETE_LODGING, UPDATE_LODGING, ADD_LODGING, CHANGE_LODGING_PROGRAM,
  ADD_LODGING_COMMENT, DELETE_LODGING_COMMENT, CHANGE_LODGING_COMMENT} from "./types";

import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage, generateAppendParameters} from "../apis/tools";


export const fetchLodgings = () => async dispatch => {
 const lodgingsDb = await DashBoard.post("/lodgings/get_lodgings.php")
  var lodgingsRslt = lodgingsDb.data.slice()
    dispatch({
      type: FETCH_LODGINGS,
      payload: lodgingsRslt
    });
  };

  export const sortLodgings = (sort, offset=0) => async dispatch => {

    const lang = getLanguage();
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

    

     dispatch({
      type: FETCH_LODGINGS,
      payload: results//fromDB
    });

    const queryAPI = await DashBoard.post("/lodgings/get_lodgings_count.php"+ generatePHPParameters({lang}));
    return parseInt(queryAPI.data.count);
  };

  export const filterLodgings = category => async dispatch => {

    const lang = getLanguage();
    let results;
    
    let completeUrl = category === "all"?  generatePHPParameters({lang}) : generatePHPParameters({category, lang});
    await DashBoard.post("/lodgings/get_lodgings.php"+ completeUrl).then(async lodgingsDb => {

      var lodgingsRslt = lodgingsDb.data.slice()
      
      const promises = lodgingsRslt.map( async lodging => {   
          
        const lodgingImagesDb = await DashBoard.get("/lodgings/get_lodging_images.php"+ generatePHPParameters({idLodging: lodging.id}))
        lodging.images = lodgingImagesDb.data
        
        const lodgingsprogramDb = await DashBoard.get("/lodgings/get_lodging_program.php"+ generatePHPParameters({idLodging: lodging.id, lang}))
        lodging.program = lodgingsprogramDb.data
 
        const lodgingscommentsDb = await DashBoard.get("/lodgings/get_lodging_comments.php"+ generatePHPParameters({idLodging: lodging.id}))
        lodging.comments = lodgingscommentsDb.data
       
        const lodgingsvideosDb = await DashBoard.get("/lodgings/get_lodging_videos.php"+ generatePHPParameters({idLodging: lodging.id}))
        lodging.videos = lodgingsvideosDb.data
 
        const lodgingsRateDb = await DashBoard.get("/lodgings/get_lodging_rate.php"+ generatePHPParameters({idLodging: lodging.id}))
        lodging.rate = lodgingsRateDb.data
 
        return lodging
        
      })
 
      
 
      results = await Promise.all(promises);

    })

    

     dispatch({
      type: FETCH_LODGINGS,
      payload: results//fromDB
    });


  };


  export const filterLodgingsUser = user => async dispatch => {

    const lang = getLanguage();
    var lodgingsDb = undefined
    
    
     lodgingsDb = await DashBoard.post("/lodgings/get_lodgings_user.php"+ generatePHPParameters({user, lang}))

     var lodgingsRslt = lodgingsDb.data.slice()
      
     const promises = lodgingsRslt.map( async lodging => {   
         
       const lodgingImagesDb = await DashBoard.get("/lodgings/get_lodging_images.php"+ generatePHPParameters({idLodging: lodging.id}))
       lodging.images = lodgingImagesDb.data
       
       const lodgingsprogramDb = await DashBoard.get("/lodgings/get_lodging_program.php"+ generatePHPParameters({idLodging: lodging.id, lang}))
       lodging.program = lodgingsprogramDb.data

       const lodgingscommentsDb = await DashBoard.get("/lodgings/get_lodging_comments.php"+ generatePHPParameters({idLodging: lodging.id}))
       lodging.comments = lodgingscommentsDb.data
      
       const lodgingsvideosDb = await DashBoard.get("/lodgings/get_lodging_videos.php"+ generatePHPParameters({idLodging: lodging.id}))
       lodging.videos = lodgingsvideosDb.data


       return lodging
       
     })

     

     const results = await Promise.all(promises)

     dispatch({
      type: FETCH_LODGINGS,
      payload: results//fromDB
    });


  };

  export const addLodging = lodging => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    
    uploadInfo.append("id_category", lodging.id_category);
    uploadInfo.append("id_user", lodging.id_user);
    uploadInfo.append("name", lodging.name || "");
    uploadInfo.append("general_description", lodging.general_description || "");
    uploadInfo.append("full_description", lodging.full_description || "");
    uploadInfo.append("price", lodging.price || "");
    uploadInfo.append("price_specifics", lodging.price_specifics || "");
    uploadInfo.append("capacity", lodging.capacity || "");
    uploadInfo.append("capacity_specifics", lodging.capacity_specifics || "");
    uploadInfo.append("location", lodging.location || "");
    uploadInfo.append("currency", lodging.currency || "");
    uploadInfo.append("note", lodging.note || "");
    
    
    

    const lodgingsDb = await DashBoard.post("/lodgings/add_lodging.php", uploadInfo,  {headers})
  
    var lodgingsRslt = lodgingsDb.data
   
        
    const lodgingsImagesDb = await DashBoard.get("/lodgings/get_lodging_images.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.images = lodgingsImagesDb.data

    const lodgingsprogramDb = await DashBoard.get("/lodgings/get_lodging_program.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.program = lodgingsprogramDb.data

    const lodgingscommentsDb = await DashBoard.get("/lodgings/get_lodging_comments.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.comments = lodgingscommentsDb.data
   
    const lodgingsvideosDb = await DashBoard.get("/lodgings/get_lodging_videos.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.videos = lodgingsvideosDb.data

  
    dispatch({
      type: ADD_LODGING,
      payload: lodgingsRslt
    });

      return lodgingsRslt
  };

  export const updateLodging = lodging => async dispatch => {
    
    const lang = getLanguage();

    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", lodging.id);
    uploadInfo.append("name", lodging.name);
    uploadInfo.append("general_description", lodging.general_description);
    uploadInfo.append("full_description", lodging.full_description);
    uploadInfo.append("price", lodging.price);
    uploadInfo.append("price_specifics", lodging.price_specifics);
    uploadInfo.append("capacity", lodging.capacity);
    uploadInfo.append("capacity_specifics", lodging.capacity_specifics);
    uploadInfo.append("location", lodging.location);
    uploadInfo.append("currency", lodging.currency);
    uploadInfo.append("note", lodging.note);
    uploadInfo.append("lang", lang);
    

    let statusInfo = new FormData();
    statusInfo.append("id", lodging.id);
    statusInfo.append("lang", lang);
    // alert(lodging.status);
    if(lodging.status){
     
      statusInfo.append("status", "1");
      await DashBoard.post("/lodgings/update_lodging_status.php", statusInfo,  {headers})

    }
    else{
      statusInfo.append("status", "0");
      await DashBoard.post("/lodgings/update_lodging_status.php", statusInfo,  {headers})

    }


    const lodgingsDb = await DashBoard.post("/lodgings/update_lodging.php", uploadInfo,  {headers})
  
    var lodgingRslt = lodgingsDb.data
      
    const lodgingsImagesDb = await DashBoard.get("/lodgings/get_lodging_images.php"+ generatePHPParameters({idLodging: lodgingRslt.id}))
    lodgingRslt.images = lodgingsImagesDb.data

    const lodgingsprogramDb = await DashBoard.get("/lodgings/get_lodging_program.php"+ generatePHPParameters({idLodging: lodgingRslt.id, lang}))
    lodgingRslt.program = lodgingsprogramDb.data

    const lodgingscommentsDb = await DashBoard.get("/lodgings/get_lodging_comments.php"+ generatePHPParameters({idLodging: lodgingRslt.id}))
    lodgingRslt.comments = lodgingscommentsDb.data
   
    const lodgingsvideosDb = await DashBoard.get("/lodgings/get_lodging_videos.php"+ generatePHPParameters({idLodging: lodgingRslt.id}))
    lodgingRslt.videos = lodgingsvideosDb.data

     

     dispatch({
      type: UPDATE_LODGING,
      payload: lodgingRslt//fromDB
    });

  };

  export const selectLodging = id => async dispatch => {
  
    const lang = getLanguage()

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
  
    dispatch({
      type: SELECT_LODGING,
      payload: lodgingsRslt
    });

   return lodgingsRslt;
  };


  export const uploadLodgingImage = info => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("lodgingId", info.lodgingId);
    uploadInfo.append("fileName", info.fileName);
    uploadInfo.append("lodgingName", info.lodgingName);

    if(info.file !== null){

      uploadInfo.append("file", info.file);

      const lodgingAPI = await DashBoard.post("/lodgings/upload_lodging_image.php", uploadInfo,  {headers, onUploadProgress: info.onProgress});

      // getCategory(info.idCategory)
    }



    
  };
  export const deleteLodgingImage = id => async dispatch => {

    const categoriesDb = await DashBoard.post("/lodgings/delete_lodging_image.php"+ generatePHPParameters({id}))

  }
  
  export const uploadLodgingVideo = info => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("lodgingId", info.lodgingId);
    uploadInfo.append("fileName", info.fileName);
    uploadInfo.append("lodgingName", info.lodgingName);

    if(info.file !== null){

      uploadInfo.append("file", info.file);

      const lodgingAPI = await DashBoard.post("/lodgings/upload_lodging_video.php", uploadInfo,  {headers, onUploadProgress: info.onProgress});

      // getCategory(info.idCategory)
    }



    
  };
  export const deleteLodgingVideo = id => async dispatch => {

    const categoriesDb = await DashBoard.post("/lodgings/delete_lodging_video.php"+ generatePHPParameters({id}))

  }
  
  export const deleteLodging = id => async dispatch => {

    const categoriesDb = await DashBoard.post("/lodgings/delete_lodging.php"+ generatePHPParameters({id}))

    
      dispatch({
          type: DELETE_LODGING,
          payload: id
        });
  }

 

  export const changeLodgingProgram = info => async dispatch => {

    dispatch({
      type: CHANGE_LODGING_PROGRAM,
      payload: info
    });
  }

  
  export const updateLodgingProgram = program => async dispatch => {

    const lang = getLanguage();
       
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", program.id);
    uploadInfo.append("content", program.content);
    uploadInfo.append("lang", lang);
    uploadInfo.append("idLodging", program.idLodging);
    


    const lodgingsDb = await DashBoard.post("/lodgings/update_lodging_program.php", uploadInfo,  {headers})
  
    var lodgingsRslt = lodgingsDb.data
   
        
    const lodgingsImagesDb = await DashBoard.get("/lodgings/get_lodging_images.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.images = lodgingsImagesDb.data

    const lodgingsprogramDb = await DashBoard.get("/lodgings/get_lodging_program.php"+ generatePHPParameters({idLodging: lodgingsRslt.id, lang}))
    lodgingsRslt.program = lodgingsprogramDb.data

    const lodgingscommentsDb = await DashBoard.get("/lodgings/get_lodging_comments.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.comments = lodgingscommentsDb.data
   
    const lodgingsvideosDb = await DashBoard.get("/lodgings/get_lodging_videos.php"+ generatePHPParameters({idLodging: lodgingsRslt.id}))
    lodgingsRslt.videos = lodgingsvideosDb.data


  
    dispatch({
      type: SELECT_LODGING,
      payload: lodgingsRslt
    });

    
  }


  export const addLodgingProgram = program => async dispatch => {

       
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id_lodging", program.id_lodging);
    uploadInfo.append("content", program.content);
    uploadInfo.append("position", program.position);
   

    


    const lodgingsDb = await DashBoard.post("/lodgings/add_lodging_program.php", uploadInfo,  {headers})
  
    
  }


  export const deleteLodgingProgram = id => async dispatch => {

       
    var headers = {
      "Content-Type": "multipart/form-data"
    }

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", id);
    // uploadInfo.append("content", program.content);
    // uploadInfo.append("id_lodging", program.id_lodging);
   

    


    const lodgingsDb = await DashBoard.post("/lodgings/delete_lodging_program.php", uploadInfo,  {headers})
  
    
  }

  export const updateLodgingComment = comment => async dispatch => {

       
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", comment.id);
    uploadInfo.append("comment", comment.comment);
    const lang = getLanguage();
    uploadInfo.append("lang", lang);
    


    const commentDb = await DashBoard.post("/lodgings/update_lodging_comment.php", uploadInfo,  {headers})
    var commentRslt = commentDb.data
    dispatch({
     type: CHANGE_LODGING_COMMENT,
     payload: commentRslt//fromDB
   });
    
  }


  export const addLodgingComment = comment => async dispatch => {

       
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id_lodging", comment.id_service);
    uploadInfo.append("comment", comment.comment);
    uploadInfo.append("id_user", comment.id_user);
    uploadInfo.append("user_first_name", comment.user_first_name);
    uploadInfo.append("user_last_name", comment.user_last_name);
    uploadInfo.append("user_picture", comment.user_picture);
    uploadInfo.append("user_type", comment.user_type);
   

    
   

    const commentDb = await DashBoard.post("/lodgings/add_lodging_comment.php", uploadInfo,  {headers})
    var commentRslt = commentDb.data
     dispatch({
      type: ADD_LODGING_COMMENT,
      payload: commentRslt//fromDB
    });
  }


  export const deleteLodgingComment = id => async dispatch => {

       
    var headers = {
      "Content-Type": "multipart/form-data"
    }

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", id);
    // uploadInfo.append("content", comment.content);
    // uploadInfo.append("id_lodging", comment.id_lodging);
   

    


    await DashBoard.post("/lodgings/delete_lodging_comment.php", uploadInfo,  {headers})
  
    dispatch({
      type: DELETE_LODGING_COMMENT,
      payload: id//fromDB
    });
  }

  export const changeLodgingComment = info => async dispatch => {

    dispatch({
      type: CHANGE_LODGING_COMMENT,
      payload: info
    });
  }


  
  export const rateLodging = info => async dispatch => {

    var headers = {
      "Content-Type": "multipart/form-data"
    };

      
    let uploadInfo = generateAppendParameters(info);



   
    await DashBoard.post("/lodgings/lodging_rate.php", uploadInfo,  {headers})


    const lang = getLanguage();
    const lodgingsDb = await DashBoard.post("/lodgings/get_lodging.php"+ generatePHPParameters({id: info.id_lodging, lang}))
  
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


    

     dispatch({
      type: SELECT_LODGING,
      payload: lodgingsRslt//fromDB
    });

  };