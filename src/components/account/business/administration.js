import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core"
import Nameable from "./nameable";
import { connect } from "react-redux";
import {
  getCategories,
  sortTours,
  deleteCategory,
  deleteTour,
  sortAttractions,
  deleteAttraction,
  deleteModel,
  sortModels,
} from "../../../actions";
import AddIcon from "@material-ui/icons/AddCircle";
import { RoundedButtonLink } from "../../buttons";
import { withRouter } from "react-router-dom";
import styles from "./styles/administration";

class Administration extends Component {
  state = {
    selectedIndex: 0,
    sectionIndex: -1,
    categoryIndex: -1,
    serviceIndex: -1,
    services: "none",
  };

  handleChange = (event, value) => {
    this.setState({ selectedIndex: value });
  };

  getServices(id) {
    var services = "none";
    this.props.sections.map((section) => {
      if (parseInt(section.id) === parseInt(id)) {
        services = section.type;
      }
    });

    return services;
  }
  selectSection = (event) => {
    this.setState({
      sectionIndex: event.currentTarget.id,
      categoryIndex: -1,
      services: this.getServices(event.currentTarget.id),
    });

    this.props.getCategories(event.currentTarget.id);
  };

  selectCategory = (event) => {
    this.setState({ categoryIndex: event.currentTarget.id });

    if (this.state.services === "tours")
      this.props.sortTours(event.currentTarget.id);
    if (this.state.services === "attractions")
      this.props.sortAttractions(event.currentTarget.id);

    if (this.state.services === "models")
      this.props.sortModels(event.currentTarget.id);
  };

  selectService = (event) => {
    this.setState({ serviceIndex: event.currentTarget.id });
  };
  editSection = (event) => {
    // console.log("jajaja",event.currentTarget)
    this.props.history.push("/sectionedit/" + event.currentTarget.id);
  };
  handleDeleteCategory = (event) => {
    this.props.deleteCategory(event.currentTarget.id);
  };

  handleDeleteTour = (event) => {
    this.props.deleteTour(event.currentTarget.id);
  };
  editCategory = (event) => {
    // console.log("jajaja",event.currentTarget)
    this.props.history.push("/categoryedit/" + event.currentTarget.id);
  };
  editTour = (event) => {
    // console.log("jajaja",event.currentTarget)
    this.props.history.push("/touredit/" + event.currentTarget.id);
  };
  handleDeleteAttraction = (event) => {
    this.props.deleteAttraction(event.currentTarget.id);
  };

  handleDeleteModel = (event) => {
    this.props.deleteModel(event.currentTarget.id);
  };

  editAttraction = (event) => {
    // console.log("jajaja",event.currentTarget)
    this.props.history.push("/attractionedit/" + event.currentTarget.id);
  };

  editModel = (event) => {
    // console.log("jajaja",event.currentTarget)
    this.props.history.push("/modeledit/" + event.currentTarget.id);
  };

  render() {
    return (
      <main>
        <Grid container spacing={4} style={{ paddingBottom: 40 }}>
          <Grid item xs={12} md={4}>
            <Grid container spacing={4}>
              <Grid item xs={10} alignItems="baseline">
                <div style={{ display: "table", height: "100%" }}>
                  <div
                    style={{
                      display: "table-cell",
                      verticalAlign: "middle",
                      paddingLeft: 10,
                    }}
                  >
                    <p>{this.props.language.Sections}</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={2} align="right" style={{ paddingRight: 10 }}>
                <RoundedButtonLink fill={"#ffffff"} size={40} border={0}>
                  <AddIcon
                    color="#ffffff"
                    style={{ fontSize: 34, color: "#ffffff" }}
                  ></AddIcon>
                </RoundedButtonLink>
              </Grid>
            </Grid>

            {this.props.sections.map((section) => (
              <Nameable
                nameable={section}
                size="large"
                selected={
                  parseInt(this.state.sectionIndex) === parseInt(section.id)
                }
                onClick={this.selectSection}
                id={section.id}
                onEdit={this.editSection}
                editOnly={true}
              ></Nameable>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={4}>
              <Grid item xs={8} alignItems="baseline">
                <div style={{ display: "table", height: "100%" }}>
                  <div
                    style={{
                      display: "table-cell",
                      verticalAlign: "middle",
                      paddingLeft: 10,
                    }}
                  >
                    <p>{this.props.language.Categories}</p>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                align="right"
                style={{
                  paddingRight: 15,
                  visibility:
                    this.state.sectionIndex !==-1 ? "inherit" : "hidden",
                }}
              >
                <RoundedButtonLink
                  color={"#ffffff"}
                  size={40}
                  border={0}
                  to={
                    this.state.sectionIndex !==-1
                      ? "/categoryadd/" + this.state.sectionIndex
                      : "#"
                  }
                >
                  <AddIcon
                    color="#188218"
                    style={{ fontSize: 34, color: "#188218" }}
                  ></AddIcon>
                </RoundedButtonLink>
              </Grid>
            </Grid>
            <div
              style={{
                borderTop: this.props.tours.length === 0 ? "1px #ccc solid" : 0,
              }}
            >
              {this.props.categories.map((category) => (
                <Nameable
                  key={category.id}
                  nameable={category}
                  size="medium"
                  selected={
                    parseInt(this.state.categoryIndex) === parseInt(category.id)
                  }
                  onEdit={this.editCategory}
                  onClick={this.selectCategory}
                  onDelete={this.handleDeleteCategory}
                  id={category.id}
                ></Nameable>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={4}>
              <Grid item xs={8} alignItems="baseline">
                <div style={{ display: "table", height: "100%" }}>
                  <div
                    style={{
                      display: "table-cell",
                      verticalAlign: "middle",
                      paddingLeft: 10,
                    }}
                  >
                    <p>{this.props.language.Services}</p>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                align="right"
                style={{
                  paddingRight: 15,
                  visibility:
                    this.state.categoryIndex !==-1 ? "inherit" : "hidden",
                }}
              >
                {this.state.services === "tours" && (
                  <RoundedButtonLink
                    color={"#ffffff"}
                    size={40}
                    border={0}
                    to={
                      this.state.categoryIndex !==-1
                        ? "/touradd/" + this.state.categoryIndex
                        : "#"
                    }
                  >
                    <AddIcon
                      color="#188218"
                      style={{ fontSize: 34, color: "#188218" }}
                    ></AddIcon>
                  </RoundedButtonLink>
                )}
                {this.state.services === "attractions" && (
                  <RoundedButtonLink
                    color={"#ffffff"}
                    size={40}
                    border={0}
                    to={
                      this.state.categoryIndex !==-1
                        ? "/attractionadd/" + this.state.categoryIndex
                        : "#"
                    }
                  >
                    <AddIcon
                      color="#188218"
                      style={{ fontSize: 34, color: "#188218" }}
                    ></AddIcon>
                  </RoundedButtonLink>
                )}

                {this.state.services === "models" && (
                  <RoundedButtonLink
                    color={"#ffffff"}
                    size={40}
                    border={0}
                    to={
                      this.state.categoryIndex !==-1
                        ? "/modeladd/" + this.state.categoryIndex
                        : "#"
                    }
                  >
                    <AddIcon
                      color="#188218"
                      style={{ fontSize: 34, color: "#188218" }}
                    ></AddIcon>
                  </RoundedButtonLink>
                )}
              </Grid>
            </Grid>
            <div
              style={{
                borderTop: this.props.tours.length === 0 ? "1px #ccc solid" : 0,
              }}
            >
              {this.state.services === "tours" &&
                this.props.tours.map((tour) => (
                  <Nameable
                    nameable={tour}
                    size="small"
                    selected={
                      parseInt(this.state.serviceIndex) === parseInt(tour.id)
                    }
                    onClick={this.selectService}
                    onEdit={this.editTour}
                    onDelete={this.handleDeleteTour}
                    id={tour.id}
                  ></Nameable>
                ))}

              {this.state.services === "attractions" &&
                this.props.attractions.map((attraction) => (
                  <Nameable
                    nameable={attraction}
                    size="small"
                    selected={
                      parseInt(this.state.serviceIndex) ===
                      parseInt(attraction.id)
                    }
                    onClick={this.selectService}
                    onEdit={this.editAttraction}
                    onDelete={this.handleDeleteAttraction}
                    id={attraction.id}
                  ></Nameable>
                ))}

              {this.state.services === "models" &&
                this.props.models.map((model) => (
                  <Nameable
                    nameable={model}
                    size="small"
                    selected={
                      parseInt(this.state.serviceIndex) === parseInt(model.id)
                    }
                    onClick={this.selectService}
                    onEdit={this.editModel}
                    onDelete={this.handleDeleteModel}
                    id={model.id}
                  ></Nameable>
                ))}
            </div>
          </Grid>
        </Grid>
      </main>
    );
  }
}



Administration.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    sections: state.sections,
    categories: state.categories,
    tours: state.tours,
    attractions: state.attractions,
    models: state.models,
    language: state.language,
  };
};
export default connect(mapStateToProps, {
  getCategories,
  sortTours,
  deleteCategory,
  deleteTour,
  sortAttractions,
  deleteAttraction,
  deleteModel,
  sortModels,
})(withStyles(styles)(withRouter(Administration)));
