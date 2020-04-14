import { FETCH_CATEGORIES, SELECT_CATEGORY, DELETE_CATEGORY} from "./types";
import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage} from "../apis/tools";

export const getCategories = idSection => async dispatch => {

    const lang = getLanguage()

    const categoriesDb = await DashBoard.post("/categories/get_categories.php"+generatePHPParameters({idSection, lang}))
    
    var categoriesRslt = categoriesDb.data.slice()
        
       
  
       dispatch({
        type: FETCH_CATEGORIES,
        payload: categoriesRslt//fromDB
      });
  
  
    };

    export const getCategory = id => async dispatch => {

      const lang = getLanguage()


      const categoriesDb = await DashBoard.post("/categories/get_category.php"+generatePHPParameters({id, lang}))
      
      var categoryRslt = categoriesDb.data
          
      const sectionCategoryImagesDb = await DashBoard.get("/categories/get_category_images.php"+ generatePHPParameters({idCategory: categoryRslt.id}))
      categoryRslt.images = sectionCategoryImagesDb.data
         
    
         dispatch({
          type: SELECT_CATEGORY,
          payload: categoryRslt//fromDB
        });
    
        return categoryRslt;
      };

      export const getCategoryServer = async (id, reduxStore) => {

        const lang = getLanguage()
  
  
        const categoriesDb = await DashBoard.post("/categories/get_category.php"+generatePHPParameters({id, lang}))
        
        var categoryRslt = categoriesDb.data
            
        const sectionCategoryImagesDb = await DashBoard.get("/categories/get_category_images.php"+ generatePHPParameters({idCategory: categoryRslt.id}))
        categoryRslt.images = sectionCategoryImagesDb.data
           
      
        if(reduxStore)
        reduxStore.dispatch({
            type: SELECT_CATEGORY,
            payload: categoryRslt//fromDB
          });
      
          return categoryRslt;
        };

        
      export const updateCategory = category => async dispatch => {

        const lang = getLanguage()
        var headers = {
          "Content-Type": "multipart/form-data"
        };

      
        let uploadInfo = new FormData();
        uploadInfo.append("id", category.id);
        uploadInfo.append("name", category.name);
        uploadInfo.append("slogan", category.slogan);
        uploadInfo.append("promotion", category.promotion);
        uploadInfo.append("lang", lang);
        if(category.icon_path !== null){

          uploadInfo.append("icon_path", category.icon_path);

        }

    
        const categoriesDb = await DashBoard.post("/categories/update_category.php", uploadInfo,  {headers})
      
       var categoryRslt = categoriesDb.data
          
      const sectionCategoryImagesDb = await DashBoard.get("/categories/get_category_images.php"+ generatePHPParameters({idCategory: categoryRslt.id}))
      categoryRslt.images = sectionCategoryImagesDb.data
         
    
         dispatch({
          type: SELECT_CATEGORY,
          payload: categoryRslt//fromDB
        });
    
      };

      export const addCategory = category => async dispatch => {
      
        var headers = {
          "Content-Type": "multipart/form-data"
        };

      
        let uploadInfo = new FormData();
        
        uploadInfo.append("id_section", category.id_section);
        uploadInfo.append("name", category.name);
        uploadInfo.append("slogan", category.slogan);
        uploadInfo.append("promotion", category.promotion);
    
        if(category.icon_path !== null){

          uploadInfo.append("icon_path", category.icon_path);

        }
        else
        uploadInfo.append("icon_path", "");

    
        const categoriesDb = await DashBoard.post("/categories/add_category.php", uploadInfo,  {headers})
      
       //  getCategories(1)
    
      };

      export const uploadCategoryImage = info => async dispatch => {
      
        var headers = {
          "Content-Type": "multipart/form-data"
        };

      
        let uploadInfo = new FormData();
        uploadInfo.append("categoryId", info.categoryId);
        uploadInfo.append("fileName", info.fileName);
        uploadInfo.append("categoryName", info.categoryName);
    
        if(info.file !== null){

          uploadInfo.append("file", info.file);

          const categoryAPI = await DashBoard.post("/categories/upload_category_image.php", uploadInfo,  {headers});

          // getCategory(info.idCategory)
        }



        
      };

      export const deleteCategory= id => async dispatch => {

        const categoriesDb = await DashBoard.post("/categories/delete_category.php"+ generatePHPParameters({id}))
        dispatch({
          type: DELETE_CATEGORY,
          payload: id
        });
      }

      export const deleteCategoryImage = id => async dispatch => {

        const categoriesDb = await DashBoard.post("/categories/delete_category_image.php"+ generatePHPParameters({id}))

      }