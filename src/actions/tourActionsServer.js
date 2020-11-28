import { FETCH_TOURS, SELECT_TOUR } from "./types";
import DashBoard from "../apis/DashBoard";
import {
  generatePHPParameters,
  getLanguage,
  generateAppendParameters,
} from "../apis/tools";
import { log } from "util";

export const fetchToursServer = async (reduxStore) => {
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

  reduxStore.dispatch({
    type: FETCH_TOURS,
    payload: results, //fromDB
  });

  return results;
};

export const sortToursServer = async (category, reduxStore) => {
  const lang = getLanguage(reduxStore);

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

  reduxStore.dispatch({
    type: FETCH_TOURS,
    payload: results, //fromDB
  });

  return results;
};

export const selectTourServer = async (id, reduxStore) => {
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

  reduxStore.dispatch({
    type: SELECT_TOUR,
    payload: toursRslt, //fromDB
  });

  return toursRslt;
};
