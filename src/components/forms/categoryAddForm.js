
import React from "react";
import {
  Grid,
  Button,
  Select,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  TextField
} from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {FixedButton, CoolButton} from "../buttons"
import {addCategory,getCategories} from "../../actions";
import CarouselTool from "../carouselTool";
import SectionIcon from "@material-ui/icons/School";
import AddIcon from "@material-ui/icons/AddCircle";
import ArrowBack from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import {RoundedButtonLink} from "../buttons";
import { Form, reduxForm,Field, initialize } from "redux-form";
import {
  required,
  email,
  date,
  length,
  numericality,
  format
} from "redux-form-validators";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//  var ImagePicker = require('react-native-image-picker');





  const renderTextField = ({ input, label, placeholder, classes, meta }) => {
  
    return (
      <FormControl fullWidth className="">
        <InputLabel >{label}</InputLabel>
        <Input
          {...input}
          error={meta.touched && meta.error && true}
          placeholder={placeholder}
        />
        {renderError(meta)}
      </FormControl>
    );
  };

const renderTextArea = ({ input, label, placeholder, classes, meta }) => {
  
    return (
      <FormControl fullWidth >
        <InputLabel >{label}</InputLabel>
        <Input
            {...input}
            placeholder={placeholder}
            error={meta.touched && meta.error && true}
            multiline={true}
            rows={6}
            rowsMax={6}
            classes={classes}
            className={classes}
            />
        
        
        {renderError(meta)}
      </FormControl>
    );
  };

const renderError = ({ error, touched }) => {
 
  if (touched && error) {
    return (
      <FormHelperText id="component-error-text" style={{ color: "#f44336" }}>
        {error}
      </FormHelperText>
    );
  }
};

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <Select
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(event)}
    children={children}
    {...custom}
  />
);

const styles = theme => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130
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
      display: "none"
    }
  },
    root: {
      ...theme.mixins.gutters(),
      paddingTop: 8,
      paddingBottom: 8,
      background: "transparent"
    },
    orderButton: {
      background: "#ffffff",
      color: "#3577D4",
      fontWeight: "bold",
      width: "100%"
    },
    orderBottomButton: {
      color: "#ffffff",
      borderColor: "#ffffff",
      width: "100%",
      fontWeight: "bold",
      marginTop: 20
    },
    hrBar: {
      background: "#e4e400",
      borderColor: "#337ab7",
      color: "#337ab7 !important",
      marginTop: 10,
      marginBottom: 10,
      height: 3,
      width: "100%",
      textAlign: "left !important"
    },
    typographyText: {
      color: "#337ab7 !important",
      textAlign: "left !important",
      fontWeight: "bold"
    },
    typographyTextSmall: {
      marginBottom: 10,
      textAlign: "left !important",
      fontSize: 12
    },
    areaText: {
      fontSize: 12
    }
  });

  const validations = {
    // amount: [
    //   required({ msg: "Required" }),
    //   numericality({
    //     int: true,
    //     ">=": 50,
    //     msg: { greaterThanOrEqualTo: "You must be at least 50 swag packs" }
    //   })
    // ],
    // budget: [
    //   required({ msg: "Required" }),
    //   numericality({
    //     int: true
    //   })
    // ],
  
    email: [
      required({ msg: "Required" }),
      email(),
      format({
        width: /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|aol|hotmail|yahoo|outlook|icloud|inbox|mail)\.com$/i,
        message: { defaultMessage: "Must use corporate email address" }
      })
    ],
    name: [
      required({ msg: "Required" }),
      length({ min: 3 }),
      format({
        with: /^[a-zA-Z\s]*$/i,
        message: { defaultMessage: "Letters only" }
      })
    ],
    promotion: [
      required({ msg: "Required" }),
      length({ min: 10 })
     
    ],
    description: [
      required({ msg: "Required" }),
      length({ min: 100 })]
      ,
  
  };
  
  // Reusable with any other form
  const validate = values => {
    const errors = {};
    for (let field in validations) {
      let value = values[field];
      errors[field] = validations[field]
        .map(validateField => {
          return validateField(value, values);
        })
        .find(x => x);
    }
    let regex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(gmail|aol|hotmail|yahoo|outlook|icloud|inbox|mail).com$"
    );
    if (regex.test(values.email)) {
      errors.email = "Must use corporate email address";
    }
    return errors;
  };

  const options = {
    title: "Select a photo",
    takePhotoButtonTitle: "Take a photo",
    chooseFromLibraryButtonTitle: "Choose from gallery",
    quantity: 1
  }

class CategoryAddForm extends React.Component {
  state = {id_section: -1 }

    realhandleSubmit = data => {

        // console.log("SHIT: ", data)
        data.id_section = this.state.id_section
        this.props.addCategory(data);
        this.props.getCategories( this.state.id_section);
        this.props.history.push("/account")
        
      }

      
   componentWillMount(){

    const {id} = this.props.match.params

    this.setState({id_section: id})
   }
     

  render(){
    const { pristine, name, general, classes } = this.props
      return (
        <main className={classes.container}>
        <Grid container justify="center" spacing={0}>
          <Grid item className={classes.center}>
        <Form onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))}>
            <Grid container spacing={4} style={{paddingBottom: 40}}>
           
            <Grid item xs={12} >
            <Grid container>
              <Grid item>
              <div style={{display: "table", height: 40}}>
                <div style={{display: "table-cell", verticalAlign: "middle"}}>
                <Link to="/account" style={{background: "#ffffff"}}>
                        <ArrowBack color="primary" ></ArrowBack>
                      </Link>
                </div>
                   
              </div>
                  
              </Grid>
              <Grid item alignItems="baseline">
                  <Typography
                      variant="h4"
                      component="h4"
                      className={classes.typographyText}
                    >
                      Category Adding Form
                    
                    </Typography>
                    <Grid container>
                
               
                        <Grid item xs={2}>
                        <div className={classes.hrBar} />
                        </Grid>
                        <Grid item xs={10}></Grid>
                       </Grid>
                  
                  <Typography
                    variant="p"
                    component="p"
                    className={classes.typographyTextSmall}
                  >          
                    Edit the content to display for the current Category, you can also customize the images on the right panel.
                  </Typography>
              </Grid>
            </Grid>
          
           
          
            </Grid>           
            <Grid item  xs={12} md={8} alignItems="flex-start" style={{ paddingTop: 0 }}>
            <Grid item  xs={12} md={6} alignItems="flex-start" style={{ paddingTop: 10 }}>
                <Field
                name="name"
                margin="small"
                type="text"
                fullWidth
                autoComplete="name"
                component={renderTextField}
                label="Name"
                />
            </Grid>

           
            <Grid item  xs={12} md={10} alignItems="flex-start" style={{ paddingTop: 10 }}>
                 <Field
                name="slogan"
                margin="small"
                type="text"
                fullWidth
                autoComplete="slogan"
                component={renderTextField}
                label="Slogan"
                />
            </Grid>
               
            <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 10 }} >
              
                <Field
                    name="promotion"
                    margin="small"
                    type="text"
                    fullWidth
                    autoComplete="promotion"
                    component={renderTextArea}
                    multiLine={true}
                    rows={6}
                    label="Promotion"
                    />
                  </Grid>
                  <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 10, fontSize: 8 }} >
              
                  <Field
                    name="icon_path"
                    component={renderTextArea}
                    margin="small"
                    fullWidth
                    type="text"
                    label="Icon Path"
                    multiLine={true}
                    rows={6}
                    classes={classes.areaText}
                    />
                
                

                  </Grid>
            </Grid>
            <Grid item  xs={12} md={4} alignItems="flex-start" style={{ paddingTop: 0 }} align="right" className={classes.rightOnMobile}>
           
            
            <div style={{border: "1px #3577d4 solid", height: 200, width: 200, borderRadius: 100, display: "table"}}>
              
              <div style={{margin: "auto", display: "table-cell", textAlign: "center", verticalAlign: "middle"}}>
                <SectionIcon color="disabled" style={{fontSize: 80}}></SectionIcon>
              </div>
            </div>
           
            </Grid>           

           
            
            <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 40, textAlign: "left" }}>
           
                    <CoolButton height={56} width={245} fill={"#337ab7"} color={"#ffffff"} >
                        Save
                    </CoolButton>
            </Grid>
            </Grid>
        </Form>
        </Grid>
          
        </Grid>
      </main>
  );
        }
}


const mapStateToProps = state => {
    return {
     category: state.selectedCategory,
     section: state.selectedSection
  
    };
  };
  export default connect(
    mapStateToProps,
    { initialize, addCategory, getCategories}
  )(
    reduxForm({ form: "categoryAddForm",  validate })(
      withStyles(styles)(withRouter(CategoryAddForm))
    )
  );


  