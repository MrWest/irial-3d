import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import CategoryLabel from "./CategoryLabel";
import styles from "./styles/BlogHeader";

const BlogHeader = ({ classes, post }) => (
  <section className={classes.BlogHeader}>
    <Grid container justify="center" className={classes.containerPartnerWU}>
      <main className={classes.center}>
        <div className={classes.sectionContainer}>
          <Grid container>
            <Grid item xs={12} className={classes.BlogIntro}>
              <div className={classes.BlogIntroContainer}>
                <div className={classes.TimeReading}>
                  {post.readtime} min read
                </div>
                <h1 className={classes.BlogTitle}>{post.title}</h1>
                <p className={classes.BlogSummary}>{post.description}</p>
                <CategoryLabel category={post.category} />
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
    </Grid>
  </section>
);

export default withStyles(styles)(BlogHeader);
