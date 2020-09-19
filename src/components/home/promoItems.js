import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { imageResizedUrl } from "../../helpers/utils";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Grid } from "@material-ui/core";

class PromoItems extends Component {
  state = {};

  render() {
    const { classes, models } = this.props;
    if(!models) return <div />;
    return (
      <Grid container >
        <Grid item>
         <div  className={classes.itemsPanel} style={{ background: 'rgba(0,0,0,0.8)' }}>
           <Grid container alignItems="center">
             <Grid item>
             <div className={classes.downloadViewContainer} style={{ height: 'auto', background: 'transparent' }}>
              <Grid container justify="center" alignItems="center" style={{ height: '100%', width: '100%' }}>
              <Grid item>
                <ArrowUpward style={{ fontSize: 24, fontWeight: 'bolder' }} />
                </Grid>
              </Grid>
             </div>
             </Grid>
             <Grid item>
             <Grid container justify="center" alignItems="center" style={{ height: '100%', width: '100%' }}>
              <Grid item>
                <p className={classes.newProducts} >New Products</p>
                </Grid>
              </Grid>
             </Grid>
           </Grid>
         </div>
         </Grid>
         <Grid item xs={12}>
        <div  className={classes.itemsPanel}>
          <Grid container alignItems='center'>
            <Grid item >
            <div className={classes.downloadViewContainer}>
            <Grid container justify="center" alignItems="center" style={{ height: '100%', width: '100%' }}>
             <Grid item>
               <p className={classes.appDonwload}>App <br/> Download </p>
               <ArrowDownward style={{ fontSize: 56 }} />
              </Grid>
             </Grid>
             </div>
            </Grid>
            <Grid item xs style={{ maxWidth: 792, overflow: 'hidden' }}>
              <Grid container style={{ width: 99999 }}>
              {models.map(item => (
               <Grid key={item.id} item>
                 <div className={classes.itemViewContainer}>
                   <Grid container justify="center" alignItems="center" style={{ height: '100%', width: '100%' }}>
                     <Grid item>
                        <div className={classes.itemView}>
                        <img src={imageResizedUrl(item.images[0].url, 150)} className={classes.itemImg} alt={item.name}/>
                       </div>
                     
                     </Grid>
                   </Grid>
                 </div>
               </Grid>
            ))}
             {models.map(item => (
               <Grid key={item.id} item>
                 <div className={classes.itemViewContainer}>
                   <Grid container justify="center" alignItems="center" style={{ height: '100%', width: '100%' }}>
                     <Grid item>
                        <div className={classes.itemView}>
                        <img src={imageResizedUrl(item.images[0].url, 150)} className={classes.itemImg} alt={item.name}/>
                       </div>
                     
                     </Grid>
                   </Grid>
                 </div>
               </Grid>
            ))}
              </Grid>
            </Grid>
          </Grid>
        
        </div>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  table: {
    display: "table",
    height: "100%"
  },
  promoField: {
    backgroundImage: "url(../static/images/home/irial-3d-font-city-blue.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-left",    
    width: "100%",
    display: "flex",    
    minHeight: "90vh",
    paddingTop: 52,
    objectFit: "cover",
    color: "#ffffff", 
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "scale",
    } 
  },
  themePadding: {
    border: "1px solid #ff1333",
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: 1440
    }
  },
  center: {
   
    [theme.breakpoints.up("xl")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      minWidth: "1100px"
    }
  },
  downloadButton: {
    background: 'green',
    cursor: 'pointer'
  },
  appDonwload: {
    fontFamily: 'Roboto',
    fontSize: 14,
    textAlign: 'center'
  },
  newProducts: {
    fontFamily: 'Gloss',
    fontSize: 20,
    margin: '8px 0px',
    marginLeft: 22,
    marginRight: 22
  },
  itemsPanel: {
    width: 'auto',
    background: 'rgba(0,0,0,0.5)'
  },
  itemViewContainer: {
    height: 156,
    width: 198
  },
  downloadViewContainer: {
    height: 156,
    width: 92,
    background: 'green',
    cursor: 'pointer'
  },
  itemView: {
    height: 104,
    width: 156,
    cursor: 'pointer',
    '&&:hover': {
      height: 132,
      width: 198,
    }
  },
  itemImg: {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  }
});

PromoItems.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(PromoItems);
