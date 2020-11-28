import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SendEmailForm from "./sendEmailForm";
// import "../../styles/Sign.css";

class ForgotPassword extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container} align="center">
        <SendEmailForm />
      </div>
    );
  }
}

const styles = (theme) => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130,
    height: "100%",
  },
});

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPassword);
