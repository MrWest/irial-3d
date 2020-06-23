import React from 'react';
import { withStyles, Grid, Card, CardContent } from '@material-ui/core';
import Link from '../buttons/extension';
import CategoryLabel from './CategoryLabel';
import styles from './styles/PostCard';
// import { getFeaturedmedia } from '../../helpers/utils';

const descriptionLeverage = description =>
  description && description.length > 120 ? `${description.substring(0, 120)}...` : description;

const PostCard = ({ classes, post, category }) => (
  <Link to={`/posts/${post.slug}`}>
    <Card className={classes.Card}>
      <img
        className={classes.Media}
        src={post.image}
        alt={post.slug}
        title="Paella dish"
      />
      <CardContent>
        <div style={{ padding: '8px 18px' }}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container justify="flex-start">
                <Grid item>
                  <CategoryLabel category={category} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} align="right">
              <div className={classes.TimeReading}>{post.readtime} min read</div>
            </Grid>
          </Grid>
          <h3 className={classes.PostTitle}>{post.title}</h3>
          <p className={classes.PostSummary}>{descriptionLeverage(post.description)}</p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default withStyles(styles)(PostCard);
