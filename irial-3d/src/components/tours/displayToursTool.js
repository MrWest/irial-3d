import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import _ from "lodash";
import { TourCardLeft, TourImageLeft, TourCardRight, TourImageRight} from './toursSections';

class DisplayToursTool extends Component {
 
  handleSelectPack = pack => {
   
  };

  render() {
    const { classes , tours, language} = this.props;
    return (
      <main className={classes.container}>
        {tours.filter( t => parseInt(t.status) > 0).map((tour, index) => (
          <section  key={index} 
            className={
              index % 2 === 1 ? classes.grayBackground : classes.whiteBackground
            }
          >
          
         
           
              <div className={classes.center}>
              <Grid container spacing={0}>
                  {index % 2 === 0 ? (
                     <Fragment>
                        <TourCardLeft classes={classes} tour={tour} language={language}/>
                        <TourImageLeft classes={classes} tour={tour}/>
                     </Fragment>
                  ) : (
                     <Fragment>
                        <Grid container spacing={0} className={classes.noMobile}>
                          <TourImageRight classes={classes} tour={tour}/>
                          <TourCardRight classes={classes} tour={tour} language={language}/>
                        </Grid>
                        <Grid container spacing={0} className={classes.onMobile}>
                          <TourCardRight classes={classes} tour={tour} language={language}/>
                          <TourImageRight classes={classes} tour={tour}/>
                        </Grid>
                    </Fragment>

                  )}

                </Grid> </div>
           

          </section>
         
        ))}
      </main>
    );
  }
}

const styles = theme => ({
  container: {
    paddingTop: 40,
    paddingBottom: 80
  },
  center: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1280px"
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1180px"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "100vw"
    }
  },
  noMobile: {
    display: 'inherit',
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    }
  },
  onMobile: {
    display: 'none',
    [theme.breakpoints.down("sm")]: {
      display: 'inherit',
    }
  },
  mobileBar: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "inherit",     
      width: "100%",
      height: 8,
      marginTop: 16,
      marginBottom: 16,
      backgroundColor: "#434c5f"

    }
  },
  packNameText: {
    fontFamily: "Futura",
    fontSize: 40,
    fontWeight: "bold",
    color: "#337ab7",
    margin: 0
  },
  packPriceText: {
    fontFamily: "Futura",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40
  },
  descriptionText: {
    fontFamily: "Roboto",
    fontSize: 15,
    lineHeight: 1.43,
    marginTop: 24
    // maxWidth: 282
  },
  // themePadding: {
  //   paddingLeft: "7%",
  //   paddingRight: "7%",
  // },
  textLeft: {
    textAlign: "left"
  },
  textRight: {
    textAlign: "right"
  },
  packImg: {
    
    width: "100%",
    objectFit: "cover",
    maxHeight: 360
  },
  hrBlue: {
    width: 78,
    height: 8,
    backgroundColor: "#e4e400",
    textShadow: "2px 2px 0 rgba(0, 0, 0, 0.75)",
  },
  grayBackground: {
    backgroundColor: "#fafafa",
    border: "1px solid #fafafa",
    paddingTop: "20px",
    paddingBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      marginTop: 16,
      paddingTop: 36,

    }
  },
  whiteBackground: {
    backgroundColor: "#ffffff",
    border: "1px solid #ffffff",
    paddingTop: "20px",
    paddingBottom: "20px"
  },
  packDisclaimer: {
    fontFamily: "Roboto",
    fontSize: "10px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#434c5f",
    marginTop: "16px"
  }
  // container: {
  //   backgroundColor: "#fafafa",
  //   border: "1px solid #fafafa",

  // }
});

// DisplayPacksTool.propTypes = {
//   classes: PropTypes.node.isRequired
// };
const mapStateTopProps = state => {
  return {
    
    language: state.language
  };
};

export default connect(mapStateTopProps)(withStyles(styles)(DisplayToursTool));
