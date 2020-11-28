import {
  FETCH_TOURS,
  SELECT_TOUR,
  DELETE_TOUR,
  UPDATE_TOUR,
  ADD_TOUR,
  CHANGE_TOUR_PROGRAM,
  CHANGE_TOUR_COMMENT,
  ADD_TOUR_COMMENT,
  DELETE_TOUR_COMMENT,
  SET_USER_SERVICE_RATE,
} from "./types";
import DashBoard from "../apis/DashBoard";
import {
  generatePHPParameters,
  getLanguage,
  generateAppendParameters,
} from "../apis/tools";
import { log } from "util";

export const fetchTours = () => async (dispatch) => {
  const toursDb = await DashBoard.post("/tours/get_tours.php");

  var toursRslt = toursDb.data.slice();

  const promises = toursRslt.map(async (tour) => {
    const toursImagesDb = await DashBoard.get(
      "/tours/get_tour_images.php" + generatePHPParameters({ idTour: tour.id })
    );
    tour.images = toursImagesDb.data;
    tour.program = [];
    tour.comments = [];

    return tour;
  });

  const results = await Promise.all(promises);

  dispatch({
    type: FETCH_TOURS,
    payload: results, //fromDB
  });
};

export const sortTours = (category) => async (dispatch) => {
  const lang = getLanguage();

  let results;

  let completeUrl =
    category === "all"
      ? generatePHPParameters({ lang })
      : generatePHPParameters({ category, lang });
  await DashBoard.post("/tours/get_tours.php" + completeUrl).then(
    async (toursDb) => {
      var toursRslt = toursDb.data.slice();

      const promises = toursRslt.map(async (tour) => {
        const toursImagesDb = await DashBoard.get(
          "/tours/get_tour_images.php" +
            generatePHPParameters({ idTour: tour.id })
        );
        tour.images = toursImagesDb.data;

        //  const toursprogramDb = await DashBoard.get("/tours/get_tour_program.php"+ generatePHPParameters({idTour: tour.id, lang}))
        //  tour.program = toursprogramDb.data

        //  const tourscommentsDb = await DashBoard.get("/tours/get_tour_comments.php"+ generatePHPParameters({idTour: tour.id}))
        //  tour.comments = tourscommentsDb.data

        //  const toursvideosDb = await DashBoard.get("/tours/get_tour_videos.php"+ generatePHPParameters({idTour: tour.id}))
        //  tour.videos = toursvideosDb.data

        const toursRateDb = await DashBoard.get(
          "/tours/get_tour_rate.php" +
            generatePHPParameters({ idTour: tour.id })
        );
        tour.rate = toursRateDb.data;

        return tour;
      });

      results = await Promise.all(promises);
    }
  );

  dispatch({
    type: FETCH_TOURS,
    payload: results, //fromDB
  });
};

export const selectTour = (id) => async (dispatch) => {
  const lang = getLanguage();
  const toursDb = await DashBoard.post(
    "/tours/get_tour.php" + generatePHPParameters({ id: id, lang })
  );

  var toursRslt = toursDb.data;

  const toursImagesDb = await DashBoard.get(
    "/tours/get_tour_images.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.images = toursImagesDb.data;

  const toursprogramDb = await DashBoard.get(
    "/tours/get_tour_program.php" +
      generatePHPParameters({ idTour: toursRslt.id, lang })
  );
  toursRslt.program = toursprogramDb.data;

  const tourscommentsDb = await DashBoard.get(
    "/tours/get_tour_comments.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.comments = tourscommentsDb.data;

  const toursvideosDb = await DashBoard.get(
    "/tours/get_tour_videos.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.videos = toursvideosDb.data;

  const toursRateDb = await DashBoard.get(
    "/tours/get_tour_rate.php" + generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.rate = toursRateDb.data;

  dispatch({
    type: SELECT_TOUR,
    payload: toursRslt, //fromDB
  });

  return toursRslt;
};

export const updateTour = (tour) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", tour.id);
  uploadInfo.append("name", tour.name || "");
  uploadInfo.append("general_description", tour.general_description || "");
  uploadInfo.append("full_description", tour.full_description || "");
  uploadInfo.append("modality", tour.modality || "");
  uploadInfo.append("how_long", tour.how_long || "");
  uploadInfo.append("pickup_time", tour.pickup_time || "");
  uploadInfo.append("languages", tour.languages || "");
  uploadInfo.append("guide", tour.guide || "");
  uploadInfo.append("note", tour.note || "");

  const lang = getLanguage();
  uploadInfo.append("lang", lang);

  let statusInfo = new FormData();
  statusInfo.append("id", tour.id);
  statusInfo.append("lang", lang);
  if (tour.status) {
    statusInfo.append("status", "1");
    await DashBoard.post("/tours/update_tour_status.php", statusInfo, {
      headers,
    });
  } else {
    statusInfo.append("status", "0");
    await DashBoard.post("/tours/update_tour_status.php", statusInfo, {
      headers,
    });
  }

  const toursDb = await DashBoard.post("/tours/update_tour.php", uploadInfo, {
    headers,
  });

  var tourRslt = toursDb.data;

  const toursImagesDb = await DashBoard.get(
    "/tours/get_tour_images.php" +
      generatePHPParameters({ idTour: tourRslt.id })
  );
  tourRslt.images = toursImagesDb.data;

  const toursprogramDb = await DashBoard.get(
    "/tours/get_tour_program.php" +
      generatePHPParameters({ idTour: tourRslt.id, lang })
  );
  tourRslt.program = toursprogramDb.data;

  const tourscommentsDb = await DashBoard.get(
    "/tours/get_tour_comments.php" +
      generatePHPParameters({ idTour: tourRslt.id })
  );
  tourRslt.comments = tourscommentsDb.data;

  const toursvideosDb = await DashBoard.get(
    "/tours/get_tour_videos.php" +
      generatePHPParameters({ idTour: tourRslt.id })
  );
  tourRslt.videos = toursvideosDb.data;

  dispatch({
    type: UPDATE_TOUR,
    payload: tourRslt, //fromDB
  });
};

export const addTour = (tour) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();

  uploadInfo.append("id_category", tour.id_category);

  uploadInfo.append("name", tour.name || "");
  uploadInfo.append("general_description", tour.general_description || "");
  uploadInfo.append("full_description", tour.full_description || "");
  uploadInfo.append("modality", tour.modality || "");
  uploadInfo.append("how_long", tour.how_long || "");
  uploadInfo.append("pickup_time", tour.pickup_time || "");
  uploadInfo.append("languages", tour.languages || "");
  uploadInfo.append("guide", tour.guide || "");
  uploadInfo.append("note", tour.note || "");

  const toursDb = await DashBoard.post("/tours/add_tour.php", uploadInfo, {
    headers,
  });

  var toursRslt = toursDb.data;

  const toursImagesDb = await DashBoard.get(
    "/tours/get_tour_images.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.images = toursImagesDb.data;

  const toursprogramDb = await DashBoard.get(
    "/tours/get_tour_program.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.program = toursprogramDb.data;

  const tourscommentsDb = await DashBoard.get(
    "/tours/get_tour_comments.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.comments = tourscommentsDb.data;

  const toursvideosDb = await DashBoard.get(
    "/tours/get_tour_videos.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.videos = toursvideosDb.data;

  dispatch({
    type: ADD_TOUR,
    payload: toursRslt, //fromDB
  });
};

export const deleteTour = (id) => async (dispatch) => {
  const categoriesDb = await DashBoard.post(
    "/tours/delete_tour.php" + generatePHPParameters({ id })
  );

  dispatch({
    type: DELETE_TOUR,
    payload: id,
  });
};

export const uploadTourImage = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("tourId", info.tourId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("tourName", info.tourName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const tourAPI = await DashBoard.post(
      "/tours/upload_tour_image.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    // getCategory(info.idCategory)
  }
};

export const deleteTourImage = (id) => async (dispatch) => {
  const categoriesDb = await DashBoard.post(
    "/tours/delete_tour_image.php" + generatePHPParameters({ id })
  );
};

export const uploadTourVideo = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("tourId", info.tourId);
  uploadInfo.append("fileName", info.fileName);
  uploadInfo.append("tourName", info.tourName);

  if (info.file !== null) {
    uploadInfo.append("file", info.file);

    const tourAPI = await DashBoard.post(
      "/tours/upload_tour_video.php",
      uploadInfo,
      { headers, onUploadProgress: info.onProgress }
    );

    // getCategory(info.idCategory)
  }
};

export const deleteTourVideo = (id) => async (dispatch) => {
  const categoriesDb = await DashBoard.post(
    "/tours/delete_tour_video.php" + generatePHPParameters({ id })
  );
};

export const updateTourProgram = (program) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", program.id);
  uploadInfo.append("content", program.content);
  const lang = getLanguage();
  uploadInfo.append("lang", lang);
  uploadInfo.append("idTour", program.idTour);

  const toursDb = await DashBoard.post(
    "/tours/update_tour_program.php",
    uploadInfo,
    { headers }
  );
};

export const addTourProgram = (program) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id_tour", program.id_tour);
  uploadInfo.append("content", program.content);
  uploadInfo.append("position", program.position);

  const toursDb = await DashBoard.post(
    "/tours/add_tour_program.php",
    uploadInfo,
    { headers }
  );
};

export const deleteTourProgram = (id) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", id);
  // uploadInfo.append("content", program.content);
  // uploadInfo.append("id_tour", program.id_tour);

  const toursDb = await DashBoard.post(
    "/tours/delete_tour_program.php",
    uploadInfo,
    { headers }
  );
};

export const changeTourProgram = (info) => async (dispatch) => {
  dispatch({
    type: CHANGE_TOUR_PROGRAM,
    payload: info,
  });
};

export const updateTourComment = (comment) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", comment.id);
  uploadInfo.append("comment", comment.comment);
  const lang = getLanguage();
  uploadInfo.append("lang", lang);

  const commentDb = await DashBoard.post(
    "/tours/update_tour_comment.php",
    uploadInfo,
    { headers }
  );
  var commentRslt = commentDb.data;
  dispatch({
    type: CHANGE_TOUR_COMMENT,
    payload: commentRslt, //fromDB
  });
};

export const addTourComment = (comment) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id_tour", comment.id_service);
  uploadInfo.append("comment", comment.comment);
  uploadInfo.append("id_user", comment.id_user);
  uploadInfo.append("user_first_name", comment.user_first_name);
  uploadInfo.append("user_last_name", comment.user_last_name);
  uploadInfo.append("user_picture", comment.user_picture);
  uploadInfo.append("user_type", comment.user_type);

  const commentDb = await DashBoard.post(
    "/tours/add_tour_comment.php",
    uploadInfo,
    { headers }
  );
  var commentRslt = commentDb.data;
  dispatch({
    type: ADD_TOUR_COMMENT,
    payload: commentRslt, //fromDB
  });
};

export const deleteTourComment = (id) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = new FormData();
  uploadInfo.append("id", id);
  // uploadInfo.append("content", comment.content);
  // uploadInfo.append("id_tour", comment.id_tour);

  await DashBoard.post("/tours/delete_tour_comment.php", uploadInfo, {
    headers,
  });

  dispatch({
    type: DELETE_TOUR_COMMENT,
    payload: id, //fromDB
  });
};

export const changeTourComment = (info) => async (dispatch) => {
  dispatch({
    type: CHANGE_TOUR_COMMENT,
    payload: info,
  });
};

export const sendEmail = (data) => async (dispatch) => {
  let sendData = Object.assign({}, data);

  var headers = {
    "Content-Type": "multipart/form-data",
  };

  const lang = getLanguage();
  if (sendData.service) sendData.service += " (" + lang + ")";
  if (data.subject) sendData.subject += " (" + lang + ")";

  let uploadInfo = generateAppendParameters(sendData);

  const promises = await DashBoard.post(
    "/mail/sendemailcross.php",
    uploadInfo,
    { headers }
  );

  const results = await promises;

  dispatch({
    type: "LOAD_FACEBOOK",
    payload: {},
  });
  return results;
};

export const rateTour = (info) => async (dispatch) => {
  var headers = {
    "Content-Type": "multipart/form-data",
  };

  let uploadInfo = generateAppendParameters(info);

  await DashBoard.post("/tours/tour_rate.php", uploadInfo, { headers });

  const lang = getLanguage();
  const toursDb = await DashBoard.post(
    "/tours/get_tour.php" + generatePHPParameters({ id: info.id_tour, lang })
  );

  var toursRslt = toursDb.data;

  const toursImagesDb = await DashBoard.get(
    "/tours/get_tour_images.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.images = toursImagesDb.data;

  const toursprogramDb = await DashBoard.get(
    "/tours/get_tour_program.php" +
      generatePHPParameters({ idTour: toursRslt.id, lang })
  );
  toursRslt.program = toursprogramDb.data;

  const tourscommentsDb = await DashBoard.get(
    "/tours/get_tour_comments.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.comments = tourscommentsDb.data;

  const toursvideosDb = await DashBoard.get(
    "/tours/get_tour_videos.php" +
      generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.videos = toursvideosDb.data;

  const toursRateDb = await DashBoard.get(
    "/tours/get_tour_rate.php" + generatePHPParameters({ idTour: toursRslt.id })
  );
  toursRslt.rate = toursRateDb.data;

  dispatch({
    type: SELECT_TOUR,
    payload: toursRslt, //fromDB
  });
};

export const getUserRate = (info) => async (dispatch) => {
  const rating = await DashBoard.post(
    "/rate/get_service_user_rate.php" + generatePHPParameters(info)
  );

  var rate = rating.data;

  dispatch({
    type: SET_USER_SERVICE_RATE,
    payload: rate, //fromDB
  });
};
