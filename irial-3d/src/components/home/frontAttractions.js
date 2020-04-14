import React, { Component } from "react";
import {
  Grid,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  MenuItem,
  Paper
} from "@material-ui/core";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {CoolLink} from "../buttons"

class FrontAttractions extends Component {
    state = {  }

    

    mod(index){

        return index%2 == 0;
    }

    getRandomIndex(limit){

      var min = 0; 
      var max = limit;  
      var random =Math.floor(Math.random() * (+max - +min)) + +min; 


      // if(random == 2)
       return 3

      // return random;
    }

    render() { 
        const { classes, section } = this.props;

        const randomIndex = this.getRandomIndex(section.categories.length)
        return ( 
            <div className={classes.root}>
                <section className={classes.center}>
                <div style={{padding: "0px 40px"}}>
                    <h3 className={classes.sectionTittle}>{section.name}</h3>
                    <p  className={classes.pText}>{section.description}</p>
                </div>
                <div>
                  <Grid container  spacing={4}>
                  {section.categories.map((category, index)=>(

                     <Grid  key={index}  item xs={12} md={4}>
                      <Paper  elevation={2}
                       style={{padding: 7}}>
                            
                             <div className={classes.inpapercss} style={{textAlign: "center", height: "auto", position: "relative"}}>
                             <p  className={classes.categoryName} >{category.name}</p>
                             <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className="icon-path" >
                             
                             <g transform="translate(60.000000,160.000000) scale(0.030000,-0.030000)"
                              fill="#ffffff" stroke="none" className="icon-path">
                              <path d={category.icon_path} className="icon-path" />
                              </g>
                              </svg>

                             {/* <img src={category.images[0].url} style={{width: "100%", height: "100%", borderTopLeftRadius: 4, borderTopRightRadius: 4}}/> */}
                               {/* <div style={{textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}> */}
                                 {/* <p className={classes.categorySlogan}   >{category.slogan}</p> */}
                                  
                                 {/* <p className="animated category-slogan" style={{textAlign: "center"}}>{category.promotion}</p> */}
                                 <div  style={{ paddingTop: 10, textAlign: "center"}} align="center">
                                          <div style={{width: 215, margin: "auto"}}>
                                           <CoolLink  height={56} width={215} fill={"#188218"} color={"#ffffff"} href={"/attractions/"+category.id}>
                                              <p style={{fontSize: 14, color: "#ffffff"}}>{this.props.language.ViewOffers}</p>
                                           </CoolLink> 
                                           </div>
                                  </div>
                               
                               </div>
                            
                            
                             
                      </Paper>
                      </Grid>
                     
                     
                     ))}


                    <Grid item xs={12} md={4}>
                      <Paper className={classes.papercss}   elevation={0} style={{padding: 7, marginBottom: 20}} >
                            
                             <div className={classes.inpapercss} style={{textAlign: "center", height: "35vh", position: "relative", display: "table", width: "100%"}}>
                            
                            

                             {/* <img src={category.images[0].url} style={{width: "100%", height: "100%", borderTopLeftRadius: 4, borderTopRightRadius: 4}}/> */}
                               {/* <div style={{textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}> */}
                                 {/* <p className={classes.categorySlogan}   >{category.slogan}</p> */}
                                  
                                 {/* <p className="animated category-slogan" style={{textAlign: "center"}}>{category.promotion}</p> */}
                                 <div  style={{ paddingTop: 10, textAlign: "center", display: "table-cell", verticalAlign: "middle"}} align="center">
                                          <div style={{width: 260, margin: "auto"}}>
                                           <CoolLink  height={64} width={260} fill={"#ffffff"} color={"#188218"} href={"/attractions/all"} svgClass="button-path">
                                              <p style={{fontSize: 14}}>{this.props.language.ViewAll}</p>
                                           </CoolLink> 
                                           </div>
                                  </div>
                               
                               </div>
                            
                            
                             
                      </Paper>
                      </Grid>
                  </Grid>
                    
                </div>
                </section>
                <style jsx>{`
        .icon-path {
          -webkit-filter: drop-shadow( 0px 0px 12px #188218);
          filter: drop-shadow( 0px 0px 12px #188218);
        }
        
        
        .button-path {
          -webkit-filter: drop-shadow( 1px 1px 13px #188218);
          filter: drop-shadow( 1px 1px 13px #188218);
        }
        
      `}</style>

            </div>
            
         );
    }
}

FrontAttractions.propTypes = {
    classes: PropTypes.object.isRequired,
    section: PropTypes.object.isRequired
  };
  
  const styles = theme => ({
    papercss: {
      [theme.breakpoints.down("sm")]: {
        marginBottom: "0px !important"
      }
    },
    inpapercss: {
      [theme.breakpoints.down("sm")]: {
        marginBottom: 40
      }
    },
    icons: {
      textShadow: "2px 2px 0 rgba(0, 0, 0, 0.75)",
      border: "1px red solid"
      
        
    },
      categoryTittle: {
         
          fontSize: 22,
          fontWeight: "bold",
          margin: 0,
          color: "#ffffff",
          textAlign: "center"
      },
      categoryName: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        fontFamily: "Futura",
        color: "#188218",//"#e4e400",
         textShadow: "1px 1px 1px #e4e400",

    },
    categorySlogan: {
      fontSize: 18,
      fontWeight: "bold",
    },
    container: {
      paddingBottom: 130
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: 30,
        paddingBottom: theme.spacing.unit * 2,
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
        margin: "10px 0px",
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "Futura",
        color: "#188218",
        marginBottom: 20,
        textAlign: "center"
      },
      pText: {
        marginBottom: 40,
        fontFamily: "Roboto",
        textAlign: "center"
      }
  });

  const mapStateToProps = state => {
  
    return {
      language: state.language
    };
  };
  
  export default connect(
    mapStateToProps
  )( withStyles(styles)(FrontAttractions));
  
  
  