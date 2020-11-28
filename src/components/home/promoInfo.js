import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

const PromoInfo = ({ classes }) => (
      <div className={classes.root}>
        <h1 className={classes.title}>Irial  3D</h1>
        <h2 className={classes.content}>Lumion Networkig</h2>
        <h3 className={classes.subContent}>3D Models, Learning &amp; Jobs</h3>
      </div>
     
    );
    

const styles = theme => ({
  root: {
    paddingTop: 0,
    background: "transparent",
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
    width: "100%"
    
  },
  title: {
    fontFamily: 'Delvon',
    fontSize: 224,
    letterSpacing: 12,
    margin:0,
    color: '#1c5375',
    // textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: 92,
      textAlign: 'center'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 64
    }
  },
  content: {
    fontFamily: 'Gloss',
    fontSize: 56,
    letterSpacing: 2,
    margin: 0,
    color: '#e3a304',
    textShadow: "2px 4px 0 rgba(0, 0, 0, 0.55)",
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
      textAlign: 'center'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 24
    }
  },
  subContent: {
    fontFamily: 'Gloss',
    fontSize: 28,
    letterSpacing: 1,
    margin: 0,
    color: '#e3a304',
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
      textAlign: 'center'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 16
    }
  }
});

const mapStateToProps = state => ({
    language: state.language
  });

export default connect(
  mapStateToProps
)(withStyles(styles)(PromoInfo));


// export default withStyles(styles)(PromoInfo);
