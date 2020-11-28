import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import PromoInfo from "./promoInfo";
import PromoLinks from "./promoLinks";
import { Grid } from "@material-ui/core";

class PromoField extends Component {
  state = {};
  render() {
    const { classes, models } = this.props;
    // console.log(models);
    return (
      <Grid container justify="center" className={classes.promoField}>
        <Grid container className={classes.center} spacing={0}>
        {/* <Grid item sm={12} md={3} ></Grid> */}
        <Grid container>
          <Grid item md={8} xs={12}>
            <PromoInfo />
          </Grid>
        </Grid>
        <Grid container alignItems="flex-end">
          <Grid item xs={9}>
            {/* <PromoItems models={models}/> */}
          </Grid>
          <Grid item xs={3}>
            <PromoLinks />
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  table: {
    display: "table",
    height: "100%"
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
    } 
  },
  themePadding: {
    border: "1px solid #ff1333",
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: 1440
    }
  },
  center: {
    [theme.breakpoints.up("xl")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      minWidth: "1100px"
    }
  },
});

PromoField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PromoField);
