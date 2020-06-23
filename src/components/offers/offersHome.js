import React, { Component } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import {
  Grid,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class OffersHome extends Component {
  state = {
    sort: 10
  };

  handleChange = event => {
    this.setState({ sort: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.container}>
      <Grid container justify="center" spacing={4}>
        <Grid item className={classes.center}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={5}>
                <p variant="p" align="left" className={classes.orderTittle}>
                  Your orders
                </p>
              </Grid>
              <Grid container xs={12} md={7}>
                 <Grid item xs={12} md={6} align="right">
                   <FormControl variant="outlined" className={classes.seletcTool}>
                  <Select
                    value={this.state.sort}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput name="age" id="outlined-age-simple" />
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>
                      <p style={{ fontSize: 14, marginBottom: 0 }}>
                        Sort by: <strong> Newest to the Oldest </strong>
                      </p>
                    </MenuItem>
                    <MenuItem value={20}>
                      <p style={{ fontSize: 14, marginBottom: 0 }}>
                        Sort by: <strong> Oldest to the Newest </strong>
                      </p>
                    </MenuItem>
                    <MenuItem value={30}>
                      <p style={{ fontSize: 14, marginBottom: 0 }}>
                        Sort by: <strong> Lowest Cost </strong>
                      </p>
                    </MenuItem>
                    <MenuItem value={40}>
                      <p style={{ fontSize: 14, marginBottom: 0 }}>
                        Sort by: <strong> Highest Cost </strong>
                      </p>
                    </MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} md={6} align="right">
                  <Button
                    variant="contained"
                    className={classes.submitButton}
                    href="/presets"
                  >
                    Order new pack
                  </Button>
               </Grid>
              </Grid>
              
              
            </Grid>
            <Grid item xs={12}>
               
               {/* <OrderDisplayTool
                 orders={this.props.orders}
                 classes={classes}
               /> */}
            
           </Grid>
          </Grid>
          
        </Grid>
      </main>
    );
  }
}

const styles = theme => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130
  },
  center: {
    paddingTop: "40px !important",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      minWidth: "1280px"
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1120px",
      paddingLeft: "0 !important",
      minWidth: "1120px"
    }
  },
  seletcTool: {
    width: 260,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 24
    }
  },
  orderTittle: {
    marginBottom: 40,
    fontFamily: "Futura",
    fontSize: "40px",
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#434c5f",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0
    }
  },
  orderList: {
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  gray: {
    backgroundColor: "#dddddd"
  },
  yellow: {
    color: "#a0a010",
    backgroundColor: "#f9f9c9"
  },
  green: {
    color: "#10a000",
    backgroundColor: "#c9f999"
  },
  submitButton: {
    width: "282px",
    height: "56px",
    "& span": {
      fontFamily: "Futura",
      fontSize: "16px",
      fontWeight: "bold",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: "normal"
    },
    textAlign: "center",
    color: "#ffffff",
    borderRadius: "4px",
    backgroundColor: "#3577d4"
  }
});

OffersHome.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateTopProps = state => {
  return {
    orders: state.offers
  };
};

export default connect(mapStateTopProps)(withStyles(styles)(OffersHome));
