import { FETCH_TEXTURES, SELECT_TEXTURE , DELETE_TEXTURE, UPDATE_TEXTURE, ADD_TEXTURE, ADD_TEXTURE_COMMENT, DELETE_TEXTURE_COMMENT, CHANGE_TEXTURE_COMMENT, SET_USER_SERVICE_RATE} from "./types";

import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage, generateAppendParameters} from "../apis/tools";


export const fetchTextures = () => async dispatch => {
 const texturesDb = await DashBoard.get("/textures/get_textures.php")
  var texturesRslt = texturesDb.data.slice()
    dispatch({
      type: FETCH_TEXTURES,
      payload: texturesRslt
    });
  };

  export const sortTextures = category => async dispatch => {

    const lang = getLanguage();

   
    let results = undefined;
    
    let completeUrl = category === "all"?  generatePHPParameters({lang}) : generatePHPParameters({category, lang});
    // if(category === "all")
    // texturesDb = await DashBoard.get("/textures/get_textures.php"+ generatePHPParameters({lang}))
    //  else
     await DashBoard.get("/textures/get_textures.php"+ completeUrl).then( async texturesDb => {

      var texturesRslt = texturesDb.data.slice()
      
     const promises = texturesRslt.map( async texture => {   
         
       const textureImagesDb = await DashBoard.get("/textures/get_texture_images.php"+ generatePHPParameters({idTexture: texture.id}))
       texture.images = textureImagesDb.data

       const texturesRateDb = await DashBoard.get("/textures/get_texture_rate.php"+ generatePHPParameters({idTexture: texture.id}))
       texture.rate = texturesRateDb.data

       return texture
       
     })

      results = await Promise.all(promises)

     })

     

     dispatch({
      type: FETCH_TEXTURES,
      payload: results//fromDB
    });


  };

  export const sortTexturesByCategoryUser = info => async dispatch => {

    const lang = getLanguage();

   
    let results = undefined;
    
    let completeUrl = generatePHPParameters({...info, lang});
    // if(category === "all")
    // texturesDb = await DashBoard.get("/textures/get_textures.php"+ generatePHPParameters({lang}))
    //  else
     await DashBoard.get("/textures/get_textures_category_user.php"+ completeUrl).then( async texturesDb => {

      var texturesRslt = texturesDb.data.slice()
      
     const promises = texturesRslt.map( async texture => {   
         
       const textureImagesDb = await DashBoard.get("/textures/get_texture_images.php"+ generatePHPParameters({idTexture: texture.id}))
       texture.images = textureImagesDb.data

       const texturesRateDb = await DashBoard.get("/textures/get_texture_rate.php"+ generatePHPParameters({idTexture: texture.id}))
       texture.rate = texturesRateDb.data

       return texture
       
     })

      results = await Promise.all(promises)

     })

     

     dispatch({
      type: FETCH_TEXTURES,
      payload: results//fromDB
    });


  };



  export const sortTexturesUser = user => async dispatch => {

    const lang = getLanguage();

    var texturesDb = undefined
    
   
     texturesDb = await DashBoard.post("/textures/get_textures_user.php"+ generatePHPParameters({user, lang}))

     var texturesRslt = texturesDb.data.slice()
      
     const promises = texturesRslt.map( async texture => {   
         
       const textureImagesDb = await DashBoard.get("/textures/get_texture_images.php"+ generatePHPParameters({idTexture: texture.id}))
       texture.images = textureImagesDb.data

       const texturescommentsDb = await DashBoard.get("/textures/get_texture_comments.php"+ generatePHPParameters({idTexture: texture.id}))
       texture.comments = texturescommentsDb.data
      
       const texturesvideosDb = await DashBoard.get("/textures/get_texture_videos.php"+ generatePHPParameters({idTexture: texture.id}))
       texture.videos = texturesvideosDb.data


       return texture
       
     })

     const results = await Promise.all(promises)

     dispatch({
      type: FETCH_TEXTURES,
      payload: results//fromDB
    });


  };

  export const addTexture = texture => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    
    uploadInfo.append("id_category", texture.id_category);
    uploadInfo.append("id_user", texture.id_user);
    uploadInfo.append("name", texture.name || "");
    uploadInfo.append("general_description", texture.general_description || "");
    uploadInfo.append("full_description", texture.full_description || "");
    uploadInfo.append("price", texture.price || "");
    uploadInfo.append("price_specifics", texture.price_specifics || "");
    uploadInfo.append("lumion_version", texture.lumion_version || "");
    uploadInfo.append("currency", texture.currency || "");
    uploadInfo.append("note", texture.note || "");

    

    const texturesDb = await DashBoard.post("/textures/add_texture.php", uploadInfo,  {headers})
  
    var texturesRslt = texturesDb.data
   
        
    const texturesImagesDb = await DashBoard.get("/textures/get_texture_images.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
    texturesRslt.images = texturesImagesDb.data

    const texturescommentsDb = await DashBoard.get("/textures/get_texture_comments.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
    texturesRslt.comments = texturescommentsDb.data
   
    const texturesvideosDb = await DashBoard.get("/textures/get_texture_videos.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
    texturesRslt.videos = texturesvideosDb.data


 
 
  
    dispatch({
      type: ADD_TEXTURE,
      payload: texturesRslt
    });

     return texturesRslt
  };

  export const updateTexture = texture => async dispatch => {
      
    const lang = getLanguage();

    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", texture.id);
    uploadInfo.append("name", texture.name);
    uploadInfo.append("general_description", texture.general_description);
    uploadInfo.append("full_description", texture.full_description);
    uploadInfo.append("price", texture.price);
    uploadInfo.append("price_specifics", texture.price_specifics);
    uploadInfo.append("lumion_version", texture.lumion_version);
    uploadInfo.append("currency", texture.currency);
    uploadInfo.append("note", texture.note);    
    uploadInfo.append("lang", lang);


    let statusInfo = new FormData();
    statusInfo.append("id", texture.id);
    statusInfo.append("lang", lang);
    if(texture.status){
     
      statusInfo.append("status", "1");
      await DashBoard.post("/textures/update_texture_status.php", statusInfo,  {headers})

    }
    else{
      statusInfo.append("status", "0");
      await DashBoard.post("/textures/update_texture_status.php", statusInfo,  {headers})

    }
    

    


    const texturesDb = await DashBoard.post("/textures/update_texture.php", uploadInfo,  {headers})
  
    var textureRslt = texturesDb.data
      
    const texturesImagesDb = await DashBoard.get("/textures/get_texture_images.php"+ generatePHPParameters({idTexture: textureRslt.id}))
    textureRslt.images = texturesImagesDb.data

    const texturescommentsDb = await DashBoard.get("/textures/get_texture_comments.php"+ generatePHPParameters({idTexture: textureRslt.id}))
    textureRslt.comments = texturescommentsDb.data
   
    const texturesvideosDb = await DashBoard.get("/textures/get_texture_videos.php"+ generatePHPParameters({idTexture: textureRslt.id}))
    textureRslt.videos = texturesvideosDb.data

     

     dispatch({
      type: UPDATE_TEXTURE,
      payload: textureRslt//fromDB
    });

  };

  export const selectTexture = id => async dispatch => {
  
    const lang = getLanguage();

    const texturesDb = await DashBoard.post("/textures/get_texture.php"+ generatePHPParameters({id, lang}))
  
    var texturesRslt = texturesDb.data
   
        
    const texturesImagesDb = await DashBoard.get("/textures/get_texture_images.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
    texturesRslt.images = texturesImagesDb.data

    const texturescommentsDb = await DashBoard.get("/textures/get_texture_comments.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
    texturesRslt.comments = texturescommentsDb.data
   
    const texturesvideosDb = await DashBoard.get("/textures/get_texture_videos.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
    texturesRslt.videos = texturesvideosDb.data

    const texturesRateDb = await DashBoard.get("/textures/get_texture_rate.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
    texturesRslt.rate = texturesRateDb.data

 
    const textureOwnerInfo = await DashBoard.get("/textures/get_texture_owner_info.php"+ generatePHPParameters({user: texturesRslt.id_user}))
    texturesRslt = {...texturesRslt, ownerInfo: {...textureOwnerInfo.data} };

    const textureTags = await DashBoard.get("/tags/get_texture_tags.php"+ generatePHPParameters({id, lang}))
    texturesRslt = {...texturesRslt, tags: textureTags.data };

    const textureTagsReleted = await DashBoard.get("/tags/get_texture_tags_related_textures.php"+ generatePHPParameters({id}))
    texturesRslt = {...texturesRslt, relatedTextures: textureTagsReleted.data };
  
    dispatch({
      type: SELECT_TEXTURE,
      payload: texturesRslt
    });

   return texturesRslt;
  };


  

  export const deleteTexture = id => async dispatch => {

    const categoriesDb = await DashBoard.post("/textures/delete_texture.php"+ generatePHPParameters({id}))

    
      dispatch({
          type: DELETE_TEXTURE,
          payload: id
        });
  }

  export const uploadTextureImage = info => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("textureId", info.textureId);
    uploadInfo.append("fileName", info.fileName);
    uploadInfo.append("textureName", info.textureName);

    if(info.file !== null){

      uploadInfo.append("file", info.file);

      const textureAPI = await DashBoard.post("/textures/upload_texture_image.php", uploadInfo,  {headers, onUploadProgress: info.onProgress});

      // getCategory(info.idCategory)
    }



    
  };

  
  export const uploadTextureFile = info => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("textureId", info.textureId);
    uploadInfo.append("fileName", info.fileName);
    uploadInfo.append("textureName", info.textureName);

    if(info.file !== null){

      uploadInfo.append("file", info.file);

      const textureAPI = await DashBoard.post("/textures/upload_texture_file.php", uploadInfo,  {headers, onUploadProgress: info.onProgress});

      // getCategory(info.idCategory)
    }



    
  };

  export const deleteTextureImage = id => async dispatch => {

    const categoriesDb = await DashBoard.post("/textures/delete_texture_image.php"+ generatePHPParameters({id}))

  }


  export const uploadTextureVideo = info => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("textureId", info.textureId);
    uploadInfo.append("fileName", info.fileName);
    uploadInfo.append("textureName", info.textureName);

    if(info.file !== null){

      uploadInfo.append("file", info.file);

      const textureAPI = await DashBoard.post("/textures/upload_texture_video.php", uploadInfo,  {headers, onUploadProgress: info.onProgress});

      // getCategory(info.idCategory)
    }



    
  };

  export const deleteTextureVideo = id => async dispatch => {

    const categoriesDb = await DashBoard.post("/textures/delete_texture_video.php"+ generatePHPParameters({id}))

  }

  
  export const updateTextureComment = comment => async dispatch => {

       
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", comment.id);
    uploadInfo.append("comment", comment.comment);
    const lang = getLanguage();
    uploadInfo.append("lang", lang);
    


    const commentDb = await DashBoard.post("/textures/update_texture_comment.php", uploadInfo,  {headers})
    var commentRslt = commentDb.data
    dispatch({
     type: CHANGE_TEXTURE_COMMENT,
     payload: commentRslt//fromDB
   });
    
  }


  export const addTextureComment = comment => async dispatch => {
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id_texture", comment.id_service);
    uploadInfo.append("comment", comment.comment);
    uploadInfo.append("id_user", comment.id_user);
    uploadInfo.append("user_first_name", comment.user_first_name);
    uploadInfo.append("user_last_name", comment.user_last_name);
    uploadInfo.append("user_picture", comment.user_picture);
    uploadInfo.append("user_type", comment.user_type);
   

    
   

    const commentDb = await DashBoard.post("/textures/add_texture_comment.php", uploadInfo,  {headers})
    var commentRslt = commentDb.data.slice();
     dispatch({
      type: ADD_TEXTURE_COMMENT,
      payload: commentRslt//fromDB
    });
  }


  export const deleteTextureComment = id => async dispatch => {

       
    var headers = {
      "Content-Type": "multipart/form-data"
    }

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", id);
    // uploadInfo.append("content", comment.content);
    // uploadInfo.append("id_texture", comment.id_texture);
   

    


    await DashBoard.post("/textures/delete_texture_comment.php", uploadInfo,  {headers})
  
    dispatch({
      type: DELETE_TEXTURE_COMMENT,
      payload: id//fromDB
    });
  }

  export const changeTextureComment = info => async dispatch => {

    dispatch({
      type: CHANGE_TEXTURE_COMMENT,
      payload: info
    });
  };

  
  export const rateTexture = info => async dispatch => {

    var headers = {
      "Content-Type": "multipart/form-data"
    };

      
    let uploadInfo = generateAppendParameters(info);



   
    await DashBoard.post("/textures/texture_rate.php", uploadInfo,  {headers})


    const lang = getLanguage();
    const texturesDb = await DashBoard.post("/textures/get_texture.php"+ generatePHPParameters({id: info.id_texture, lang}))
  
       var texturesRslt = texturesDb.data
      
           
       const texturesImagesDb = await DashBoard.get("/textures/get_texture_images.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
       texturesRslt.images = texturesImagesDb.data

       const texturescommentsDb = await DashBoard.get("/textures/get_texture_comments.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
       texturesRslt.comments = texturescommentsDb.data
      
       const texturesvideosDb = await DashBoard.get("/textures/get_texture_videos.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
       texturesRslt.videos = texturesvideosDb.data

       const texturesRateDb = await DashBoard.get("/textures/get_texture_rate.php"+ generatePHPParameters({idTexture: texturesRslt.id}))
       texturesRslt.rate = texturesRateDb.data


    const textureOwnerInfo = await DashBoard.get("/textures/get_texture_owner_info.php"+ generatePHPParameters({user: texturesRslt.id_user}))
    texturesRslt = {...texturesRslt, ownerInfo: {...textureOwnerInfo.data} };

    const textureTags = await DashBoard.get("/tags/get_texture_tags.php"+ generatePHPParameters({id: texturesRslt.id, lang}))
    texturesRslt = {...texturesRslt, tags: textureTags.data };

    const textureTagsReleted = await DashBoard.get("/tags/get_texture_tags_related_textures.php"+ generatePHPParameters({id: texturesRslt.id}))
    texturesRslt = {...texturesRslt, relatedTextures: textureTagsReleted.data };
    

     dispatch({
      type: SELECT_TEXTURE,
      payload: texturesRslt//fromDB
    });

  };

  