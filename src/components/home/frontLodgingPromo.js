 import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import {CoolLink} from "../buttons"
import {
  Carousel,
  CarouselInner,
  CarouselItem
} from "mdbreact";

import { connect } from "react-redux";

function CarouselContent({imageUrl, bottomText, alt}){

  return (
                    <div style={{position: "relative",  textAlign: "center", padding: "5px 5px", paddingTop: 8, paddingRight: 8 }}>
                     <img  alt="Lodgings Viñales" style={{width: "100%", borderBottomRightRadius: 4,borderTopRightRadius: 4, objectFit: "cover" }} src={imageUrl}/> 
                        <div style={{position: "absolute", bottom: 0, left: "50%",transform: "translate(-50%, -50%)"}}>
                            

                              <p  style={{color: "#000"}}>{bottomText}</p>
                            
                        </div>
                     </div>
  )
}

class FrontLodgingPromo extends React.Component {
  state = {};

  render() {
    const { classes, section } = this.props;

    return (
      <div className={classes.root}>
        <div  className={classes.center} align="center">
     
          <Paper id={"front-tour-promo"} elevation={2} style={{ padding: 10, paddingBottom: 7}}>
          <Grid container spacing={4}>
          <Grid xs={12} md={6} item style={{padding: 0}}>
                <div className={classes.tittleContainer}>
                  <h3
                    align="center"
                    className={classes.pTextTittle}
                  >
                  {section.name}
                  </h3>
                  <p
                    variant="p"
                    component="p"
                    align="center"
                    style={{fontSize: 18, marginBottom: 40}}
                  >
                  {section.description}
                  </p>

                  <div align="center" style={{ marginBottom: 20}}>
                
                      
                    
                      <CoolLink height={56} width={285} fill={"#337ab7"} color={"#ffffff"} to={"/lodgings/all"}>
                        {this.props.language.AllLodgings}
                      </CoolLink>
                    {/* <FixedButton>
                      Go for It
                    </FixedButton> */}
                </div>
                </div>
            
            </Grid>
            <Grid xs={12} md={6} item style={{padding: 0}}>
 
            <Carousel
              activeItem={0}
              length={section.categories[0].images.length -1}
              slide={true}
              showControls={false}
              showIndicators={false}
              className="z-depth-1"
            >
               <CarouselInner>
                  {section.categories[0].images.map( (img, index) => (
                      <CarouselItem key={index} itemId={index}>
                        <CarouselContent imageUrl={img.url} bottomText={img.caption}/>
                      </CarouselItem>
                  ))}
              </CarouselInner>

            </Carousel>


           
            </Grid>
           
          
          </Grid>
         </Paper>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  servicesItem: {
    paddingRight: "12px !important",
    paddingLeft: "12px !important",
  },
  servicesItemLeft: {
    paddingRight: "12px !important",
    paddingLeft: "0px !important",
  },
  servicesItemRight: {
    paddingRight: "0px !important",
    paddingLeft: "12px !important",
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 0,
    paddingBottom: 8,
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
  sectionTittle: {
    fontSize: 24,
    color: "#434c5f",
    fontFamily: "Roboto",
    fontWeight: "bold",
    lineHeight: 1.67,
    textAlign: "center",
    marginBottom: 26,
    marginTop: 32,
  },
  pText: {
   
    fontSize: 14,
    color: "#434c5f",
    fontFamily: "Roboto",
    lineHeight: 1.67,
    textAlign: "center"
  },
  summaryText: {
   
    fontSize: 24,
    color: "#434c5f",
    fontFamily: "Roboto",
    lineHeight: 1.67,
    textAlign: "center"
  },
  pTextTittle: {
    margin: "10px 0px",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Futura",
    color: "#337ab7",
    marginBottom: 25,
  },
  pTextSmall: {
    color: "#ffffff !important",
    marginBottom: 40,
    fontSize: 16
  },
  tittleContainer: {
    padding: "0px 5%",
    marginBottom: 0,
    [theme.breakpoints.down('sm')]: {
      padding: "0px",
    }
  },
  promoPic: {
    textAtlign: "center",
    width: 120,
    height: 120
  }
});

FrontLodgingPromo.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps
)( withStyles(styles)(FrontLodgingPromo));
