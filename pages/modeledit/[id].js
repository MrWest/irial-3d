import React, { Component, Fragment } from "react";
import {
  selectModelServer,
  fetchSectionsServer,
  getCategoryServer,
} from "../../src/actions";
import ModelEditForm from "../../src/components/forms/modelEditForm";

class ModelEditFormServer extends Component {
  render() {
    const { categories, model, category } = this.props;

    if (model.name === undefined) return <div />;

    return (
      <ModelEditForm
        model={model}
        category={category}
        categories={categories}
      />
    );
  }
}

ModelEditFormServer.getInitialProps = async function ({
  reduxStore,
  query: { id },
}) {
  console.log(id);
  const sections = await fetchSectionsServer(reduxStore);
  const model = await selectModelServer(id, reduxStore);

  console.log("modelsRslt", model);
  const category = await getCategoryServer(model.id_category, reduxStore);
  console.log("category: ", category);
  return { model, categories: sections[3].categories, category };
};

export default ModelEditFormServer;
