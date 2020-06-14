import { combineReducers } from "redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import { loadState } from "../apis/LocalStorage";

import SignReducer from "./signReducer";
import AccountViewReducer from "./accountReducer";
import ProfileReducer from "./profileReducer";
import SectionsReducer from "./sectionsReducer";
import { reducer as reduxFormReducer } from "redux-form";
import ToursReducer from "./toursReducer";
import SelectedTourReducer from "./selectedTourReducer";
import AttractionsReducer from "./attractionsReducer";
import SelectedAttractionsReducer from "./selectedAttractionReducer";
import CategoriesReducer from "./categoriesReducer";
import SelectedSectionReducer from "./selectedSectionReducer"
import SelectedCategoryReducer from "./selectedCategoryReducer"
import LanguageReducer from "./languageReducer";
import SignFacebookReducer from "./signFacebookReducer";
import RedirectUrlReducer from "./redirectUrlReducer";
import ServiceRateReducer from "./serviceRateReducer";
import PostsReducer from "./postsReducer";
import SelectedPostReducer from "./selectedPostReducer";
import BlogCategoriesReducer from "./blogCategoriesReducer";
import ModelsReducer from "./modelsReducer";
import SelectedModelReducer from "./selectedModelReducer";
import ProjectsReducer from "./projectsReducer";
import SelectedProjectReducer from "./selectedProjectReducer";
import TexturesReducer from "./texturesReducer";
import SelectedTextureReducer from "./selectedTextureReducer";
import TagsReducer from "./tagsReducer";
import CartReducer from "./cartReducer";


export default combineReducers({
  accountView: AccountViewReducer,
  sign: SignReducer,
  profile: ProfileReducer,
  sections: SectionsReducer,
  form: reduxFormReducer,
  tours: ToursReducer,
  selectedTour: SelectedTourReducer,
  attractions: AttractionsReducer,
  selectedAttraction: SelectedAttractionsReducer,
  categories: CategoriesReducer,
  selectedSection: SelectedSectionReducer,
  selectedCategory: SelectedCategoryReducer,
  language: LanguageReducer,
  signFacebook: SignFacebookReducer,
  redirectUrl: RedirectUrlReducer,
  serviceRate: ServiceRateReducer,
  posts: PostsReducer,
  selectedPost: SelectedPostReducer,
  blogCategories: BlogCategoriesReducer,
  models: ModelsReducer,
  selectedModel: SelectedModelReducer,
  projects: ProjectsReducer,
  selectedProject: SelectedProjectReducer,
  textures: TexturesReducer,
  selectedTexture: SelectedTextureReducer,
  tags: TagsReducer,
  cart: CartReducer
});

//Will Change
// let initialState = loadState();

// if (initialState === undefined)
//   initialState = { login: false, selected: 0, theme: 0, accountView: 0 };

// console.log("Initial State   ", initialState);

// const reducers = (state = initialState, action) => {
//   switch (action.type) {
//     case "LOG_IN":
//       window.location.href = "/";
//       return { ...state, login: true };
//     case "LOG_OUT":
//       return { ...state, login: false };
//     case "SELECT_PACK":
//       return { ...state, selected: action.selected };
//     case "SELECT_THEME":
//       return { ...state, theme: action.theme };
//     case "SELECT_ACCOUNT_VIEW":
//       return { ...state, accountView: action.accountView };
//     default:
//       return state;
//   }
// };

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export default createStore(
//   reducers,
//   initialState,
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default createStore(reducer, { login: false });
