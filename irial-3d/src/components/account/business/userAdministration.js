import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SectionEditForm from "../../forms/sectionEditForm";
import Nameable from "./nameable";
import { connect } from "react-redux";
import nameable from "./nameable";
import {getCategories, sortTours, deleteCategory, deleteTour, sortAttractions, deleteAttraction, deleteModel, sortModelsByCategoryUser} from "../../../actions";
import AddIcon from "@material-ui/icons/AddCircle";
import {RoundedButtonLink} from "../../buttons";
import { withRouter } from "react-router-dom";

class UserAdministration extends Component {
  state = { selectedIndex: 0,
  sectionIndex: -1, categoryIndex: -1, serviceIndex: -1,
  services: "none"
};


  handleChange = (event, value) => {

    
    this.setState({selectedIndex: value})
  }

  getServices(id)
  {
    var services = "none"
    this.props.sections.map(section =>{
      if(parseInt(section.id) === parseInt(id))
      {
        services = section.type
      }
    })

    return services
  }
  selectSection = event => {

    // console.log("fuck:",event)
    this.setState({sectionIndex: event.currentTarget.id, categoryIndex: -1, 
    services: this.getServices(event.currentTarget.id)})

    this.props.getCategories(event.currentTarget.id)

  }

  selectCategory = event => {
    const { profile } = this.props;
    this.setState({categoryIndex: event.currentTarget.id})

    if(this.state.services === "tours")
    this.props.sortTours(event.currentTarget.id)
    if(this.state.services === "attractions")
     this.props.sortAttractions(event.currentTarget.id)

     
     if(this.state.services === "models")
     this.props.sortModelsByCategoryUser({category: event.currentTarget.id, user: profile.id});
  }

  selectService = event => {

    this.setState({serviceIndex: event.currentTarget.id})
  }
  
   handleDeleteModel = event => {

    this.props.deleteModel(event.currentTarget.id)
   }
   
  editModel = event => {
    // console.log("jajaja",event.currentTarget)
    this.props.history.push("/modeledit/"+ event.currentTarget.id)
  }

  render() {
    const { classes, language, sections, categories, tours, models } = this.props;
    const { services, sectionIndex, categoryIndex, serviceIndex  } = this.state;
    return (
      <main>
       
        <Grid container spacing={4} style={{paddingBottom: 40}}>
          <Grid item xs={12} md={4}>
          
            <div style={{display: "table", height: 40 }}>
              <div style={{display: "table-cell", verticalAlign: "middle", paddingLeft: 10}}>
                <p>{language.Sections}</p>
              </div>
            </div>
          <div>
              {sections.map(section => (
                <Nameable key={section.id} nameable = {section} size="large" 
                selected = { parseInt(sectionIndex) === parseInt(section.id)}
                onClick={this.selectSection} id={section.id}
                notEditable></Nameable>
                ))}
          </div>
          </Grid>

          <Grid item  xs={12} md={4}>

               <div style={{display: "table", height: 40 }}>
                <div style={{display: "table-cell", verticalAlign: "middle", paddingLeft: 10}}>
                <p>{language.Categories}</p>
                </div>
               </div>
               <div>
                {categories.map(category => (

                    <Nameable key={category.id} nameable = {category}  size="medium" 
                      selected = { parseInt(categoryIndex) === parseInt(category.id)}
                      onClick={this.selectCategory} id={category.id}
                      notEditable
                    ></Nameable>
                    ))} 
            </div>
          </Grid>

          <Grid item  xs={12} md={4}>
          <div>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs >
                <div style={{display: "table", height: "100%"}}>
                  <div style={{display: "table-cell", verticalAlign: "middle", paddingLeft: 10}}>
                  <p>{language.Services}</p>
                  </div>
                </div>
                
                </Grid>
                <Grid item align="right" style={{paddingRight: 15, visibility: categoryIndex != -1? "inherit": "hidden"}}>
  
                    {services === "models" &&
                      <RoundedButtonLink  color={"#ffffff"} size={40} border={0}  to={categoryIndex != -1? `/modeladd/${categoryIndex}` : "#"}>
                                          <AddIcon color="#188218" style={{fontSize: 34, color: "#188218"}}></AddIcon>
                      </RoundedButtonLink>
                    }



                </Grid>
            </Grid>
          </div>
          <div>
          
              {services === "models" && models.map(model => (
                <Nameable key={model.id} nameable = {model}  size="small" selected = { parseInt(serviceIndex) === parseInt(model.id)} onClick={this.selectService} onEdit={this.editModel}  onDelete={this.handleDeleteModel}  id={model.id}></Nameable>
              ))}
            </div>
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
  grow: {
    width: "100%",
    flex: 1
  },
  cover: {
    [theme.breakpoints.up("sm")]: {
      backgroundImage: "url(../images/sign/artwork.svg)",
      backgroundRepeat: "no-repeat",
      // backgroundSize: "cover",
      backgroundPosition: "right",
      backgroundSize: "contain",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    [theme.breakpoints.up("xl")]: {
      paddingBottom: "200 !important"
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: "85 !important"
    }
  },
  center: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      minWidth: "1280px"
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1120px",
      paddingLeft: "0 !important",
      minWidth: "1120px"
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

UserAdministration.propTypes = {
  classes: PropTypes.object.isRequired
};



const mapStateToProps = state => {
  return {
    sections: state.sections,
    categories: state.categories,
    tours: state.tours,
    attractions: state.attractions,
    models: state.models,
    language: state.language,
    profile: state.profile
  };
};
export default connect(
  mapStateToProps, {getCategories, sortTours, deleteCategory, deleteTour, sortAttractions, deleteAttraction, deleteModel, sortModelsByCategoryUser }
 
)(withStyles(styles)(withRouter(UserAdministration)));
