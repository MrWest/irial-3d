import React, { Component } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import {FixedButton} from "../buttons"

class InfoSendEmailForm extends Component {
  state = {};
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper} elevation={0}>
          <div className="full-width">
            <p align="center" style={{fontSize: 22, marginBottom: 40}}>
              If a Swagup account exists for name@email.com, an e-mail will be
              sent with futher instructions
            </p>
          </div>
          <form className={classes.form}>
            <div align="center">
              <FixedButton                
                href="/confirmrp"
              >
                Back to sing in
              </FixedButton>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(560 + theme.spacing.unit * 3 * 2)]: {
      width: 560,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${8}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    backgroundColor: "transparent"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    backgroundColor: "#3577D4",
    color: "#ffffff",
    width: "80%",
    marginTop: 20,
    "&: hover": {
      backgroundColor: "#2466C3 !important",
      color: "#ffffff !important",
      fontWeight: "bold"
    }
  },
  forgot: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right"
  },
  bottomText: {
    marginTop: 15
  }
});

InfoSendEmailForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoSendEmailForm);
