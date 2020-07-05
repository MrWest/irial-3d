import React, { Component } from "react";
import {
  Grid,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  MenuItem,
  Paper
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addToCart } from "../../actions";
import DisplayModelsTool from "../models/displayModelsTool";
import ItemCardFront from "../itemCard/itemCardFront";

const FrontModels = ({ models, classes, sections, addToCart, language }) =>  {
  const section = sections ? sections[1] : undefined;

  const handleAddItem = (item, openCart) => {
    addToCart({ id_item: item.id, name: item.name, image: item.images[0].url, price: item.price,
       lumion_version: item.lumion_version, section, category: section.categories.find(c => c.id === item.id_category),
        destination: item.ownerInfo.stripe_account_id, file: item.server_path, type: 'model' }, openCart);
   };

  if(!section) return <div />
   return ( 
     <div>
        <Grid container justify="center">
           <Grid item className={classes.center}>
            <div style={{padding: "0px 40px"}}>
                <h3 className={classes.sectionTittle}>{section.name}</h3>
                <p  className={classes.pText}>{section.description}</p>
            </div>
            <div style={{paddingBottom: 64 }}>
            <Grid container alignItems="stretch"  spacing={2}>
              {models.filter( a => parseInt(a.status) > 0).map(model => (
                <Grid key={model.id} item xs={12} sm={6} md={4} className={classes.itemContainer}>
                  <ItemCardFront  item={model} type='model' addToCart={addToCart} addToCartText={language.AddToCart} buyItem={language.Buy} />
                </Grid>
                ))}
            </Grid>
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
        textShadow: '1px 1px 0 #afafaf'
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
  
  
  