import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import styles from "./styles/RelatedPosts";
import PostCard from "./PostCard";
import { managePosts } from "../../helpers/utils";

const RelatedPosts = ({ classes, relatedPosts, category }) => {
  return relatedPosts && relatedPosts.length > 0 ? (
    <section className={classes.RelatedPosts}>
      <Grid container justify="center">
        <main className={classes.center}>
          <div className={classes.sectionContainer}>
            <p variant="p" align="left" className={classes.Title}>
              Related blog posts
            </p>

            <Grid container spacing={6}>
              {relatedPosts &&
                managePosts(relatedPosts).map((rp) => (
                  <Grid
                    key={rp.id}
                    item
                    xs={12}
                    md={4}
                    className={classes.CardContainer}
                  >
                    <PostCard post={rp} category={category} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </main>
      </Grid>
    </section>
  ) : (
    <div />
  );
};

export default withStyles(styles)(RelatedPosts);
