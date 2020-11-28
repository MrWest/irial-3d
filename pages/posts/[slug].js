import React from "react";
import BlogExpanded from "../../src/components/blog/BlogExpanded";
import { selectPostServer } from "../../src/actions";

const BlogPost = (props) => {
  const { selectedPost } = props;
  if (!selectedPost) return <div />;
  return <BlogExpanded selectedPost={selectedPost} />;
};

BlogPost.getInitialProps = async ({ reduxStore, query: { slug } }) => {
  const result = await selectPostServer(reduxStore, slug);
  return result;
};

BlogPost.noFooter = true;

export default BlogPost;
