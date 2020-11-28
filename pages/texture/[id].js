import React, { Component, Fragment } from "react";
import {
  selectTextureServer,
  fetchSectionsServer,
  getCategoryServer,
} from "../../src/actions";
import TextureDetails from "../../src/components/textures/texturesDetails";

class TextureDetailsServer extends Component {
  render() {
    const { categories, texture, category } = this.props;

    if (texture.name === undefined) return <div />;

    return (
      <TextureDetails
        texture={texture}
        category={category}
        categories={categories}
      />
    );
  }
}

TextureDetailsServer.getInitialProps = async function ({
  reduxStore,
  query: { id },
}) {
  console.log(id);
  const sections = await fetchSectionsServer(reduxStore);
  const texture = await selectTextureServer(id, reduxStore);

  console.log("texturesRslt", texture);
  const category = await getCategoryServer(texture.id_category, reduxStore);
  console.log("category: ", category);
  return { texture, categories: sections[1].categories, category };
};

export default TextureDetailsServer;
