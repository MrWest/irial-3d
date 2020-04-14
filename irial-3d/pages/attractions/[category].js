import React, { Component } from "react";
import { sortAttractionsServer, fetchSectionsServer } from "../../src/actions";
import AttractionsHome from "../../src/components/attractions/attractionsHome";

class AttractionsHomeServer extends Component {

  render() {
    const { attractions, section, category } = this.props;    
    if(!section)
     return <div />;
    return (
      <AttractionsHome attractions={attractions} section={section} />
    );
  }
}

AttractionsHomeServer.getInitialProps = async function({ reduxStore, query: { category } }) {
  console.log(category);
  const sections = await fetchSectionsServer(reduxStore);
  const attractions = await sortAttractionsServer(category, reduxStore);
  console.log(attractions.length);
  return {attractions, section: sections[1], category};
};


export default AttractionsHomeServer;
