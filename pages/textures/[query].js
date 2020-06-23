import React, { Component } from "react";
import { sortTexturesServer, fetchSectionsServer } from "../../src/actions";
import TexturesHome from "../../src/components/textures/texturesHome";

class TexturesHomeServer extends Component {

  render() {
    const { textures, section, query } = this.props;    
    if(!section)
     return <div />;
    return (
      <TexturesHome  />
    );
  }
}

TexturesHomeServer.getInitialProps = async function({ reduxStore, query: { query } }) {
  console.log(query);
  const settings = query.split('-');
  const sections = await fetchSectionsServer(reduxStore);
  const textures = await sortTexturesServer(settings[0] || 'all', settings[1] || 'all', 0,reduxStore);
  console.log(textures.length);
  return {textures, section: sections[3], query};
};


export default TexturesHomeServer;
