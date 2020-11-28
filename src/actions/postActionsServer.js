import {
  FETCH_POSTS,
  SELECT_POST,
  FETCH_BLOG_CATEGORIES,
  SET_LANG_ES,
  SET_LANG_EN,
} from "./types";
import WordpressRestAPI from "../apis/wordpressRestAPI";
import {
  generatePHPParameters,
  getLanguage,
  generateAppendParameters,
} from "../apis/tools";
import { log } from "util";

const getCategories = (posts) => {
  const rslt = [];
  posts.forEach((post) => {
    if (!rslt.find((cat) => cat === post.category)) rslt.push(post.category);
  });
  return rslt;
};

export const fetchPostsServer = async (reduxStore) => {
  const lang = getLanguage();
  const language = lang === "en" ? "En" : "Es";
  // console.log(`/posts/?filter%5Bmeta_key%5D=type&filter%5Bmeta_value%5D=VinalesTraveler&filter%5Bmeta_key%5D=language&filter%5Bmeta_value%5D=${language}`);
  const postsFullData = await WordpressRestAPI.get(
    `/posts/?filter%5Bmeta_key%5D=type&filter%5Bmeta_value%5D=VinalesTraveler&filter%5Bmeta_key%5D=language&filter%5Bmeta_value%5D=${language}`
  ).then((res) => res.data);
  const posts = postsFullData.map((post) => {
    const {
      id,
      slug,
      title,
      excerpt,
      acf: { headliner, category, readtime, image, description },
    } = post;
    return {
      id,
      slug,
      title: title.rendered,
      excerpt,
      category,
      headliner,
      readtime,
      image: image.url,
      description,
    };
  });

  reduxStore.dispatch({
    type: FETCH_POSTS,
    payload: posts, //fromDB
  });

  const selectedPost = posts.find((p) => p.headliner === "Yes");

  reduxStore.dispatch({
    type: SELECT_POST,
    payload: selectedPost || {}, //fromDB
  });

  const blogCategories = getCategories(posts);

  reduxStore.dispatch({
    type: FETCH_BLOG_CATEGORIES,
    payload: blogCategories, //fromDB
  });

  return { selectedPost, posts, blogCategories };
};

export const fetchPosts = () => async (dispatch) => {
  const lang = getLanguage();
  const language = lang === "en" ? "En" : "Es";
  // console.log(`/posts/?filter%5Bmeta_key%5D=type&filter%5Bmeta_value%5D=VinalesTraveler&filter%5Bmeta_key%5D=language&filter%5Bmeta_value%5D=${language}`);
  const postsFullData = await WordpressRestAPI.get(
    `/posts/?filter%5Bmeta_key%5D=type&filter%5Bmeta_value%5D=VinalesTraveler&filter%5Bmeta_key%5D=language&filter%5Bmeta_value%5D=${language}`
  ).then((res) => res.data);
  // const blogCategories = await WordpressRestAPI.get(`/categories`).then(res => res.data);
  // const tagsFullData = await WordpressRestAPI.get(`/tags`).then(res => res.data);
  const posts = postsFullData.map((post) => {
    const {
      id,
      slug,
      title,
      excerpt,
      _embedded,
      acf: { headliner, category, readtime, image, description },
    } = post;
    return {
      id,
      slug,
      title: title.rendered,
      excerpt,
      _embedded,
      category,
      headliner,
      readtime,
      image: image.url,
      description,
    };
  });

  dispatch({
    type: FETCH_POSTS,
    payload: posts, //fromDB
  });

  const selectedPost = posts.find((p) => p.headliner === "Yes");

  dispatch({
    type: SELECT_POST,
    payload: selectedPost || {}, //fromDB
  });

  const blogCategories = getCategories(posts);

  dispatch({
    type: FETCH_BLOG_CATEGORIES,
    payload: blogCategories, //fromDB
  });

  return { selectedPost, posts, blogCategories };
};

const GetSmoothPost = (post, comments = [], relatedPosts = []) => {
  const {
    id,
    title,
    content: { rendered },
    acf: {
      category,
      description,
      summary,
      readtime,
      image,
      author_nickname,
      author_fullname,
      author_avatar,
      author_title,
    },
  } = post;
  const postRslt = {
    id,
    slug: post.slug,
    title: title.rendered,
    rendered,
    category,
    comments,
    relatedPosts,
    description,
    summary,
    readtime,
    image: image.url,
    author: {
      nickname: author_nickname,
      fullname: author_fullname,
      avatar: author_avatar,
      title: author_title,
    },
  };

  return postRslt;
};

const slugWorkoutLang = (slug) => {
  const array = slug.split("-");
  return array.pop();
};

export const selectPostServer = async (reduxStore, slug) => {
  if (slugWorkoutLang(slug) === "es")
    reduxStore.dispatch({
      type: SET_LANG_ES,
    });
  else
    reduxStore.dispatch({
      type: SET_LANG_EN,
    });

  const postsFullData = await WordpressRestAPI.get(`/posts/?slug=${slug}`).then(
    (res) => res.data
  );
  const postFullData = postsFullData[0];

  const commentsFullData = await WordpressRestAPI.get(
    `/comments?post=${postFullData.id}`
  ).then((res) => res.data);
  const relatedPostsFullData = await WordpressRestAPI.get(
    `/posts/?filter[meta_key]=category&filter[meta_value]=${postFullData.acf.category}&exclude=${postFullData.id}`
  ).then((res) => res.data);

  const relatedPosts = relatedPostsFullData.map((post) => GetSmoothPost(post));
  const post = GetSmoothPost(postFullData, commentsFullData, relatedPosts);
  reduxStore.dispatch({
    type: SELECT_POST,
    payload: post, //fromDB
  });

  return { post };
};

export const selectPost = (slug) => async (dispatch) => {
  if (slugWorkoutLang(slug) === "es")
    dispatch({
      type: SET_LANG_ES,
    });
  else
    dispatch({
      type: SET_LANG_EN,
    });

  const postsFullData = await WordpressRestAPI.get(`/posts/?slug=${slug}`).then(
    (res) => res.data
  );
  const postFullData = postsFullData[0];

  const commentsFullData = await WordpressRestAPI.get(
    `/comments?post=${postFullData.id}`
  ).then((res) => res.data);
  const relatedPostsFullData = await WordpressRestAPI.get(
    `/posts/?filter[meta_key]=category&filter[meta_value]=${postFullData.acf.category}&exclude=${postFullData.id}`
  ).then((res) => res.data);

  const relatedPosts = relatedPostsFullData.map((post) => GetSmoothPost(post));
  const post = GetSmoothPost(postFullData, commentsFullData, relatedPosts);

  dispatch({
    type: SELECT_POST,
    payload: post, //fromDB
  });

  return { post };
};
