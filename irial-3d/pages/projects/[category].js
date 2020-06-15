import React, { Component } from "react";
import { sortProjectsServer, fetchSectionsServer } from "../../src/actions";
import ProjectsHome from "../../src/components/projects/projectsHome";

class ProjectsHomeServer extends Component {

  render() {
    const { projects, section, category } = this.props;    
    if(!section)
     return <div />;
    return (
      <ProjectsHome models={projects} section={section} />
    );
  }
}

ProjectsHomeServer.getInitialProps = async function({ reduxStore, query: { category } }) {
  console.log(category);
  const sections = await fetchSectionsServer(reduxStore);
  const projects = await sortProjectsServer(category, reduxStore);
  console.log(projects.length);
  return { projects, section: sections[2], category };
};


export default ProjectsHomeServer;
