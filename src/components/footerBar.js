import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// import { Link } from "react-router-dom";
import Link from 'next/link';
import {IconVTLogo} from "./icons"

const IrialLogo = ({ classes }) => ( 
  <img
    src="/static/images/public/irial-transparency-logo.png"
    className="logo-footer"
    alt="Irial-3D"
  />
);

class FooterBar extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className="footerBar-root">
        <Grid className="center-server-side-render">
          <Toolbar className={classes.appbar}>
          <Grid container justify="center" alignItems="center" alignContent="center" spacing={0}>

          <Grid item xs={12} md={5} >
          <Link  color="inherit" href="/" >
          <Grid container spacing={2}  alignItems="center">
         
          <Grid item  xs={12} md={"auto"} >
            <IrialLogo classes={classes} />
          </Grid>
          <Grid item  xs={12} md={"auto"} align="center"  >
          <Grid container justify="center" alignItems="center" alignContent="center" style={{ height: '100%' }} >
            <Grid item>
            <p style={{color: "#1c5375", fontFamily: "Arial", fontSize: 12, textAlign: "center", 
            fontWeight: "bold", textShadow: "2px 2px 0 rgba(255, 255, 255, 0.75)", display: "table-cell", verticalAlign: "middle"}}>Irial 3D</p>
            </Grid>
            
            </Grid>
          </Grid>
           
          <Grid item  xs={12} md={"auto"}>
          <Grid container justify="center" alignItems="center" alignContent="center" style={{ height: '100%' }} >
            <Grid item>
            <p style={{color: "#1c5375", fontSize: 12, textAlign: "center", 
                fontWeight: "bold", textShadow: "2px 2px 0 rgba(255, 255, 255, 0.75)"}}> © 2020 </p>
            </Grid>
             
          </Grid>
          </Grid>
                  
                   
                
            </Grid>
            </Link>
          </Grid>
          
          <Grid item xs={12} md={7}>
          <Grid container  justify="center" alignItems="center" alignContent="center">
            <Grid item md xs={12}>
            </Grid>
            <Grid item xs={12} md={"auto"} >
              <Grid container justify="center" alignItems="center" alignContent="center" style={{ height: "100%"}}>
                <Grid item md={"auto"} xs={12}>
                  <p  className="ptextmobile">
                    powered by WildWest Company{" "}
                    <span className="mobileNo">
                      , Proudly based in Pinar del Rio • 535-488-4414 • irial3d@gmail.com
                    </span>
                  </p>
                </Grid>
              </Grid>
                
            </Grid>
            <Grid item xs={12} md={"auto"} > 
            <div style={{ paddingLeft: 15 }}>
              <a
                href="https://www.facebook.com/vinalestraveler"
                className="mobileSocials"
              >
                <img src="../static/images/public/facebook.svg" />
              </a>
              <a
                href="https://www.tripadvisor.com/company/swagup"
                className="mobileSocials"
              >
               <img src="../static/images/public/tripadvisor.svg" />
              </a>

              <a
                href="https://www.instagram.com/swagup"
                className="mobileSocials"
              >
                 <img src="../static/images/public/linkedin.svg" />
               
              </a>
            </div>
            </Grid>
         
            </Grid>

           
          </Grid>
          
          
          </Grid>
         
           
           
          </Toolbar>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  firstItems: {
    height: 62,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    }
  },
  firstItemsRight: {
    textAlign: "right",
    height: 62,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      textAlign: "center"
    }
  },
  logo: {
    outline: "none",
    textDecorationLine: "none !important",
    height: 24,
    objectFit: 'contain'
  },
  mobileSocials: {
    width: 24,
    height: 24,
    margin: 0,
    padding: 0,
    marginLeft: 16,
    paddingTop: 0,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: 16,
    }
  },
  root: {
    // zIndex: theme.zIndex.drawer + 1,
    width: "100%",
    // marginTop: 30,
    backgroundColor: "#f3f3f3",
    display: "flex", 
    alignItems: "center",
    justifyContent: "center"
  },
  table: {
    verticalAlign: "middle"
  },
  appbar: {
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
    [theme.breakpoints.up("lg")]: {
      height: 88
    }
  },
  themePadding: {
    border: "1px solid #ff1333",
    width: '100vw'
  },
  centerNew: {
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
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: '0px 24px !important',
      minWidth: '100%'
    }
  },
  grow: {
    flexGrow: 1
  },
  partnered: {
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 0,
    marginRight: 10
  },
  pText: {
    fontSize: 10,
    marginLeft: 15,
    // display: "table-cell",
    verticalAlign: "middle",
    fontFamily: "Arial",
    maxHeight: 15,
    marginBottom: 0
  },
  pTextMobile: {
    marginLeft: 15,
    // display: "table-cell",
    verticalAlign: "middle",
    fontSize: '12px',
    maxHeight: 15,
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 8,
      textAlign: 'center'
    }
  },
  pTextBold: {
    fontSize: 10,
    fontWeight: "bold",
    verticalAlign: "middle",
    marginLeft: 15
  },
  mobileNo: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  siteBar: {
    paddingLeft: "8%",
    paddingRight: "8%"
  }
});

FooterBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FooterBar);
