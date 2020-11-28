import { FETCH_SECTIONS, SELECT_SECTION, UPDATE_SECTION } from "./types";
import DashBoard from "../apis/DashBoard";
import { generatePHPParameters, getLanguage } from "../apis/tools";
import { __await } from "tslib";

//employee-orders_list
export const fetchSections = () => async (dispatch) => {
  const lang = getLanguage();
  let results;

  await DashBoard.get(
    "/sections/get_sections.php" + generatePHPParameters({ lang })
  ).then(async (sectionsDb) => {
    var sectionsRslt = sectionsDb.data.slice();

    const promises = sectionsRslt.map(async (section) => {
      const sectionCategoriesDb = await DashBoard.get(
        "/categories/get_categories.php" +
          generatePHPParameters({ idSection: section.id, lang })
      );
      const categories = sectionCategoriesDb.data;

      const imagesPromises = categories.map(async (category) => {
        const sectionCategoryImagesDb = await DashBoard.get(
          "/categories/get_category_images.php" +
            generatePHPParameters({ idCategory: category.id })
        );
        category.images = sectionCategoryImagesDb.data;
        return category;
      });
      section.categories = await Promise.all(imagesPromises);
      return section;
    });

    results = await Promise.all(promises);
  });

  dispatch({
    type: FETCH_SECTIONS,
    payload: results,
  });

  return results;
};

export const getSection = (id) => async (dispatch) => {
  const lang = getLanguage();

  const sectionsDb = await DashBoard.get(
    "/sections/get_section.php" + generatePHPParameters({ id, lang })
  );

  var sectionsRslt = sectionsDb.data;

  const sectionCategoriesDb = await DashBoard.get(
    "/categories/get_categories.php" +
      generatePHPParameters({ idSection: sectionsRslt.id, lang })
  );
  const categories = sectionCategoriesDb.data;

  const imagesPromises = categories.map(async (category) => {
    const sectionCategoryImagesDb = await DashBoard.get(
      "/categories/get_category_images.php" +
        generatePHPParameters({ idCategory: sectionsRslt.id })
    );
    category.images = sectionCategoryImagesDb.data;
    return category;
  });

  sectionsRslt.categories = await Promise.all(imagesPromises);

  //   const results = await Promise.all(promises)

  dispatch({
    type: SELECT_SECTION,
    payload: sectionsRslt,
  });
};

export const updateSection = (section) => async (dispatch) => {
  const lang = getLanguage();
  const sectionsDb = await DashBoard.post(
    "/sections/update_section.php" +
      generatePHPParameters({
        id: section.id,
        name: section.name,
        description: section.description,
        promotion: section.promotion,
        lang,
      })
  );

  var sectionsRslt = sectionsDb.data;

  const sectionCategoriesDb = await DashBoard.get(
    "/categories/get_categories.php" +
      generatePHPParameters({ idSection: sectionsRslt.id, lang })
  );
  const categories = sectionCategoriesDb.data;

  const imagesPromises = categories.map(async (category) => {
    const sectionCategoryImagesDb = await DashBoard.get(
      "/categories/get_category_images.php" +
        generatePHPParameters({ idCategory: sectionsRslt.id })
    );
    category.images = sectionCategoryImagesDb.data;
    return category;
  });

  sectionsRslt.categories = await Promise.all(imagesPromises);

  //   const results = await Promise.all(promises)

  dispatch({
    type: UPDATE_SECTION,
    payload: sectionsRslt,
  });
};
