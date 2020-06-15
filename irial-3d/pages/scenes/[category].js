import React, { Component } from "react";
import { sortScenesServer, fetchSectionsServer } from "../../src/actions";
import ScenesHome from "../../src/components/scenes/scenesHome";

class ScenesHomeServer extends Component {

  render() {
    const { scenes, section, category } = this.props;    
    if(!section)
     return <div />;
    return (
      <ScenesHome scenes={scenes} section={section} />
    );
  }
}

ScenesHomeServer.getInitialProps = async function({ reduxStore, query: { category } }) {
  console.log(category);
  const sections = await fetchSectionsServer(reduxStore);
  const scenes = await sortScenesServer(category, reduxStore);
  console.log(scenes.length);
  return {scenes, section: sections[1], category};
};


export default ScenesHomeServer;
