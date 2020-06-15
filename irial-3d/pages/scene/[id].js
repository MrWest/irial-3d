import React, { Component, Fragment } from "react";
import { selectSceneServer, fetchSectionsServer, getCategoryServer } from "../../src/actions";
import SceneDetails from "../../src/components/scenes/scenesDetails";


class SceneDetailsServer extends Component {
  render() {
    const { categories, scene, category } = this.props;  
    
    if(scene.name === undefined)
     return <div/>

    return (
      <SceneDetails scene={scene} category={category} categories={categories}/>
    );
  }
}

SceneDetailsServer.getInitialProps = async function({ reduxStore, query: { id } }) {
  console.log(id);
  const sections = await fetchSectionsServer(reduxStore);
  const scene = await selectSceneServer(id, reduxStore);
  
  console.log('scenesRslt', scene)
  const category = await getCategoryServer(scene.id_category, reduxStore);
  console.log("category: ", category);
  return {scene, categories: sections[1].categories, category};
};


export default SceneDetailsServer;
