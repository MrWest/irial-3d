import React from "react";
import { Grid } from "@material-ui/core";
import Masonry from 'react-masonry-css'
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addToCart } from "../../actions";
import ItemCardFront from "../itemCard/itemCardFront";

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

const FrontModels = ({ models, classes, sections, addToCart, language }) =>  {
  const section = sections ? sections[1] : undefined;

  const handleAddItem = (item, openCart) => {
    const image = item.images[0];
    addToCart({ id_item: item.id, name: item.name, image: image  ? image.url : undefined, price: item.price,
       lumion_version: item.lumion_version, section, category: section.categories.find(c => c.id === item.id_category),
        destination: item.ownerInfo.stripe_account_id, file: item.server_path, type: 'model' }, openCart);
   };

  if(!section) return <div />;

  
   return ( 
     <div>
        <Grid container justify="center">
           <Grid item className={classes.center}>
            <div style={{padding: "0px 40px"}}>
                <h3 className={classes.sectionTittle}>{section.name}</h3>
                <p  className={classes.pText}>{section.description}</p>
            </div>
            <div style={{paddingBottom: 64 }}>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              {models.filter( a => parseInt(a.status) > 0).sort((m1, m2) => parseFloat(m2.price) - parseFloat(m1.price)).map(model => (
                <div key={model.id} >
                  <ItemCardFront   item={model} type='model' addToCart={handleAddItem} addToCartText={language.AddToCart} buyItem={language.Buy} />
                </div>
               ))}
            </Masonry>
            </div>
          </Grid>
        </Grid>
      </div>
        
    );
 
  };

  
  const styles = theme => ({
    root: {
        paddingTop: 30
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
        }, 
        [theme.breakpoints.down("sm")]: {
         paddingLeft: 24,
         paddingRight:  24
        }, 
        [theme.breakpoints.down("xs")]: {
         paddingLeft: 8,
         paddingRight:  8
        } 
      },
      sectionTittle: {
        margin: "10px 0px",
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "Gloss",
        letterSpacing: 1,
        color: "#1c5375",
        marginTop: 40,
        marginBottom: 0,
        textAlign: "center",
        textShadow: '1px 1px 0 #afafaf', 
        [theme.breakpoints.down("xs")]: {
          fontSize: 24
        } 
      },
      pText: {
        marginBottom: 40,
        fontFamily: "Arial",
        textAlign: "center"
      }
  });

  const mapStateToProps = state => {
  
    return {
      language: state.language
    };
  };
  
  export default connect(
    mapStateToProps, { addToCart }
  )( withStyles(styles)(FrontModels));
  
  
  