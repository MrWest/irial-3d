import React, { Component } from "react";
import { sortTexturesServer, fetchSectionsServer } from "../../src/actions";
import TexturesHome from "../../src/components/textures/texturesHome";

class TexturesHomeServer extends Component {

  render() {
    const { textures, section, category } = this.props;    
    if(!section)
     return <div />;
    return (
      <TexturesHome textures={textures} section={section} />
    );
  }
}

TexturesHomeServer.getInitialProps = async function({ reduxStore, query: { category } }) {
  console.log(category);
  const sections = await fetchSectionsServer(reduxStore);
  const textures = await sortTexturesServer(category, reduxStore);
  console.log(textures.length);
  return {textures, section: sections[1], category};
};


export default TexturesHomeServer;
