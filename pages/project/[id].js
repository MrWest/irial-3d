import React, { Component, Fragment } from "react";
import { selectProjectServer, fetchSectionsServer, getCategoryServer } from "../../src/actions";
import ProjectDetails from "../../src/components/projects/projectsDetails";


class ProjectDetailsServer extends Component {
  render() {
    const { categories, project, category } = this.props;  
    
    if(project.name === undefined)
     return <div/>

    return (
      <ProjectDetails project={project} category={category} categories={categories}/>
    );
  }
}

ProjectDetailsServer.getInitialProps = async function({ reduxStore, query: { id } }) {
  console.log(id);
  const sections = await fetchSectionsServer(reduxStore);
  const project = await selectProjectServer(id, reduxStore);
  
  console.log('projectsRslt', project)
  const category = await getCategoryServer(project.id_category, reduxStore);
  console.log("category: ", category);
  return {project, categories: sections[1].categories, category};
};


export default ProjectDetailsServer;
