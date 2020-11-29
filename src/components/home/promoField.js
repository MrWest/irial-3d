import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import PromoInfo from "./promoInfo";
import PromoItems from "./promoItems";
import PromoLinks from "./promoLinks";
import { Grid } from "@material-ui/core";

const PromoField = ({ classes, models }) => (
  <Grid container justify="center" className={classes.promoField}>
    <Grid container className={classes.center} spacing={0}>
      <Grid container>
        <Grid item md={8} xs={12}>
          <PromoInfo />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" alignItems="flex-end">
        <Grid item md={9} sm={8} className={classes.noMobile}>
          <PromoItems models={models} />
        </Grid>
        <Grid item md={3} sm={4} xs={8}>
          <PromoLinks />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const styles = (theme) => ({
  noMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  promoField: {
    backgroundImage: "url(../static/images/home/irial-3d-city-front.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-left",
    width: "100%",
    display: "flex",
    minHeight: "90vh",
    paddingTop: 92,
    paddingBottom: 32,
    objectFit: "cover",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "scale",
      paddingTop: 116,
    },
  },
  center: {
    [theme.breakpoints.up("xl")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      minWidth: "1100px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
});

PromoField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PromoField);
