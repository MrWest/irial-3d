import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import  FrontContactForm  from "../forms/frontContactForm";
import { Facebook, LinkedIn, GTranslate } from "@material-ui/icons";
import { connect } from "react-redux";
import { FacebookProvider, Like, Share, Group, Feed } from 'react-facebook';
// import EmbeddedPost from "react-facebook/dist/EmbeddedPost";
// import Page from "react-facebook/dist/Page";

const AboutContact = ({ classes, language }) => (
      <Grid container justify="center">
      {/* style={{ background: "#1c5375", backgroundImage: 'url(../static/images/home/city-hill.svg' }} */}
        <div className={classes.cover} >
          <Grid container id="aboutus" justify="center" >
          <Grid item className={classes.center}>
            <Grid container >
              <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                  <div className={classes.aboutContent}>
                        <h3
                        className={classes.typographyTextBlue}
                      >
                        {language.AboutUs}
                      </h3>
                      <div className={classes.typographyTextSmall}>
                        <div className={classes.hrBarGold} />
                      </div>
                      
                      <div className={classes.typographyTextSmall} style={{ textAlign: 'justify' }}>
                      
                      {language.AboutUsText.split('<br/>').map(txt => (<p style={{ fontSize: 18 }}>{txt}</p>))}
                      </div>
                    </div>
                  </Grid> 
                 <Grid item xs={12} md={8}>
                 <div className={classes.offerContent} sty>
                        <h3
                        className={classes.typographyTextBlue}
                      >
                        {language.WhatWeOffer}
                      </h3>
                      <div className={classes.typographyTextSmall}>
                        <div className={classes.hrBarGold} />
                      </div>
                      
                      <div className={classes.typographyTextSmall} style={{ textAlign: 'justify' }}>
                      
                      {language.WhatWeOfferText.split('<br/>').map(txt => (<p style={{ fontSize: 18 }}>{txt}</p>))}
                      </div>
                    </div>
                 </Grid>
                </Grid>
                </Grid>
            </Grid>
        </div>
        <Grid container className={classes.coverContact} >
           <Grid container justify="center" style={{paddingBottom: 42, paddingTop: 42, background: 'rgba(255,255,255,0.6)' }}>
              <Grid item className={classes.center}>
              <Grid container >
              <Grid item xs={12} md={8} style={{ paddingTop: 32 }}>
              <p className={classes.typographyTextSmallBlue}>
                  {language.ContactUsText}
               </p>
                <FrontContactForm ></FrontContactForm>    
              </Grid>
              <Grid id="contactus" item xs={12} md={4} style={{paddingLeft: 56}}>
              <Grid item xs={12} >
                <h3
                variant="h3"
                component="h3"
                className={classes.typographyTextBlue}>
                    {language.ContactUs}
                  </h3> 
                  <div className={classes.hrBarGold} />

                  <p className={classes.typographyTextSmallBlue} style={{ marginBottom: 16 }}><strong>{language.Phone}:</strong> +53 54884414</p>
                  <p className={classes.typographyTextSmallBlue} style={{ marginBottom: 16 }}><strong>{language.Phone}:</strong> +53 54884414</p>
                  <p className={classes.typographyTextSmallBlue} style={{ marginBottom: 16 }}><strong>Email:</strong> solution3angle@gmail.com</p>
                  <p className={classes.typographyTextSmallBlue} style={{ marginBottom: 16 }}><strong>Email:</strong> atlasenter84@gmail.com</p>
                  <p className={classes.typographyTextSmallBlue} > <strong>Facebook:</strong> @solutiontriangle</p>
                  <FacebookProvider appId="269776263974713">
                        <Like href="http://www.facebook.com/vinalestraveler" colorScheme="dark" showFaces={true} share  />
                   </FacebookProvider>
                </Grid>     
                
              </Grid>
            </Grid>
            </Grid>
           
            </Grid>
            <Grid container justify="center" style={{ paddingTop: 104, paddingBottom: 104 }}>
              <Grid item className={classes.center}>
                <Grid container justify="center">
                  <Grid item>
                        <p className={classes.followUs}>{language.FollowUs}</p>
                  </Grid>
                </Grid>
                <Grid container>
                <Grid item xs>
                  <Grid container justify="center">
                    <Grid item xs>
                        <Grid container justify="center">
                          <Facebook style={{ fontSize: 92, color: '#ffffff' }} />
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container justify="center">
                          <LinkedIn style={{ fontSize: 92, color: '#ffffff' }} />
                        </Grid>
                    </Grid>
                    <Grid item xs>
                      <Grid container justify="center">
                        <GTranslate style={{ fontSize: 92, color: '#ffffff' }} />
                      </Grid>
                    </Grid>
                  </Grid>
             
                  </Grid>
                </Grid>
              </Grid>
              
            </Grid>
          </Grid>

        
       
          </Grid>
    );

    
const styles = theme => ({
  aboutContent: {
    paddingTop: 56,
    paddingBottom: 0
  },
  offerContent: {
    paddingTop: 24,
    paddingBottom: 72,
  [theme.breakpoints.down('sm')]: {
    paddingTop: 56
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
  cover: {
   display: 'none',
    [theme.breakpoints.up("sm")]: {
      // backgroundImage: "url(../static/images/home/about-contact.jpg)",
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
       backgroundImage: "url(../static/images/home/about-us-background.png)",
       backgroundRepeat: "no-repeat !important",
       display: 'inherit',
       backgroundSize: "cover",
       backgroundPosition: "left top  !important",
      //  backgroundSize: "48% !important",
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
  hrBarGold: {
    background: "#e3a304",
    borderColor: "#e3a304",
    color: "#e3a304 !important",
    marginTop: 0,
    marginBottom: 20,
    height: 3,
    width: "25%",
    textAlign: "left !important"
  },
  followUs: {
    color: "#e3a304",
    fontSize: 32,
    marginBottom: 32
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
  typographyTextBlue: {
    textAlign: "left",
    margin: "20px 0px",
    marginBottom: 0,
    fontSize: 28,
    color: "#1c5375",
    fontFamily: 'Gloss',
    letterSpacing: 2,
    textShadow: '1px 1px 0 rgba(20, 20, 20, 0.75)'
  },
  typographyTextSmall: {
    textAlign: "left",
    fontFamily: 'Arial',
    marginBottom: 0,
    fontSize: 18
  },
  typographyTextSmallBlue: {
    textAlign: "left",
    fontFamily: 'Arial',
    color: "#1c5375",
    marginBottom: 32,
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
