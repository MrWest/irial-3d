import { FETCH_PROJECTS, SELECT_PROJECT } from "./types";

import DashBoard from "../apis/DashBoard";
import { generatePHPParameters, getLanguage } from "../apis/tools";

export const fetchProjectsServer = async (reduxStore) => {
  const projectsDb = await DashBoard.get("/projects/get_projects.php");
  var projectsRslt = projectsDb.data.slice();
  reduxStore.dispatch({
    type: FETCH_PROJECTS,
    payload: projectsRslt,
  });
  return projectsRslt;
};

export const sortProjectsServer = async (
  category = "all",
  sort = "all",
  offset = 0,
  reduxStore
) => {
  const lang = getLanguage(reduxStore);

  let results = undefined;

  let completeUrl = generatePHPParameters({ category, sort, offset, lang });
  // if(category === "all")
  // projectsDb = await DashBoard.get("/projects/get_projects.php"+ generatePHPParameters({lang}))
  //  else
  await DashBoard.get("/projects/get_projects.php" + completeUrl).then(
    async (projectsDb) => {
      var projectsRslt = projectsDb.data.slice();

      const promises = projectsRslt.map(async (project) => {
        const projectImagesDb = await DashBoard.get(
          "/projects/get_project_images.php" +
            generatePHPParameters({ idProject: project.id })
        );
        project.images = projectImagesDb.data;

        const projectsRateDb = await DashBoard.get(
          "/projects/get_project_rate.php" +
            generatePHPParameters({ idProject: project.id })
        );
        project.rate = projectsRateDb.data;

        return project;
      });

      results = await Promise.all(promises);
    }
  );

  reduxStore.dispatch({
    type: FETCH_PROJECTS,
    payload: results, //fromDB
  });

  return results;
};

export const selectProjectServer = async (id, reduxStore) => {
  const lang = getLanguage();

  const projectsDb = await DashBoard.post(
    "/projects/get_project.php" + generatePHPParameters({ id, lang })
  );

  var projectsRslt = projectsDb.data;

  const projectsImagesDb = await DashBoard.get(
    "/projects/get_project_images.php" +
      generatePHPParameters({ idProject: projectsRslt.id })
  );
  projectsRslt.images = projectsImagesDb.data;

  const projectscommentsDb = await DashBoard.get(
    "/projects/get_project_comments.php" +
      generatePHPParameters({ idProject: projectsRslt.id })
  );
  projectsRslt.comments = projectscommentsDb.data;

  const projectsvideosDb = await DashBoard.get(
    "/projects/get_project_videos.php" +
      generatePHPParameters({ idProject: projectsRslt.id })
  );
  projectsRslt.videos = projectsvideosDb.data;

  const projectsRateDb = await DashBoard.get(
    "/projects/get_project_rate.php" +
      generatePHPParameters({ idProject: projectsRslt.id })
  );
  projectsRslt.rate = projectsRateDb.data;

  reduxStore.dispatch({
    type: SELECT_PROJECT,
    payload: projectsRslt,
  });

  return projectsRslt;
};
