import { FETCH_BLOG_CATEGORIES } from "../actions/types";

const BlogCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_BLOG_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export default BlogCategoriesReducer;
