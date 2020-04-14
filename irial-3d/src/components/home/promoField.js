import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import PromoImg from "./promoImg";
import PromoCarousel from "./promoCarousel";
import { Grid } from "@material-ui/core";

class PromoField extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.promoField}>
        <Grid container className={classes.center} spacing={0}>
        {/* <Grid item sm={12} md={3} ></Grid> */}
          <Grid item sm={12} md={12}>
            <PromoCarousel />
          </Grid>
          {/* <Grid item sm={12} md={3} ></Grid> */}
          {/* <Grid item sm={12} md={4} >
           <div   className={classes.table}>
            <PromoImg />
          
            </div>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  table: {
    display: "table",
    height: "100%"
  },
  promoField: {
     
    backgroundImage: "url(../static/images/home/vinales_traveler.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-left",    
    width: "100%",
    display: "flex",    
    minHeight: "90vh",
    alignItems: "center",
    justifyContent: "center",
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
