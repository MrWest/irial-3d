import React, { Component, Fragment } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectLodging, addLodgingComment, updateLodgingComment, deleteLodgingComment, rateLodging, getCategory  } from "../../actions";
import Loader from '../global/loader';
import ResourceTabs from "../tools/resourceTabs"
import  LodgingBookingForm  from "../forms/lodgingBookingForm";
import CommentsTool from "../tools/commentsTool";
import { Link } from "react-router-dom";
import {Helmet} from 'react-helmet';
import { isServer } from '../../apis/tools';





class LodgingDetails extends Component {
  state = {
    idLodging: -1,
    category: {},
    busy: true
  };
  
  componentWillMount() {

    if(!isServer) {
      const { id } = this.props.match.params;
      this.props.selectLodging(id).then(rslt => {
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

  componentDidUpdate(prev){
    
    const { id } = this.props.match.params;
    const { selectLodging, getCategory } = this.props;
    if(parseInt(this.state.idLodging) !== parseInt(id)){
      this.setState({ busy: true, idLodging: id });
      selectLodging(id)
      // .then(rslt => {
      //   getCategory(rslt.id_category).then(()=>{
      //     this.setState({ busy: false });
      //   });      
      // });
     // alert(this.state.idlodging)
    }
    
   //alert(id)
   
  };

 getCategory(value){

  var category = "All"

  this.props.categories.map(cat=>{
    // alert( cat.id+ " - "+ value)
    if(parseInt(cat.id) === parseInt(value))
       category = cat.name
  })

  return category
 };

 handleOnRateClick = value => {
  const { rateLodging, lodging, sign } = this.props;
  rateLodging({id_lodging: lodging.id, id_user: sign.loginInfo.id, rate: value })
 }




  render() {
    const { classes, lodging, category } = this.props;    
    const { busy } = this.state;
    if(lodging.name === undefined)
     return <div/>

    return (
      <main  ref={this.myRef} className={classes.container}>
         <Helmet>
              <title>Viñales Traveler | {lodging.name}</title>
              <meta name="description" content={lodging.general_description} />
           </Helmet>
      <Grid container justify="center" spacing={0}>
      <Grid item className={classes.center}>
            <Grid container spacing={4} className={classes.mobilePadding}>
              <Grid item xs={12} md={8} >
              <p style={{fontSize: 16, lineHeight: 1.3, color: '#0f2440 !important', fontFamily: 'Roboto !important'}}>
                      <h1 variant="p" align="left" className={classes.categoryTittle} style={{ display: 'inline'}}>
                        {lodging.name+ " "}
                      </h1>
                    {lodging.full_description}
              </p>
              </Grid>
              <Grid item xs={12}  md={4}>
                <div  className={classes.mobileAlign}>
                {this.props.sign.isLogged && this.props.sign.loginInfo &&
                     (this.props.sign.loginInfo.type === "admin" || parseInt(this.props.sign.loginInfo.id, 10) === parseInt(lodging.id_user)) &&
                      <p style={{textAlign: "left"}}>
                          <Link to={"/lodgingedit/" + lodging.id} style={{background: "#ffffff", fontSize: 14}}>
                               {this.props.language.Edit}
                          </Link>
                   </p>
                }
                    <p style={{fontWeight: "bold"}}>{this.props.language.Category} </p>
                    <p style={{fontWeight: "normal"}}>{category.name}</p>
                    
                  </div>
                  {/* <div style={{textAlign: "right", marginTop: 15,}}>
                    <p style={{fontWeight: "bold"}}>Modality </p>
                    <p style={{fontWeight: "normal"}}>{lodging.modality}</p>
                    
                  </div> */}

               {/* <button onClick={()=> { this.props.history.push("/lodging/"+ (parseInt(this.props.match.params.id)+ 1))}}>Change</button> */}
              </Grid>
              <Grid item xs={12} md={6}>
              <Grid container >
              <Grid item md={12} style={{paddingBottom: 16}}>
                    <p><strong>{this.props.language.Location}:</strong> {lodging.location}</p>
                    {/* <p><strong>Price Specifics:</strong> {lodging.price_specifics}</p> */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <p><strong>{this.props.language.Price}:</strong> ${lodging.price} {lodging.currency} {lodging.price_specifics}</p>
                    {/* <p><strong>Price Specifics:</strong> {lodging.price_specifics}</p> */}
                </Grid>
                <Grid item xs={12} md={6} className={classes.onMoblie}>
                    <p><strong>{this.props.language.Capacity}:</strong> {lodging.capacity}  {lodging.capacity_specifics}</p>
                    {/* <p><strong>Capacity Specifics:</strong> {lodging.capacity_specifics}</p> */}
                </Grid>
               </Grid>
              
              
              {lodging.program.length > 0 && (
                <Fragment>
                  <p style={{fontWeight: "bold", marginTop: 20, fontSize: 18}} >{this.props.language.Services}:</p>
               <ul>
                 {lodging.program.map(prg => (
                    <li><p style={{color: '#0f2440 !important'}}>{prg.content}</p></li>
                 ))}
               </ul>
                </Fragment>
              )}
               

                <div style={{paddingTop: 20}}>
                 <LodgingBookingForm lodging={lodging}></LodgingBookingForm>
               </div>
              </Grid>
              <Grid item xs={12} md={6} style={{marginTop: -20, marginBottom: 20, paddingBottom: 24}}>
              
              <ResourceTabs images={lodging.images}  videos={lodging.videos}  tabs={[this.props.language.Images, this.props.language.Videos]} ></ResourceTabs>
              
              <div style={{paddingTop: 20}}>
              <CommentsTool service="lodging" comments={lodging.comments} idService={lodging.id} serviceUrl={"/lodging/"} onRate={this.handleOnRateClick}
              rate={lodging.rate}    addComment={this.props.addLodgingComment} updateComment={this.props.updateLodgingComment} deleteComment={this.props.deleteLodgingComment}></CommentsTool>
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
    marginBottom: 40,
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

LodgingDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateTopProps = state => {
  return {
    lodging: state.selectedLodging,
    categories: state.sections[2]? state.sections[2].categories : [],
    category: state.selectedCategory,
    language: state.language,
    sign: state.sign
  };
};

export default connect(mapStateTopProps, {selectLodging, addLodgingComment,
  updateLodgingComment, deleteLodgingComment, rateLodging, getCategory  })(withStyles(styles)(LodgingDetails));
