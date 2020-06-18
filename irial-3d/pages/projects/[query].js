import React, { Component } from "react";
import { sortProjectsServer, fetchSectionsServer } from "../../src/actions";
import ProjectsHome from "../../src/components/projects/projectsHome";

class ProjectsHomeServer extends Component {

  render() {
    const { projects, section, query } = this.props;    
    if(!section)
     return <div />;
    return (
      <ProjectsHome  />
    );
  }
}

ProjectsHomeServer.getInitialProps = async function({ reduxStore, query: { query } }) {
  console.log(query);
  const settings = query.split('-');
  const sections = await fetchSectionsServer(reduxStore);
  const projects = await sortProjectsServer(settings[0] || 'all', settings[1] || 'all', 0, reduxStore);
  console.log(projects.length);
  return { projects, section: sections[2], query };
};


export default ProjectsHomeServer;
