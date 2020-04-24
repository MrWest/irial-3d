import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import classNames from "classnames";
import { CoolLink, ImageLink } from "../buttons";
import StarRatingComponent from 'react-star-rating-component';


export const AttractionCardLeft = ({attraction, classes, language}) => {
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
      {attraction.name}
    </p>
  
     </Grid>
     <Grid item md={2} align="right">
     <div style={{height: "100%", display: "table"}}>
        <div style={{verticalAlign: "middle", display: "table-cell"}}>
          <StarRatingComponent 
              name="rate1" 
              editing={false}
              starCount={5}
              value={attraction.rate}
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
      <span style={{fontSize: 20}}>$</span><span className={classes.numberText}>{attraction.price}</span>  {attraction.currency} {attraction.price_specifics} 
    </p>
  
    <p
      variant="p"
      component="p"
      className={classes.descriptionText}
      style={{ fontSize: 16, color: '#0f2440 !important', fontFamily: 'Roboto !important' }}
    >
      {attraction.general_description}
    </p>
    </div>

    <div align="left" style={{ paddingTop: 40, paddingLeft: 40 }}>
      <CoolLink
        href={"/attraction/"+attraction.id}
        height={56} width={225} fill={"#188218"} color={"#ffffff"}
      >
        {language.ViewOffer}
      </CoolLink>
      <p
        variant="p"
        component="p"
        className={classes.packDisclaimer}
      >
        {(attraction.note && attraction.note !== "") && <span><sup>*</sup>{attraction.note}</span>}
      </p>
    </div>
  </Grid>
  );
}


export const AttractionImageLeft = ({attraction, classes}) =>{

  return (
    <Grid item sm={12} md={5} className={classes.textLeft}>
    {attraction.images.length> 0 && 
    <ImageLink href={"/attraction/"+attraction.id}>
     <img  alt={attraction.name} 
       src={attraction.images && attraction.images.length > 0 ? attraction.images[0].url: ""}
       className={classNames(
         classes.packImg,
         classes.textLeft
       )}
       alt={attraction.name}
     />
     </ImageLink>}
   </Grid>
  );
}


export const AttractionCardRight = ({attraction, classes, language}) =>{

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
                      value={attraction.rate}
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
              {attraction.name}
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
        <span style={{fontSize: 20}}>$</span><span className={classes.numberText}>{attraction.price}</span> {attraction.currency}  {attraction.price_specifics} 
      </p>
    
      <p
        variant="p"
        component="p"
        className={classes.descriptionText}
        style={{ fontSize: 16, color: '#0f2440 !important', fontFamily: 'Roboto !important' }}
      >
        {attraction.general_description}
      </p>
    </div>

      <div align="right" style={{ paddingTop: 40, paddingRight: 40, textAlign: "right" }}>
        <Grid container align="right" >
       
        <Grid xs={12} item align="right" >
        <CoolLink
              href={"/attraction/"+attraction.id}                   
            
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
          {(attraction.note && attraction.note !== "") && <span><sup>*</sup>{attraction.note}</span>}
        </p>
      </div>
    </Grid>
  );
}


export const AttractionImageRight = ({attraction, classes}) =>{

  return (
    <Grid item sm={12} md={5} className={classes.textRight}>
      <ImageLink href={"/attraction/"+attraction.id}>
          <img alt={attraction.name} src={attraction.images && attraction.images.length > 0 ? attraction.images[0].url: ""} className={classes.packImg} alt={attraction.name}/>
      </ImageLink>
    </Grid>
  );
}
