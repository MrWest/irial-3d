import {
  FETCH_SCENES,
  SELECT_SCENE,
  DELETE_SCENE,
  UPDATE_SCENE,
  ADD_SCENE,
  ADD_SCENE_COMMENT,
  DELETE_SCENE_COMMENT,
  CHANGE_SCENE_COMMENT,
  SET_USER_SERVICE_RATE,
} from "./types";

import DashBoard from "../apis/DashBoard";
import {
  generatePHPParameters,
  getLanguage,
  generateAppendParameters,
} from "../apis/tools";

export const fetchScenes = () => async (dispatch) => {
  const scenesDb = await DashBoard.get("/scenes/get_scenes.php");
  var scenesRslt = scenesDb.data.slice();
  dispatch({
    type: FETCH_SCENES,
    payload: scenesRslt,
  });
};

export const sortScenes = (
  category = "all",
  sort = "all",
  offset = 0
) => async (dispatch) => {
  const lang = getLanguage();

  let results = undefined;

  let completeUrl = generatePHPParameters({ category, sort, offset, lang });
  // if(category === "all")
  // scenesDb = await DashBoard.get("/scenes/get_scenes.php"+ generatePHPParameters({lang}))
  //  else
  await DashBoard.get("/scenes/get_scenes.php" + completeUrl).then(
    async (scenesDb) => {
      var scenesRslt = scenesDb.data.slice();

      const promises = scenesRslt.map(async (scene) => {
        const sceneImagesDb = await DashBoard.get(
          "/scenes/get_scene_images.php" +
            generatePHPParameters({ idScene: scene.id })
        );
        scene.images = sceneImagesDb.data;

        const scenesRateDb = await DashBoard.get(
          "/scenes/get_scene_rate.php" +
            generatePHPParameters({ idScene: scene.id })
        );
        scene.rate = scenesRateDb.data;

        const sceneOwnerInfo = await DashBoard.get(
          "/scenes/get_scene_owner_info.php" +
            generatePHPParameters({ user: scene.id_user })
        );
        scene = { ...scene, ownerInfo: { ...sceneOwnerInfo.data } };

        return scene;
      });

      results = await Promise.all(promises);
    }
  );

  dispatch({
    type: FETCH_SCENES,
    payload: results, //fromDB
  });

  const queryAPI = await DashBoard.post(
    "/scenes/get_scenes_count.php" + generatePHPParameters({ lang })
  );
  return parseInt(queryAPI.data.count);
};

export const sortScenesByCategoryUser = (info) => async (dispatch) => {
  const lang = getLanguage();

  let results = undefined;

  let completeUrl = generatePHPParameters({ ...info, lang });
  // if(category === "all")
  // scenesDb = await DashBoard.get("/scenes/get_scenes.php"+ generatePHPParameters({lang}))
  //  else
  await DashBoard.get(
    "/scenes/get_scenes_category_user.php" + completeUrl
  ).then(async (scenesDb) => {
    var scenesRslt = scenesDb.data.slice();

    const promises = scenesRslt.map(async (scene) => {
      const sceneImagesDb = await DashBoard.get(
        "/scenes/get_scene_images.php" +
          generatePHPParameters({ idScene: scene.id })
      );
      scene.images = sceneImagesDb.data;

      const scenesRateDb = await DashBoard.get(
        "/scenes/get_scene_rate.php" +
          generatePHPParameters({ idScene: scene.id })
      );
      scene.rate = scenesRateDb.data;

      return scene;
    });

    results = await Promise.all(promises);
  });

  dispatch({
    type: FETCH_SCENES,
    payload: results, //fromDB
  });
};

export const sortScenesUser = (user) => async (dispatch) => {
  const lang = getLanguage();

  var scenesDb = undefined;

  scenesDb = await DashBoard.post(
    "/scenes/get_scenes_user.php" + generatePHPParameters({ user, lang })
  );

  var scenesRslt = scenesDb.data.slice();

  const promises = scenesRslt.map(async (scene) => {
    const sceneImagesDb = await DashBoard.get(
      "/scenes/get_scene_images.php" +
        generatePHPParameters({ idScene: scene.id })
    );
    scene.images = sceneImagesDb.data;

    const scenescommentsDb = await DashBoard.get(
      "/scenes/get_scene_comments.php" +
        generatePHPParameters({ idScene: scene.id })
    );
    scene.comments = scenescommentsDb.data;

    const scenesvideosDb = await DashBoard.get(
      "/scenes/get_scene_videos.php" +
        generatePHPParameters({ idScene: scene.id })
    );
    scene.videos = scenesvideosDb.data;

    return scene;
  });

  const results = await Promise.all(promises);

  dispatch({
    type: FETCH_SCENES,
    payload: results, //fromDB
  });
};

export const addScene = (scene) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();

  uploadInfo.append("id_category", scene.id_category);
  uploadInfo.append("id_user", scene.id_user);
  uploadInfo.append("name", scene.name || "");
  uploadInfo.append("general_description", scene.general_description || "");
  uploadInfo.append("full_description", scene.full_description || "");
  uploadInfo.append("price", scene.price || "");
  uploadInfo.append("price_specifics", scene.price_specifics || "");
  uploadInfo.append("lumion_version", scene.lumion_version || "");
  uploadInfo.append("currency", scene.currency || "");
  uploadInfo.append("note", scene.note || "");

  const scenesDb = await DashBoard.post("/scenes/add_scene.php", uploadInfo, {
    headers,
  });

  var scenesRslt = scenesDb.data;

  const scenesImagesDb = await DashBoard.get(
    "/scenes/get_scene_images.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.images = scenesImagesDb.data;

  const scenescommentsDb = await DashBoard.get(
    "/scenes/get_scene_comments.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.comments = scenescommentsDb.data;

  const scenesvideosDb = await DashBoard.get(
    "/scenes/get_scene_videos.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.videos = scenesvideosDb.data;

  dispatch({
    type: ADD_SCENE,
    payload: scenesRslt,
  });

  return scenesRslt;
};

export const updateScene = (scene) => async (dispatch) => {
  const lang = getLanguage();

  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", scene.id);
  uploadInfo.append("name", scene.name);
  uploadInfo.append("general_description", scene.general_description);
  uploadInfo.append("full_description", scene.full_description);
  uploadInfo.append("price", scene.price);
  uploadInfo.append("price_specifics", scene.price_specifics);
  uploadInfo.append("lumion_version", scene.lumion_version);
  uploadInfo.append("currency", scene.currency);
  uploadInfo.append("note", scene.note);
  uploadInfo.append("lang", lang);

  let statusInfo = new FormData();
  statusInfo.append("id", scene.id);
  statusInfo.append("lang", lang);
  if (scene.status) {
    statusInfo.append("status", "1");
    await DashBoard.post("/scenes/update_scene_status.php", statusInfo, {
      headers,
    });
  } else {
    statusInfo.append("status", "0");
    await DashBoard.post("/scenes/update_scene_status.php", statusInfo, {
      headers,
    });
  }

  const scenesDb = await DashBoard.post(
    "/scenes/update_scene.php",
    uploadInfo,
    { headers }
  );

  var sceneRslt = scenesDb.data;

  const scenesImagesDb = await DashBoard.get(
    "/scenes/get_scene_images.php" +
      generatePHPParameters({ idScene: sceneRslt.id })
  );
  sceneRslt.images = scenesImagesDb.data;

  const scenescommentsDb = await DashBoard.get(
    "/scenes/get_scene_comments.php" +
      generatePHPParameters({ idScene: sceneRslt.id })
  );
  sceneRslt.comments = scenescommentsDb.data;

  const scenesvideosDb = await DashBoard.get(
    "/scenes/get_scene_videos.php" +
      generatePHPParameters({ idScene: sceneRslt.id })
  );
  sceneRslt.videos = scenesvideosDb.data;

  dispatch({
    type: UPDATE_SCENE,
    payload: sceneRslt, //fromDB
  });
};

export const selectScene = (id) => async (dispatch) => {
  const lang = getLanguage();

  const scenesDb = await DashBoard.post(
    "/scenes/get_scene.php" + generatePHPParameters({ id, lang })
  );

  var scenesRslt = scenesDb.data;

  const scenesImagesDb = await DashBoard.get(
    "/scenes/get_scene_images.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.images = scenesImagesDb.data;

  const scenescommentsDb = await DashBoard.get(
    "/scenes/get_scene_comments.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.comments = scenescommentsDb.data;

  const scenesvideosDb = await DashBoard.get(
    "/scenes/get_scene_videos.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.videos = scenesvideosDb.data;

  const scenesRateDb = await DashBoard.get(
    "/scenes/get_scene_rate.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.rate = scenesRateDb.data;

  const sceneOwnerInfo = await DashBoard.get(
    "/scenes/get_scene_owner_info.php" +
      generatePHPParameters({ user: scenesRslt.id_user })
  );
  scenesRslt = { ...scenesRslt, ownerInfo: { ...sceneOwnerInfo.data } };

  const sceneTags = await DashBoard.get(
    "/tags/get_scene_tags.php" + generatePHPParameters({ id, lang })
  );
  scenesRslt = { ...scenesRslt, tags: sceneTags.data };

  const sceneTagsReleted = await DashBoard.get(
    "/tags/get_scene_tags_related_scenes.php" + generatePHPParameters({ id })
  );
  scenesRslt = { ...scenesRslt, relatedScenes: sceneTagsReleted.data };

  dispatch({
    type: SELECT_SCENE,
    payload: scenesRslt,
  });

  return scenesRslt;
};

export const deleteScene = (id) => async (dispatch) => {
  const categoriesDb = await DashBoard.post(
    "/scenes/delete_scene.php" + generatePHPParameters({ id })
  );

  dispatch({
    type: DELETE_SCENE,
    payload: id,
  });
};

export const uploadSceneImage = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("sceneId", info.sceneId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("sceneName", info.sceneName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const sceneAPI = await DashBoard.post(
      "/scenes/upload_scene_image.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    // getCategory(info.idCategory)
  }
};

export const uploadSceneFile = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("sceneId", info.sceneId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("sceneName", info.sceneName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const sceneAPI = await DashBoard.post(
      "/scenes/upload_scene_file.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    // getCategory(info.idCategory)
  }
};

export const deleteSceneImage = (id) => async (dispatch) => {
  const categoriesDb = await DashBoard.post(
    "/scenes/delete_scene_image.php" + generatePHPParameters({ id })
  );
};

export const uploadSceneVideo = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("sceneId", info.sceneId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("sceneName", info.sceneName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const sceneAPI = await DashBoard.post(
      "/scenes/upload_scene_video.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    // getCategory(info.idCategory)
  }
};

export const deleteSceneVideo = (id) => async (dispatch) => {
  const categoriesDb = await DashBoard.post(
    "/scenes/delete_scene_video.php" + generatePHPParameters({ id })
  );
};

export const updateSceneComment = (comment) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", comment.id);
  uploadInfo.append("comment", comment.comment);
  const lang = getLanguage();
  uploadInfo.append("lang", lang);

  const commentDb = await DashBoard.post(
    "/scenes/update_scene_comment.php",
    uploadInfo,
    { headers }
  );
  var commentRslt = commentDb.data;
  dispatch({
    type: CHANGE_SCENE_COMMENT,
    payload: commentRslt, //fromDB
  });
};

export const addSceneComment = (comment) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id_scene", comment.id_service);
  uploadInfo.append("comment", comment.comment);
  uploadInfo.append("id_user", comment.id_user);
  uploadInfo.append("user_first_name", comment.user_first_name);
  uploadInfo.append("user_last_name", comment.user_last_name);
  uploadInfo.append("user_picture", comment.user_picture);
  uploadInfo.append("user_type", comment.user_type);

  const commentDb = await DashBoard.post(
    "/scenes/add_scene_comment.php",
    uploadInfo,
    { headers }
  );
  var commentRslt = commentDb.data.slice();
  dispatch({
    type: ADD_SCENE_COMMENT,
    payload: commentRslt, //fromDB
  });
};

export const deleteSceneComment = (id) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", id);
  // uploadInfo.append("content", comment.content);
  // uploadInfo.append("id_scene", comment.id_scene);

  await DashBoard.post("/scenes/delete_scene_comment.php", uploadInfo, {
    headers,
  });

  dispatch({
    type: DELETE_SCENE_COMMENT,
    payload: id, //fromDB
  });
};

export const changeSceneComment = (info) => async (dispatch) => {
  dispatch({
    type: CHANGE_SCENE_COMMENT,
    payload: info,
  });
};

export const rateScene = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = generateAppendParameters(info);

  await DashBoard.post("/scenes/scene_rate.php", uploadInfo, { headers });

  const lang = getLanguage();
  const scenesDb = await DashBoard.post(
    "/scenes/get_scene.php" + generatePHPParameters({ id: info.id_scene, lang })
  );

  var scenesRslt = scenesDb.data;

  const scenesImagesDb = await DashBoard.get(
    "/scenes/get_scene_images.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.images = scenesImagesDb.data;

  const scenescommentsDb = await DashBoard.get(
    "/scenes/get_scene_comments.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.comments = scenescommentsDb.data;

  const scenesvideosDb = await DashBoard.get(
    "/scenes/get_scene_videos.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.videos = scenesvideosDb.data;

  const scenesRateDb = await DashBoard.get(
    "/scenes/get_scene_rate.php" +
      generatePHPParameters({ idScene: scenesRslt.id })
  );
  scenesRslt.rate = scenesRateDb.data;

  const sceneOwnerInfo = await DashBoard.get(
    "/scenes/get_scene_owner_info.php" +
      generatePHPParameters({ user: scenesRslt.id_user })
  );
  scenesRslt = { ...scenesRslt, ownerInfo: { ...sceneOwnerInfo.data } };

  const sceneTags = await DashBoard.get(
    "/tags/get_scene_tags.php" +
      generatePHPParameters({ id: scenesRslt.id, lang })
  );
  scenesRslt = { ...scenesRslt, tags: sceneTags.data };

  const sceneTagsReleted = await DashBoard.get(
    "/tags/get_scene_tags_related_scenes.php" +
      generatePHPParameters({ id: scenesRslt.id })
  );
  scenesRslt = { ...scenesRslt, relatedScenes: sceneTagsReleted.data };

  dispatch({
    type: SELECT_SCENE,
    payload: scenesRslt, //fromDB
  });
};
