import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import  FrontContactForm  from "../forms/frontContactForm";
import { Facebook, LinkedIn, GTranslate } from "@material-ui/icons";
import { connect } from "react-redux";
import { FacebookProvider, Like } from 'react-facebook';
import styles from './styles/aboutContact';
// import EmbeddedPost from "react-facebook/dist/EmbeddedPost";
// import Page from "react-facebook/dist/Page";

const AboutContact = ({ classes, language }) => (
      <Grid container justify="center">
      {/* style={{ background: "#1c5375", backgroundImage: 'url(../static/images/home/city-hill.svg' }} */}
        <div className={classes.cover} >
          <Grid container id="aboutus" justify="center" >
          <Grid item className={classes.center}>
            <Grid container spacing={4} alignItems="stretch" >
                <Grid item xs={12} md={6}  >
                  <div className={classes.aboutPic}/>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container alignItems="flex-end" className={classes.aboutContent}>
                    <Grid item>
                        <h3 className={classes.typographyTextBlue} >
                          {language.AboutUs}
                        </h3>
                      <div className={classes.typographyTextSmall}>
                        <div className={classes.hrBarGold} />
                      </div>
                      
                      <div className={classes.typographyTextSmall} style={{ textAlign: 'justify' }}>
                      
                      {language.AboutUsText && language.AboutUsText.split('<br/>').map(txt => (<p key={txt} style={{ fontSize: 18 }}>{txt}</p>))}
                      </div>
                      </Grid>
                      </Grid>
                  </Grid> 
                 <Grid item xs={12} md={8}>
                 <div className={classes.offerContent} >
                        <h3
                        className={classes.typographyTextBlue}
                      >
                        {language.WhatWeOffer}
                      </h3>
                      <div className={classes.typographyTextSmall}>
                        <div className={classes.hrBarGold} />
                      </div>
                      
                      <div className={classes.typographyTextSmall} style={{ textAlign: 'justify' }}>
                      
                      {language.WhatWeOfferText && language.WhatWeOfferText.split('<br/>').map(txt => (<p key={txt} style={{ fontSize: 18 }}>{txt}</p>))}
                      </div>
                    </div>
                 </Grid>
                </Grid>
                </Grid>
            </Grid>
        </div>
        <Grid container className={classes.coverContact} >
           <Grid container justify="center" style={{paddingBottom: 64, paddingTop: 42, background: 'rgba(255,255,255,0.6)' }}>
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
            <div style={{ height: 16, width: '100%', backgroundImage: 'linear-gradient(rgba(255,255,255,0.6), transparent)' }} />
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


const mapStateToProps = state => {
  
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(AboutContact));
