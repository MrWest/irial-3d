import {
  FETCH_MODELS,
  SELECT_MODEL,
  DELETE_MODEL,
  UPDATE_MODEL,
  ADD_MODEL,
  ADD_MODEL_COMMENT,
  DELETE_MODEL_COMMENT,
  CHANGE_MODEL_COMMENT,
} from "./types";

import DashBoard from "../apis/DashBoard";
import {
  generatePHPParameters,
  getLanguage,
  generateAppendParameters,
} from "../apis/tools";

export const fetchModels = () => async (dispatch) => {
  const modelsDb = await DashBoard.get("/models/get_models.php");
  var modelsRslt = modelsDb.data.slice();
  dispatch({
    type: FETCH_MODELS,
    payload: modelsRslt,
  });
};

export const sortModels = (
  category = "all",
  sort = "all",
  offset = 0
) => async (dispatch) => {
  const lang = getLanguage();

  let results = undefined;

  let completeUrl = generatePHPParameters({ category, sort, offset, lang });
  // if(category === "all")
  // modelsDb = await DashBoard.get("/models/get_models.php"+ generatePHPParameters({lang}))
  //  else
  await DashBoard.get("/models/get_models.php" + completeUrl).then(
    async (modelsDb) => {
      var modelsRslt = modelsDb.data.slice();

      const promises = modelsRslt.map(async (model) => {
        const modelImagesDb = await DashBoard.get(
          "/models/get_model_images.php" +
            generatePHPParameters({ idModel: model.id })
        );
        model.images = modelImagesDb.data;

        const modelsRateDb = await DashBoard.get(
          "/models/get_model_rate.php" +
            generatePHPParameters({ idModel: model.id })
        );
        model.rate = modelsRateDb.data;

        const modelOwnerInfo = await DashBoard.get(
          "/models/get_model_owner_info.php" +
            generatePHPParameters({ user: model.id_user })
        );
        model = { ...model, ownerInfo: { ...modelOwnerInfo.data } };

        return model;
      });

      results = await Promise.all(promises);
    }
  );

  dispatch({
    type: FETCH_MODELS,
    payload: results, //fromDB
  });

  const queryAPI = await DashBoard.post(
    "/models/get_models_count.php" + generatePHPParameters({ lang })
  );
  return parseInt(queryAPI.data.count);
};

export const sortModelsByCategoryUser = (info) => async (dispatch) => {
  const lang = getLanguage();

  let results = undefined;

  let completeUrl = generatePHPParameters({ ...info, lang });
  // if(category === "all")
  // modelsDb = await DashBoard.get("/models/get_models.php"+ generatePHPParameters({lang}))
  //  else
  await DashBoard.get(
    "/models/get_models_category_user.php" + completeUrl
  ).then(async (modelsDb) => {
    var modelsRslt = modelsDb.data.slice();

    const promises = modelsRslt.map(async (model) => {
      const modelImagesDb = await DashBoard.get(
        "/models/get_model_images.php" +
          generatePHPParameters({ idModel: model.id })
      );
      model.images = modelImagesDb.data;

      const modelsRateDb = await DashBoard.get(
        "/models/get_model_rate.php" +
          generatePHPParameters({ idModel: model.id })
      );
      model.rate = modelsRateDb.data;

      return model;
    });

    results = await Promise.all(promises);
  });

  dispatch({
    type: FETCH_MODELS,
    payload: results, //fromDB
  });
};

export const sortModelsUser = (user) => async (dispatch) => {
  const lang = getLanguage();

  var modelsDb = undefined;

  modelsDb = await DashBoard.post(
    "/models/get_models_user.php" + generatePHPParameters({ user, lang })
  );

  var modelsRslt = modelsDb.data.slice();

  const promises = modelsRslt.map(async (model) => {
    const modelImagesDb = await DashBoard.get(
      "/models/get_model_images.php" +
        generatePHPParameters({ idModel: model.id })
    );
    model.images = modelImagesDb.data;

    const modelscommentsDb = await DashBoard.get(
      "/models/get_model_comments.php" +
        generatePHPParameters({ idModel: model.id })
    );
    model.comments = modelscommentsDb.data;

    const modelsvideosDb = await DashBoard.get(
      "/models/get_model_videos.php" +
        generatePHPParameters({ idModel: model.id })
    );
    model.videos = modelsvideosDb.data;

    return model;
  });

  const results = await Promise.all(promises);

  dispatch({
    type: FETCH_MODELS,
    payload: results, //fromDB
  });
};

export const addModel = (model) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();

  uploadInfo.append("id_category", model.id_category);
  uploadInfo.append("id_user", model.id_user);
  uploadInfo.append("name", model.name || "");
  uploadInfo.append("general_description", model.general_description || "");
  uploadInfo.append("full_description", model.full_description || "");
  uploadInfo.append("price", model.price || "");
  uploadInfo.append("price_specifics", model.price_specifics || "");
  uploadInfo.append("lumion_version", model.lumion_version || "");
  uploadInfo.append("currency", model.currency || "");
  uploadInfo.append("note", model.note || "");

  const modelsDb = await DashBoard.post("/models/add_model.php", uploadInfo, {
    headers,
  });

  var modelsRslt = modelsDb.data;

  const modelsImagesDb = await DashBoard.get(
    "/models/get_model_images.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.images = modelsImagesDb.data;

  const modelscommentsDb = await DashBoard.get(
    "/models/get_model_comments.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.comments = modelscommentsDb.data;

  const modelsvideosDb = await DashBoard.get(
    "/models/get_model_videos.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.videos = modelsvideosDb.data;

  dispatch({
    type: ADD_MODEL,
    payload: modelsRslt,
  });

  return modelsRslt;
};

export const updateModel = (model) => async (dispatch) => {
  const lang = getLanguage();

  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", model.id);
  uploadInfo.append("name", model.name);
  uploadInfo.append("general_description", model.general_description);
  uploadInfo.append("full_description", model.full_description);
  uploadInfo.append("price", model.price);
  uploadInfo.append("price_specifics", model.price_specifics);
  uploadInfo.append("lumion_version", model.lumion_version);
  uploadInfo.append("currency", model.currency);
  uploadInfo.append("note", model.note);
  uploadInfo.append("lang", lang);

  let statusInfo = new FormData();
  statusInfo.append("id", model.id);
  statusInfo.append("lang", lang);
  if (model.status) {
    statusInfo.append("status", "1");
    await DashBoard.post("/models/update_model_status.php", statusInfo, {
      headers,
    });
  } else {
    statusInfo.append("status", "0");
    await DashBoard.post("/models/update_model_status.php", statusInfo, {
      headers,
    });
  }

  const modelsDb = await DashBoard.post(
    "/models/update_model.php",
    uploadInfo,
    { headers }
  );

  var modelRslt = modelsDb.data;

  const modelsImagesDb = await DashBoard.get(
    "/models/get_model_images.php" +
      generatePHPParameters({ idModel: modelRslt.id })
  );
  modelRslt.images = modelsImagesDb.data;

  const modelscommentsDb = await DashBoard.get(
    "/models/get_model_comments.php" +
      generatePHPParameters({ idModel: modelRslt.id })
  );
  modelRslt.comments = modelscommentsDb.data;

  const modelsvideosDb = await DashBoard.get(
    "/models/get_model_videos.php" +
      generatePHPParameters({ idModel: modelRslt.id })
  );
  modelRslt.videos = modelsvideosDb.data;

  dispatch({
    type: UPDATE_MODEL,
    payload: modelRslt, //fromDB
  });
};

export const selectModel = (id) => async (dispatch) => {
  const lang = getLanguage();

  const modelsDb = await DashBoard.post(
    "/models/get_model.php" + generatePHPParameters({ id, lang })
  );

  var modelsRslt = modelsDb.data;

  const modelsImagesDb = await DashBoard.get(
    "/models/get_model_images.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.images = modelsImagesDb.data;

  const modelscommentsDb = await DashBoard.get(
    "/models/get_model_comments.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.comments = modelscommentsDb.data;

  const modelsvideosDb = await DashBoard.get(
    "/models/get_model_videos.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.videos = modelsvideosDb.data;

  const modelsRateDb = await DashBoard.get(
    "/models/get_model_rate.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.rate = modelsRateDb.data;

  const modelOwnerInfo = await DashBoard.get(
    "/models/get_model_owner_info.php" +
      generatePHPParameters({ user: modelsRslt.id_user })
  );
  modelsRslt = { ...modelsRslt, ownerInfo: { ...modelOwnerInfo.data } };

  const modelTags = await DashBoard.get(
    "/tags/get_model_tags.php" + generatePHPParameters({ id, lang })
  );
  modelsRslt = { ...modelsRslt, tags: modelTags.data };

  const modelTagsReleted = await DashBoard.get(
    "/tags/get_model_tags_related_models.php" + generatePHPParameters({ id })
  );
  modelsRslt = { ...modelsRslt, relatedModels: modelTagsReleted.data };

  dispatch({
    type: SELECT_MODEL,
    payload: modelsRslt,
  });

  return modelsRslt;
};

export const deleteModel = (id) => async (dispatch) => {
  const categoriesDb = await DashBoard.post(
    "/models/delete_model.php" + generatePHPParameters({ id })
  );

  dispatch({
    type: DELETE_MODEL,
    payload: id,
  });
};

export const uploadModelImage = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("modelId", info.modelId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("modelName", info.modelName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const modelAPI = await DashBoard.post(
      "/models/upload_model_image.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    // getCategory(info.idCategory)
  }
};

export const uploadModelFile = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("modelId", info.modelId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("modelName", info.modelName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const modelAPI = await DashBoard.post(
      "/models/upload_model_file.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    // getCategory(info.idCategory)
  }
};

export const deleteModelImage = (id) => async (dispatch) => {
  const categoriesDb = await DashBoard.post(
    "/models/delete_model_image.php" + generatePHPParameters({ id })
  );
};

export const uploadModelVideo = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("modelId", info.modelId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("modelName", info.modelName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const modelAPI = await DashBoard.post(
      "/models/upload_model_video.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    // getCategory(info.idCategory)
  }
};

export const deleteModelVideo = (id) => async (dispatch) => {
  const categoriesDb = await DashBoard.post(
    "/models/delete_model_video.php" + generatePHPParameters({ id })
  );
};

export const updateModelComment = (comment) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", comment.id);
  uploadInfo.append("comment", comment.comment);
  const lang = getLanguage();
  uploadInfo.append("lang", lang);

  const commentDb = await DashBoard.post(
    "/models/update_model_comment.php",
    uploadInfo,
    { headers }
  );
  var commentRslt = commentDb.data;
  dispatch({
    type: CHANGE_MODEL_COMMENT,
    payload: commentRslt, //fromDB
  });
};

export const addModelComment = (comment) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id_model", comment.id_service);
  uploadInfo.append("comment", comment.comment);
  uploadInfo.append("id_user", comment.id_user);
  uploadInfo.append("user_first_name", comment.user_first_name);
  uploadInfo.append("user_last_name", comment.user_last_name);
  uploadInfo.append("user_picture", comment.user_picture);
  uploadInfo.append("user_type", comment.user_type);

  const commentDb = await DashBoard.post(
    "/models/add_model_comment.php",
    uploadInfo,
    { headers }
  );
  var commentRslt = commentDb.data.slice();
  dispatch({
    type: ADD_MODEL_COMMENT,
    payload: commentRslt, //fromDB
  });
};

export const deleteModelComment = (id) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", id);
  // uploadInfo.append("content", comment.content);
  // uploadInfo.append("id_model", comment.id_model);

  await DashBoard.post("/models/delete_model_comment.php", uploadInfo, {
    headers,
  });

  dispatch({
    type: DELETE_MODEL_COMMENT,
    payload: id, //fromDB
  });
};

export const changeModelComment = (info) => async (dispatch) => {
  dispatch({
    type: CHANGE_MODEL_COMMENT,
    payload: info,
  });
};

export const rateModel = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = generateAppendParameters(info);

  await DashBoard.post("/models/model_rate.php", uploadInfo, { headers });

  const lang = getLanguage();
  const modelsDb = await DashBoard.post(
    "/models/get_model.php" + generatePHPParameters({ id: info.id_model, lang })
  );

  var modelsRslt = modelsDb.data;

  const modelsImagesDb = await DashBoard.get(
    "/models/get_model_images.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.images = modelsImagesDb.data;

  const modelscommentsDb = await DashBoard.get(
    "/models/get_model_comments.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.comments = modelscommentsDb.data;

  const modelsvideosDb = await DashBoard.get(
    "/models/get_model_videos.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.videos = modelsvideosDb.data;

  const modelsRateDb = await DashBoard.get(
    "/models/get_model_rate.php" +
      generatePHPParameters({ idModel: modelsRslt.id })
  );
  modelsRslt.rate = modelsRateDb.data;

  const modelOwnerInfo = await DashBoard.get(
    "/models/get_model_owner_info.php" +
      generatePHPParameters({ user: modelsRslt.id_user })
  );
  modelsRslt = { ...modelsRslt, ownerInfo: { ...modelOwnerInfo.data } };

  const modelTags = await DashBoard.get(
    "/tags/get_model_tags.php" +
      generatePHPParameters({ id: modelsRslt.id, lang })
  );
  modelsRslt = { ...modelsRslt, tags: modelTags.data };

  const modelTagsReleted = await DashBoard.get(
    "/tags/get_model_tags_related_models.php" +
      generatePHPParameters({ id: modelsRslt.id })
  );
  modelsRslt = { ...modelsRslt, relatedModels: modelTagsReleted.data };

  dispatch({
    type: SELECT_MODEL,
    payload: modelsRslt, //fromDB
  });
};
