import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withStylesMore } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import  FrontContactForm  from "../forms/frontContactForm";

import { connect } from "react-redux";
import { FacebookProvider, Like, Share, Group, Feed } from 'react-facebook';
import EmbeddedPost from "react-facebook/dist/EmbeddedPost";
import Page from "react-facebook/dist/Page";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 0,
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: "0px !important",
    paddingLeft: "0px !important",
    background: "transparent",
    display: "flex", 
    alignItems: "center",
    justifyContent: "center"
  },
  themePadding: {
    border: "1px solid #ff1333",
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: 1440
    }
  },
  center: {
    width: "100%",
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
  orderButton: {
    background: "#ffffff",
    color: "#3577D4",
    fontWeight: "bold",
    width: "100%"
  },
  cover: {
   display: 'none',
    [theme.breakpoints.up("sm")]: {
      backgroundImage: "url(../static/images/home/about-contact.jpg)",
      backgroundRepeat: "no-repeat",
      display: 'inherit',
      // backgroundSize: "cover",
      backgroundPosition: "right",
      backgroundSize: "contain",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundOpacity: 0.5
    }
  },
  orderBottomButton: {
    color: "#ffffff",
    borderColor: "#ffffff",
    width: "100%",
    fontWeight: "bold",
    marginTop: 20
  },
  hrBar: {
    background: "#188218",
    borderColor: "#188218",
    color: "#188218 !important",
    marginTop: 20,
    marginBottom: 20,
    height: 3,
    width: "25%",
    textAlign: "left !important"
  },
  typographyText: {
    textAlign: "left",
    margin: "20px 0px",
    color: "#188218 !important",
  },
  typographyTextSmall: {
    textAlign: "left",

    marginBottom: 0,
    fontSize: 18
  }
});

class AboutContact extends React.Component {
  state = {};
 

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
       <div  className={classes.center} align="center">
        <Paper elevation={0} style={{ padding: 10, paddingBottom: 7}}>
        <Grid id="aboutus"  container spacing={4} >
          <Grid item xs={12} md={8}>
                <Typography
                variant="h3"
                component="h3"
                className={classes.typographyText}
              >
                {this.props.language.AboutUs}
              </Typography>
              <div className={classes.typographyTextSmall}>
                <div className={classes.hrBar} />
              </div>
              
              <div className={classes.typographyTextSmall}>
              
               {this.props.language.AboutUsText.split('<br/>').map(txt => (<p style={{ fontSize: 18 }}>{txt}</p>))}
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
            <div style={{height: "100%", display: "table"}}>

                  <div style={{display: "table-cell", verticalAlign: "bottom", maxWidth: 360}}>
                    <FacebookProvider appId="269776263974713">
                      <Like href="http://www.facebook.com/vinalestraveler" colorScheme="dark" showFaces={true} share  />
                    </FacebookProvider>
                  </div>
            </div>
            </Grid>
            <Grid item xs={12} md={6} style={{paddingTop: 60}} className={classes.cover}>
            
            </Grid>
            <Grid id="contactus" item xs={12} md={6} style={{paddingLeft: 24, marginBottom: 24}}>
              <FrontContactForm ></FrontContactForm>
            </Grid>
        
        </Grid>
         

          </Paper>
          </div>
      </div>
    );
  }
}

AboutContact.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps
)( withStyles(styles)(AboutContact));
