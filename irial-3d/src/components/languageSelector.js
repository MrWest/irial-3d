import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, Select, MenuItem, InputLabel } from '@material-ui/core';
import {setLanguageEn, setLanguageEs,
   sortTours, selectTour, sortAttractions, selectAttraction, sortLodgings, selectLodging, 
   getSection, fetchSections, getCategory, getCategories, fetchPosts, selectPost } from "../actions/index";

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
  }
});

class LanguageSelector extends React.Component {
  state = {
    value: this.props.language._language
  };

  componentWillMount(){

    // console.log("LANG",this.props.language)
  }

  dataRequest(view, param, lang){

    
    if(view === "tours")
    {
      this.props.fetchSections()      
      this.props.getCategories();
      this.props.sortTours(param)
    }
    if(view === "tour" || view === "touredit")
    {
      this.props.selectTour(param).then(resp => {
        this.props.getCategory(resp.id_category);
      })
    }
    


    if(view === "attractions")
    {
      this.props.fetchSections()      
      this.props.getCategory();
      this.props.sortAttractions(param)
      
    }
    if(view === "attraction" || view === "attractionedit")
    {
      this.props.selectAttraction(param).then(resp => {
        this.props.getCategory(resp.id_category);
      })
    }

    if(view === "lodgings")
    {
      this.props.fetchSections()      
      this.props.getCategories();
      this.props.sortLodgings(param)
    }
    if(view === "lodging" || view === "lodgingedit")
    {
      this.props.selectLodging(param).then(resp => {
        this.props.getCategory(resp.id_category);
      })
     
    }

    if(view === "sectionedit" )
    {
      this.props.getSection(param)
    }
    
    if(view === "categoryedit" )
    {
      this.props.getCategory(param)
    }
    
   
    if(view === "posts")
    {

      // this.props.selectPost(param);
      this.props.history.push(`/${view}/${slugWorkout(param, lang)}`);
    }
  }

  handleChange = event => {
    if(event.target.value === 'en')
    this.props.setLanguageEn()
    if(event.target.value === 'es')
    this.props.setLanguageEs()
    this.setState({ value: event.target.value });
   
    let {pathname} = this.props.history.location;
    let params = pathname.split("/")
    
    if(params.length>2)
      this.dataRequest(params[1], params[2], event.target.value)

    else{
      if(params[1] === "blog")
      {
       
        this.props.fetchPosts();
      }
      else
      this.props.fetchSections();
    }

     
    
  };

  render() {
    const { classes, style } = this.props;

    return (
      <div className={classes.root} style={style}>
       <FormControl  className={classes.formControl}>
          {/* <InputLabel htmlFor="age-simple">Language</InputLabel> */}
          <Select
            value={this.props.language._language}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
            classes ={ {
              root: classes.select
          }}
          >
         
            <MenuItem value={'en'}   classes ={ {
                        root: classes.menuItem
                    }}><span style={{fontSize: 14}}>{this.props.language.english}</span></MenuItem>
            <MenuItem value={'es'} classes ={{
                        root: classes.menuItem
                    }}><span style={{fontSize: 14}}>{this.props.language.spanish}</span></MenuItem>
          </Select>
        </FormControl>

        {/* <FormControl component="fieldset"  className={classes.formControl}>
          <FormLabel component="legend">{this.state.value}</FormLabel>
          <RadioGroup
            aria-label="Language"
            name="gender1"
            row
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
          
              <FormControlLabel value="en"control={<Radio  classes={{ root: classes.group}} />} label="En" />
          
              <FormControlLabel value="es" classes={{ root: classes.formControl}} control={<Radio classes={{ root: classes.group}} />} label="Es" />
           
            
          </RadioGroup>
        </FormControl> */}
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
  { setLanguageEn, setLanguageEs, sortTours, selectTour, sortAttractions, selectAttraction, sortLodgings, selectLodging,
    getSection ,fetchSections , getCategory, getCategories, selectPost, fetchPosts}
)(withStyles(styles)(withRouter(LanguageSelector)));
