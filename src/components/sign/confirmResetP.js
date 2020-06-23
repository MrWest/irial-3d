import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
// import "../../styles/Sign.css";
import {CustomWidthButton} from "../buttons"


class ConfirmResetP extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container} align="center">
      <div className={classes.topBackground}>
      <img
        src="images/public/su-logo@3x.png"
        className="swagup-big-banner"
      />
      </div>
      <Paper className={classes.paper} elevation={4} style={{backgroundColor: 'white'}}> 
          <div >
            <p
              variant="p"
              component="p"
              align="left"
            >
             Hi {"{Name}"},<br/>
              Someone recently requested a password change for your SwagUp account. If this was you, press the button below: 
            </p>

            <div align="left"  style={{paddingTop: 40}}>
              <CustomWidthButton               
                href="/rpassword"               
                className={classes.submitButton}
               width={254}
                
              >
                Reset Password
              </CustomWidthButton>
            </div>
            <p
              variant="p"
              component="p"
              align="left"
              style={{marginTop: 40}}
            >
            If you don't want to change your password or didn't request this, just ignore and delete this message.
            <br/>
            To keep your account secure, please don't forward this email to anyone.   
            </p>
            <p
              variant="p"
              component="p"
              align="left"
              style={{marginTop: 32}}
            >
            Cheers!
            <br/>
            <br/>
            The SwagUp Team
            <br/>
            <Link className="strong font-14 " to="/">
            team@swagup.com
            </Link>
           
            </p>
            
          </div>
          </Paper>
          <p
              variant="p"
              component="p"
              align="center"
              style={{marginTop: 40, marginBottom: 40, fontSize: 12}}
            >
            © 2018 SwagUp LLC. All rights reserved.
            <br/>
            2607 New York Ave, Union City, NJ 07087
            <br/>
            We take your privacy seriously: please check out our {" "}
             <Link className="strong font-14 " to="/">
             Privacy Policy.
            </Link> 
           
           
            </p>

      </div>
    );
  }
}

const styles = theme => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130,
    height: "100%",
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
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "100vw"
    }
  },
  topBackground: {
    height: 256,
    padding: "44px 5% 10% 5%",
    backgroundColor: "#3577d4", 
    textAlign: "center"
  },
  paper: {
    marginTop: -122,
    backgroundColor: "#fffff", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 90,
    backgroundColor: "transparent",
    [theme.breakpoints.down('sm')]: {
      margin: "-142px 3% 80px 3%",
      padding: 15
    },
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
  submitButton: {  
      backgroundColor: "#3577d4 !important",
      color: "#ffffff !important",
      textDecorationLine: "none !important",
      width: "40%",
      paddingTop: "14px !important",
      paddingTottom: "15px !important",
      [theme.breakpoints.down('sm')]: {
        width: "100%",
      }     
   
  }
});

ConfirmResetP.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfirmResetP);
