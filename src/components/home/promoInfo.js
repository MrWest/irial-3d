import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { CoolHashLink} from "../buttons"
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

class PromoInfo extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1 className={classes.title}>Irial  3D</h1>
        <h2 className={classes.content}>Lumion Networkig</h2>
        <h3 className={classes.subContent}>3D Models, Learning &amp; Jobs</h3>
        
          {/* <h1 className={classes.pText}>{this.props.language.welcome}</h1>
          <p variant="p" component="p" className={classes.pTextSmallFirst}>
          {this.props.language.fistp}
          </p>
          <p variant="p" component="p" className={classes.pTextSmall}>
          {this.props.language.secondp} <br/>
          {this.props.language.thirdp}
          </p>
          <Grid container  justify="center" style={{ maxWidth: "100vw"}}>
            <Grid item>
                <CoolHashLink            
                height={66} width={360} fill={"#ffffff"} color={"#337ab7"}
                href="/#front-tour-promo"
                data-scroll
                // onClick={()=>{
                  
                //    this.props.language.setLanguage('en');
                // }}
              >
                {this.props.language.button}
              </CoolHashLink>
            </Grid>
          
          </Grid> */}
         
        </div>
     
    );
  }
}

PromoInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

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
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
    textTransform: 'uppercase'
  },
  content: {
    fontFamily: 'Gloss',
    fontSize: 56,
    letterSpacing: 2,
    margin: 0,
    color: '#e3a304',
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
  },
  subContent: {
    fontFamily: 'Gloss',
    fontSize: 28,
    letterSpacing: 1,
    margin: 0,
    color: '#e3a304',
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
  },
  orderButton: {   
    background: "#ffffff",   
    color: "#3577D4",
    textAlign: "center !important",
    borderRadius: 4,
    marginBottom: 0,
    "&: hover": {
      color: "#ffffff !important",
      backgroundColor: "#ff00ff !important",
      textDecorationLine: "none",
      fontSize: 36
    },
     [theme.breakpoints.down("sm")]: {
      fontSize: 14
    }
  },
  pText: {
    // color: "#ffffff !important",
    // margin: "20px 0px",
    // fontWeight: "bold"
    textShadow: "4px 4px 0 rgba(0, 0, 0, 0.75)",
    textAlign: "center",
    marginTop: 100,
    fontFamily: "Futura",
    fontSize: 64,
    fontWeight: 900,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    color: "#ffffff",
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      marginTop: 50,
      fontSize: 32,
      position: "relative",
      maxWidth: "100vw",
      paddingLeft: 10,
      paddingRight: 10
    }
  },
  pTextSmall: {
    // color: "#ffffff !important",
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.6,
    letterSpacing: "normal",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
     display: "none"
    }
  },
  pTextSmallFirst: {
    // color: "#ffffff !important",
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 0,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.6,
    letterSpacing: "normal",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      marginTop: 18,
      fontSize: 16,
      position: "relative",
      maxWidth: "100vw",
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 30,
    }
  }
});

const mapStateToProps = state => {
  
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(PromoInfo));


// export default withStyles(styles)(PromoInfo);
