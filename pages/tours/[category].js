import React, { Component } from "react";
import { sortToursServer, fetchSectionsServer } from "../../src/actions";
import ToursHome from "../../src/components/tours/toursHome";

class ToursHomeServer extends Component {

  render() {
    const { section, category, tours } = this.props;

    if(!section)
       return <div/>; 
    return (
     <ToursHome tours={tours} section={section} category={category} />
    );
  }
}

ToursHomeServer.getInitialProps = async function({ reduxStore, query: { category } }) {
  console.log(category);
  const sections = await fetchSectionsServer(reduxStore);
  const tours = await sortToursServer(category, reduxStore);
  console.log(tours.length);
  return {tours, section: sections[0], category};
};



export default ToursHomeServer;
