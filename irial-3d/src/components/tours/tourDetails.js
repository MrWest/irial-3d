import React, { Component, Fragment } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectTour,  addTourComment, updateTourComment, deleteTourComment, rateTour, getCategory } from "../../actions";
import Loader from '../global/loader';
import ResourceTabs from "../tools/resourceTabs"
import  TourBookingForm  from "../forms/tourBookingForm";
import CommentsTool from "../tools/commentsTool";
import {Helmet} from 'react-helmet';

import { Link } from "react-router-dom";

import { isServer } from '../../apis/tools';



class TourDetails extends Component {
  state = {
    idTour: -1,
    category: {},
    busy: true
  };
  
  componentWillMount() {

    if(!isServer)
    {
      const { id } = this.props.match.params;
      this.props.selectTour(id).then(rslt => {
        this.props.getCategory(rslt.id_category).then(()=>{
          this.setState({ busy: false });
        });      
      });
    }
   
    // this.myRef = React.createRef()   // Create a ref object 
  }
  componentDidMount() {
    // this.myRef.current.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }
  componentDidUpdate(){
    
    const { id } = this.props.match.params;
    if(parseInt(this.state.idTour) !== parseInt(id)){
      this.props.selectTour(id)
      this.setState({idTour: id})
     // alert(this.state.idTour)
    }
    
   //alert(id)
   
  }
 getCategory(value){

  var category = "All"

  this.props.categories.map(cat=>{
    if(parseInt(cat.id) === parseInt(value))
    category = cat.name
  })

  return category
 }

 handleOnRateClick = value => {
  const { rateTour, tour, sign } = this.props;
  rateTour({id_tour: tour.id, id_user: sign.loginInfo.id, rate: value })
 }

 programFormat = value =>  /^- /.test(value) ? value.substring(2) : value;

  render() {
    const { classes, tour, category } = this.props;
    const { busy } = this.state;
    
    if(tour.name === undefined)
     return <div/>

    return (
      <main ref={this.myRef} className={classes.container}>
         <Helmet>
              <title>Viñales Traveler | {tour.name}</title>
              <meta name="description" content={tour.general_description} />
              <meta name="language" content="en"/>
           </Helmet>
      <Grid container justify="center" spacing={0}>
        <Grid item className={classes.center}>
            <Grid container spacing={4} className={classes.mobilePadding}>
              <Grid item xs={12} md={8} >
              <p style={{fontSize: 16, lineHeight: 1.3, color: '#0f2440 !important', fontFamily: 'Roboto !important'}}>
                      <h1 variant="p" align="left" className={classes.categoryTittle} style={{ display: 'inline'}}>
                        {tour.name+ " "}
                      </h1>
                    {tour.full_description}
              </p>
              </Grid>
              <Grid item  xs={12} md={4}>
                <div className={classes.mobileAlign}>                  
              
                {this.props.sign.isLogged && this.props.sign.loginInfo &&
                     (this.props.sign.loginInfo.type === "admin") &&
                      <p style={{textAlign: "left"}}>
                          <Link to={"/touredit/" + tour.id} style={{background: "#ffffff", fontSize: 14}}>
                               {this.props.language.Edit}
                          </Link>
                   </p>
                }
                    <p style={{fontWeight: "bold"}}>{this.props.language.Category} </p>
                    <p style={{fontWeight: "normal"}}>{category.name}</p>
                    
                  </div>
                  {/* <div style={{textAlign: "right", marginTop: 15,}}>
                    <p style={{fontWeight: "bold"}}>Modality </p>
                    <p style={{fontWeight: "normal"}}>{tour.modality}</p>
                    
                  </div> */}

               {/* <button onClick={()=> { this.props.history.push("/tour/"+ (parseInt(this.props.match.params.id)+ 1))}}>Change</button> */}
              </Grid>
              <Grid item xs={12} md={6}>
              <Grid container >
                <Grid item xs={12} md={6}>
                    <p  style={{paddingBottom: 16}}><strong>{this.props.language.Duration}:</strong> {tour.how_long}</p>
                    <p><strong>{this.props.language.PickUpTime}:</strong> {tour.pickup_time}</p>
                </Grid>
                <Grid item xs={12} md={6} className={classes.onMoblie}>
                    <p  style={{paddingBottom: 16}}><strong>{this.props.language.Guide}:</strong> {tour.guide}</p>
                    <p><strong>{this.props.language.Languages}:</strong> {tour.languages}</p>
                </Grid>
               </Grid>
              
              
               {tour.program.length > 0 && (
                <Fragment>
               <p style={{fontWeight: "bold", marginTop: 20, fontSize: 18}} >{this.props.language.Program}:</p>
               <ul style={{ listStylePosition: 'outside', display: 'table' }}>
                 {tour.program.map(prg => (
                   <li className={/^- /.test(prg.content) ? classes.bulletLess : classes.bullet}><p style={{ color: '#0f2440 !important'}}>{this.programFormat(prg.content)}</p></li>
                 ))}
               </ul>
                </Fragment>
              )}


                <div style={{paddingTop: 20}}>
                 <TourBookingForm tour={tour}></TourBookingForm>
               </div>
              </Grid>
              <Grid item xs={12} md={6} style={{marginTop: -20, marginBottom: 20, paddingBottom: 24}}>

              <ResourceTabs images={tour.images}  videos={tour.videos}  tabs={[this.props.language.Images, this.props.language.Videos]} ></ResourceTabs>
              
              <div style={{paddingTop: 20}}>               
                <CommentsTool service="tour" comments={tour.comments} idService={tour.id} serviceUrl={"/tour/"} onRate={this.handleOnRateClick}
                rate={tour.rate} addComment={this.props.addTourComment} updateComment={this.props.updateTourComment} deleteComment={this.props.deleteTourComment}></CommentsTool>
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
  bulletLess: {
    counterIncrement: 'foo',
    listStyleType: 'circle',
    marginLeft: '1em'
  }, 
  bullet: {
    paddingTop: 8
  },
  container: {
    paddingTop: 120,
    paddingBottom: 130
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
    backgroundColor: "#188218"
  }
});

TourDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateTopProps = state => {
  return {
    tour: state.selectedTour,
    sign: state.sign, 
    categories: state.sections[0] ? state.sections[0].categories : [],
    category: state.selectedCategory,
    language: state.language
  };
};

export default connect(mapStateTopProps, {selectTour, addTourComment, updateTourComment, deleteTourComment, rateTour, getCategory })(withStyles(styles)(TourDetails));
