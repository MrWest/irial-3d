import React, { Component, Fragment } from "react";
import {
  selectModelServer,
  fetchSectionsServer,
  getCategoryServer,
} from "../../src/actions";
import ModelDetails from "../../src/components/models/modelsDetails";

class ModelDetailsServer extends Component {
  render() {
    const { categories, model, category } = this.props;

    if (model.name === undefined) return <div />;

    return (
      <ModelDetails model={model} category={category} categories={categories} />
    );
  }
}

ModelDetailsServer.getInitialProps = async function ({
  reduxStore,
  query: { id },
}) {
  console.log(id);
  const sections = await fetchSectionsServer(reduxStore);
  const model = await selectModelServer(id, reduxStore);

  console.log("modelsRslt", model);
  const category = await getCategoryServer(model.id_category, reduxStore);
  console.log("category: ", category);
  return { model, categories: sections[1].categories, category };
};

export default ModelDetailsServer;
