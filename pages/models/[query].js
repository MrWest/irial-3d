import React, { Component } from "react";
import { sortModelsServer, fetchSectionsServer } from "../../src/actions";
import ModelsHome from "../../src/components/models/modelsHome";

class ModelsHomeServer extends Component {
  render() {
    const { models, section, query } = this.props;
    if (!section) return <div />;
    return <ModelsHome />;
  }
}

ModelsHomeServer.getInitialProps = async function ({
  reduxStore,
  query: { query },
}) {
  console.log(query);
  const settings = query.split("-");
  const sections = await fetchSectionsServer(reduxStore);
  const models = await sortModelsServer(
    settings[0] || "all",
    settings[1] || "all",
    0,
    reduxStore
  );
  console.log(models.length);
  return { models, section: sections[1], query };
};

export default ModelsHomeServer;
