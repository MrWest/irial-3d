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
  LinearProgress,
  Button
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {CoolButton} from "../buttons"
import {selectTexture, updateTexture, uploadTextureImage, deleteTextureImage, uploadTextureVideo,
   deleteTextureVideo, fetchTags, toggleTextureTags, uploadTextureFile } from "../../actions";
import CarouselTool from "../carouselTool";
import SectionIcon from "@material-ui/icons/CardTravel";
import AddIcon from "@material-ui/icons/AddCircle";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
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
import { StylessButton } from '../buttons';
import { Player } from 'video-react';
import { Link } from "react-router-dom";

//  var ImagePicker = require('react-native-image-picker');


const Tag = ({ classes, tag, disabled, onClick }) => (
  <Button onClick={() => onClick(disabled)} className={disabled? classes.tagContainerDisabled : classes.tagContainer}>
    {tag.name}
  </Button>
);

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: '#efefef'
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#337ab7',
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

export const renderToggleInput = (field) => {
  return (
  <Switch  checked={field.input.value} onChange={field.input.onChange} icons={false} color="primary" />
);
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
    tagContainer: {
      borderRadius: 28,
      backgroundColor: '#337ab7',
      border: '3px solid #dedede',
      padding: '6px 24px',
      width: '100%',
      color: '#ffffff',
      textAlign: 'center',
      cursor: 'pointer',
      '&:hover': {
        color: '#666666'

      }
    },
    tagContainerDisabled: {
      borderRadius: 28,
      backgroundColor: '#dedede',
      border: '3px solid #337ab7',
      padding: '6px 24px',
      width: '100%',
      color: '#434343',
      textAlign: 'center',
      cursor: 'pointer'
    },
    widthMobile: {
      paddingLeft: 24,
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

  const options = {
    title: "Select a photo",
    takePhotoButtonTitle: "Take a photo",
    chooseFromLibraryButtonTitle: "Choose from gallery",
    quantity: 1
  }

class TextureEditForm extends React.Component {
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

       
        data.id = this.props.texture.id
        this.props.updateTexture(data);
        this.props.history.push("/account")
      }

      componentWillMount()
      {
        const {id} = this.props.match.params
        this.props.selectTexture(id).then(() => {
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
        let reader = new FileReader()
        try {
        reader.readAsDataURL(files[0])
        this.setState({error: '', completed: 0});
        reader.onload = e => {

          // console.log("xXx", files[0])
          if(files[0] && files[0].size < 4200000 ){
          this.setState({imageData: e.target.result})
          this.props.uploadTextureImage({textureId: this.props.texture.id, file:  e.target.result,
             fileName: files[0].name, textureName: this.props.texture.name, onProgress: this.onUploadProgress}).then(res=> {

              this.props.selectTexture(this.props.match.params.id).then(()=> this.setState({completed: 0}));
             })
        }
        else
        this.setState({error: language.MAX_FILE_SIZE.format('4 Mb')})
      }
      }
      catch (error) {
        this.setState({error: language.UPLOAD_FAILED})
      }
    
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
          this.props.uploadTextureVideo({textureId: this.props.texture.id, file:  e.target.result,
             fileName: files[0].name, textureName: this.props.texture.name, onProgress: this.onUploadProgress}).then(res=> {

              this.props.selectTexture(this.props.match.params.id).then(()=> this.setState({completed: 0}));
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

      uploadTexture = event =>{
        const { language } = this.props;
        let files = event.target.files
        let reader = new FileReader()
        try {
        reader.readAsDataURL(files[0])
        this.setState({error: '', completed: 0});
        reader.onload = e => {

          // console.log("xXx", files[0])
          if(files[0] && files[0].size < 4200000 ){
          this.setState({imageData: e.target.result})
          this.props.uploadTextureFile({textureId: this.props.texture.id, file:  e.target.result,
             fileName: files[0].name, textureName: this.props.texture.name, onProgress: this.onUploadProgress}).then(res=> {

              this.props.selectTexture(this.props.match.params.id).then(()=> this.setState({completed: 0}));
             })
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

        this.props.deleteTextureImage(event.currentTarget.id).then(res=> {

          this.props.selectTexture(this.props.match.params.id)
         })
      }

      handleDeleteVideo = event => {

        this.props.deleteTextureVideo(event.currentTarget.id).then(res=> {

          this.props.selectTexture(this.props.match.params.id)
         })
      }

      handleChange = (event, value) => {
        this.setState({selectedIndex: value})
      };

     
  render(){
    const { pristine, theme, classes, language, handleSubmit, texture, tags, toggleTextureTags, initialValues: { name } } = this.props;
    const { busy, completed, error  } = this.state;
      const isDisabled = !texture.url || !texture.server_path;
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
              <Grid item xs alignItems="baseline">

                    <Typography
                      variant="h4"
                      component="h4"
                      className={classes.typographyText}
                    >
                       {language.EditFormTittle.format(language.Texture)}
                    
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
                  {language.EditFormText.format(language.Texture)}    
                   
                  </Typography>
              </Grid>
              <Grid item className={classes.widthMobile}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <Link to={"/texture/" + texture.id} style={{background: "#ffffff"}}>
                      {this.props.language.See}
                    </Link>
                                      
                 </div>

                    {this.props.sign.isLogged && this.props.sign.loginInfo &&
                      (this.props.sign.loginInfo.type === "admin") &&
                        <div>
                          <p style={{fontSize: 12, textAlign: "center", color: "#777"}} className={classes.rightOnMobile}>{language.Status}</p>
                          <Field
                            name="status"
                            component={renderToggleInput}
                              />
                        </div>}
                  
                      
              </Grid>
            
            </Grid>
          
           
            <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 0 }}>
            <Grid container spacing={4} style={{ paddingTop: 42 }}>
           
            <Grid item xs={12} md={6} alignItems="flex-start" style={{ paddingTop: 10 }}>
                <TextField
                name="name"
                margin="small"
                type="text"
                fullWidth
                readOnly
                value={name}
                label={language.Name}
                />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{width: "100%", position: "relative", textAlign: 'center' }}>
                <input type="file" name="currentFile"  id="currentFile" accept="application/pdf"
                 onChange={this.uploadTexture.bind(this)} style={{display: "none"}}></input>
                  <label htmlFor={"currentFile"}>
                    <CloudUploadOutlined color="#337ab7" 
                      style={{fontSize: 64, color: "#337ab7", background: "#ffffff", cursor: 'pointer' }}></CloudUploadOutlined>
                  </label>
                              
              </div>
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
                  <Grid item xs={8} md={5} style={{ paddingTop: 10, fontSize: 8 }} >
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
                  <Grid item xs={4} md={3}  style={{ paddingTop: 10, fontSize: 8 }} >
                      <Field
                        name="lumion_version"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="lumion_version"
                        component={renderTextField}
                        label={language.LumionVersion}
                        />      
                
                

                  </Grid>
                  <Grid item xs={12} md={5} style={{ paddingTop: 10, fontSize: 8 }} >
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
           
                        <CoolButton height={56} width={245} fill={"#337ab7"} color={"#ffffff"} disabled={isDisabled}>
                            {language.Save}
                        </CoolButton>
                </Grid>
               
               </Grid>
                 
            </Grid>
         
       
            </Grid>           
          
            <Grid item  xs={12} md={5} alignItems="flex-start" style={{ paddingTop: 0 }} align="center">

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
                                
                      
                    </Tabs>
                  </div>
                  <SwipeableViews
                  
                    index={this.state.selectedIndex}
                    // onChangeIndex={this.handleChangeIndex}
                  >
                  <div>

                  <div style={{width: "100%", right: 0, position: "relative", marginBottom: 0}} align="right">

                  <input type="file" name="fileToUpload"  id="fileToUpload" disabled = {!texture.images || texture.images.length > 9}  accept="image/x-png,image/gif,image/jpeg"
                   onChange={this.selectImageFile.bind(this)} style={{display: "none"}}></input>
                  <label htmlFor={"fileToUpload"}>
                    <AddIcon color="#337ab7" style={{fontSize: 34, color: "#337ab7", background: "#ffffff", borderRadius: 34}}></AddIcon>
                        
                  </label>
                                
                  </div>
                  {texture.images&& (texture.images.length === 0 ? 
                  <div style={{border: "1px #3577d4 solid", height: 200, width: 200, borderRadius: 100, display: "table"}}>

                  <div style={{margin: "auto", display: "table-cell", textAlign: "center", verticalAlign: "middle"}}>
                    <SectionIcon color="disabled" style={{fontSize: 80}}></SectionIcon>
                  </div>
                  </div>
                  :
                  <CarouselTool>
                  {texture.images && texture.images.map(image =>(
                    <div key={image.id} align="right" style={{width: "100%", position: "relative", textAlign: "right"}}>
                      
                      <img style={{width: "100%", borderTopLeftRadius: 4, objectFit: "cover"}} alt={image.alt} src={image.url}/>
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

                  <input type="file" name="fileToUpload2"  id="fileToUpload2" disabled = {!texture.videos  ||  texture.videos.length > 2} 
                  onChange={this.selectVideoFile.bind(this)}  accept="video/mp4" style={{display: "none"}}></input>
                  <label htmlFor={"fileToUpload2"}>
                    <AddIcon color="#337ab7" style={{fontSize: 34, color: "#337ab7", background: "#ffffff", borderRadius: 34}}></AddIcon>
                        
                  </label>
                                
                  </div>
                  {texture.videos&& (texture.videos.length === 0 ? 
                  <div style={{border: "1px #3577d4 solid", height: 200, width: 200, borderRadius: 100, display: "table"}}>

                  <div style={{margin: "auto", display: "table-cell", textAlign: "center", verticalAlign: "middle"}}>
                    <SectionIcon color="disabled" style={{fontSize: 80}}></SectionIcon>
                  </div>
                  </div>
                  :
                  <CarouselTool>
                  {texture.videos && texture.videos.map(video =>(
                    <div key={video.id} align="right" style={{width: "100%", height: 245, position: "relative", textAlign: "right" }}>
                      
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

                    </SwipeableViews>

                 {tags && texture.tags && (
                 <Grid container>
                   <p className={classes.textureText} style={{ marginBottom: 16, marginTop: 124 }}><strong>{language.Tags}:</strong></p>
                    <Grid container spacing={2}>
                      {tags.map(tag => (
                        <Grid key={tag.name} xs={3} style={{ marginBottom: 4 }}>
                          <Tag classes={classes} tag={tag} disabled={!texture.tags.find(t => t.id === tag.id)} onClick={activate => toggleTextureTags(texture, tag.id, activate)} />
                         </Grid>
                      ))}
                    </Grid>
                </Grid>
               )}

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
     texture: state.selectedTexture,
     language: state.language,
     sign: state.sign,
     tags: state.tags,
     initialValues: 
     {
        name: state.selectedTexture.name,
        general_description: state.selectedTexture.general_description,
        full_description: state.selectedTexture.full_description,
        price: state.selectedTexture.price,
        lumion_version: state.selectedTexture.lumion_version,
        price_specifics: state.selectedTexture.price_specifics,
        currency: "CUC",//state.selectedLodging.currency,
        note: state.selectedTexture.note,
        status: parseInt(state.selectedTexture.status)>0
     }
  
    };
  };
  export default connect(
    mapStateToProps,
    { initialize, selectTexture, updateTexture, uploadTextureImage, 
      deleteTextureImage, uploadTextureVideo, deleteTextureVideo, fetchTags, toggleTextureTags, uploadTextureFile}
  )(
    reduxForm({ form: "textureEditForm", enableReinitialize: true, validate })(
      withStyles(styles)(withRouter(TextureEditForm))
    )
  );

