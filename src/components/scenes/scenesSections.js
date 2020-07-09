import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import classNames from "classnames";
import { CoolLink, ImageLink } from "../buttons";
import StarRatingComponent from 'react-star-rating-component';


export const SceneCardLeft = ({scene, classes, language}) => {
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
      {scene.name}
    </p>
  
     </Grid>
     <Grid item md={2} align="right">
     <div style={{height: "100%", display: "table"}}>
        <div style={{verticalAlign: "middle", display: "table-cell"}}>
          <StarRatingComponent 
              name="rate1" 
              editing={false}
              starCount={5}
              value={scene.rate}
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
      <span style={{fontSize: 20}}>$</span><span className={classes.numberText}>{scene.price}</span>  {scene.currency} {scene.price_specifics} 
    </p>
  
    <p
      variant="p"
      component="p"
      className={classes.descriptionText}
      style={{ fontSize: 16, color: '#1c5375 !important', fontFamily: 'Roboto !important' }}
    >
      {scene.general_description}
    </p>
    </div>

    <div align="left" style={{ paddingTop: 40, paddingLeft: 40 }}>
      <CoolLink
        href={"/scene/"+scene.id}
        height={56} width={225} fill={"#337ab7"} color={"#ffffff"}
      >
        {language.ViewOffer}
      </CoolLink>
      <p
        variant="p"
        component="p"
        className={classes.packDisclaimer}
      >
        {(scene.note && scene.note !== "") && <span><sup>*</sup>{scene.note}</span>}
      </p>
    </div>
  </Grid>
  );
}


export const SceneImageLeft = ({scene, classes}) =>{

  return (
    <Grid item sm={12} md={5} className={classes.textLeft}>
    {scene.images.length> 0 && 
    <ImageLink href={"/scene/"+scene.id}>
     <img  alt={scene.name} 
       src={scene.images && scene.images.length > 0 ? scene.images[0].url: ""}
       className={classNames(
         classes.packImg,
         classes.textLeft
       )}
       alt={scene.name}
     />
     </ImageLink>}
   </Grid>
  );
}


export const SceneCardRight = ({scene, classes, language}) =>{

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
                      value={scene.rate}
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
              {scene.name}
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
        <span style={{fontSize: 20}}>$</span><span className={classes.numberText}>{scene.price}</span> {scene.currency}  {scene.price_specifics} 
      </p>
    
      <p
        variant="p"
        component="p"
        className={classes.descriptionText}
        style={{ fontSize: 16, color: '#1c5375 !important', fontFamily: 'Roboto !important' }}
      >
        {scene.general_description}
      </p>
    </div>

      <div align="right" style={{ paddingTop: 40, paddingRight: 40, textAlign: "right" }}>
        <Grid container align="right" >
       
        <Grid xs={12} item align="right" >
        <CoolLink
              href={"/scene/"+scene.id}                   
            
              height={56} width={225} fill={"#337ab7"} color={"#ffffff"}
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
          {(scene.note && scene.note !== "") && <span><sup>*</sup>{scene.note}</span>}
        </p>
      </div>
    </Grid>
  );
}


export const SceneImageRight = ({scene, classes}) =>{

  return (
    <Grid item sm={12} md={5} className={classes.textRight}>
      <ImageLink href={"/scene/"+scene.id}>
          <img alt={scene.name} src={scene.images && scene.images.length > 0 ? scene.images[0].url: ""} className={classes.packImg} alt={scene.name}/>
      </ImageLink>
    </Grid>
  );
}
