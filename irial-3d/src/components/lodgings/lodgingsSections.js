import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import classNames from "classnames";
import { CoolLink, ImageLink } from "../buttons";
import StarRatingComponent from 'react-star-rating-component';


export const LodgingCardLeft = ({lodging, classes, language}) => {
  if(!language || !lodging) return <div/>;
  return (
    <Grid item sm={12} md={7}>
    <div style={{ paddingLeft: 40, paddingRight: 40, textAlign: "left" }}>
    <Grid container >
     <Grid item md={10}>
     <p
      variant="p"
      component="p"
      className={classes.packNameText}
    >
      {lodging.name}
    </p>
  
     </Grid>
     <Grid item md={2} align="right">
     <div style={{height: "100%", display: "table"}}>
        <div style={{verticalAlign: "middle", display: "table-cell"}}>
          <StarRatingComponent 
              name="rate1" 
              editing={false}
              starCount={5}
              value={lodging.rate}
              emptyStarColor={"#ccc"} /* color of non-selected icons, default `#333` */
              // onStarClick={this.onStarClick.bind(this)}
            />
          </div>
     </div>
     
     </Grid>
    
    </Grid>
  
    <div
      className={classNames(classes.hrBlue, classes.textLeft)}
      style={{ marginTop: 3 }}
    />
     <p className={classes.packPriceText} >
      <span style={{fontSize: 20}}>$</span><span className={classes.numberText}>{lodging.price}</span>  {lodging.currency} {lodging.price_specifics} 
       / <span className={classes.numberText}  style={{color: '#777777'}}>{lodging.capacity}</span>  <span  style={{color: '#777777'}}> {lodging.capacity_specifics}</span>
    </p>
  
    <p
      variant="p"
      component="p"
      className={classes.descriptionText}
      style={{ fontSize: 16, color: '#0f2440 !important', fontFamily: 'Roboto !important' }}
    >
      {lodging.general_description}
    </p>
    </div>

    <div align="left" style={{ paddingTop: 40, paddingLeft: 40 }}>
      <CoolLink
        href={"/lodging/"+lodging.id}
        height={56} width={225} fill={"#188218"} color={"#ffffff"}
      >
        {language.ViewOffer}
      </CoolLink>
      <p
        variant="p"
        component="p"
        className={classes.packDisclaimer}
      >
        {(lodging.note && lodging.note !== "") && <span><sup>*</sup>{lodging.note}</span>}
      </p>
    </div>
  </Grid>
  );
}


export const LodgingImageLeft = ({lodging, classes}) =>{
  if(!lodging) return <div/>;
  return (
    <Grid item sm={12} md={5} className={classes.textLeft}>
    {lodging.images.length> 0 && 
    <ImageLink href={"/lodging/"+lodging.id}>
     <img  alt={lodging.name} 
       src={lodging.images && lodging.images.length > 0 ? lodging.images[0].url: ""}
       className={classNames(
         classes.packImg,
         classes.textLeft
       )}
       alt={lodging.name}
     />
     </ImageLink>}
   </Grid>
  );
}


export const LodgingCardRight = ({lodging, classes, language}) =>{
  if(!language || !lodging) return <div/>;
  return (
    <Grid item sm={12} md={7} align="right">
    <div style={{ paddingLeft: 40, paddingRight: 40, textAlign: "right" }}>
       
  
    <Grid container >

          <Grid item md={2} align="left">
            <div style={{height: "100%", display: "table"}}>
                <div style={{verticalAlign: "middle", display: "table-cell"}}>
                  <StarRatingComponent 
                      name="rate1" 
                      editing={false}
                      starCount={5}
                      value={lodging.rate}
                      emptyStarColor={"#ccc"} /* color of non-selected icons, default `#333` */
                      // onStarClick={this.onStarClick.bind(this)}
                    />
                  </div>
            </div>
            
            </Grid>

            <Grid item md={10}>
            <p
              variant="p"
              component="p"
              className={classes.packNameText}
            >
              {lodging.name}
            </p>

            </Grid>
            
            
            </Grid>

      <Grid container>
      <Grid item xs={6}/>
      <Grid item xs={6} align="right">
          <div
            className={classes.hrBlue}
            style={{ marginTop: 3 }}
          />
      </Grid>
    </Grid>
     
    <p className={classes.packPriceText} style={{textAlign: "right"}}>
        <span style={{fontSize: 20}}>$</span><span className={classes.numberText}>{lodging.price}</span> {lodging.currency}  {lodging.price_specifics} 
        / <span className={classes.numberText} style={{color: '#777777'}}>{lodging.capacity}</span> <span style={{color: '#777777'}}>{lodging.capacity_specifics} </span>
      </p>
    
      <p
        variant="p"
        component="p"
        className={classes.descriptionText}
        style={{ fontSize: 16, color: '#0f2440 !important', fontFamily: 'Roboto !important' }}
      >
        {lodging.general_description}
      </p>
    </div>

      <div align="right" style={{ paddingTop: 40, paddingRight: 40, textAlign: "right" }}>
        <Grid container align="right" >
       
        <Grid xs={12} item align="right" >
        <CoolLink
              href={"/lodging/"+lodging.id}                   
            
              height={56} width={225} fill={"#188218"} color={"#ffffff"}
            >
              {language.ViewOffer}
            </CoolLink>
        </Grid>
           
        </Grid>
       
        

        <p
          variant="p"
          component="p"
          className={classes.packDisclaimer}
        >
          {(lodging.note && lodging.note !== "") && <span><sup>*</sup>{lodging.note}</span>}
        </p>
      </div>
    </Grid>
  );
}


export const LodgingImageRight = ({lodging, classes}) =>{

  return (
    <Grid item sm={12} md={5} className={classes.textRight}>
      <ImageLink href={"/lodging/"+lodging.id}>
       <img alt={lodging.name} src={lodging.images && lodging.images.length > 0 ? lodging.images[0].url: ""} className={classes.packImg}  alt={lodging.name}/>
      </ImageLink>
    </Grid>
  );
}
