import { FETCH_TEXTURES, SELECT_TEXTURE } from "./types";

import DashBoard from "../apis/DashBoard";
import { generatePHPParameters, getLanguage } from "../apis/tools";

export const fetchTexturesServer = async (reduxStore) => {
  const texturesDb = await DashBoard.get("/textures/get_textures.php");
  var texturesRslt = texturesDb.data.slice();
  reduxStore.dispatch({
    type: FETCH_TEXTURES,
    payload: texturesRslt,
  });
  return texturesRslt;
};

export const sortTexturesServer = async (
  category,
  sort = "all",
  offset = 0,
  reduxStore
) => {
  const lang = getLanguage(reduxStore);

  let results = undefined;

  let completeUrl = generatePHPParameters({ category, sort, offset, lang });
  // if(category === "all")
  // texturesDb = await DashBoard.get("/textures/get_textures.php"+ generatePHPParameters({lang}))
  //  else
  await DashBoard.get("/textures/get_textures.php" + completeUrl).then(
    async (texturesDb) => {
      var texturesRslt = texturesDb.data.slice();

      const promises = texturesRslt.map(async (texture) => {
        const textureImagesDb = await DashBoard.get(
          "/textures/get_texture_images.php" +
            generatePHPParameters({ idTexture: texture.id })
        );
        texture.images = textureImagesDb.data;

        const texturesRateDb = await DashBoard.get(
          "/textures/get_texture_rate.php" +
            generatePHPParameters({ idTexture: texture.id })
        );
        texture.rate = texturesRateDb.data;

        const textureOwnerInfo = await DashBoard.get(
          "/textures/get_texture_owner_info.php" +
            generatePHPParameters({ user: texture.id_user })
        );
        texture = { ...texture, ownerInfo: { ...textureOwnerInfo.data } };

        return texture;
      });

      results = await Promise.all(promises);
    }
  );

  reduxStore.dispatch({
    type: FETCH_TEXTURES,
    payload: results, //fromDB
  });

  return results;
};

export const selectTextureServer = async (id, reduxStore) => {
  const lang = getLanguage();

  const texturesDb = await DashBoard.post(
    "/textures/get_texture.php" + generatePHPParameters({ id, lang })
  );

  var texturesRslt = texturesDb.data;

  const texturesImagesDb = await DashBoard.get(
    "/textures/get_texture_images.php" +
      generatePHPParameters({ idTexture: texturesRslt.id })
  );
  texturesRslt.images = texturesImagesDb.data;

  const texturescommentsDb = await DashBoard.get(
    "/textures/get_texture_comments.php" +
      generatePHPParameters({ idTexture: texturesRslt.id })
  );
  texturesRslt.comments = texturescommentsDb.data;

  const texturesvideosDb = await DashBoard.get(
    "/textures/get_texture_videos.php" +
      generatePHPParameters({ idTexture: texturesRslt.id })
  );
  texturesRslt.videos = texturesvideosDb.data;

  const texturesRateDb = await DashBoard.get(
    "/textures/get_texture_rate.php" +
      generatePHPParameters({ idTexture: texturesRslt.id })
  );
  texturesRslt.rate = texturesRateDb.data;

  reduxStore.dispatch({
    type: SELECT_TEXTURE,
    payload: texturesRslt,
  });

  return texturesRslt;
};
