import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import PropTypes from "prop-types";

class TourCarouselTool extends React.Component {
  state = {
    index: 0
  };

  next() {
    if (this.state.index < 1){

      //  alert("this.props.onChange");
       this.props.onChange(this.state.index + 1);

      this.setState({
        index: this.state.index + 1
      });

    }
     
  }

  prev() {
    if (this.state.index > 0)
      this.setState({
        index: this.state.index - 1
      });
  }

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.slideshowContainer}>
        {children.map(child => (
          <div
            style={{ opacity: 1 , verticalAlign: "middle", textAlign: "center", maxHeight: 440}}
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

        <a
         
          className={this.state.index > 0? classes.cursorPrev: classes.cursorPrevDisabled}
          onClick={() => {
            if(this.props.onChange !== undefined)
            this.props.onChange(this.state.index > 0 ? this.state.index - 1 : this.state.index);
            this.setState({
              index:
                this.state.index > 0 ? this.state.index - 1 : this.state.index
            });
          }}
        >
          &#10094;
        </a>
        <a
          className={this.state.index < children.length - 1? classes.cursorNext: classes.cursorNextDisabled}
          onClick={() => {
            if(this.props.onChange !== undefined)
            this.props.onChange(this.state.index < children.length - 1
              ? this.state.index + 1
              : this.state.index);
            this.setState({
              index:
                this.state.index < children.length - 1
                  ? this.state.index + 1
                  : this.state.index
            });
          }}
        >
          &#10095;
        </a>
      </div>
    );
  }
}
const styles = theme => ({
  slideshowContainer: {
    maxWidth: 690,
    position: "relative",
    margin: "auto"
  },
  mySlides: {
    display: "none"
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
    backgroundColor: "transparent"
  },
  cursorPrevDisabled: {
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
    backgroundColor: "#cccccc",
    display: "none"
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
    backgroundColor: "transparent"
  },
  cursorNextDisabled: {
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
    backgroundColor: "#cccccc",
    display: "none"
  }
});

TourCarouselTool.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.node.isRequired
};

export default withStyles(styles)(TourCarouselTool);
