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
       <Grid item  >
        
        <Grid container id="aboutus" spacing={4} className={classes.center}>
          <Grid item xs={12} md={8}>
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
          </Grid>
      </Grid>
    );

    
const styles = theme => ({
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
  hrBar: {
    background: "#337ab7",
    borderColor: "#337ab7",
    color: "#337ab7 !important",
    marginTop: 20,
    marginBottom: 20,
    height: 3,
    width: "25%",
    textAlign: "left !important"
  },
  typographyText: {
    textAlign: "left",
    margin: "20px 0px",
    color: "#337ab7 !important",
  },
  typographyTextSmall: {
    textAlign: "left",

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
