import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SignInForm from "./signInForm";
// import "../../styles/Sign.css";
import { Grid } from "@material-ui/core";
import { Helmet } from "react-helmet";

class SignIn extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.container}>
        <Helmet>
          <title>Irial 3D | Sign In</title>
          <meta
            name="description"
            content="Sign in to fully use all features."
          />
        </Helmet>
        <section className={classes.cover}>
          <Grid container className={classes.center} spacing={4}>
            <Grid item md={6} sm={12}>
              <SignInForm />
            </Grid>
            <Grid item md={6} sm={12}>
              {/* <img src="./images/sign/artwork.png" className="right-pic" /> */}
            </Grid>
          </Grid>
        </section>
      </main>
    );
  }
}

const styles = (theme) => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130,
    height: "100%",
    backgroundColor: "#ffffff",
  },
  cover: {
    [theme.breakpoints.up("sm")]: {
      backgroundImage: "url(../static/images/sign/sign.svg)",
      backgroundRepeat: "no-repeat",
      // backgroundSize: "cover",
      backgroundPosition: "right",
      backgroundSize: "contain",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  center: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1280px",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1180px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "100vw",
    },
  },
});

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
