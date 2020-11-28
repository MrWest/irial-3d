import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

class PromoImg extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.picContainer}>
        <img
          src="./images/home/swag-up-pack.png"
          className={classes.promoPic}
        />
        <p variant="p" component="p" className={classes.typographyText}>
          SwapUp branding for demostrative purposes only, we brand your swag for
          you.
        </p>
      </div>
    );
  }
}

const styles = (theme) => ({
  promoPic: {
    display: "table-cell",
    verticalAlign: "middle",
  },
  picContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: "center",
    display: "table-cell",
    verticalAlign: "middle",
  },
  typographyText: {
    color: "#ffffff !important",
    fontSize: 12,
    fontFamily: "Roboto",
    marginTop: 20,
  },
});

PromoImg.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PromoImg);
