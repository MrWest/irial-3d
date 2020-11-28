import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ResetPasswordForm from "./resetPasswordForm";
// import "../../styles/Sign.css";
import { getPasswordAccess } from "../../actions";
import { connect } from "react-redux";

class ResetPassword extends Component {
  state = { email: undefined, idreset: undefined, formStatus: undefined };
  componentWillMount() {
    const {
      match: { params },
    } = this.props;

    let content = params.info;

    let contents = content.split("-");

    let idreset = contents[0];

    let email = contents[1];

    email = email.replace("&", "@").replace("_", ".");

    this.props.getPasswordAccess(idreset).then((res) => {
      if (res && res.id) this.setState({ email, idreset, formStatus: true });
    });
  }

  render() {
    const { classes } = this.props;
    const { email, idreset, formStatus } = this.state;

    if (!formStatus) {
      return <div />;
    }
    return (
      <div className={classes.container} align="center">
        <ResetPasswordForm email={email} idreset={idreset} />
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

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { getPasswordAccess })(
  withStyles(styles)(ResetPassword)
);
