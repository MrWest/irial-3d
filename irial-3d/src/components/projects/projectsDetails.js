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
  selectProject, addProjectComment, updateProjectComment,
  deleteProjectComment, rateProject, getCategory, addToCart
} from '../../actions';
// import  ProjectBookingForm  from "../forms/projectBookingForm";
import CommentsTool from '../tools/commentsTool';
import Loader from '../global/loader';
import { isServer, isInCart } from '../../apis/tools';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Tag = ({ classes, tag }) => (
  <div className={classes.tagContainer}>
    {tag.name}
  </div>
);

const RelatedProjectCard = ({ classes, project }) => (
  <Link to={`/project/${project.id}`}>
  <div style={{ padding: 4, border: '1px solid #dddddd', borderRadius: 4, cursor: 'pointer' }}>
      <div className={classes.projectCard}>
        <img src={project.image} className={classes.projectCardImg} />
      </div>
      <p style={{ textAlign: 'center', marginTop: 4, color: '#4d4e53', fontFamily: 'Roboto' }}>{project.name}</p>
  </div>
  </Link>
);


class ProjectDetails extends Component {
  state = {
    idProject: -1,
    category: {},
    busy: true,
  };

  componentWillMount() {
    if (!isServer) {
      const { id } = this.props.match.params;
      this.props.selectProject(id).then((rslt) => {
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
    if (parseInt(this.state.idProject) !== parseInt(id)) {
      this.props.selectProject(id);
      this.setState({ idProject: id });
      // alert(this.state.idproject)
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
   const { rateProject, project, sign } = this.props;
   rateProject({ id_project: project.id, id_user: sign.loginInfo.id, rate: value });
 }
 
 handleAddItem = openCart => {
  const { project, category, section, addToCart } = this.props;
  addToCart({ id_item: project.id, name: project.name, image: project.images[0].url, price: project.price,
     lumion_version: project.lumion_version, section, category, destination: project.ownerInfo.stripe_account_id, file: project.server_path, type: 'project' }, openCart);
 }

 render() {
   const { classes, project, category, section, language, addProjectComment, updateProjectComment, deleteProjectComment } = this.props;
   const { busy } = this.state;

   if (!project.name)  return <div />;

   const cantAddToCart = isInCart(project);
   return (
     <main className={classes.container}>
       <Helmet>
         <title>
           Lumion Projects |
           {project.name}
         </title>
         <meta name="description" content={project.general_description} />
       </Helmet>
       <Grid container justify="center">
         <Grid container spacing={3} className={classes.center}>
           <Grid item xs={12} />
           <Grid item md={8} xs={12}>
             <ImageGallery items={project.images.map((image) => ({
               original: image.url,
               thumbnail: image.url,
             }))}
             />
              <div style={{paddingTop: 20}}>
                <CommentsTool service="project" comments={project.comments} idService={project.id} serviceUrl={"/project/"}  onRate={this.handleOnRateClick}
                rate={project.rate} addComment={addProjectComment} updateComment={updateProjectComment} deleteComment={deleteProjectComment}></CommentsTool>
               </div>
           </Grid>
           <Grid item md={4} xs={12}>
             <p className={classes.projectName}>{project.name}</p>
             <p className={classes.projectText}>{`${section.name}/${category.name}`}</p>
             <p className={classes.projectText}>{project.full_description}</p>
             <p className={classes.projectText}><strong>{language.LumionVersion}: </strong>{project.lumion_version}</p>
             <p className={classes.projectPrice}><strong>{language.Price}: </strong>{`${project.price} ${project.currency}`}</p>
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
               {project.ownerInfo &&
               (
                 <Grid xs={12}>
                 <p className={classes.projectText} style={{ marginTop: 24 }}><strong>{language.CreatorInfo}: </strong></p>
                 <Grid container spacing={2} itemsAlign="center">
                   <Grid item>
                      <img style={{height: 38, width: 38, borderRadius: 19}}
                      src={project.ownerInfo.picture || "./static/images/public/user.png"} />
                    </Grid>
                    <Grid item> 
                      <p className={classes.projectText} style={{ marginBottom: 8 }}>{project.ownerInfo.first_name}</p>
                      <p className={classes.projectText} style={{ marginBottom: 0 }}>{project.ownerInfo.last_name}</p>
                    </Grid>
                     <Grid item>
                      <p className={classes.projectText} style={{ marginBottom: 8 }}><strong>{section.name}</strong></p>
                      <p className={classes.projectText} style={{ marginBottom: 0, textAlign: 'center' }}>{project.ownerInfo.owner_projects}</p>
                    </Grid>
                  </Grid>
               </Grid>
               )
               }

               {project.tags && (
                 <Grid container>
                   <p className={classes.projectText} style={{ marginBottom: 16, marginTop: 24 }}><strong>{language.Tags}:</strong></p>
                    <Grid container spacing={2}>
                      {project.tags.map(tag => (
                        <Grid key={tag.name} xs={3}>
                          <Tag classes={classes} tag={tag} />
                         </Grid>
                      ))}
                    </Grid>
                </Grid>
               )}
                {project.relatedProjects && (
                 <Grid container>
                   <p className={classes.projectText} style={{ marginBottom: 16, marginTop: 24 }}><strong>{language.relatedProjects}:</strong></p>
                    <Grid container spacing={2}>
                      {project.relatedProjects.map(rproject => (
                        <Grid key={rproject.id} item xs={6}>
                          <RelatedProjectCard classes={classes} project={rproject} />
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
  projectCardImg: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    borderRadius: 4
  },
  projectCard: {
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
  projectName: {
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
  projectText: {
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  projectPrice: {
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

ProjectDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateTopProps = (state) => ({
  project: state.selectedProject,
  categories: state.sections[2] ? state.sections[2].categories : [],
  category: state.selectedCategory,
  section: state.sections[2],
  language: state.language,
  sign: state.sign,
  cart: state.cart
});

export default connect(mapStateTopProps, {
  selectProject,
  addProjectComment,
  updateProjectComment,
  deleteProjectComment,
  rateProject,
  getCategory,
  addToCart
})(withStyles(styles)(ProjectDetails));
