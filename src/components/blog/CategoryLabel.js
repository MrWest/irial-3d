import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import styles from "./styles/CategporyLabel";

const CategporyLabel = ({ classes, category }) => (
  <Grid container justify="center">
    <Grid item className={classes.PostCategory}>
      {category}
    </Grid>
  </Grid>
);
export default withStyles(styles)(CategporyLabel);
