import {
  FETCH_ATTRACTIONS,
  SELECT_ATTRACTION,
  DELETE_ATTRACTION,
  UPDATE_ATTRACTION,
  ADD_ATTRACTION,
  CHANGE_ATTRACTION_PROGRAM,
  ADD_ATTRACTION_COMMENT,
  DELETE_ATTRACTION_COMMENT,
  CHANGE_ATTRACTION_COMMENT,
} from "./types";

import DashBoard from "../apis/DashBoard";
import {
  generatePHPParameters,
  getLanguage,
  generateAppendParameters,
} from "../apis/tools";

export const fetchAttractions = () => async (dispatch) => {
  const attractionsDb = await DashBoard.get("/attractions/get_attractions.php");
  var attractionsRslt = attractionsDb.data.slice();
  dispatch({
    type: FETCH_ATTRACTIONS,
    payload: attractionsRslt,
  });
};

export const sortAttractions = (category) => async (dispatch) => {
  const lang = getLanguage();

  let results = undefined;

  let completeUrl =
    category === "all"
      ? generatePHPParameters({ lang })
      : generatePHPParameters({ category, lang });
  await DashBoard.get("/attractions/get_attractions.php" + completeUrl).then(
    async (attractionsDb) => {
      var attractionsRslt = attractionsDb.data.slice();

      const promises = attractionsRslt.map(async (attraction) => {
        const attractionImagesDb = await DashBoard.get(
          "/attractions/get_attraction_images.php" +
            generatePHPParameters({ idAttraction: attraction.id })
        );
        attraction.images = attractionImagesDb.data;

        const attractionsRateDb = await DashBoard.get(
          "/attractions/get_attraction_rate.php" +
            generatePHPParameters({ idAttraction: attraction.id })
        );
        attraction.rate = attractionsRateDb.data;

        return attraction;
      });

      results = await Promise.all(promises);
    }
  );

  dispatch({
    type: FETCH_ATTRACTIONS,
    payload: results, //fromDB
  });
};

export const sortAttractionsUser = (user) => async (dispatch) => {
  const lang = getLanguage();

  var attractionsDb = undefined;

  attractionsDb = await DashBoard.post(
    "/attractions/get_attractions_user.php" +
      generatePHPParameters({ user, lang })
  );

  var attractionsRslt = attractionsDb.data.slice();

  const promises = attractionsRslt.map(async (attraction) => {
    const attractionImagesDb = await DashBoard.get(
      "/attractions/get_attraction_images.php" +
        generatePHPParameters({ idAttraction: attraction.id })
    );
    attraction.images = attractionImagesDb.data;

    const attractionsprogramDb = await DashBoard.get(
      "/attractions/get_attraction_program.php" +
        generatePHPParameters({ idAttraction: attraction.id, lang })
    );
    attraction.program = attractionsprogramDb.data;

    const attractionscommentsDb = await DashBoard.get(
      "/attractions/get_attraction_comments.php" +
        generatePHPParameters({ idAttraction: attraction.id })
    );
    attraction.comments = attractionscommentsDb.data;

    const attractionsvideosDb = await DashBoard.get(
      "/attractions/get_attraction_videos.php" +
        generatePHPParameters({ idAttraction: attraction.id })
    );
    attraction.videos = attractionsvideosDb.data;

    return attraction;
  });

  const results = await Promise.all(promises);

  dispatch({
    type: FETCH_ATTRACTIONS,
    payload: results, //fromDB
  });
};

export const addAttraction = (attraction) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();

  uploadInfo.append("id_category", attraction.id_category);
  uploadInfo.append("id_user", attraction.id_user);
  uploadInfo.append("name", attraction.name || "");
  uploadInfo.append(
    "general_description",
    attraction.general_description || ""
  );
  uploadInfo.append("full_description", attraction.full_description || "");
  uploadInfo.append("price", attraction.price || "");
  uploadInfo.append("price_specifics", attraction.price_specifics || "");
  uploadInfo.append("how_long", attraction.how_long || "");
  uploadInfo.append("languages", attraction.languages || "");
  uploadInfo.append("currency", attraction.currency || "");
  uploadInfo.append("note", attraction.note || "");

  const attractionsDb = await DashBoard.post(
    "/attractions/add_attraction.php",
    uploadInfo,
    { headers }
  );

  var attractionsRslt = attractionsDb.data;

  const attractionsImagesDb = await DashBoard.get(
    "/attractions/get_attraction_images.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.images = attractionsImagesDb.data;

  const attractionsprogramDb = await DashBoard.get(
    "/attractions/get_attraction_program.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.program = attractionsprogramDb.data;

  const attractionscommentsDb = await DashBoard.get(
    "/attractions/get_attraction_comments.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.comments = attractionscommentsDb.data;

  const attractionsvideosDb = await DashBoard.get(
    "/attractions/get_attraction_videos.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.videos = attractionsvideosDb.data;

  dispatch({
    type: ADD_ATTRACTION,
    payload: attractionsRslt,
  });

  return attractionsRslt;
};

export const updateAttraction = (attraction) => async (dispatch) => {
  const lang = getLanguage();

  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", attraction.id);
  uploadInfo.append("name", attraction.name);
  uploadInfo.append("general_description", attraction.general_description);
  uploadInfo.append("full_description", attraction.full_description);
  uploadInfo.append("price", attraction.price);
  uploadInfo.append("price_specifics", attraction.price_specifics);
  uploadInfo.append("how_long", attraction.how_long);
  uploadInfo.append("languages", attraction.languages);
  uploadInfo.append("currency", attraction.currency);
  uploadInfo.append("note", attraction.note);
  uploadInfo.append("lang", lang);

  let statusInfo = new FormData();
  statusInfo.append("id", attraction.id);
  statusInfo.append("lang", lang);
  if (attraction.status) {
    statusInfo.append("status", "1");
    await DashBoard.post(
      "/attractions/update_attraction_status.php",
      statusInfo,
      { headers }
    );
  } else {
    statusInfo.append("status", "0");
    await DashBoard.post(
      "/attractions/update_attraction_status.php",
      statusInfo,
      { headers }
    );
  }

  const attractionsDb = await DashBoard.post(
    "/attractions/update_attraction.php",
    uploadInfo,
    { headers }
  );

  var attractionRslt = attractionsDb.data;

  const attractionsImagesDb = await DashBoard.get(
    "/attractions/get_attraction_images.php" +
      generatePHPParameters({ idAttraction: attractionRslt.id })
  );
  attractionRslt.images = attractionsImagesDb.data;

  const attractionsprogramDb = await DashBoard.get(
    "/attractions/get_attraction_program.php" +
      generatePHPParameters({ idAttraction: attractionRslt.id, lang })
  );
  attractionRslt.program = attractionsprogramDb.data;

  const attractionscommentsDb = await DashBoard.get(
    "/attractions/get_attraction_comments.php" +
      generatePHPParameters({ idAttraction: attractionRslt.id })
  );
  attractionRslt.comments = attractionscommentsDb.data;

  const attractionsvideosDb = await DashBoard.get(
    "/attractions/get_attraction_videos.php" +
      generatePHPParameters({ idAttraction: attractionRslt.id })
  );
  attractionRslt.videos = attractionsvideosDb.data;

  dispatch({
    type: UPDATE_ATTRACTION,
    payload: attractionRslt, //fromDB
  });
};

export const selectAttraction = (id) => async (dispatch) => {
  const lang = getLanguage();

  const attractionsDb = await DashBoard.post(
    "/attractions/get_attraction.php" + generatePHPParameters({ id, lang })
  );

  var attractionsRslt = attractionsDb.data;

  const attractionsImagesDb = await DashBoard.get(
    "/attractions/get_attraction_images.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.images = attractionsImagesDb.data;

  const attractionsprogramDb = await DashBoard.get(
    "/attractions/get_attraction_program.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id, lang })
  );
  attractionsRslt.program = attractionsprogramDb.data;

  const attractionscommentsDb = await DashBoard.get(
    "/attractions/get_attraction_comments.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.comments = attractionscommentsDb.data;

  const attractionsvideosDb = await DashBoard.get(
    "/attractions/get_attraction_videos.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.videos = attractionsvideosDb.data;

  const attractionsRateDb = await DashBoard.get(
    "/attractions/get_attraction_rate.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.rate = attractionsRateDb.data;

  dispatch({
    type: SELECT_ATTRACTION,
    payload: attractionsRslt,
  });

  return attractionsRslt;
};

export const deleteAttraction = (id) => async (dispatch) => {
  const rslt = await DashBoard.post(
    "/attractions/delete_attraction.php" + generatePHPParameters({ id })
  );

  dispatch({
    type: DELETE_ATTRACTION,
    payload: id,
  });
  return rslt;
};

export const uploadAttractionImage = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("attractionId", info.attractionId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("attractionName", info.attractionName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const attractionAPI = await DashBoard.post(
      "/attractions/upload_attraction_image.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    return attractionAPI;
  }
};

export const deleteAttractionImage = (id) => async (dispatch) => {
  const attractionAPI = await DashBoard.post(
    "/attractions/delete_attraction_image.php" + generatePHPParameters({ id })
  );

  return attractionAPI;
};

export const uploadAttractionVideo = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("attractionId", info.attractionId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("attractionName", info.attractionName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const attractionAPI = await DashBoard.post(
      "/attractions/upload_attraction_video.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    return attractionAPI;
  }
};

export const deleteAttractionVideo = (id) => async (dispatch) => {
  const attractionAPI = await DashBoard.post(
    "/attractions/delete_attraction_video.php" + generatePHPParameters({ id })
  );
  return attractionAPI;
};

export const updateAttractionProgram = (program) => async (dispatch) => {
  const lang = getLanguage();

  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", program.id);
  uploadInfo.append("content", program.content);
  uploadInfo.append("lang", lang);
  uploadInfo.append("idAttraction", program.idAttraction);

  const attractionsDb = await DashBoard.post(
    "/attractions/update_attraction_program.php",
    uploadInfo,
    { headers }
  );

  var attractionsRslt = attractionsDb.data;

  const attractionsImagesDb = await DashBoard.get(
    "/attractions/get_attraction_images.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.images = attractionsImagesDb.data;

  const attractionsprogramDb = await DashBoard.get(
    "/attractions/get_attraction_program.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id, lang })
  );
  attractionsRslt.program = attractionsprogramDb.data;

  const attractionscommentsDb = await DashBoard.get(
    "/attractions/get_attraction_comments.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.comments = attractionscommentsDb.data;

  const attractionsvideosDb = await DashBoard.get(
    "/attractions/get_attraction_videos.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.videos = attractionsvideosDb.data;

  dispatch({
    type: SELECT_ATTRACTION,
    payload: attractionsRslt,
  });
};

export const addAttractionProgram = (program) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id_attraction", program.id_attraction);
  uploadInfo.append("content", program.content);
  uploadInfo.append("position", program.position);

  const attractionsDb = await DashBoard.post(
    "/attractions/add_attraction_program.php",
    uploadInfo,
    { headers }
  );
  return attractionsDb;
};

export const deleteAttractionProgram = (id) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", id);
  // uploadInfo.append("content", program.content);
  // uploadInfo.append("id_attraction", program.id_attraction);

  const attractionsDb = await DashBoard.post(
    "/attractions/delete_attraction_program.php",
    uploadInfo,
    { headers }
  );
  return attractionsDb;
};

export const changeAttractionProgram = (info) => async (dispatch) => {
  dispatch({
    type: CHANGE_ATTRACTION_PROGRAM,
    payload: info,
  });
};

export const updateAttractionComment = (comment) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", comment.id);
  uploadInfo.append("comment", comment.comment);
  const lang = getLanguage();
  uploadInfo.append("lang", lang);

  const commentDb = await DashBoard.post(
    "/attractions/update_attraction_comment.php",
    uploadInfo,
    { headers }
  );
  var commentRslt = commentDb.data;
  dispatch({
    type: CHANGE_ATTRACTION_COMMENT,
    payload: commentRslt, //fromDB
  });
};

export const addAttractionComment = (comment) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id_attraction", comment.id_service);
  uploadInfo.append("comment", comment.comment);
  uploadInfo.append("id_user", comment.id_user);
  uploadInfo.append("user_first_name", comment.user_first_name);
  uploadInfo.append("user_last_name", comment.user_last_name);
  uploadInfo.append("user_picture", comment.user_picture);
  uploadInfo.append("user_type", comment.user_type);

  const commentDb = await DashBoard.post(
    "/attractions/add_attraction_comment.php",
    uploadInfo,
    { headers }
  );
  var commentRslt = commentDb.data;
  dispatch({
    type: ADD_ATTRACTION_COMMENT,
    payload: commentRslt, //fromDB
  });
};

export const deleteAttractionComment = (id) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", id);
  // uploadInfo.append("content", comment.content);
  // uploadInfo.append("id_attraction", comment.id_attraction);

  await DashBoard.post(
    "/attractions/delete_attraction_comment.php",
    uploadInfo,
    { headers }
  );

  dispatch({
    type: DELETE_ATTRACTION_COMMENT,
    payload: id, //fromDB
  });
};

export const changeAttractionComment = (info) => async (dispatch) => {
  dispatch({
    type: CHANGE_ATTRACTION_COMMENT,
    payload: info,
  });
};

export const rateAttraction = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = generateAppendParameters(info);

  await DashBoard.post("/attractions/attraction_rate.php", uploadInfo, {
    headers,
  });

  const lang = getLanguage();
  const attractionsDb = await DashBoard.post(
    "/attractions/get_attraction.php" +
      generatePHPParameters({ id: info.id_attraction, lang })
  );

  var attractionsRslt = attractionsDb.data;

  const attractionsImagesDb = await DashBoard.get(
    "/attractions/get_attraction_images.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.images = attractionsImagesDb.data;

  const attractionsprogramDb = await DashBoard.get(
    "/attractions/get_attraction_program.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id, lang })
  );
  attractionsRslt.program = attractionsprogramDb.data;

  const attractionscommentsDb = await DashBoard.get(
    "/attractions/get_attraction_comments.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.comments = attractionscommentsDb.data;

  const attractionsvideosDb = await DashBoard.get(
    "/attractions/get_attraction_videos.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.videos = attractionsvideosDb.data;

  const attractionsRateDb = await DashBoard.get(
    "/attractions/get_attraction_rate.php" +
      generatePHPParameters({ idAttraction: attractionsRslt.id })
  );
  attractionsRslt.rate = attractionsRateDb.data;

  dispatch({
    type: SELECT_ATTRACTION,
    payload: attractionsRslt, //fromDB
  });
};
