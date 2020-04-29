import React, { Component, Fragment } from 'react';
// import OrderDisplayTool from "./orderDisplayTool";
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import ImageGallery from 'react-image-gallery';
import {
  selectModel, addModelComment, updateModelComment,
  deleteModelComment, rateModel, getCategory,
} from '../../actions';

import ResourceTabs from '../tools/resourceTabs';
// import  ModelBookingForm  from "../forms/modelBookingForm";
import CommentsTool from '../tools/commentsTool';
import Loader from '../global/loader';
import { isServer } from '../../apis/tools';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


class ModelDetails extends Component {
  state = {
    idModel: -1,
    category: {},
    busy: true,
  };

  componentWillMount() {
    if (!isServer) {
      const { id } = this.props.match.params;
      this.props.selectModel(id).then((rslt) => {
        this.props.getCategory(rslt.id_category).then(() => {
          this.setState({ busy: false });
        });
      });
    }

    // alert(id+"sss")
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    const { id } = this.props.match.params;
    if (parseInt(this.state.idModel) !== parseInt(id)) {
      this.props.selectModel(id);
      this.setState({ idModel: id });
      // alert(this.state.idmodel)
    }

    // alert(id)
  }

  getCategory(value) {
    let category = 'All';

    this.props.categories.map((cat) => {
    // alert( cat.id+ " - "+ value)
      if (parseInt(cat.id) === parseInt(value)) { category = cat.name; }
    });

    return category;
  }

 handleOnRateClick = (value) => {
   const { rateModel, model, sign } = this.props;
   rateModel({ id_model: model.id, id_user: sign.loginInfo.id, rate: value });
 }

 render() {
   const { classes, model, category } = this.props;
   const { busy } = this.state;

   if (model.name === undefined) { return <div />; }

   return (
     <main className={classes.container}>
       <Helmet>
         <title>
           Lumion Models |
           {model.name}
         </title>
         <meta name="description" content={model.general_description} />
       </Helmet>
       <Grid container justify="center">
         <Grid container spacing={3} className={classes.center}>
           <Grid item xs={12} />
           <Grid item md={8} xs={12}>
             <ImageGallery items={model.images.map((image) => ({
               original: image.url,
               thumbnail: image.url,
             }))}
             />
           </Grid>
           <Grid item md={4} xs={12}>
             <p className={classes.modelName}>{model.name}</p>
             <p className={classes.modelText}>{model.full_description}</p>
             <p className={classes.modelText}><strong>Lumion Version: </strong>{model.lumion_version}</p>
           </Grid>
         </Grid>
       </Grid>
       {busy && <Loader />}
     </main>
   );
 }
}

const styles = (theme) => ({
  container: {
    paddingTop: 120,
    paddingBottom: 130,
  },
  center: {

    [theme.breakpoints.up('lg')]: {
      maxWidth: '1280px',
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      minWidth: '1280px',
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: '1180px',
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      minWidth: '1180px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100vw',
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      minWidth: '100vw',
    },
  },
  imgSet: {
    objectFit: 'contain',
    width: 'auto !important',
    height: '424',
  },
  imgContainer: {
    width: '100%',
    height: 420,
    '& img': {
      objectFit: 'contain',
      width: 'auto !important',
      height: '100%',
    },
  },
  seletcTool: {
    width: 220,
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 24,
    },
  },
  onMoblie: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '16px !important',
    },
  },
  mobilePadding: {
    [theme.breakpoints.down('sm')]: {

      paddingLeft: '16px !important',
      paddingRight: '16px !important',
    },
  },
  mobileAlign: {
    textAlign: 'right',
    marginTop: 16,
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      textAlign: 'left',
    },
  },
  modelName: {
    marginBottom: 16,
    fontFamily: 'Roboto',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#337ab7',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  modelText: {
    marginBottom: 16,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  orderList: {
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  gray: {
    backgroundColor: '#dddddd',
  },
  yellow: {
    color: '#a0a010',
    backgroundColor: '#f9f9c9',
  },
  green: {
    color: '#10a000',
    backgroundColor: '#c9f999',
  },
  submitButton: {
    width: '282px',
    height: '56px',
    '& span': {
      fontFamily: 'Futura',
      fontSize: '16px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    textAlign: 'center',
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#188218',
  },
});

ModelDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateTopProps = (state) => ({
  model: state.selectedModel,
  categories: state.sections[1] ? state.sections[1].categories : [],
  category: state.selectedCategory,
  language: state.language,
  sign: state.sign,
});

export default connect(mapStateTopProps, {
  selectModel,
  addModelComment,
  updateModelComment,
  deleteModelComment,
  rateModel,
  getCategory,
})(withStyles(styles)(ModelDetails));
