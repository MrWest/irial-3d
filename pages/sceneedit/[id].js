import React, { Component, Fragment } from "react";
import {
  selectSceneServer,
  fetchSectionsServer,
  getCategoryServer,
} from "../../src/actions";
import SceneEditForm from "../../src/components/forms/sceneEditForm";

class SceneEditFormServer extends Component {
  render() {
    const { categories, scene, category } = this.props;

    if (scene.name === undefined) return <div />;

    return (
      <SceneEditForm
        scene={scene}
        category={category}
        categories={categories}
      />
    );
  }
}

SceneEditFormServer.getInitialProps = async function ({
  reduxStore,
  query: { id },
}) {
  console.log(id);
  const sections = await fetchSectionsServer(reduxStore);
  const scene = await selectSceneServer(id, reduxStore);

  console.log("scenesRslt", scene);
  const category = await getCategoryServer(scene.id_category, reduxStore);
  console.log("category: ", category);
  return { scene, categories: sections[3].categories, category };
};

export default SceneEditFormServer;
