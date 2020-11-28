import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import PropTypes from "prop-types";
import { Grid, MenuItem } from "@material-ui/core";

class VerticalTabsTool extends React.Component {
  state = {
    index: this.getIndex(),
  };

  getIndex() {
    const { index } = this.props;

    return index;
  }

  render() {
    const { classes, children, labels, onChange } = this.props;

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} md={1} style={{ paddingRight: 10 }}>
          <Grid container>
            {labels.map((label) => (
              <Grid item xs={6} md={12}>
                <MenuItem
                  style={{ height: "auto", textAlign: "center" }}
                  onClick={() => {
                    this.setState({ index: labels.indexOf(label) });
                    onChange(labels.indexOf(label));
                  }}
                >
                  {this.state.index == labels.indexOf(label)
                    ? label.selected
                    : label.normal}
                </MenuItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={12} md={11}>
          <div className={classes.slideshowContainer}>
            {children.map((child) => (
              <div
                style={{ opacity: 1 }}
                className={classNames(
                  this.state.index != children.indexOf(child)
                    ? classes.mySlides
                    : {},
                  "fade"
                )}
              >
                {child}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    );
  }
}
const styles = (theme) => ({
  slideshowContainer: {
    width: "100%",
    position: "relative",
    margin: "auto",
  },
  mySlides: {
    display: "none",
  },
  cursorPrev: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    width: "auto",
    marginTop: "-22px",
    padding: 16,
    color: "#ffffff !important",
    fontWeight: "bold",
    fontSize: 18,
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    backgroundColor: "#434c5f",
  },
  cursorNext: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    width: "auto",
    marginTop: "-22px",
    padding: 16,
    color: "#ffffff !important",
    fontWeight: "bold",
    fontSize: 18,
    transition: "0.6s ease",
    userSelect: "none",
    borderRadius: "3px 0 0 3px",
    right: 0,
    backgroundColor: "#434c5f",
  },
});

VerticalTabsTool.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(VerticalTabsTool);
