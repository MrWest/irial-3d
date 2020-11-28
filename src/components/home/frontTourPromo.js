import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { CoolLink, CoolButton } from "../buttons";
import { ShortSign, MiddleSign } from "../icons";
import {
  Carousel,
  CarouselCaption,
  CarouselInner,
  CarouselItem,
  View,
  Mask,
} from "mdbreact";

import { connect } from "react-redux";

function CarouselContent({ imageUrl, child, alt }) {
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <img
        alt={alt}
        style={{
          width: "100%",
          borderTopLeftRadius: 4,
          objectFit: "cover",
          maxHeight: 450,
        }}
        src={imageUrl}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {child}
      </div>
    </div>
  );
}

class FrontTourPromo extends React.Component {
  state = {};

  render() {
    const { classes, section } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.center} align="center">
          <Paper
            id={"front-tour-promo"}
            elevation={2}
            style={{ padding: 10, marginTop: -60, paddingBottom: 7 }}
          >
            <Grid container className={classes.vissuals}>
              <Grid xs={12} md={7} item style={{ padding: 0 }}>
                <Carousel
                  activeItem={1}
                  length={section.categories.length}
                  slide={true}
                  showControls={false}
                  showIndicators={false}
                  className={classes.noBullets}
                >
                  <CarouselInner>
                    {section.categories.map((category, index) => (
                      <CarouselItem key={index} itemId={`${index + 1}`}>
                        <CarouselContent
                          alt={category.name}
                          imageUrl={category.images[0].url}
                          child={
                            <CoolLink
                              href={"/tours/" + category.id}
                              height={56}
                              width={325}
                              fill={"#ffffff"}
                              color={"#337ab7"}
                            >
                              {category.name}
                            </CoolLink>
                          }
                        />
                      </CarouselItem>
                    ))}
                  </CarouselInner>
                </Carousel>
              </Grid>
              <Grid xs={12} md={5} item style={{ padding: 0 }}>
                <div className={classes.tittleContainer}>
                  <h3 align="center" className={classes.pTextTittle}>
                    {section.name}
                  </h3>
                  <p
                    variant="p"
                    component="p"
                    align="center"
                    style={{ fontSize: 18, marginBottom: 40 }}
                  >
                    {section.description}
                  </p>

                  <div align="center">
                    <CoolLink
                      href={"/tours/all"}
                      height={56}
                      width={385}
                      fill={"#337ab7"}
                      color={"#ffffff"}
                    >
                      {this.props.language.GoForIt}
                    </CoolLink>
                    {/* <FixedButton>
                  Go for It
                </FixedButton> */}
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container className={classes.vissualsMobile}>
              <Grid xs={12} md={5} item style={{ padding: 0 }}>
                <div className={classes.tittleContainer}>
                  <h4
                    align="center"
                    variant="h4"
                    component="h4"
                    className={classes.pTextTittle}
                  >
                    {section.name}
                  </h4>
                  <p
                    variant="p"
                    component="p"
                    align="center"
                    style={{ fontSize: 18, marginBottom: 40 }}
                  >
                    {section.description}
                  </p>

                  <div align="center" style={{ marginBottom: 20 }}>
                    <CoolLink
                      href={"/tours/all"}
                      height={56}
                      width={340}
                      fill={"#337ab7"}
                      color={"#ffffff"}
                    >
                      {this.props.language.GoForIt}
                    </CoolLink>
                    {/* <FixedButton>
                  Go for It
                </FixedButton> */}
                  </div>
                </div>
              </Grid>
              <Grid xs={12} item style={{ padding: 0 }}>
                <Carousel
                  activeItem={0}
                  length={section.categories.length}
                  slide={true}
                  showControls={true}
                  showIndicators={true}
                  className="z-depth-1"
                >
                  <CarouselInner>
                    {section.categories.map((category, index) => (
                      //  index>0 &&
                      <CarouselItem key={index} itemId={index}>
                        <CarouselContent
                          alt={category.name}
                          imageUrl={category.images[0].url}
                          child={
                            <CoolLink
                              href={"/tours/" + category.id}
                              height={56}
                              width={325}
                              fill={"#ffffff"}
                              color={"#337ab7"}
                            >
                              {category.name}
                            </CoolLink>
                          }
                        />
                      </CarouselItem>
                    ))}
                  </CarouselInner>
                </Carousel>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

const styles = (theme) => ({
  vissuals: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  vissualsMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  noBullets: {
    "& ol": {
      listStyleType: "none !important",
    },
  },
  servicesItem: {
    paddingRight: "12px !important",
    paddingLeft: "12px !important",
  },
  servicesItemLeft: {
    paddingRight: "12px !important",
    paddingLeft: "0px !important",
  },
  servicesItemRight: {
    paddingRight: "0px !important",
    paddingLeft: "12px !important",
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 0,
    paddingBottom: 8,
    paddingRight: "0px !important",
    paddingLeft: "0px !important",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  themePadding: {
    border: "1px solid #ff1333",
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: 1440,
    },
  },
  center: {
    width: "100%",
    [theme.breakpoints.up("xl")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      minWidth: "1100px",
    },
  },
  sectionTittle: {
    fontSize: 24,
    color: "#434c5f",
    fontFamily: "Roboto",
    fontWeight: "bold",
    lineHeight: 1.67,
    textAlign: "center",
    marginBottom: 26,
    marginTop: 32,
  },
  pText: {
    fontSize: 14,
    color: "#434c5f",
    fontFamily: "Roboto",
    lineHeight: 1.67,
    textAlign: "center",
  },
  summaryText: {
    fontSize: 24,
    color: "#434c5f",
    fontFamily: "Roboto",
    lineHeight: 1.67,
    textAlign: "center",
  },
  pTextTittle: {
    margin: "10px 0px",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Futura",
    color: "#337ab7",
    marginBottom: 25,
  },
  pTextSmall: {
    color: "#ffffff !important",
    marginBottom: 40,
    fontSize: 16,
  },
  tittleContainer: {
    padding: "0px 5%",
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
  },
  promoPic: {
    textAtlign: "center",
    width: 120,
    height: 120,
  },
});

FrontTourPromo.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(FrontTourPromo));
