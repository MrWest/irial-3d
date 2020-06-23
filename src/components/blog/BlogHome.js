import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from "react-redux";
import FeaturedPost from './FeaturedPost';
import RecentlyPublished from './RecentlyPublished';
import StayInLoop from './StayInLoop';
import Subscribe from './Subscribe';
import styles from './styles/BlogHome';
import { fetchPosts } from "../../actions";
import Loader from '../global/loader';
import { isServer } from '../../apis/tools';

class BlogHome extends Component {
  state = {
    busy: false
  };

  componentWillMount() {

    if(!isServer)
    {
      this.setState({ busy: true });
      this.props.fetchPosts().then(rslt => {
          this.setState({ busy: false });
      });
    }

  }

  render() {
  const { classes, selectedPost, posts, blogCategories } = this.props;
  const { busy } = this.state;
  if (!selectedPost || !selectedPost.slug || !posts || posts.length < 1 || !blogCategories || blogCategories.length < 1) return <div />;
  return (
  <main className={classes.container}>
    <FeaturedPost post={selectedPost} />
    <RecentlyPublished posts={posts} categories={blogCategories} />
    {/* <StayInLoop />*/}
    <Subscribe /> 
    {busy && <Loader />}
  </main>
);
  }
}

const mapStateTopProps = state => {
  return {
    selectedPost: state.selectedPost,
    posts: state.posts,
    blogCategories: state.blogCategories,
    language: state.language
  };
};

export default connect(mapStateTopProps, { fetchPosts })(withStyles(styles)(BlogHome));
