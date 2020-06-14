import { FETCH_PROJECTS, SELECT_PROJECT , DELETE_PROJECT, UPDATE_PROJECT,
   ADD_PROJECT, ADD_PROJECT_COMMENT, DELETE_PROJECT_COMMENT, CHANGE_PROJECT_COMMENT, SET_USER_SERVICE_RATE} from "./types";

import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage, generateAppendParameters} from "../apis/tools";


export const fetchProjects = () => async dispatch => {
 const projectsDb = await DashBoard.get("/projects/get_projects.php")
  var projectsRslt = projectsDb.data.slice()
    dispatch({
      type: FETCH_PROJECTS,
      payload: projectsRslt
    });
  };

  export const sortProjects = category => async dispatch => {

    const lang = getLanguage();

   
    let results = undefined;
    
    let completeUrl = category === "all"?  generatePHPParameters({lang}) : generatePHPParameters({category, lang});
    // if(category === "all")
    // projectsDb = await DashBoard.get("/projects/get_projects.php"+ generatePHPParameters({lang}))
    //  else
     await DashBoard.get("/projects/get_projects.php"+ completeUrl).then( async projectsDb => {

      var projectsRslt = projectsDb.data.slice()
      
     const promises = projectsRslt.map( async project => {   
         
       const projectImagesDb = await DashBoard.get("/projects/get_project_images.php"+ generatePHPParameters({idProject: project.id}))
       project.images = projectImagesDb.data

       const projectsRateDb = await DashBoard.get("/projects/get_project_rate.php"+ generatePHPParameters({idProject: project.id}))
       project.rate = projectsRateDb.data

       return project
       
     })

      results = await Promise.all(promises)

     })

     

     dispatch({
      type: FETCH_PROJECTS,
      payload: results//fromDB
    });


  };

  export const sortProjectsByCategoryUser = info => async dispatch => {

    const lang = getLanguage();

   
    let results = undefined;
    
    let completeUrl = generatePHPParameters({...info, lang});
    // if(category === "all")
    // projectsDb = await DashBoard.get("/projects/get_projects.php"+ generatePHPParameters({lang}))
    //  else
     await DashBoard.get("/projects/get_projects_category_user.php"+ completeUrl).then( async projectsDb => {

      var projectsRslt = projectsDb.data.slice()
      
     const promises = projectsRslt.map( async project => {   
         
       const projectImagesDb = await DashBoard.get("/projects/get_project_images.php"+ generatePHPParameters({idProject: project.id}))
       project.images = projectImagesDb.data

       const projectsRateDb = await DashBoard.get("/projects/get_project_rate.php"+ generatePHPParameters({idProject: project.id}))
       project.rate = projectsRateDb.data

       return project
       
     })

      results = await Promise.all(promises)

     })

     

     dispatch({
      type: FETCH_PROJECTS,
      payload: results//fromDB
    });


  };



  export const sortProjectsUser = user => async dispatch => {

    const lang = getLanguage();

    var projectsDb = undefined
    
   
     projectsDb = await DashBoard.post("/projects/get_projects_user.php"+ generatePHPParameters({user, lang}))

     var projectsRslt = projectsDb.data.slice()
      
     const promises = projectsRslt.map( async project => {   
         
       const projectImagesDb = await DashBoard.get("/projects/get_project_images.php"+ generatePHPParameters({idProject: project.id}))
       project.images = projectImagesDb.data

       const projectscommentsDb = await DashBoard.get("/projects/get_project_comments.php"+ generatePHPParameters({idProject: project.id}))
       project.comments = projectscommentsDb.data
      
       const projectsvideosDb = await DashBoard.get("/projects/get_project_videos.php"+ generatePHPParameters({idProject: project.id}))
       project.videos = projectsvideosDb.data


       return project
       
     })

     const results = await Promise.all(promises)

     dispatch({
      type: FETCH_PROJECTS,
      payload: results//fromDB
    });


  };

  export const addProject = project => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    
    uploadInfo.append("id_category", project.id_category);
    uploadInfo.append("id_user", project.id_user);
    uploadInfo.append("name", project.name || "");
    uploadInfo.append("general_description", project.general_description || "");
    uploadInfo.append("full_description", project.full_description || "");
    uploadInfo.append("price", project.price || "");
    uploadInfo.append("price_specifics", project.price_specifics || "");
    uploadInfo.append("lumion_version", project.lumion_version || "");
    uploadInfo.append("currency", project.currency || "");
    uploadInfo.append("note", project.note || "");

    

    const projectsDb = await DashBoard.post("/projects/add_project.php", uploadInfo,  {headers})
  
    var projectsRslt = projectsDb.data
   
        
    const projectsImagesDb = await DashBoard.get("/projects/get_project_images.php"+ generatePHPParameters({idProject: projectsRslt.id}))
    projectsRslt.images = projectsImagesDb.data

    const projectscommentsDb = await DashBoard.get("/projects/get_project_comments.php"+ generatePHPParameters({idProject: projectsRslt.id}))
    projectsRslt.comments = projectscommentsDb.data
   
    const projectsvideosDb = await DashBoard.get("/projects/get_project_videos.php"+ generatePHPParameters({idProject: projectsRslt.id}))
    projectsRslt.videos = projectsvideosDb.data


 
 
  
    dispatch({
      type: ADD_PROJECT,
      payload: projectsRslt
    });

     return projectsRslt
  };

  export const updateProject = project => async dispatch => {
      
    const lang = getLanguage();

    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", project.id);
    uploadInfo.append("name", project.name);
    uploadInfo.append("general_description", project.general_description);
    uploadInfo.append("full_description", project.full_description);
    uploadInfo.append("price", project.price);
    uploadInfo.append("price_specifics", project.price_specifics);
    uploadInfo.append("lumion_version", project.lumion_version);
    uploadInfo.append("currency", project.currency);
    uploadInfo.append("note", project.note);    
    uploadInfo.append("lang", lang);


    let statusInfo = new FormData();
    statusInfo.append("id", project.id);
    statusInfo.append("lang", lang);
    if(project.published){
     
      statusInfo.append("status", "1");
      await DashBoard.post("/projects/update_project_status.php", statusInfo,  {headers})

    }
    else{
      statusInfo.append("status", "0");
      await DashBoard.post("/projects/update_project_status.php", statusInfo,  {headers})

    }
    

    


    const projectsDb = await DashBoard.post("/projects/update_project.php", uploadInfo,  {headers})
  
    var projectRslt = projectsDb.data
      
    const projectsImagesDb = await DashBoard.get("/projects/get_project_images.php"+ generatePHPParameters({idProject: projectRslt.id}))
    projectRslt.images = projectsImagesDb.data

    const projectscommentsDb = await DashBoard.get("/projects/get_project_comments.php"+ generatePHPParameters({idProject: projectRslt.id}))
    projectRslt.comments = projectscommentsDb.data
   
    const projectsvideosDb = await DashBoard.get("/projects/get_project_videos.php"+ generatePHPParameters({idProject: projectRslt.id}))
    projectRslt.videos = projectsvideosDb.data

     

     dispatch({
      type: UPDATE_PROJECT,
      payload: projectRslt//fromDB
    });

  };

  export const selectProject = id => async dispatch => {
  
    const lang = getLanguage();

    const projectsDb = await DashBoard.post("/projects/get_project.php"+ generatePHPParameters({id, lang}))
  
    var projectsRslt = projectsDb.data
   
        
    const projectsImagesDb = await DashBoard.get("/projects/get_project_images.php"+ generatePHPParameters({idProject: projectsRslt.id}))
    projectsRslt.images = projectsImagesDb.data

    const projectscommentsDb = await DashBoard.get("/projects/get_project_comments.php"+ generatePHPParameters({idProject: projectsRslt.id}))
    projectsRslt.comments = projectscommentsDb.data
   
    const projectsvideosDb = await DashBoard.get("/projects/get_project_videos.php"+ generatePHPParameters({idProject: projectsRslt.id}))
    projectsRslt.videos = projectsvideosDb.data

    const projectsRateDb = await DashBoard.get("/projects/get_project_rate.php"+ generatePHPParameters({idProject: projectsRslt.id}))
    projectsRslt.rate = projectsRateDb.data

 
    const projectOwnerInfo = await DashBoard.get("/projects/get_project_owner_info.php"+ generatePHPParameters({user: projectsRslt.id_user}))
    projectsRslt = {...projectsRslt, ownerInfo: {...projectOwnerInfo.data} };

    const projectTags = await DashBoard.get("/tags/get_project_tags.php"+ generatePHPParameters({id, lang}))
    projectsRslt = {...projectsRslt, tags: projectTags.data };

    const projectTagsReleted = await DashBoard.get("/tags/get_project_tags_related_projects.php"+ generatePHPParameters({id}))
    projectsRslt = {...projectsRslt, relatedProjects: projectTagsReleted.data };
  
    dispatch({
      type: SELECT_PROJECT,
      payload: projectsRslt
    });

   return projectsRslt;
  };


  

  export const deleteProject = id => async dispatch => {

    const categoriesDb = await DashBoard.post("/projects/delete_project.php"+ generatePHPParameters({id}))

    
      dispatch({
          type: DELETE_PROJECT,
          payload: id
        });
  }

  export const uploadProjectImage = info => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("projectId", info.projectId);
    uploadInfo.append("fileName", info.fileName);
    uploadInfo.append("projectName", info.projectName);

    if(info.file !== null){

      uploadInfo.append("file", info.file);

      const projectAPI = await DashBoard.post("/projects/upload_project_image.php", uploadInfo,  {headers, onUploadProgress: info.onProgress});

      // getCategory(info.idCategory)
    }



    
  };

  
  export const uploadProjectFile = info => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("projectId", info.projectId);
    uploadInfo.append("fileName", info.fileName);
    uploadInfo.append("projectName", info.projectName);

    if(info.file !== null){

      uploadInfo.append("file", info.file);

      const projectAPI = await DashBoard.post("/projects/upload_project_file.php", uploadInfo,  {headers, onUploadProgress: info.onProgress});

      // getCategory(info.idCategory)
    }



    
  };

  export const deleteProjectImage = id => async dispatch => {

    const categoriesDb = await DashBoard.post("/projects/delete_project_image.php"+ generatePHPParameters({id}))

  }


  export const uploadProjectVideo = info => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("projectId", info.projectId);
    uploadInfo.append("fileName", info.fileName);
    uploadInfo.append("projectName", info.projectName);

    if(info.file !== null){

      uploadInfo.append("file", info.file);

      const projectAPI = await DashBoard.post("/projects/upload_project_video.php", uploadInfo,  {headers, onUploadProgress: info.onProgress});

      // getCategory(info.idCategory)
    }



    
  };

  export const deleteProjectVideo = id => async dispatch => {

    const categoriesDb = await DashBoard.post("/projects/delete_project_video.php"+ generatePHPParameters({id}))

  }

  
  export const updateProjectComment = comment => async dispatch => {

       
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", comment.id);
    uploadInfo.append("comment", comment.comment);
    const lang = getLanguage();
    uploadInfo.append("lang", lang);
    


    const commentDb = await DashBoard.post("/projects/update_project_comment.php", uploadInfo,  {headers})
    var commentRslt = commentDb.data
    dispatch({
     type: CHANGE_PROJECT_COMMENT,
     payload: commentRslt//fromDB
   });
    
  }


  export const addProjectComment = comment => async dispatch => {
    var headers = {
      "Content-Type": "multipart/form-data"
    };

  
    let uploadInfo = new FormData();
    uploadInfo.append("id_project", comment.id_service);
    uploadInfo.append("comment", comment.comment);
    uploadInfo.append("id_user", comment.id_user);
    uploadInfo.append("user_first_name", comment.user_first_name);
    uploadInfo.append("user_last_name", comment.user_last_name);
    uploadInfo.append("user_picture", comment.user_picture);
    uploadInfo.append("user_type", comment.user_type);
   

    
   

    const commentDb = await DashBoard.post("/projects/add_project_comment.php", uploadInfo,  {headers})
    var commentRslt = commentDb.data.slice();
     dispatch({
      type: ADD_PROJECT_COMMENT,
      payload: commentRslt//fromDB
    });
  }


  export const deleteProjectComment = id => async dispatch => {

       
    var headers = {
      "Content-Type": "multipart/form-data"
    }

  
    let uploadInfo = new FormData();
    uploadInfo.append("id", id);
    // uploadInfo.append("content", comment.content);
    // uploadInfo.append("id_project", comment.id_project);
   

    


    await DashBoard.post("/projects/delete_project_comment.php", uploadInfo,  {headers})
  
    dispatch({
      type: DELETE_PROJECT_COMMENT,
      payload: id//fromDB
    });
  }

  export const changeProjectComment = info => async dispatch => {

    dispatch({
      type: CHANGE_PROJECT_COMMENT,
      payload: info
    });
  };

  
  export const rateProject = info => async dispatch => {

    var headers = {
      "Content-Type": "multipart/form-data"
    };

      
    let uploadInfo = generateAppendParameters(info);



   
    await DashBoard.post("/projects/project_rate.php", uploadInfo,  {headers})


    const lang = getLanguage();
    const projectsDb = await DashBoard.post("/projects/get_project.php"+ generatePHPParameters({id: info.id_project, lang}))
  
       var projectsRslt = projectsDb.data
      
           
       const projectsImagesDb = await DashBoard.get("/projects/get_project_images.php"+ generatePHPParameters({idProject: projectsRslt.id}))
       projectsRslt.images = projectsImagesDb.data

       const projectscommentsDb = await DashBoard.get("/projects/get_project_comments.php"+ generatePHPParameters({idProject: projectsRslt.id}))
       projectsRslt.comments = projectscommentsDb.data
      
       const projectsvideosDb = await DashBoard.get("/projects/get_project_videos.php"+ generatePHPParameters({idProject: projectsRslt.id}))
       projectsRslt.videos = projectsvideosDb.data

       const projectsRateDb = await DashBoard.get("/projects/get_project_rate.php"+ generatePHPParameters({idProject: projectsRslt.id}))
       projectsRslt.rate = projectsRateDb.data


    const projectOwnerInfo = await DashBoard.get("/projects/get_project_owner_info.php"+ generatePHPParameters({user: projectsRslt.id_user}))
    projectsRslt = {...projectsRslt, ownerInfo: {...projectOwnerInfo.data} };

    const projectTags = await DashBoard.get("/tags/get_project_tags.php"+ generatePHPParameters({id: projectsRslt.id, lang}))
    projectsRslt = {...projectsRslt, tags: projectTags.data };

    const projectTagsReleted = await DashBoard.get("/tags/get_project_tags_related_projects.php"+ generatePHPParameters({id: projectsRslt.id}))
    projectsRslt = {...projectsRslt, relatedProjects: projectTagsReleted.data };
    

     dispatch({
      type: SELECT_PROJECT,
      payload: projectsRslt//fromDB
    });

  };

  