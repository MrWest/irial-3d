import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SectionIcon from "@material-ui/icons/Dashboard";
import Tab from "@material-ui/core/Tab";
import SectionEditForm from "../../forms/sectionEditForm";
import { RoundedButtonLink } from "../../buttons";

class Nameable extends Component {
  state = { selectedIndex: 0 };

  handleChange = (event, value) => {
    this.setState({ selectedIndex: value });
  };

  render() {
    const {
      classes,
      nameable,
      selected,
      id,
      onClick,
      size,
      onEdit,
      editOnly,
      onDelete,
      notEditable,
    } = this.props;

    var innerPadding = "15px 10px";

    if (size === "large") innerPadding = "50px 10px";
    if (size === "medium") innerPadding = "30px 10px";

    return (
      <a id={id} onClick={onClick} style={{ cursor: "pointer" }}>
        <main
          style={{ marginBottom: 5, padding: innerPadding }}
          className={selected ? classes.selected : classes.normal}
        >
          <Grid container>
            <Grid item xs={2}>
              <div
                style={{
                  border: "1px #3577d4 solid",
                  background: "#fefefe",
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  display: "table",
                }}
              >
                <div
                  style={{
                    display: "table-cell",
                    verticalAlign: "middle",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <div
                    style={{ textAlign: "center", width: 20, margin: "auto" }}
                  >
                    <RoundedButtonLink
                      id={id}
                      color={"#cccccc"}
                      size={20}
                      border={0}
                      onClick={onEdit}
                    >
                      {notEditable ? (
                        <SectionIcon color="primary"></SectionIcon>
                      ) : (
                        <EditIcon color="primary"></EditIcon>
                      )}
                    </RoundedButtonLink>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={8}>
              <div style={{ height: 50, display: "table", width: "100%" }}>
                <div
                  style={{
                    display: "table-cell",
                    verticalAlign: "middle",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <p className={classes.modalText}>{nameable.name}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={2} align="right">
              {(!editOnly || !notEditable) && (
                <div style={{ height: 50, display: "table", width: "100%" }}>
                  <div
                    style={{
                      display: "table-cell",
                      verticalAlign: "middle",
                      width: 20,
                    }}
                  >
                    <RoundedButtonLink
                      id={id}
                      item
                      color={"#cccccc"}
                      size={20}
                      border={0}
                      onClick={onDelete}
                    >
                      <DeleteIcon
                        color="disabled"
                        className="delete-icon"
                      ></DeleteIcon>
                    </RoundedButtonLink>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </main>
      </a>
    );
  }
}

const styles = (theme) => ({
  normal: {
    border: "1px #ccc solid",
    // borderRight: "2px #3577d4 solid",
  },
  selected: {
    border: "1px #ccc solid",
    borderBottom: "5px #3577d4 solid",
    // borderRight: 0
  },

  modalText: {
    fontFamily: "Roboto",
    fontSize: "24px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#434c5f",
  },
});

Nameable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nameable);
