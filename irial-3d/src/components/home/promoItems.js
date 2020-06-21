import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ArrowDownward } from "@material-ui/icons";
import { sortModels } from "../../actions";
import { Grid } from "@material-ui/core";

class PromoItems extends Component {
  state = {};

  render() {
    const { classes, models } = this.props;
    if(!models) return <div />;
    return (
      <Grid container justify="center" >
        <div className={classes.center}>
          <Grid container alignItems='center'>
            <Grid item>
             {/* <ArrowDownward fontSize={56} /> */}
            </Grid>
            {models.map(item => (
               <Grid key={item.id} item>
                 <div className={classes.itemViewContainer}>
                   <Grid container alignItems="center" style={{ height: '100%' }}>
                     <Grid item>
                       <div className={classes.itemView}>
                        <img src={item.images[0].url} className={classes.itemImg} alt={item.name}/>
                       </div>
                     </Grid>
                   </Grid>
                 </div>
               </Grid>
            ))

            }
          </Grid>
        
        </div>
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
  itemViewContainer: {
    height: 200,
    width: 200
  },
  itemView: {
    height: 142,
    width: 142,
    '&&:hover': {
      height: 184,
      width: 184,
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
