import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InfoSendEmailForm from "./infoSendEmailForm";
// import "../../styles/Sign.css";

class InfoSendEmail extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container} align="center">
        <InfoSendEmailForm />
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130,
    height: "100%",
  },
});

InfoSendEmail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoSendEmail);
