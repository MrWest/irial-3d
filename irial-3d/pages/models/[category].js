import React, { Component } from "react";
import { sortModelsServer, fetchSectionsServer } from "../../src/actions";
import ModelsHome from "../../src/components/models/modelsHome";

class ModelsHomeServer extends Component {

  render() {
    const { models, section, category } = this.props;    
    if(!section)
     return <div />;
    return (
      <ModelsHome models={models} section={section} />
    );
  }
}

ModelsHomeServer.getInitialProps = async function({ reduxStore, query: { category } }) {
  console.log(category);
  const sections = await fetchSectionsServer(reduxStore);
  const models = await sortModelsServer(category, reduxStore);
  console.log(models.length);
  return {models, section: sections[1], category};
};


export default ModelsHomeServer;
