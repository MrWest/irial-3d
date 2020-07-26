import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import _ from "lodash";
import ItemCard from '../itemCard/itemCard';
// import { ProjectCardLeft, ProjectImageLeft, ProjectCardRight, ProjectImageRight} from './projectsSections';

class DisplayProjectsTool extends Component {
 
  handleSelectPack = pack => {
   
  };

  render() {
    const { classes , projects, language, addToCart} = this.props;
    return (
      <main className={classes.container}>
        <Grid container alignItems="stretch" >
        {projects.filter( a => parseInt(a.status) > 0).map(project => (
          <Grid key={project.id} item xs={12} sm={6} md={4} className={classes.itemContainer}>
            <ItemCard  item={project} type='project' addToCart={addToCart} addToCartText={language.AddToCart} buyItem={language.Buy} />
          </Grid>
          ))}
        </Grid>
        
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
  itemContainer: {
    marginBottom: 32
  },
  packNameText: {
    fontFamily: "Futura",
    fontSize: 40,
    fontWeight: "bold",
    color: "#337ab7",
    margin: 0
  },
  itemContent: {
    backgroundImage: "url(../static/images/home/about-contact.jpg)",
    backgroundRepeat: "no-repeat",
    height: 320,
    display: 'inherit',
    // backgroundSize: "cover",
    backgroundPosition: "right",
    backgroundSize: "contain",
  },
  itemNameText: {
    fontFamily: "Futura",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: 'center',
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
