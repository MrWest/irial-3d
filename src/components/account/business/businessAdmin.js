import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { connect } from "react-redux";
import { sortAttractionsUser, deleteAttraction } from "../../../actions";
import AddIcon from "@material-ui/icons/AddCircle";
import { withRouter } from "react-router-dom";
import styles from "./styles/administration";

class BusinessAdmin extends Component {
  state = { serviceIndex: -1 };

  selectService = (event) => {
    this.setState({ serviceIndex: event.currentTarget.id });
  };

  editAttraction = (event) => {
    // console.log("jajaja",event.currentTarget)
    this.props.history.push("/attractionedit/" + event.currentTarget.id);
  };

  handleDeleteAttraction = (event) => {
    this.props.deleteAttraction(event.currentTarget.id);
  };

  handleChange = (event) => {
    this.props.history.push(event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <main style={{ paddingBottom: 40 }}>
        <Grid container spacing={4}>
          <Grid item style={{ paddingRight: 0 }}>
            <div style={{ display: "table", height: "100%" }}>
              <div
                style={{
                  display: "table-cell",
                  verticalAlign: "middle",
                  paddingLeft: 0,
                }}
              >
                <p>{this.props.language.MyBusinesses}:</p>
              </div>
            </div>
          </Grid>
          <Grid
            item
            align="right"
            style={{ paddingRight: 10 }}
            className={classes.rightOnMobile}
          >
            <FormControl variant="outlined" style={{ width: 225 }}>
              <InputLabel htmlFor="idsimple">
                {this.props.language.Add}
              </InputLabel>
              <Select
                value={this.state.sort}
                onChange={this.handleChange.bind(this)}
                margin="none"
              >
                {this.props.categories.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={"/attractionadd/" + category.id}
                  >
                    <ListItemIcon className={classes.icon}>
                      <AddIcon
                        color="#ffffff"
                        style={{ fontSize: 34, color: "#188218", opacity: 0.3 }}
                      ></AddIcon>
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      inset
                      primary={category.name}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}></Grid>

          <Grid item xs={8}></Grid>
        </Grid>
      </main>
    );
  }
}

BusinessAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    // sections: state.sections,
    categories: state.sections[1] ? state.sections[1].categories : [],
    attractions: state.attractions,
    language: state.language,
    sign: state.sign,
  };
};
export default connect(mapStateToProps, {
  sortAttractionsUser,
  deleteAttraction,
})(withStyles(styles)(withRouter(BusinessAdmin)));
