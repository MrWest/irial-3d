import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, FormControl, InputLabel, Select, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SectionEditForm from "../../forms/sectionEditForm";
import Nameable from "./nameable";
import { connect } from "react-redux";
import nameable from "./nameable";
import {filterLodgingsUser, deleteLodging, sortAttractionsUser, deleteAttraction} from "../../../actions";
import AddIcon from "@material-ui/icons/AddCircle";
import {RoundedButtonLink} from "../../buttons";
import { withRouter } from "react-router-dom";

class BusinessAdmin extends Component {
  state = { serviceIndex: -1
};

componentWillMount(){

  // alert(this.props.sign.loginInfo)
  if(this.props.sign.loginInfo){
    this.props.filterLodgingsUser(this.props.sign.loginInfo.id)
    this.props.sortAttractionsUser(this.props.sign.loginInfo.id)
  }
 
}

selectService = event => {

  this.setState({serviceIndex: event.currentTarget.id})
}

editAttraction = event => {
  // console.log("jajaja",event.currentTarget)
  this.props.history.push("/attractionedit/"+ event.currentTarget.id)
}
editLodging = event => {
  // console.log("jajaja",event.currentTarget)
  this.props.history.push("/lodgingedit/"+ event.currentTarget.id)
}

handleDeleteAttraction = event => {

  this.props.deleteAttraction(event.currentTarget.id)
 }
 handleDeleteLodging = event => {

  this.props.deleteLodging(event.currentTarget.id)
 }
 handleChange = event => {

  this.props.history.push(event.target.value)
 }
  render() {
    const { classes } = this.props;
    return (
      <main  style={{paddingBottom: 40}}>
          <Grid container spacing={4}>
              <Grid item alignItems="baseline" style={{paddingRight: 0}} >
               <div style={{display: "table", height: "100%"}}>
                <div style={{display: "table-cell", verticalAlign: "middle", paddingLeft: 0}}>
                <p >{this.props.language.MyBusinesses}:</p>
                </div>
               </div>
              
              </Grid>
              <Grid item  align="right" style={{paddingRight: 10}} className={classes.rightOnMobile}>
              
              <FormControl variant="outlined" style={{width: 225}} >
                   <InputLabel htmlFor="idsimple">{this.props.language.Add}</InputLabel>
                  <Select
                    value={this.state.sort}
                    onChange={this.handleChange.bind(this)}
                    margin="none"
                    
                  >
                   {this.props.lodgingsCategories.map(category =>(

                          <MenuItem value={"/lodgingadd/" + category.id}>
                          <ListItemIcon className={classes.icon}>
                            <AddIcon color="#ffffff" style={{fontSize: 34, color: "#188218", opacity: 0.3}}></AddIcon>    
                          </ListItemIcon>
                          <ListItemText classes={{ primary: classes.primary }}  inset primary={category.name} />
                              
                          </MenuItem>
                        ))}

                        {this.props.categories.map(category =>(

                        <MenuItem value={"/attractionadd/" + category.id}>
                        <ListItemIcon className={classes.icon}>
                          <AddIcon color="#ffffff" style={{fontSize: 34, color: "#188218", opacity: 0.3}}></AddIcon>    
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }}  inset primary={category.name} />
                            
                        </MenuItem>
                        ))}
                   
                   
                  </Select>
                </FormControl>
              </Grid>
          </Grid>
      
        <Grid container spacing={4} >
          <Grid item xs={12} md={4}>
          {this.props.lodgings.map(lodging => (
         
           <Nameable nameable = {lodging}  size="large" selected = { parseInt(this.state.serviceIndex) === parseInt(lodging.id)} onClick={this.selectService} onEdit={this.editLodging}  onDelete={this.handleDeleteLodging}  id={lodging.id}></Nameable>
            ))}
          {this.props.attractions.map(attraction => (

           
            <Nameable nameable = {attraction}  size="large" selected = { parseInt(this.state.serviceIndex) === parseInt(attraction.id)} onClick={this.selectService} onEdit={this.editAttraction}  onDelete={this.handleDeleteAttraction}  id={attraction.id}></Nameable>
          ))}

          
       
          </Grid>

          <Grid item xs={8}>
          
          </Grid>
        
        </Grid>
        
      
       
      </main>
    );
  }
}

const styles = theme => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130,
    height: "100%",
    backgroundColor: "#ffffff"
  },
  icon: {
  marginRight: 0
  },
  grow: {
    width: "100%",
    flex: 1
  },
  center: {
    paddingTop: "40px !important",
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
        paddingLeft: "16px !important",
        paddingRight: "16px !important",
        minWidth: "100vw"
      }
    }, 
  rightOnMobile: {
    [theme.breakpoints.down("sm")]: {
      paddingTop:  "0px !important",
      paddingBottom:  "40px !important",
    }
  },
  signForm: {
    [theme.breakpoints.up("xl")]: {
      maxWidth: "486",
      paddingLeft: "60px !important"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "486",
      paddingLeft: "60px !important",
      minWidth: "400"
    }
  },
  tabItem: {
    opacity: "0.54",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    textTransform: "none",
    color: "#434c5f",
    minWidth: 140,
    width: 130,
    [theme.breakpoints.down("sm")]: {
      flexGrow: 0,
      fontSize: 12
    }
  }
});

BusinessAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};



const mapStateToProps = state => {
  return {
    // sections: state.sections,
    categories: state.sections[1]? state.sections[1].categories : [],
    lodgingsCategories: state.sections[2]? state.sections[2].categories: [],
    attractions: state.attractions,
    lodgings: state.lodgings,
    language: state.language,
    sign: state.sign

  };
};
export default connect(
  mapStateToProps, {filterLodgingsUser, deleteLodging, sortAttractionsUser, deleteAttraction}
 
)(withStyles(styles)(withRouter(BusinessAdmin)));
