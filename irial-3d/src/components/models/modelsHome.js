import React, { Component } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import {
  Grid,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchModels, sortModels } from "../../actions";
import {Helmet} from 'react-helmet';
import Loader from '../global/loader';
import DisplayModelsTool from "./displayModelsTool";
import {getLanguage} from "../../apis/tools";
import { isServer } from '../../apis/tools';

class ModelsHome extends Component {
  state = {
    sort: "all",
    category: {},
    busy: true
  };
  
  componentWillMount() {
    if(!isServer) {
      const { category } = this.props.match.params;
      this.setState({sort: category})
      this.props.sortModels(category).then(() => {
        this.setState({ busy: false });
      });
      this.props.categories.map(c =>{
          if(parseInt(c.id) === parseInt(category))
            this.setState({category: c})
      })
    }
    
    // this.myRef = React.createRef()   // Create a ref object 
  }

  componentDidMount() {
    // this.myRef.current.scrollTo(0, 0);
  }

  handleChange = event => {
    if(this.state.sort !==  event.target.value)
    {
        this.setState({ sort: event.target.value, busy: true });
        this.props.sortModels(event.target.value).then(() => {
          this.setState({ busy: false });
        });

        this.props.categories.map(c =>{
          if(c.id === event.target.value)
            this.setState({category: c})

      });
      this.props.history.push("/models/"+event.target.value);
    }
    
  };

  render() {
    const { classes, section, language } = this.props;    
    const { busy } = this.state;
    if(!section)
       return <div/>; 
    return (
      <main  ref={this.myRef} className={classes.container}>
          <Helmet>
              <meta name="language" content={getLanguage()}/>
              <title>{language.PageTittle} | {language.ModelsPageTittle} </title>
              <meta name="description" content={language.ModelsPageDescription} />
              <meta name="keywords" content={language.ModelsPageTags}  /> 
            </Helmet>
      <Grid container justify="center" spacing={0}>
        <Grid item className={classes.center}>
          <Grid container spacing={4} > 
            <Grid item  xs={12} md={8} className={classes.mobilePadding}>

            <p style={{fontSize: 16, lineHeight: 1.3, color: '#0f2440 !important', fontFamily: 'Roboto !important'}}>
                <h1 variant="p" align="left" className={classes.categoryTittle} style={{ display: 'inline'}}>
                {this.state.sort === "all"? this.props.section.name+ " " : this.state.category.name+ " "}  
                </h1>
               {this.state.sort === "all"? this.props.section.description : this.state.category.promotion}
            </p>
                
              </Grid>
              <Grid item xs={12} md={4}>
                 <Grid item align="right">
                   <FormControl variant="outlined" className={classes.seletcTool}>
                   <InputLabel htmlFor="idsimple">{language.Filter}</InputLabel>
                  <Select
                    value={this.state.sort}
                    onChange={this.handleChange}
                    margin="none"
                    
                  >
                    <MenuItem value={"all"}>
                      <p style={{ fontSize: 14, marginBottom: 0,  color: '#0f2440' }}>
                        <em>{this.props.language.ViewAll}</em>
                      </p>
                    </MenuItem>
                    {this.props.categories.map((category, index) => (
                      
                      <MenuItem value={category.id}>
                       <p style={{ fontSize: 14, marginBottom: 0,  color: '#0f2440' }}>
                         <strong>{category.name}</strong>
                       </p>
                     </MenuItem>
                      
                         
                        
                    ))}
                  </Select>
                </FormControl>
                </Grid>               
              </Grid>
              
              
            </Grid>
            <Grid item xs={12}>
               <DisplayModelsTool
                 models={this.props.models}
               />
            
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
  mobilePadding: {   
    [theme.breakpoints.down("sm")]: {
      
      paddingLeft: "24px !important",
      paddingRight: "16px !important"
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
    }
    ,
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
    '& div': {
      maxHeight: '52px !important'
    },
    '& em, p': {
      paddingRight: '8px !important'
    },
    '& label': {
      transform: 'translate(14px, -14px) scale(0.75) !important'
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 8,
      marginLeft: 24,
      marginRight: 8
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

ModelsHome.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateTopProps = state => {
  return {
    models: state.models,
    categories: state.sections[2]? state.sections[2].categories : [],
    section: state.sections[2],
    language: state.language
  };
};

export default connect(mapStateTopProps, {fetchModels, sortModels })(withStyles(styles)(ModelsHome));
