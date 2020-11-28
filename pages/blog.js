import React from "react";
import BlogHome from "../src/components/blog/BlogHome";
import { fetchPostsServer } from "../src/actions";

const Blog = (props) => {
  const { selectedPost, posts, blogCategories } = props;
  if (!selectedPost || !posts) return <div />;
  return (
    <BlogHome
      selectedPost={selectedPost}
      posts={posts}
      blogCategories={blogCategories}
    />
  );
};

Blog.getInitialProps = async ({ reduxStore }) => {
  const result = await fetchPostsServer(reduxStore);
  return result;
};

export default Blog;
