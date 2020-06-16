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
  TextField,
  MenuItem
} from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {FixedButton, CoolButton} from "../buttons"
import {addScene, notifyActivity} from "../../actions";
import CarouselTool from "../carouselTool";
import SectionIcon from "@material-ui/icons/CardTravel";
import AddIcon from "@material-ui/icons/AddCircle";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Form, reduxForm,Field, initialize } from "redux-form";
import { withRouter } from "react-router-dom";
import {
  required,
  email,
  date,
  length,
  numericality,
  format
} from "redux-form-validators";

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
    widthMobile: {
      [theme.breakpoints.down("sm")]: {
        width: "100% !important",
        textAlign: "right !important"      
      }
    },
    rightOnMobile: {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
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
      length({ min: 3 })
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

class SceneAddForm extends React.Component {
  state = {id_category: -1, currency: "CUC"
}

handleChange2 = event => {
  this.setState({ currency: event.target.value });
};

    realhandleSubmit = async data => {

      const { sign, addScene, history } = this.props;
        // console.log("SHIT: ", data)
        data.id_category = this.state.id_category
        data.id_user = sign.loginInfo.id;
        addScene(data).then(scene => {
          if(scene.id) {
            let message = sign.loginInfo.first_name + " " + sign.loginInfo.last_name + " has added a new scene business to vinalestraveler called: " + data.name;

            let subject = "New scene";
       
            let email = sign.loginInfo.email;
       
            notifyActivity({ message, subject, email});
       
            history.push(`/sceneedit/${scene.id}`)
          }
        });

        
      }

      
   componentWillMount(){

    const {id} = this.props.match.params

    this.setState({id_category: id})
   }
     

  render(){
    const { pristine, name, general, classes, language, handleSubmit } = this.props
      return (
        <main className={classes.container}>
        <Grid container justify="center" spacing={0}>
          <Grid item className={classes.center}>
        <Form onSubmit={handleSubmit(this.realhandleSubmit.bind(this))}>
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
                      {language.AddFormTittle.format(language.Scene)}
                    
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
                    {language.AddFormText.format(language.Scene)}
                  </Typography>
              </Grid>
            </Grid>
          
           
          
            </Grid>           
            <Grid item xs={12} md={8} alignItems="flex-start" style={{ paddingTop: 0 }}>
            <Grid container spacing={4}>
            <Grid item xs={12} md={6} alignItems="flex-start" style={{ paddingTop: 10 }}>
                <Field
                name="name"
                margin="small"
                type="text"
                fullWidth
                autoComplete="name"
                component={renderTextField}
                label={language.Name}
                />
            </Grid>

           
            <Grid item xs={12} md={12} alignItems="flex-start" style={{ paddingTop: 10 }}>
                 <Field
                name="general_description"
                margin="small"
                type="text"
                fullWidth
                autoComplete="general_description"
                component={renderTextField}
                label={language.GeneralDescription}              
                component={renderTextArea}
                multiLine={true}
                rows={6}
                />
            </Grid>
               
            <Grid item xs={12} md={12}  style={{ paddingTop: 10 }} >
              
                <Field
                    name="full_description"
                    margin="small"
                    type="text"
                    fullWidth
                    autoComplete="full_description"
                    component={renderTextField}
                    label={language.FullDescription}
                    component={renderTextArea}
                    multiLine={true}
                    rows={6}
                    />
                  </Grid>
                <Grid item xs={4} md={2}  style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="price"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="price"
                        component={renderTextField}
                        label={language.Price}
                        />      
                
                

                  </Grid>
                <Grid item xs={4} md={2}  style={{ paddingTop: 25, fontSize: 8 }} >
                  <Field
                        name="currency"
                        type="text"
                        fullWidth
                        autoComplete="currency"
                        component={renderSelectField}
                        label="Currency"
                        value={this.state.currency}
                        onChange={this.handleChange2}
                        >
                          <MenuItem value="CUC">
                            <p>CUC</p>
                          </MenuItem>                        
                        </Field>      
                

                  </Grid>
                  
                  <Grid item xs={12} md={6}  style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="price_specifics"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="price_specifics"
                        component={renderTextField}
                        label={language.PriceSpecifics}
                        />      
                
                

                  </Grid><Grid item xs={12} md={4}  style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="how_long"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="how_long"
                        component={renderTextField}
                        label={language.Duration}
                        />      
                
                

                  </Grid>
                  {/* <Grid item xs={3} style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="pickup_time"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="pickup_time"
                        component={renderTextField} 
                        label="Pick up Time"
                        />      
                
                

                  </Grid> */}
                  <Grid item xs={12} md={8} style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="languages"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="languages"
                        component={renderTextField}
                        label={language.Languages}
                        />      
                
                

                  </Grid>
               
                  </Grid>
            </Grid>
            <Grid item xs={12} md={4} alignItems="flex-start" style={{ paddingTop: 0 }} align="left" className={classes.rightOnMobile}>
           
            
            <div style={{border: "1px #3577d4 solid", height: 200, width: 200, borderRadius: 100, display: "table"}}>
              
              <div style={{margin: "auto", display: "table-cell", textAlign: "center", verticalAlign: "middle"}}>
                <SectionIcon color="disabled" style={{fontSize: 80}}></SectionIcon>
              </div>
            </div>
           
            </Grid>           

           
            
            <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 10, textAlign: "left" }}>
           
                    <CoolButton height={56} width={245} fill={"#337ab7"} color={"#ffffff"} >
                        {language.Save}
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
    //  tour: state.selectedTour,
     sign: state.sign,
     category: state.selectedCategory,
     language: state.language
  
    };
  };
  export default connect(
    mapStateToProps,
    { initialize, addScene}
  )(
    reduxForm({ form: "sceneAddForm",  validate })(
      withStyles(styles)(withRouter(SceneAddForm))
    )
  );

