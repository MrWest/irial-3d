import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import PropTypes from "prop-types";
import { left } from "glamor";
import { Grid } from "@material-ui/core";
import { StylessButton } from "./buttons";

class SwitchTool extends React.Component {
  constructor() {
    super();
    this.state = {
      on: true
    };


    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    this.setState({ on: this.props.value === this.props.onItem });
  }

  handleOnClick() {
    const { onChange, onItem, offItem } = this.props;

    this.setState(prevState => {
      if(onChange) onChange(prevState.on ? offItem : onItem );
      return { on: !prevState.on};
    });
  }
//  element[0].style.cssText = `transition: transform 0.4s ease-out 0s; transform: translate3d(${newTranslation}, 0px, 0px)!important; text-align: left; user-select: none; white-space: nowrap;`;
  
  render() {
    const { classes, onItem, offItem, value } = this.props;
    const { on } = this.state;
    const defaultStyle = {transition: `transform 0.4s ease-out 0s`} ;
    const customStyle = !on ? { ...defaultStyle, transform: `translate3d(20px, 0px, 0px)`} : { ...defaultStyle, transform: `translate3d(0px, 0px, 0px)`} ;
    return (
      <StylessButton onClick={this.handleOnClick}>
        <div className={classes.slideButtonContainer}>
          <div style={customStyle} className={classes.ellipsis} />
          <Grid container alignItems="center" className={classes.slideButtonBack}>
            <Grid item xs>
              <span>{offItem}</span>
            </Grid>
            <Grid item xs><span>{onItem}</span></Grid>
          </Grid>
        </div>
      </StylessButton>
    );
  }
}
const styles = theme => ({
  slideButtonContainer: {
    fontFamily: 'Arial',
    width: 40,
    height: 20,
    borderRadius: 11,
    border: '1px solid #fafafa',
    margin: '1px 0px',
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: '#6f6f7f'
  },
  ellipsis: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: '#fafafa',
    position: 'absolute',
    left: 0
  },
  slideButtonBack: {
    color: '#fefe7b',
    padding: '0px 3px',
    height: '100%',
    fontSize: 12,
    textAlign: 'center'
  },
  cursorPrev: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    width: "auto",
    marginTop: "-22px",
    padding: 16,
    color: "#ffffff !important",
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
    fontWeight: "bold",
    fontSize: 18,
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    backgroundColor: "transparent",
    left: 0
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
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
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

SwitchTool.propTypes = {
  onChange: PropTypes.node.isRequired
};

export default withStyles(styles)(SwitchTool);
