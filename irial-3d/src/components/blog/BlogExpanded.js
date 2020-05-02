import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from "react-redux";
import Subscribe from './Subscribe';
import styles from './styles/BlogExpanded';
import BlogHeader from './BlogHeader';
import Article from './Article';
import RelatedPosts from './RelatedPosts';
import { selectPost } from "../../actions";
import Loader from '../global/loader';
import { isServer } from '../../apis/tools';

class BlogExpanded extends Component {
  state = {
    busy: true
  };
  componentDidMount() {

    if(!isServer)
    {
      const { slug } = this.props.match.params;
      this.setState({ busy: true });
      this.props.selectPost(slug).then(rslt => {
          this.setState({ busy: false });
      });
    }

  }

  componentDidUpdate() {
    const { selectedPost, match: { params: { slug }} } = this.props;
    const { busy } = this.state;
    if(!busy && selectedPost && selectedPost.slug !== slug)
    {
      this.setState({ busy: true });
      this.props.selectPost(slug).then(rslt => {
          this.setState({ busy: false });
      });
    }

  }


render () {
 const { classes, selectedPost } = this.props;
 const { busy } = this.state;
 if (!selectedPost) return <div />;
 return (
  <main className={classes.container}>
    <BlogHeader post={selectedPost} />
    <Article post={selectedPost} />
    <RelatedPosts relatedPosts={selectedPost.relatedPosts} category={selectedPost.category} />
    <Subscribe />
    {busy && <Loader />}
  </main>
);
}
}


const mapStateTopProps = state => {
  return {
    selectedPost: state.selectedPost,
    language: state.language
  };
};

export default connect(mapStateTopProps, { selectPost })(withStyles(styles)(BlogExpanded));
