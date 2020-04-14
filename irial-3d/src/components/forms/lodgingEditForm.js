import React from "react";
import {
  Grid,
  Select,
  RadioGroup,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  TextField,
  MenuItem,
  TableRow,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Switch,
  LinearProgress
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {CoolButton} from "../buttons"
import {selectLodging, updateLodging, uploadLodgingImage, deleteLodgingImage, uploadLodgingVideo, deleteLodgingVideo,
   updateLodgingProgram, addLodgingProgram, deleteLodgingProgram, changeLodgingProgram} from "../../actions";
import CarouselTool from "../carouselTool";
import SectionIcon from "@material-ui/icons/CardTravel";
import AddIcon from "@material-ui/icons/AddCircle";
import ArrowBack from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import {RoundedButtonLink} from "../buttons";
import { Form, reduxForm,Field, initialize } from "redux-form";
import { withRouter } from "react-router-dom";
import {
  required,
  email,
  length,
  format
} from "redux-form-validators";
import Loader from '../global/loader';
import { Player } from 'video-react';
import { Link } from "react-router-dom";

//  var ImagePicker = require('react-native-image-picker');



const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: '#efefef'
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#188218',
  },
})(LinearProgress);




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

export const renderToggleInput = (field) => (
  <Switch  checked={field.input.value} onChange={field.input.onChange} icons={false} color="primary" />
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
        textAlign: "right !important",   
        paddingRight: "16px !important",   
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
      borderColor: "#188218",
      color: "#188218 !important",
      marginTop: 10,
      marginBottom: 10,
      height: 3,
      width: "100%",
      textAlign: "left !important"
    },
    typographyText: {
      color: "#188218 !important",
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
        fontSize: 12,        
        minWidth: 80,
        width: "33vw"
      }
    },
    positionCell:{
      paddingRight: 10
    },
    contentCell:{
      paddingLeft: "5px !important",
      paddingRight: "0px !important",
      paddingTop: "0px !important",
      paddingBottom: "3px !important"
    },
    addCell:{
      paddingLeft: 0,
      paddingRight: "0px !important"
    },
    textField:{
      fontSize: 10,
     

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


class LodgingEditForm extends React.Component {
  state = {
    selectedImage: undefined,
    imageData: undefined,
    selectedIndex: 0,
    currency: "CUC",
    busy: true,
    completed: 0,
    error: ""
  }
  handleChange2 = event => {
    this.setState({ currency: event.target.value });
  };
    realhandleSubmit = data => {

        console.log("SHIT: ", data)
        data.id = this.props.lodging.id
        this.props.updateLodging(data);
        this.props.history.push("/account")
      }

      componentWillMount()
      {
        const {id} = this.props.match.params
        this.props.selectLodging(id).then(() => {
          this.setState({ busy: false });
        });
      }
   
      onUploadProgress = progressEvent => {
        var percentCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total);
        //console.log('Loaded: ', `${percentCompleted}%`);
        this.setState({completed: percentCompleted});
        
      };

      selectImageFile = event =>{
        const { language } = this.props;
        let files = event.target.files
        let reader = new FileReader();        
        try {
          reader.readAsDataURL(files[0])
          this.setState({error: '', completed: 0});
          reader.onload = e => {
  
            // console.log("xXx", files[0])
            if(files[0] && files[0].size < 4200000 ){
            this.setState({imageData: e.target.result})
          this.props.uploadLodgingImage({lodgingId: this.props.lodging.id, file:  e.target.result,
             fileName: files[0].name, lodgingName: this.props.lodging.name, onProgress: this.onUploadProgress}).then(res=> {

              this.props.selectLodging(this.props.match.params.id).then(()=> this.setState({completed: 0}));
             });
            }
            else
            this.setState({error: language.MAX_FILE_SIZE.format('4 Mb')})
          }
          }
          catch (error) {
            this.setState({error: language.UPLOAD_FAILED})
          }
        
    
      }

      handleDeleteImage = event => {

        this.props.deleteLodgingImage(event.currentTarget.id).then(res=> {

          this.props.selectLodging(this.props.match.params.id)
         })
      }

      selectVideoFile = event =>{
        const { language } = this.props;
        let files = event.target.files
        let reader = new FileReader();
        try {
          reader.readAsDataURL(files[0])
          this.setState({error: '', completed: 0});
        reader.onload = e => {

          // console.log("xXx", files[0])
          if(files[0] && files[0].size < 6300000 ){
          this.setState({imageData: e.target.result})
          this.props.uploadLodgingVideo({lodgingId: this.props.lodging.id, file:  e.target.result,
             fileName: files[0].name, lodgingName: this.props.lodging.name, onProgress: this.onUploadProgress}).then(res=> {

              this.props.selectLodging(this.props.match.params.id).then(()=> this.setState({completed: 0}));
             });
            }
            else
                this.setState({error: language.MAX_FILE_SIZE.format('6 Mb')})

        }
      }
      catch (error) {
        this.setState({error: language.UPLOAD_FAILED})
      }
    
      }

      handleDeleteVideo = event => {

        this.props.deleteLodgingVideo(event.currentTarget.id).then(res=> {

          this.props.selectLodging(this.props.match.params.id)
         })
      }

      handleChange = (event, value) => {
        this.setState({selectedIndex: value})
      };

      handleProgramChange= event => {
        this.props.updateLodgingProgram({id: event.target.id, content: event.target.value, idLodging: this.props.match.params.id})
        // this.props.selectLodging(this.props.match.params.id)
      }

      addNewProgram= event => {

        this.props.addLodgingProgram({id_lodging: this.props.match.params.id, content: "New activity",
         position: this.props.lodging.program.length+1})
        this.props.selectLodging(this.props.match.params.id)
      }

      handleDeleteLodgingProgram = event => {

        this.props.deleteLodgingProgram(event.currentTarget.id)
        this.props.selectLodging(this.props.match.params.id)
      }
      
      handleTextChange(event){

       this.props.changeLodgingProgram({id: event.target.id, content: event.target.value})
      }
      
  render(){
    const { pristine, name, theme, classes, handleSubmit, language } = this.props
    const { busy, completed, error  } = this.state;
      return (
        <main className={classes.container}>
        <Grid container justify="center" spacing={0}>
          <Grid item className={classes.center}>
        <Form onSubmit={handleSubmit(this.realhandleSubmit.bind(this))}>
        <Grid container spacing={4} style={{paddingBottom: 80}}>
           
           <Grid item xs={12} md={7} >
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
                      {language.EditFormTittle.format(language.Lodging)}
                    
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
                    {language.EditFormText.format(language.Lodging)}    
                  </Typography>
              </Grid>
              <Grid item className={classes.widthMobile}>
                 <Grid container spacing={4}>
                 
                 <Grid item xs={6}>
                        <div style={{display: "table", height: 40}}>
                         <div style={{display: "table-cell", verticalAlign: "middle"}}>
                          <Link to={"/lodging/" + this.props.lodging.id} style={{background: "#ffffff"}}>
                           {this.props.language.See}
                          </Link>
                          </div>                   
                         </div>
                        </Grid>

                        {this.props.sign.isLogged && this.props.sign.loginInfo &&
                     (this.props.sign.loginInfo.type === "admin") &&
                     <Grid item  xs={6} >

                     <p style={{fontSize: 12, textAlign: "right", color: "#777", paddingRight: -16}} className={classes.rightOnMobile}>{language.Status}</p>
                     <Field
                                name="status"
                                id="status"
                                component={renderToggleInput}
                                   />
                       </Grid>}
                 
                 </Grid>
                      
              </Grid>
            
            </Grid>
           
            <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 0 }}>
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

           
            <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 10 }}>
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
               
            <Grid item xs={12}  style={{ paddingTop: 10 }} >
              
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
                  <Grid item xs={12} style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="location"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="location"
                        component={renderTextField}
                        label={language.Location}
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
                        label={language.Currency}
                        value={this.state.currency}
                        onChange={this.handleChange2}
                        >
                          <MenuItem value="CUC">
                            <p>CUC</p>
                          </MenuItem>                        
                        </Field>      
                

                  </Grid>
                  <Grid item xs={12} md={8} style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="price_specifics"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="price_specifics"
                        component={renderTextField}
                        label={language.PriceSpecifics}
                        />      
                
                

                  </Grid>
                  <Grid item xs={4} md={2}  style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="capacity"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="capacity"
                        component={renderTextField}
                        label={language.Capacity}
                        />      
                
                

                  </Grid>
                  <Grid item xs={8} md={3} style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="capacity_specifics"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="capacity_specifics"
                        component={renderTextField}
                        label={language.CapacitySpecifics}
                        />      
                
                

                  </Grid>
                  <Grid item xs={12} md={7} style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="note"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="note"
                        component={renderTextField}
                        label={language.QuickNote}
                        />      
                
                

                  </Grid>
                 

                  <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 40, textAlign: "left" }}>
           
                        <CoolButton height={56} width={245} fill={"#188218"} color={"#ffffff"}>
                            {language.Save}
                        </CoolButton>
                </Grid>
               
               </Grid>
                 
            </Grid>
         
       
            </Grid>           
          
            <Grid item xs={12} md={5} alignItems="flex-start" style={{ paddingTop: 0 }} align="center">

                  <div>
                    <Tabs
                      value={this.state.selectedIndex}    
                      onChange={this.handleChange}            
                      indicatorColor="primary"
                      textColor="inherit"
                      variant="fullWidth"
                    >
                      
                                   
                                    <Tab label={language.Images} className={classes.tabItem} />
                                    <Tab label={language.Videos} className={classes.tabItem} />
                                    <Tab label={language.Services} className={classes.tabItem} />
                                
                      
                    </Tabs>
                  </div>
                  <SwipeableViews
                  
                    index={this.state.selectedIndex}
                    // onChangeIndex={this.handleChangeIndex}
                  >
                  <div>

                  <div style={{right: 0, position: "relative", marginBottom: 0, width: "100%"}} align="right">

                  <input type="file" name="fileToUpload" disabled = {!this.props.lodging.images || this.props.lodging.images.length > 9}  id="fileToUpload" accept="image/x-png,image/gif,image/jpeg" onChange={this.selectImageFile.bind(this)} style={{display: "none"}}></input>
                  <label htmlFor={"fileToUpload"}>
                    <AddIcon color="#188218" style={{fontSize: 34, color: "#188218", background: "#ffffff", borderRadius: 34}}></AddIcon>
                        
                  </label>
                                
                  </div>
                  {this.props.lodging.images&& (this.props.lodging.images.length === 0 ? 
                  <div style={{border: "1px #3577d4 solid", height: 200, width: 200, borderRadius: 100, display: "table"}}>

                  <div style={{margin: "auto", display: "table-cell", textAlign: "center", verticalAlign: "middle"}}>
                    <SectionIcon color="disabled" style={{fontSize: 80}}></SectionIcon>
                  </div>
                  </div>
                  :
                  <CarouselTool>
                  {this.props.lodging.images && this.props.lodging.images.map(image =>(
                    <div align="right" style={{width: "100%", position: "relative", textAlign: "right"}}>
                      
                      <img style={{width: "100%", borderTopLeftRadius: 4, objectFit: "cover", height: 280}} alt={image.alt} src={image.url}/>
                          <div style={{width: 40, right: 0, position: "absolute", bottom: 15}}>
                                    <RoundedButtonLink id={image.id}  size={40} border={0} onClick={this.handleDeleteImage.bind(this)} >
                                                        <DeleteIcon color="disabled" className="delete-icon" style={{fontSize: 34, background: "#ffffff", borderRadius: 34}}></DeleteIcon>
                                    </RoundedButtonLink>
                          </div>
                    </div>
                    
                  ))}
                  </CarouselTool>
                  )}
                    {completed ? 
                      <div>
                        <p>{`${language.Uploading}... ${completed}%`}</p>
                        <BorderLinearProgress variant="determinate" value={completed} />
                        </div> : <p style={{ color: '#b00020'}}>{error}</p>} 
                  </div>

                  <div>

                      <div style={{right: 0, position: "relative", marginBottom: 0, width: "100%"}} align="right">

                      <input type="file" name="fileToUpload2"  id="fileToUpload2" disabled = {!this.props.lodging.videos  ||  this.props.lodging.videos.length > 2} 
                      onChange={this.selectVideoFile.bind(this)}  accept="video/mp4" style={{display: "none"}}></input>
                      <label htmlFor={"fileToUpload2"}>
                        <AddIcon color="#188218" style={{fontSize: 34, color: "#188218", background: "#ffffff", borderRadius: 34}}></AddIcon>
                            
                      </label>
                                    
                      </div>
                      {this.props.lodging.videos&& (this.props.lodging.videos.length === 0 ? 
                      <div style={{border: "1px #3577d4 solid", height: 200, width: 200, borderRadius: 100, display: "table"}}>

                      <div style={{margin: "auto", display: "table-cell", textAlign: "center", verticalAlign: "middle"}}>
                        <SectionIcon color="disabled" style={{fontSize: 80}}></SectionIcon>
                      </div>
                      </div>
                      :
                      <CarouselTool>
                      {this.props.lodging.videos && this.props.lodging.videos.map(video =>(
                        <div align="right" style={{width: "100%", height: 245, position: "relative", textAlign: "right" }}>
                          
                          <div style={{position: "relative",  textAlign: "center",}}>
                          
                            <Player
                                playsInline
                                src={video.url}
                                />
                                
                            </div>
                            
                              <div style={{width: 40, right: 0, position: "absolute", bottom: 0}}>
                                        <RoundedButtonLink id={video.id}  size={40} border={0} onClick={this.handleDeleteVideo.bind(this)} >
                                                            <DeleteIcon color="disabled" className="delete-icon" style={{fontSize: 34, background: "#ffffff", borderRadius: 34}}></DeleteIcon>
                                        </RoundedButtonLink>
                              </div>
                        </div>
                        
                      ))}
                      </CarouselTool>
                      )}
                        {completed ? 
                          <div>
                            <p>{`${language.Uploading}... ${completed}%`}</p>
                            <BorderLinearProgress variant="determinate" value={completed} />
                            </div> : <p style={{ color: '#b00020'}}>{error}</p>} 
                      </div>



                  <div>
                 
                 <Table>
                 <TableHead>
                   <TableRow>
                     <TableCell className={classes.positionCell}>
                       #
                     </TableCell>
                      <TableCell style={{width: "100%"}}>
                       Content
                     </TableCell>
                     <TableCell className={classes.addCell}>
                              <RoundedButtonLink  color={"#ffffff"} size={40} border={0}  onClick={this.addNewProgram.bind(this)}>
                                                    <AddIcon color="#188218" style={{fontSize: 34, color: "#188218"}}></AddIcon>
                                </RoundedButtonLink>
                     </TableCell>
                   </TableRow>
                   </TableHead>
                   <TableBody>
                     {this.props.lodging.program && this.props.lodging.program.map((prog,index) =>(

                        <TableRow>
                        <TableCell  className={classes.positionCell}>
                          {prog.position}
                        </TableCell>
                        <TableCell className={classes.contentCell} >
                        
                        <TextField
                          id={prog.id}
                          className={classes.textField}
                          fullWidth
                          margin="none"
                          variant="outlined"
                          value={prog.content}
                          onChange={this.handleTextChange.bind(this)}
                          multiline
                          onBlur={this.handleProgramChange.bind(this)}
                          rows={3}
                        />
                           
                        </TableCell>
                        <TableCell className={classes.addCell}>
                        <RoundedButtonLink id={prog.id}  size={40} border={0} onClick={this.handleDeleteLodgingProgram.bind(this)} >
                                                        <DeleteIcon color="disabled" className="delete-icon" style={{fontSize: 34, background: "#ffffff", borderRadius: 34}}></DeleteIcon>
                                    </RoundedButtonLink>
                         </TableCell>
                        </TableRow>
                     ))}
                    
                    </TableBody>
                 </Table>

                  </div>
                    </SwipeableViews>



                  </Grid>           



            
            </Grid>
        </Form>
        </Grid>
          
        </Grid>
        {busy && <Loader />}
      </main>
  );
        }
}


const mapStateToProps = state => {
    return {
     lodging: state.selectedLodging,
     language: state.language,
     sign: state.sign,
     initialValues: {
        name: state.selectedLodging.name,
        general_description: state.selectedLodging.general_description,
        full_description: state.selectedLodging.full_description,
        price: state.selectedLodging.price,
        capacity: state.selectedLodging.capacity,
        price_specifics: state.selectedLodging.price_specifics,
        capacity_specifics: state.selectedLodging.capacity_specifics,
        location: state.selectedLodging.location,
        currency: "CUC",//state.selectedLodging.currency,
        note: state.selectedLodging.note,
        status: parseInt(state.selectedTour.status)>0
     }
  
    };
  };
  export default connect(
    mapStateToProps,
    { initialize, selectLodging, updateLodging, uploadLodgingImage, deleteLodgingImage, uploadLodgingVideo, deleteLodgingVideo,
       updateLodgingProgram, addLodgingProgram, deleteLodgingProgram, changeLodgingProgram}
  )(
    reduxForm({ form: "lodgingEditForm", enableReinitialize: true, validate })(
      withStyles(styles)(withRouter(LodgingEditForm))
    )
  );

