import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Administration from "./administration";
import BusinessAdmin from "./userAdministration";

import { connect } from "react-redux";

class BusinessHome extends Component {
  state = {};
  render() {
    const { classes, loginInfo } = this.props;
    return (
      <main>
        {/* {loginInfo.type === "admin" && <Administration/>} */}
        <BusinessAdmin isAdmin={loginInfo.type === "admin"} />
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
  grow: {
    width: "100%",
    flex: 1,
  },
  cover: {
    [theme.breakpoints.up("sm")]: {
      backgroundImage: "url(../images/sign/artwork.svg)",
      backgroundRepeat: "no-repeat",
      // backgroundSize: "cover",
      backgroundPosition: "right",
      backgroundSize: "contain",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    [theme.breakpoints.up("xl")]: {
      paddingBottom: "200 !important",
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: "85 !important",
    },
  },
  center: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      minWidth: "1280px",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1120px",
      paddingLeft: "0 !important",
      minWidth: "1120px",
    },
  },
  signForm: {
    [theme.breakpoints.up("xl")]: {
      maxWidth: "486",
      paddingLeft: "60px !important",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "486",
      paddingLeft: "60px !important",
      minWidth: "400",
    },
  },
});

BusinessHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loginInfo: state.sign.loginInfo,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(BusinessHome));
