import React, { Component, Fragment } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectAttraction, addAttractionComment, updateAttractionComment,
   deleteAttractionComment, rateAttraction, getCategory } from "../../actions";

import ResourceTabs from "../tools/resourceTabs"
import  AttractionBookingForm  from "../forms/attractionBookingForm";
import CommentsTool from "../tools/commentsTool";
import {Helmet} from 'react-helmet';
import Loader from '../global/loader';
import { Link } from "react-router-dom";
import { isServer } from '../../apis/tools';





class AttractionDetails extends Component {
  state = {
    idAttraction: -1,
    category: {},
    busy: true
  };
  
  componentWillMount() {

     if(!isServer) {
      const { id } = this.props.match.params;
      this.props.selectAttraction(id).then(rslt => {
        this.props.getCategory(rslt.id_category).then(()=>{
          this.setState({ busy: false });
        });      
      });
     }
    
    // alert(id+"sss")
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(){
    
    const { id } = this.props.match.params;
    if(parseInt(this.state.idAttraction) !== parseInt(id)){
      this.props.selectAttraction(id)
      this.setState({idAttraction: id})
     // alert(this.state.idattraction)
    }
    
   //alert(id)
   
  }
 getCategory(value){

  var category = "All"

  this.props.categories.map(cat=>{
    // alert( cat.id+ " - "+ value)
    if(parseInt(cat.id) === parseInt(value))
       category = cat.name
  })

  return category
 }

 handleOnRateClick = value => {
  const { rateAttraction, attraction, sign } = this.props;
  rateAttraction({id_attraction: attraction.id, id_user: sign.loginInfo.id, rate: value })
 }

  render() {
    const { classes, attraction, category } = this.props;   
    const { busy } = this.state;
    
    if(attraction.name === undefined)
     return <div/>

    return (
      <main className={classes.container}>
         <Helmet>
              <title>Viñales Traveler | {attraction.name}</title>
              <meta name="description" content={attraction.general_description} />
           </Helmet>
      <Grid container justify="center" spacing={0}>
      <Grid item className={classes.center}>
            <Grid container spacing={4} className={classes.mobilePadding}>
              <Grid item xs={12} md={8} >
              <p style={{fontSize: 16, lineHeight: 1.3, color: '#0f2440 !important', fontFamily: 'Roboto !important'}}>
                      <h1 variant="p" align="left" className={classes.categoryTittle} style={{ display: 'inline'}}>
                        {attraction.name+ " "}
                      </h1>
                    {attraction.full_description}
              </p>
              </Grid>
              <Grid item xs={12}  md={4}>
                <div  className={classes.mobileAlign}>
                {this.props.sign.isLogged && this.props.sign.loginInfo &&
                     (this.props.sign.loginInfo.type === "admin" || parseInt(this.props.sign.loginInfo.id, 10) === parseInt(attraction.id_user)) &&
                      <p style={{textAlign: "left"}}>
                          <Link to={"/attractionedit/" + attraction.id} style={{background: "#ffffff", fontSize: 14}}>
                               {this.props.language.Edit}
                          </Link>
                   </p>
                }
                    <p style={{fontWeight: "bold"}}>{this.props.language.Category} </p>
                    <p style={{fontWeight: "normal"}}>{category.name}</p>
                    
                  </div>
                </Grid>
              <Grid item xs={12} md={6}>
              <Grid container >
                <Grid item xs={12} md={8}>
                    <p  style={{paddingBottom: 16}}><strong>{this.props.language.Price}:</strong> ${attraction.price} {attraction.currency} {attraction.price_specifics}</p>
                    <p><strong>{this.props.language.Languages}:</strong> {attraction.languages}</p>
                </Grid>
                <Grid item xs={12} md={6} className={classes.onMoblie}>
                    <p><strong>{this.props.language.Duration}:</strong> {attraction.how_long}</p>
                    
                </Grid>
               </Grid>
              
               {attraction.program.length > 0 && (
                <Fragment>
                 <p style={{fontWeight: "bold", marginTop: 20, fontSize: 18}} >{this.props.language.Program}:</p>
               <ul>
                 {attraction.program.map(prg => (
                   <li><p style={{ color: '#0f2440 !important'}}>{prg.content}</p></li>
                 ))}
               </ul>
                </Fragment>
              )}
              
               

                <div style={{paddingTop: 20}}>
                 <AttractionBookingForm attraction={attraction}></AttractionBookingForm>
               </div>
              </Grid>
              <Grid item xs={12} md={6} style={{marginTop: -20, marginBottom: 20, paddingBottom: 24}}>

              <ResourceTabs images={attraction.images}  videos={attraction.videos}  tabs={["Images", "Videos"]} ></ResourceTabs>
              
              <div style={{paddingTop: 20}}>
                {/* <h3 style={{fontWeight: "bold"}}>{this.props.language.Comments}:</h3> */}
                <CommentsTool service="attraction" comments={attraction.comments} idService={attraction.id} serviceUrl={"/attraction/"}  onRate={this.handleOnRateClick}
                rate={attraction.rate} addComment={this.props.addAttractionComment} updateComment={this.props.updateAttractionComment} deleteComment={this.props.deleteAttractionComment}></CommentsTool>
               </div>
              </Grid>

            </Grid>
              
          </Grid>
          
        </Grid>
        {busy && <Loader />}
      </main>
    );
  }
}

const styles = theme => ({
  container: {
    paddingTop: 120,
    paddingBottom: 130
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
  seletcTool: {
    width: 220,
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 24
    }
  },
  onMoblie: {
    [theme.breakpoints.down("sm")]: {      
      paddingTop: "16px !important"
    }
  },  
  mobilePadding: {   
    [theme.breakpoints.down("sm")]: {
      
      paddingLeft: "16px !important",
      paddingRight: "16px !important"
    }
  },
  mobileAlign: {
    textAlign: "right",
    marginTop: 16,
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      textAlign: "left"
    }
  },
  categoryTittle: {
    marginBottom: 0,
    fontFamily: "Futura",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1,
    letterSpacing: "normal",
    color: "#434c5f",
    display: 'inline',
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0
    }
  },
  orderList: {
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  gray: {
    backgroundColor: "#dddddd"
  },
  yellow: {
    color: "#a0a010",
    backgroundColor: "#f9f9c9"
  },
  green: {
    color: "#10a000",
    backgroundColor: "#c9f999"
  },
  submitButton: {
    width: "282px",
    height: "56px",
    "& span": {
      fontFamily: "Futura",
      fontSize: "16px",
      fontWeight: "bold",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: "normal"
    },
    textAlign: "center",
    color: "#ffffff",
    borderRadius: "4px",
    backgroundColor: "#337ab7"
  }
});

AttractionDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateTopProps = state => {
  return {
    attraction: state.selectedAttraction,
    categories: state.sections[1]? state.sections[1].categories : [],
    category: state.selectedCategory,
    language:  state.language,
    sign: state.sign
  };
};

export default connect(mapStateTopProps, {selectAttraction, addAttractionComment,
   updateAttractionComment, deleteAttractionComment, rateAttraction, getCategory })(withStyles(styles)(AttractionDetails));
