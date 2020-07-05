import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import  FrontContactForm  from "../forms/frontContactForm";

import { connect } from "react-redux";
import { FacebookProvider, Like, Share, Group, Feed } from 'react-facebook';
// import EmbeddedPost from "react-facebook/dist/EmbeddedPost";
// import Page from "react-facebook/dist/Page";

const AboutContact = ({ classes, language }) => (
      <Grid container justify="center">
      
        <div className={classes.cover} style={{ background: "#1c5375", backgroundImage: 'url(../static/images/home/city-hill.svg' }}>
          <Grid container id="aboutus" justify="center" >
          <Grid item className={classes.center}>
            <Grid container >
                <Grid item xs={12} md={8}>
                  <div className={classes.aboutContent}>
                        <h3
                        className={classes.typographyText}
                      >
                        {language.AboutUs}
                      </h3>
                      <div className={classes.typographyTextSmall}>
                        <div className={classes.hrBar} />
                      </div>
                      
                      <div className={classes.typographyTextSmall}>
                      
                      {language.AboutUsText.split('<br/>').map(txt => (<p style={{ fontSize: 18 }}>{txt}</p>))}
                      </div>
                    </div>
                  </Grid> 
                
                  <Grid item xs={12} md={4} >

                          {/* <div style={{display: "table-cell", verticalAlign: "bottom", maxWidth: 360}}>
                            <FacebookProvider appId="269776263974713">
                              <Like href="http://www.facebook.com/vinalestraveler" colorScheme="dark" showFaces={true} share  />
                            </FacebookProvider>
                          </div> */}
                  </Grid>
                </Grid>
                </Grid>
            </Grid>
        </div>
        <div className={classes.coverContact} >
           <Grid container justify="center">
              <Grid item className={classes.center}>
              <Grid container>
              <Grid item xs={12} md={6} style={{paddingTop: 60}} />
              <Grid id="contactus" item xs={12} md={6} style={{paddingLeft: 24, marginBottom: 24}}>
                <FrontContactForm ></FrontContactForm>
              </Grid>
            </Grid>
            </Grid>
            </Grid>
          </div>

        
       
          </Grid>
    );

    
const styles = theme => ({
  aboutContent: {
    paddingTop: 72,
    paddingBottom: 72
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
  cover: {
   display: 'none',
    [theme.breakpoints.up("sm")]: {
      backgroundImage: "url(../static/images/home/about-contact.jpg)",
      backgroundRepeat: "no-repeat !important",
      display: 'inherit',
      // backgroundSize: "cover",
      backgroundPosition: "right  !important",
      backgroundSize: "contain !important",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundOpacity: 0.5
    }
  },
  coverContact: {
    display: 'none',
     [theme.breakpoints.up("sm")]: {
       backgroundImage: "url(../static/images/home/dark-city.svg)",
       backgroundRepeat: "no-repeat !important",
       display: 'inherit',
       // backgroundSize: "cover",
       backgroundPosition: "left  !important",
       backgroundSize: "48% !important",
       width: "100%",
       alignItems: "center",
       justifyContent: "center",
       backgroundOpacity: 0.5
     }
   },
  hrBar: {
    background: "#fafafa",
    borderColor: "#fafafa",
    color: "#fafafa !important",
    marginTop: 0,
    marginBottom: 20,
    height: 3,
    width: "25%",
    textAlign: "left !important"
  },
  typographyText: {
    textAlign: "left",
    margin: "20px 0px",
    marginBottom: 0,
    fontSize: 28,
    color: '#e3a304',
    fontFamily: 'Gloss',
    letterSpacing: 2,
    textShadow: '1px 1px 0 rgba(20, 20, 20, 0.75)'
  },
  typographyTextSmall: {
    textAlign: "left",
    color: '#ffffff',
    marginBottom: 0,
    fontSize: 18
  }
});


const mapStateToProps = state => {
  
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(AboutContact));
