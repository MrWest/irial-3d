import React, { Component, Fragment } from 'react';
// import OrderDisplayTool from "./orderDisplayTool";
import { Grid, Button } from '@material-ui/core';
import { AttachMoney as MoneySharp, AddShoppingCart } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import {
  selectScene, addSceneComment, updateSceneComment,
  deleteSceneComment, rateScene, getCategory, addToCart
} from '../../actions';
// import  SceneBookingForm  from "../forms/sceneBookingForm";
import CommentsTool from '../tools/commentsTool';
import Loader from '../global/loader';
import { isServer, isInCart } from '../../apis/tools';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Tag = ({ classes, tag }) => (
  <div className={classes.tagContainer}>
    {tag.name}
  </div>
);

const RelatedSceneCard = ({ classes, scene }) => (
  <Link to={`/scene/${scene.id}`}>
  <div style={{ padding: 4, border: '1px solid #dddddd', borderRadius: 4, cursor: 'pointer' }}>
      <div className={classes.sceneCard}>
        <img src={scene.image} className={classes.sceneCardImg} />
      </div>
      <p style={{ textAlign: 'center', marginTop: 4, color: '#4d4e53', fontFamily: 'Roboto' }}>{scene.name}</p>
  </div>
  </Link>
);


class SceneDetails extends Component {
  state = {
    idScene: -1,
    category: {},
    busy: true,
  };

  componentWillMount() {
    if (!isServer) {
      const { id } = this.props.match.params;
      this.props.selectScene(id).then((rslt) => {
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
    if (parseInt(this.state.idScene) !== parseInt(id)) {
      this.props.selectScene(id);
      this.setState({ idScene: id });
      // alert(this.state.idscene)
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
   const { rateScene, scene, sign } = this.props;
   rateScene({ id_scene: scene.id, id_user: sign.loginInfo.id, rate: value });
 }
 
 handleAddItem = openCart => {
  const { scene, category, section, addToCart } = this.props;
  addToCart({ id_item: scene.id, name: scene.name, image: scene.images[0].url, price: scene.price,
     lumion_version: scene.lumion_version, section, category, destination: scene.ownerInfo.stripe_account_id, file: scene.server_path, type: 'scene' }, openCart);
 }

 render() {
   const { classes, scene, category, section, language, addSceneComment, updateSceneComment, deleteSceneComment } = this.props;
   const { busy } = this.state;

   if (!scene.name)  return <div />;

   const cantAddToCart = isInCart(scene);
   return (
     <main className={classes.container}>
       <Helmet>
         <title>
           Lumion Scenes |
           {scene.name}
         </title>
         <meta name="description" content={scene.general_description} />
       </Helmet>
       <Grid container justify="center">
         <Grid container spacing={3} className={classes.center}>
           <Grid item xs={12} />
           <Grid item md={8} xs={12}>
             <ImageGallery items={scene.images.map((image) => ({
               original: image.url,
               thumbnail: image.url,
             }))}
             />
              <div style={{paddingTop: 20}}>
                <CommentsTool service="scene" comments={scene.comments} idService={scene.id} serviceUrl={"/scene/"}  onRate={this.handleOnRateClick}
                rate={scene.rate} addComment={addSceneComment} updateComment={updateSceneComment} deleteComment={deleteSceneComment}></CommentsTool>
               </div>
           </Grid>
           <Grid item md={4} xs={12}>
             <p className={classes.sceneName}>{scene.name}</p>
             <p className={classes.sceneText}>{`${section.name}/${category.name}`}</p>
             <p className={classes.sceneText}>{scene.full_description}</p>
             <p className={classes.sceneText}><strong>{language.LumionVersion}: </strong>{scene.lumion_version}</p>
             <p className={classes.scenePrice}><strong>{language.Price}: </strong>{`${scene.price} ${scene.currency}`}</p>
             <Grid container spacing={2} style={{ paddingTop: 24 }}>
               <Grid item xs={6}>
                <Link
                 
                  endIcon={<MoneySharp className={cantAddToCart ? classes.actionIconDisabled : classes.actionIcon}/>}
                  onClick={() => { if(!cantAddToCart)this.handleAddItem(false)}}
                  to={cantAddToCart || '/payment'}
                  disabled={cantAddToCart}
                >
                  <Grid container justify="center" alignItems="center" className={cantAddToCart ? classes.actionButtonDisabled : classes.actionButton}>
                    {language.Buy}
                  </Grid>
                </Link>
               </Grid>
               <Grid item xs={6}>
                <Button
                  className={cantAddToCart ? classes.actionButtonDisabled : classes.actionButton}
                  endIcon={<AddShoppingCart className={cantAddToCart ? classes.actionIconDisabled : classes.actionIcon}/>}
                  onClick={this.handleAddItem}
                  disabled={cantAddToCart}
                >
                  {language.AddToCart}
                </Button>
               </Grid>
               {scene.ownerInfo &&
               (
                 <Grid xs={12}>
                 <p className={classes.sceneText} style={{ marginTop: 24 }}><strong>{language.CreatorInfo}: </strong></p>
                 <Grid container spacing={2} itemsAlign="center">
                   <Grid item>
                      <img style={{height: 38, width: 38, borderRadius: 19}}
                      src={scene.ownerInfo.picture || "./static/images/public/user.png"} />
                    </Grid>
                    <Grid item> 
                      <p className={classes.sceneText} style={{ marginBottom: 8 }}>{scene.ownerInfo.first_name}</p>
                      <p className={classes.sceneText} style={{ marginBottom: 0 }}>{scene.ownerInfo.last_name}</p>
                    </Grid>
                     <Grid item>
                      <p className={classes.sceneText} style={{ marginBottom: 8 }}><strong>{section.name}</strong></p>
                      <p className={classes.sceneText} style={{ marginBottom: 0, textAlign: 'center' }}>{scene.ownerInfo.owner_scenes}</p>
                    </Grid>
                  </Grid>
               </Grid>
               )
               }

               {scene.tags && (
                 <Grid container>
                   <p className={classes.sceneText} style={{ marginBottom: 16, marginTop: 24 }}><strong>{language.Tags}:</strong></p>
                    <Grid container spacing={2}>
                      {scene.tags.map(tag => (
                        <Grid key={tag.name} xs={3}>
                          <Tag classes={classes} tag={tag} />
                         </Grid>
                      ))}
                    </Grid>
                </Grid>
               )}
                {scene.relatedScenes && (
                 <Grid container>
                   <p className={classes.sceneText} style={{ marginBottom: 16, marginTop: 24 }}><strong>{language.RelatedScenes}:</strong></p>
                    <Grid container spacing={2}>
                      {scene.relatedScenes.map(rscene => (
                        <Grid key={rscene.id} item xs={6}>
                          <RelatedSceneCard classes={classes} scene={rscene} />
                         </Grid>
                      ))}
                    </Grid>
                </Grid>
               )}
               
             </Grid>
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
      minWidth: '100vw'
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
  tagContainer: {
    borderRadius: 28,
    backgroundColor: '#337ab7',
    border: '3px solid #dedede',
    padding: '6px 24px',
    width: '100%',
    color: '#ffffff',
    textAlign: 'center',
    cursor: 'pointer'
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
  sceneCardImg: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    borderRadius: 4
  },
  sceneCard: {
    height: 92,
    width: '100%',
    backgroundColor: '#245580',
    borderRadius: 4
  },
  actionIcon: {
    color: '#ffffff'
  },
  actionButton: {
    borderRadius: 4,
    height: 36,
    width: '100%',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#ffffff',
    backgroundColor: '#337ab7',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#559cd9'
    }
  },
  actionIconDisabled: {
    color: '#5f5f5f'
  },
  actionButtonDisabled: {
    borderRadius: 4,
    height: 36,
    width: '100%',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#5f5f5f !important',
    backgroundColor: '#dedede',
    textTransform: 'none',
    '&:hover': {
      cursor: 'default !important'
    }
  },
  sceneName: {
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
  sceneText: {
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  scenePrice: {
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'normal',
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
    backgroundColor: '#337ab7',
  },
});

SceneDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateTopProps = (state) => ({
  scene: state.selectedScene,
  categories: state.sections[4] ? state.sections[4].categories : [],
  category: state.selectedCategory,
  section: state.sections[4],
  language: state.language,
  sign: state.sign,
  cart: state.cart
});

export default connect(mapStateTopProps, {
  selectScene,
  addSceneComment,
  updateSceneComment,
  deleteSceneComment,
  rateScene,
  getCategory,
  addToCart
})(withStyles(styles)(SceneDetails));
