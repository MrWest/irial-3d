import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withStylesMore } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    background: "transparent"
  },
  orderButton: {
    background: "#ffffff",
    color: "#3577D4",
    fontWeight: "bold",
    width: "100%"
  },
  orderBottomButton: {
    color: "#ffffff",
    borderColor: "#ffffff",
    width: "100%",
    fontWeight: "bold",
    marginTop: 20
  },
  hrBar: {
    background: "#ffffff",
    borderColor: "#ffffff",
    color: "#ffffff !important",
    marginTop: 20,
    marginBottom: 20,
    height: 3,
    width: "20%",
    textAlign: "left !important"
  },
  typographyText: {
    color: "#ffffff !important",
    margin: "20px 0px"
  },
  typographyTextSmall: {
    color: "#ffffff !important",
    marginBottom: 40,
    fontSize: 16
  }
});

class PromoInfoMore extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.root} elevation={0}>
          <Typography
            variant="h3"
            component="h3"
            className={classes.typographyText}
          >
            Swagup packs made simple
          </Typography>
          <p
            className={classes.typographyTextSmall}
          >
            <div className={classes.hrBar} />
            An assorment of high quality branded items bundled together. Given
            out to clients or employees to build brand awareness and loyalty
          </p>

          <div className="row">
            <div className="col-sm-12 col-md-6 ">
              <Button
                variant="contained"
                size="large"
                color="default"
                className={classes.orderButton}
                href="/signin"
              >
                MEN
              </Button>
            </div>
            <div className="col-sm-12 col-md-6 ">
              <Button
                variant="contained"
                size="large"
                color="default"
                className={classes.orderButton}
                href="/signin"
              >
                WOMEN
              </Button>
            </div>
            <div className="col-12">
              <Button
                variant="outlined"
                size="large"
                color="primary"
                className={classes.orderBottomButton}
                href="/signin"
              >
                UNISEX
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

PromoInfoMore.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PromoInfoMore);
