import {
  FETCH_TAGS,
  UPDATE_MODEL_TAGS,
  UPDATE_PROJECT_TAGS,
  UPDATE_TEXTURE_TAGS,
  UPDATE_SCENE_TAGS,
} from "./types";
import DashBoard from "../apis/DashBoard";
import { generatePHPParameters, getLanguage } from "../apis/tools";
import { __await } from "tslib";

//employee-orders_list
export const fetchTags = () => async (dispatch) => {
  const lang = getLanguage();

  const tagsDb = await DashBoard.get(
    "/tags/get_tags.php" + generatePHPParameters({ lang })
  );
  var tags = tagsDb.data.slice();

  dispatch({
    type: FETCH_TAGS,
    payload: tags,
  });

  return tags;
};

//employee-orders_list
export const toggleModelTags = (model, tag, toogle) => async (dispatch) => {
  const lang = getLanguage();

  var tags = model.tags;

  if (toogle && model.tags.length < 4) {
    const tagsDb = await DashBoard.get(
      "/tags/add_model_tag.php" +
        generatePHPParameters({ lang, idModel: model.id, idTag: tag })
    );
    var tags = tagsDb.data.slice();
  }

  if (!toogle && model.tags.length > 0) {
    const tagsDb = await DashBoard.get(
      "/tags/delete_model_tag.php" +
        generatePHPParameters({ lang, idModel: model.id, idTag: tag })
    );
    var tags = tagsDb.data.slice();
  }

  dispatch({
    type: UPDATE_MODEL_TAGS,
    payload: tags,
  });
};

export const toggleProjectTags = (project, tag, toogle) => async (dispatch) => {
  const lang = getLanguage();

  var tags = project.tags;

  if (toogle && project.tags.length < 4) {
    const tagsDb = await DashBoard.get(
      "/tags/add_project_tag.php" +
        generatePHPParameters({ lang, idProject: project.id, idTag: tag })
    );
    var tags = tagsDb.data.slice();
  }

  if (!toogle && project.tags.length > 0) {
    const tagsDb = await DashBoard.get(
      "/tags/delete_project_tag.php" +
        generatePHPParameters({ lang, idProject: project.id, idTag: tag })
    );
    var tags = tagsDb.data.slice();
  }

  dispatch({
    type: UPDATE_PROJECT_TAGS,
    payload: tags,
  });
};

export const toggleTextureTags = (texture, tag, toogle) => async (dispatch) => {
  const lang = getLanguage();

  var tags = texture.tags;

  if (toogle && texture.tags.length < 4) {
    const tagsDb = await DashBoard.get(
      "/tags/add_texture_tag.php" +
        generatePHPParameters({ lang, idTexture: texture.id, idTag: tag })
    );
    var tags = tagsDb.data.slice();
  }

  if (!toogle && texture.tags.length > 0) {
    const tagsDb = await DashBoard.get(
      "/tags/delete_texture_tag.php" +
        generatePHPParameters({ lang, idTexture: texture.id, idTag: tag })
    );
    var tags = tagsDb.data.slice();
  }

  dispatch({
    type: UPDATE_TEXTURE_TAGS,
    payload: tags,
  });
};

export const toggleSceneTags = (scene, tag, toogle) => async (dispatch) => {
  const lang = getLanguage();

  var tags = scene.tags;

  if (toogle && scene.tags.length < 4) {
    const tagsDb = await DashBoard.get(
      "/tags/add_scene_tag.php" +
        generatePHPParameters({ lang, idScene: scene.id, idTag: tag })
    );
    var tags = tagsDb.data.slice();
  }

  if (!toogle && scene.tags.length > 0) {
    const tagsDb = await DashBoard.get(
      "/tags/delete_scene_tag.php" +
        generatePHPParameters({ lang, idScene: scene.id, idTag: tag })
    );
    var tags = tagsDb.data.slice();
  }

  dispatch({
    type: UPDATE_SCENE_TAGS,
    payload: tags,
  });
};
