import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Nameable from "./nameable";
import { connect } from "react-redux";
import nameable from "./nameable";
import {
  getCategories,
  sortTours,
  deleteCategory,
  deleteTour,
  deleteModel,
  deleteProject,
  deleteTexture,
  deleteScene,
  sortModels,
  sortProjects,
  sortTextures,
  sortScenes,
  sortModelsByCategoryUser,
  sortProjectsByCategoryUser,
  sortTexturesByCategoryUser,
  sortScenesByCategoryUser,
} from "../../../actions";
import AddIcon from "@material-ui/icons/AddCircle";
import { RoundedButtonLink } from "../../buttons";
import { withRouter } from "react-router-dom";
import styles from "./styles/administration";

class UserAdministration extends Component {
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
    const { sections } = this.props;
    const section = sections.find(
      (section) => parseInt(section.id, 10) === parseInt(id, 10)
    );

    return section ? section.type : "none";
  }
  selectSection = (event) => {
    const { getCategories } = this.props;
    this.setState({
      sectionIndex: event.currentTarget.id,
      categoryIndex: -1,
      services: this.getServices(event.currentTarget.id),
    });

    getCategories(event.currentTarget.id);
  };

  selectCategory = (event) => {
    const {
      profile,
      sortModelsByCategoryUser,
      sortModels,
      sortProjects,
      sortTextures,
      sortScenes,
      sortProjectsByCategoryUser,
      sortTexturesByCategoryUser,
      sortScenesByCategoryUser,
      isAdmin,
    } = this.props;
    this.setState({ categoryIndex: event.currentTarget.id });

    if (isAdmin) {
      if (this.state.services === "models") sortModels(event.currentTarget.id);
      if (this.state.services === "projects")
        sortProjects(event.currentTarget.id);
      if (this.state.services === "textures")
        sortTextures(event.currentTarget.id);
      if (this.state.services === "scenes") sortScenes(event.currentTarget.id);
    } else {
      if (this.state.services === "models")
        sortModelsByCategoryUser({
          category: event.currentTarget.id,
          user: profile.id,
        });
      if (this.state.services === "projects")
        sortProjectsByCategoryUser({
          category: event.currentTarget.id,
          user: profile.id,
        });
      if (this.state.services === "textures")
        sortTexturesByCategoryUser({
          category: event.currentTarget.id,
          user: profile.id,
        });
      if (this.state.services === "scenes")
        sortScenesByCategoryUser({
          category: event.currentTarget.id,
          user: profile.id,
        });
    }
  };

  selectService = (event) => {
    this.setState({ serviceIndex: event.currentTarget.id });
  };

  handleDeleteModel = (event) => {
    const { deleteModel } = this.props;
    deleteModel(event.currentTarget.id);
  };

  handleDeleteProject = (event) => {
    const { deleteProject } = this.props;
    deleteProject(event.currentTarget.id);
  };

  handleDeleteTexture = (event) => {
    const { deleteTexture } = this.props;
    deleteTexture(event.currentTarget.id);
  };

  handleDeleteScene = (event) => {
    const { deleteScene } = this.props;
    deleteScene(event.currentTarget.id);
  };

  editItem = ({ currentTarget: { id } }, path) => {
    const { history } = this.props;
    history.push(`/${path}/${id}`);
  };

  editCategory = (event) => {
    const { history } = this.props;
    history.push("/categoryedit/" + event.currentTarget.id);
  };
  editSection = (event) => {
    const { history } = this.props;
    history.push("/sectionedit/" + event.currentTarget.id);
  };

  render() {
    const {
      classes,
      language,
      sections,
      categories,
      tours,
      models,
      projects,
      textures,
      scenes,
      isAdmin,
    } = this.props;
    const { services, sectionIndex, categoryIndex, serviceIndex } = this.state;
    return (
      <main>
        <Grid container spacing={4} style={{ paddingBottom: 40 }}>
          <Grid item xs={12} md={4}>
            <div style={{ display: "table", height: 40 }}>
              <div
                style={{
                  display: "table-cell",
                  verticalAlign: "middle",
                  paddingLeft: 10,
                }}
              >
                <p>{language.Sections}</p>
              </div>
            </div>
            <div>
              {sections.map((section) => (
                <Nameable
                  key={section.id}
                  nameable={section}
                  size="large"
                  selected={parseInt(sectionIndex) === parseInt(section.id)}
                  onClick={this.selectSection}
                  id={section.id}
                  onEdit={this.editSection}
                  notEditable={!isAdmin}
                ></Nameable>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container alignItems="center">
              <Grid item xs>
                <div style={{ display: "table", height: 40 }}>
                  <div
                    style={{
                      display: "table-cell",
                      verticalAlign: "middle",
                      paddingLeft: 10,
                    }}
                  >
                    <p>{language.Categories}</p>
                  </div>
                </div>
              </Grid>
              <Grid item>
                {isAdmin && this.state.sectionIndex !== -1 && (
                  <RoundedButtonLink
                    color={"#ffffff"}
                    size={40}
                    border={0}
                    to={`/categoryadd/${this.state.sectionIndex}`}
                  >
                    <AddIcon
                      color="#188218"
                      style={{ fontSize: 34, color: "#188218" }}
                    ></AddIcon>
                  </RoundedButtonLink>
                )}
              </Grid>
            </Grid>

            <div>
              {categories.map((category) => (
                <Nameable
                  key={category.id}
                  nameable={category}
                  size="medium"
                  selected={parseInt(categoryIndex) === parseInt(category.id)}
                  onClick={this.selectCategory}
                  id={category.id}
                  onEdit={this.editCategory}
                  notEditable={!isAdmin}
                ></Nameable>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs>
                  <div style={{ display: "table", height: "100%" }}>
                    <div
                      style={{
                        display: "table-cell",
                        verticalAlign: "middle",
                        paddingLeft: 10,
                      }}
                    >
                      <p>{language.Services}</p>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  align="right"
                  style={{
                    paddingRight: 15,
                    visibility: categoryIndex !== -1 ? "inherit" : "hidden",
                  }}
                >
                  {services === "models" && (
                    <RoundedButtonLink
                      color={"#ffffff"}
                      size={40}
                      border={0}
                      to={
                        categoryIndex !== -1 ? `/modeladd/${categoryIndex}` : "#"
                      }
                    >
                      <AddIcon
                        color="#188218"
                        style={{ fontSize: 34, color: "#188218" }}
                      ></AddIcon>
                    </RoundedButtonLink>
                  )}

                  {services === "projects" && (
                    <RoundedButtonLink
                      color={"#ffffff"}
                      size={40}
                      border={0}
                      to={
                        categoryIndex !== -1
                          ? `/projectadd/${categoryIndex}`
                          : "#"
                      }
                    >
                      <AddIcon
                        color="#188218"
                        style={{ fontSize: 34, color: "#188218" }}
                      ></AddIcon>
                    </RoundedButtonLink>
                  )}

                  {services === "textures" && (
                    <RoundedButtonLink
                      color={"#ffffff"}
                      size={40}
                      border={0}
                      to={
                        categoryIndex !== -1
                          ? `/textureadd/${categoryIndex}`
                          : "#"
                      }
                    >
                      <AddIcon
                        color="#188218"
                        style={{ fontSize: 34, color: "#188218" }}
                      ></AddIcon>
                    </RoundedButtonLink>
                  )}

                  {services === "scenes" && (
                    <RoundedButtonLink
                      color={"#ffffff"}
                      size={40}
                      border={0}
                      to={
                        categoryIndex !== -1
                          ? `/sceneadd/${categoryIndex}`
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
            </div>
            <div>
              {services === "models" &&
                models.map((model) => (
                  <Nameable
                    key={model.id}
                    nameable={model}
                    size="small"
                    selected={parseInt(serviceIndex) === parseInt(model.id)}
                    onClick={this.selectService}
                    onEdit={(event) => this.editItem(event, "modeledit")}
                    onDelete={this.handleDeleteModel}
                    id={model.id}
                  ></Nameable>
                ))}
              {services === "projects" &&
                projects.map((project) => (
                  <Nameable
                    key={project.id}
                    nameable={project}
                    size="small"
                    selected={parseInt(serviceIndex) === parseInt(project.id)}
                    onClick={this.selectService}
                    onEdit={(event) => this.editItem(event, "projectedit")}
                    onDelete={this.handleDeleteProject}
                    id={project.id}
                  ></Nameable>
                ))}
              {services === "textures" &&
                textures.map((texture) => (
                  <Nameable
                    key={texture.id}
                    nameable={texture}
                    size="small"
                    selected={parseInt(serviceIndex) === parseInt(texture.id)}
                    onClick={this.selectService}
                    onEdit={(event) => this.editItem(event, "textureedit")}
                    onDelete={this.handleDeleteTexture}
                    id={texture.id}
                  ></Nameable>
                ))}
              {services === "scenes" &&
                scenes.map((scene) => (
                  <Nameable
                    key={scene.id}
                    nameable={scene}
                    size="small"
                    selected={parseInt(serviceIndex) === parseInt(scene.id)}
                    onClick={this.selectService}
                    onEdit={(event) => this.editItem(event, "scenesedit")}
                    onDelete={this.handleDeleteScene}
                    id={scene.id}
                  ></Nameable>
                ))}
            </div>
          </Grid>
        </Grid>
      </main>
    );
  }
}

UserAdministration.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    sections: state.sections,
    categories: state.categories,
    tours: state.tours,
    models: state.models,
    projects: state.projects,
    textures: state.textures,
    scenes: state.scenes,
    language: state.language,
    profile: state.profile,
  };
};
export default connect(mapStateToProps, {
  getCategories,
  sortTours,
  deleteCategory,
  deleteTour,
  deleteModel,
  deleteProject,
  deleteTexture,
  deleteScene,
  sortModels,
  sortProjects,
  sortTextures,
  sortScenes,
  sortModelsByCategoryUser,
  sortProjectsByCategoryUser,
  sortTexturesByCategoryUser,
  sortScenesByCategoryUser,
})(withStyles(styles)(withRouter(UserAdministration)));
