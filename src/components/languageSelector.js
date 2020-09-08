import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import SwitchTool from './switchTool';
import { Grid, Select, MenuItem, InputLabel, Switch, FormControlLabel } from '@material-ui/core';
import {setLanguageEn, setLanguageEs,
   sortTours, selectTour, sortModels, selectModel, sortProjects, selectProject,
   getSection, fetchSections, getCategory, getCategories, fetchPosts, selectPost, fetchTags,
    sortTextures, selectTexture, sortScenes, selectScene } from "../actions/index";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


const slugWorkout = (slug, lang) => {
  const array = slug.split('-');
  array.pop();
  array.push(lang);
  return array.join('-');
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: 0,
    padding: 0
  },
  group: {
    margin: 0,
    padding: 0,
    paddingRight: 5
  },
  select: {
    color: "#999",
    borderBottom: "#aaa"
  },
  menuItem: {
    color: "#434c5f"
  },
  label: {
    fontFamily: 'Arial',
    color: '#ffffff',
    fontSize: 12,
    marginRight: 8
  }
});

class LanguageSelector extends React.Component {
  state = {
    value: this.props.language._language
  };


  dataRequest(view, query, lang){

    const { history, getSection, getCategory, fetchSections, fetchTags,
       sortModels, selectModel, sortProjects, selectProject, sortTextures, selectTexture, sortScenes, selectScene } = this.props;
    fetchSections();
    fetchTags();

    const settings = query.split('-');
    const queryFilter =  settings[0] || 'all';
    const querySort = settings[1] || 'all';

    switch(view) {
      case 'models':
        sortModels(queryFilter, querySort);
        break;
      case 'model':
        selectModel(queryFilter);
        break;
      case 'projects':
        sortProjects(queryFilter, querySort);
        break;
      case 'project':
        selectProject(queryFilter);
        break;
      case 'textures':
        sortTextures(queryFilter, querySort);
        break;
      case 'texture':
        selectTexture(queryFilter);
        break;
      case 'scenes':
        sortScenes(queryFilter, querySort);
        break;
      case 'scene':
        selectScene(queryFilter);
        break;
      default:
        break;
    }




    if(view === "sectionedit" )
      getSection(query);
    
    if(view === "categoryedit" )
      getCategory(query);
    
   
    if(view === "posts")
    {

      // this.props.selectPost(param);
      history.push(`/${view}/${slugWorkout(param, lang)}`);
    }
  }

  handleChange = value => {
    if(value === 'en')
    this.props.setLanguageEn()
    if(value === 'es')
    this.props.setLanguageEs()
    this.setState({ value: value });
   
    let {pathname} = this.props.history.location;
    let params = pathname.split("/")
    
    if(params.length>2)
      this.dataRequest(params[1], params[2], value)

    else{
      if(params[1] === "blog")
      {
       
        this.props.fetchPosts();
      }
      else
      this.props.fetchSections();
      
      this.props.fetchTags();
    }

     
    
  };

  render() {
    const { classes, style, language } = this.props;
    const { value } = this.state;
    const translatedLabel = { en: language.english, es: language.spanish };

    return (
      <div className={classes.root} style={style}>
        <Grid container alignItems="center">
          <Grid item xs>
            <span className={classes.label}>{translatedLabel[value]}</span>
          </Grid>
          <Grid item>
            <SwitchTool value={value} onItem="en" offItem="es" onChange={this.handleChange} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

LanguageSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  { setLanguageEn, setLanguageEs, sortTours, selectTour, sortModels, selectModel, sortProjects, selectProject,
     sortTextures, selectTexture, sortScenes, selectScene,
    getSection ,fetchSections , getCategory, getCategories, selectPost, fetchPosts, fetchTags}
)(withStyles(styles)(withRouter(LanguageSelector)));
