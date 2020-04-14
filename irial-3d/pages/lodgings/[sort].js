import React, { Component } from "react";
import { sortLodgingsServer, fetchSectionsServer } from "../../src/actions";
import LodgingsHome from "../../src/components/lodgings/lodgingsHome";


class LodgingsHomeServer extends Component {

  render() {
    const { lodgings, section } = this.props;
    if(!section)
       return <div/>; 
    return (
      <LodgingsHome lodgings={lodgings} section={section} />
    );
  }
}

LodgingsHomeServer.getInitialProps = async function({ reduxStore, query: { sort } }) {
  const sections = await fetchSectionsServer(reduxStore);
  const lodgings = await sortLodgingsServer(sort, 0, reduxStore);
  return {lodgings, section: sections[0], sort };
};


export default LodgingsHomeServer;
