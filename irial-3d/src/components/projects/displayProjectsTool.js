import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import _ from "lodash";
import { ProjectCardLeft, ProjectImageLeft, ProjectCardRight, ProjectImageRight} from './projectsSections';

class DisplayProjectsTool extends Component {
 
  handleSelectPack = pack => {
   
  };

  render() {
    const { classes , projects, language} = this.props;
    return (
      <main className={classes.container}>
        {projects.filter( a => parseInt(a.status) > 0).map((project, index) => (
          <section key={index} 
            className={
              index % 2 === 1 ? classes.grayBackground : classes.whiteBackground
            }
          >
          
           <div className={classes.center}>
                <Grid container spacing={0}>
                  {index % 2 === 0 ? (
                     <Fragment>
                        <ProjectCardLeft classes={classes} project={project} language={language}/>
                        <ProjectImageLeft classes={classes} project={project}/>
                   </Fragment>
                  ) : (
                     <Fragment>
                        <Grid container spacing={0} className={classes.noMobile}>
                          <ProjectImageRight classes={classes} project={project}/>
                          <ProjectCardRight classes={classes} project={project} language={language}/>
                        </Grid>
                        <Grid container spacing={0} className={classes.onMobile}>
                          <ProjectCardRight classes={classes} project={project} language={language}/>
                          <ProjectImageRight classes={classes} project={project}/>
                        </Grid>
                    </Fragment>

                  )}

                </Grid>
              </div>
         
         
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
  packNameText: {
    fontFamily: "Futura",
    fontSize: 40,
    fontWeight: "bold",
    color: "#337ab7",
    margin: 0
  },
  packPriceText: {
    fontFamily: "Futura",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 3,
    color: "#434c5f",
  },
  numberText: {
    fontFamily: "Futura",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 3,
    color: "#434c5f",
    // textDecoration: "underline"
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

export default connect(mapStateTopProps)(withStyles(styles)(DisplayProjectsTool));
