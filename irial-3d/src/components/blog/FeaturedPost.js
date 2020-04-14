import React from 'react';
import { withStyles, Grid, Fab } from '@material-ui/core';
import Link from '../buttons/extension';
import Router from 'next/router';
import styles from './styles/FeaturedPost';
import { getFeaturedmedia } from '../../helpers/utils';

const FeaturedPost = ({ classes, post }) => (
  <Grid container justify="center" className={classes.containerPartnerWU}>
    <main className={classes.center}>
      <div className={classes.sectionContainer}>
        <h1 className={classes.Title}>Featured post</h1>
        <Grid container>
          <Grid item md={5} xs={12} style={{}}>
            <img src={post.image} alt={post.slug} className={classes.PostImage} />
          </Grid>
          <Grid item md={7} xs={12} className={classes.PostDescription}>
            <Grid container>
              <Grid item xs={6}>
                <div className={classes.PostCategory}>{post.category}</div>
              </Grid>
              <Grid item xs={6} align="right">
                <div className={classes.TimeReading}>{post.readtime} min read</div>
              </Grid>
            </Grid>
            <h1 className={classes.FeaturedPostTitle}>{post.title}</h1>
            <div className={classes.PostSummary} dangerouslySetInnerHTML={{ __html: post.description }} />
            <div className={classes.FeaturedPostActions}>
              <Fab
                className={classes.ReadMoreButton}
                onClick={() => {
                  Router.push(`/posts/${post.slug}`);
                }}
              >
                Read more
              </Fab>
            </div>
          </Grid>
        </Grid>
      </div>
    </main>
  </Grid>
);

export default withStyles(styles)(FeaturedPost);
