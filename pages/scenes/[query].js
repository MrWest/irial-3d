import React, { Component } from "react";
import { sortScenesServer, fetchSectionsServer } from "../../src/actions";
import ScenesHome from "../../src/components/scenes/scenesHome";

class ScenesHomeServer extends Component {
  render() {
    const { scenes, section, category } = this.props;
    if (!section) return <div />;
    return <ScenesHome scenes={scenes} section={section} />;
  }
}

ScenesHomeServer.getInitialProps = async function ({
  reduxStore,
  query: { query },
}) {
  console.log(query);
  const settings = query.split("-");
  const sections = await fetchSectionsServer(reduxStore);
  const scenes = await sortScenesServer(
    settings[0] || "all",
    settings[1] || "all",
    0,
    reduxStore
  );
  console.log(scenes.length);
  return { scenes, section: sections[4], query };
};

export default ScenesHomeServer;
