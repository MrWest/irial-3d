import React, { Component, Fragment } from "react";
import { selectProjectServer, fetchSectionsServer, getCategoryServer } from "../../src/actions";
import ProjectEditForm from "../../src/components/forms/projectEditForm";


class ProjectEditFormServer extends Component {
  render() {
    const { categories, project, category } = this.props;  
    
    if(project.name === undefined)
     return <div/>

    return (
      <ProjectEditForm project={project} category={category} categories={categories}/>
    );
  }
}

ProjectEditFormServer.getInitialProps = async function({ reduxStore, query: { id } }) {
  console.log(id);
  const sections = await fetchSectionsServer(reduxStore);
  const project = await selectProjectServer(id, reduxStore);
  
  console.log('projectsRslt', project)
  const category = await getCategoryServer(project.id_category, reduxStore);
  console.log("category: ", category);
  return {project, categories: sections[1].categories, category};
};


export default ProjectEditFormServer;
