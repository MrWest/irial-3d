import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import classNames from "classnames";
import { CoolLink, ImageLink } from "../buttons";
import StarRatingComponent from "react-star-rating-component";

export const TourCardLeft = ({ tour, classes, language }) => {
  return (
    <Grid item sm={12} md={7}>
      <div style={{ paddingLeft: 40, paddingRight: 40, textAlign: "left" }}>
        <Grid container>
          <Grid item xs={12} md={10}>
            <p variant="p" component="p" className={classes.packNameText}>
              {tour.name}
            </p>
          </Grid>
          <Grid item xs={12} md={2} align="right">
            <div style={{ height: "100%", display: "table" }}>
              <div style={{ verticalAlign: "middle", display: "table-cell" }}>
                <StarRatingComponent
                  name="rate1"
                  editing={false}
                  starCount={5}
                  value={tour.rate}
                  emptyStarColor={
                    "#ccc"
                  } /* color of non-selected icons, default `#333` */
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

        <p
          variant="p"
          component="p"
          className={classes.descriptionText}
          style={{
            fontSize: 16,
            color: "#1c5375 !important",
            fontFamily: "Roboto !important",
          }}
        >
          {tour.general_description}
        </p>
      </div>

      <div align="left" style={{ paddingTop: 40, paddingLeft: 40 }}>
        <CoolLink
          href={"/tour/" + tour.id}
          height={56}
          width={225}
          fill={"#337ab7"}
          color={"#ffffff"}
        >
          {language.ViewOffer}
        </CoolLink>
        <p variant="p" component="p" className={classes.packDisclaimer}>
          {tour.note && tour.note !== "" && (
            <span>
              <sup>*</sup>
              {tour.note}
            </span>
          )}
        </p>
      </div>
    </Grid>
  );
};

export const TourImageLeft = ({ tour, classes }) => {
  return (
    <Grid item sm={12} md={5} className={classes.textLeft}>
      {tour.images.length > 0 && (
        <ImageLink href={"/tour/" + tour.id}>
          <img
            alt={tour.name}
            src={
              tour.images && tour.images.length > 0 ? tour.images[0].url : ""
            }
            className={classNames(classes.packImg, classes.textLeft)}
            alt={tour.name}
          />
        </ImageLink>
      )}
    </Grid>
  );
};

export const TourCardRight = ({ tour, classes, language }) => {
  return (
    <Grid item sm={12} md={7} align="right">
      <div style={{ paddingLeft: 40, paddingRight: 40, textAlign: "right" }}>
        <Grid container>
          <Grid item xs={12} md={2} align="left">
            <div style={{ height: "100%", display: "table" }}>
              <div style={{ verticalAlign: "middle", display: "table-cell" }}>
                <StarRatingComponent
                  name="rate1"
                  editing={false}
                  starCount={5}
                  value={tour.rate}
                  emptyStarColor={
                    "#ccc"
                  } /* color of non-selected icons, default `#333` */
                  // onStarClick={this.onStarClick.bind(this)}
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={10}>
            <p variant="p" component="p" className={classes.packNameText}>
              {tour.name}
            </p>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} />
          <Grid item xs={6} align="right">
            <div className={classes.hrBlue} style={{ marginTop: 3 }} />
          </Grid>
        </Grid>

        <p
          variant="p"
          component="p"
          className={classes.descriptionText}
          style={{
            fontSize: 16,
            color: "#0f2440 !important",
            fontFamily: "Roboto !important",
          }}
        >
          {tour.general_description}
        </p>
      </div>

      <div
        align="right"
        style={{ paddingTop: 40, paddingRight: 40, textAlign: "right" }}
      >
        <Grid container align="right">
          {/* <Grid xs={6} item ></Grid> */}
          <Grid xs={12} item align="right">
            <CoolLink
              href={"/tour/" + tour.id}
              height={56}
              width={225}
              fill={"#188218"}
              color={"#ffffff"}
            >
              {language.ViewOffer}
            </CoolLink>
          </Grid>
        </Grid>

        <p variant="p" component="p" className={classes.packDisclaimer}>
          {tour.note && tour.note !== "" && (
            <span>
              <sup>*</sup>
              {tour.note}
            </span>
          )}
        </p>
      </div>
    </Grid>
  );
};

export const TourImageRight = ({ tour, classes }) => {
  return (
    <Grid item sm={12} md={5} className={classes.textRight}>
      <ImageLink href={"/tour/" + tour.id}>
        <img
          alt={tour.name}
          src={tour.images && tour.images.length > 0 ? tour.images[0].url : ""}
          className={classes.packImg}
          alt={tour.name}
        />
      </ImageLink>
    </Grid>
  );
};
